module nivi_addr::license_token {
    use std::signer;
    use std::string::{Self, String};

    use aptos_framework::table;
    use aptos_framework::table::Table;
    use aptos_framework::timestamp;

    /// Error codes
    const E_NOT_CREATOR: u64 = 1;
    const E_INVALID_TRUST_SCORE: u64 = 2;
    const E_LICENSE_NOT_FOUND: u64 = 3;
    const E_UNAUTHORIZED: u64 = 4;

    /// LicenseToken struct storing Shelby verification data
    struct LicenseToken has key, store {
        id: u64,
        creator: address,
        lineage_id: String,
        trust_score: u8,
        monthly_fee: u64,
        created_at: u64,
        is_active: bool,
    }

    /// Store for managing license tokens
    struct LicenseStore has key {
        license_counter: u64,
        licenses: Table<u64, LicenseToken>,
    }

    /// Initialize the module for a creator
    public fun initialize(creator: &signer) {
        let creator_addr = signer::address_of(creator);

        if (!exists<LicenseStore>(creator_addr)) {
            move_to(creator, LicenseStore {
                license_counter: 0,
                licenses: table::new(),
            });
        }
    }

    /// Mint a new license token
    public entry fun mint_license(
        creator: &signer,
        lineage_id: vector<u8>,
        trust_score: u8,
        monthly_fee: u64,
    ) acquires LicenseStore {
        let creator_addr = signer::address_of(creator);

        // bootstrap if not initialized
        if (!exists<LicenseStore>(creator_addr)) {
            initialize(creator);
        };

        let store = borrow_global_mut<LicenseStore>(creator_addr);

        assert!(trust_score <= 100, E_INVALID_TRUST_SCORE);

        let license_id = store.license_counter;
        store.license_counter = license_id + 1;

        let timestamp_now = timestamp::now_seconds();

        let license = LicenseToken {
            id: license_id,
            creator: creator_addr,
            lineage_id: string::utf8(lineage_id),
            trust_score,
            monthly_fee,
            created_at: timestamp_now,
            is_active: true,
        };

        table::add(&mut store.licenses, license_id, license);
    }

    /// Get license info
    public fun get_license(
        creator: address,
        license_id: u64
    ): (String, u8, u64, bool) acquires LicenseStore {
        let store = borrow_global<LicenseStore>(creator);
        assert!(table::contains(&store.licenses, license_id), E_LICENSE_NOT_FOUND);

        let license = table::borrow(&store.licenses, license_id);

        (
            *&license.lineage_id,
            license.trust_score,
            license.monthly_fee,
            license.is_active
        )
    }

    /// Verify license authenticity by comparing lineage IDs
    public fun verify_license(
        creator: address,
        license_id: u64,
        expected_lineage_id: vector<u8>
    ): bool acquires LicenseStore {
        if (!exists<LicenseStore>(creator)) return false;

        let store = borrow_global<LicenseStore>(creator);
        if (!table::contains(&store.licenses, license_id)) return false;

        let license = table::borrow(&store.licenses, license_id);
        let expected = string::utf8(expected_lineage_id);

        string::bytes(&license.lineage_id) == string::bytes(&expected)
    }

    /// Deactivate a license
    public entry fun deactivate_license(
        creator: &signer,
        license_id: u64
    ) acquires LicenseStore {
        let creator_addr = signer::address_of(creator);
        assert!(exists<LicenseStore>(creator_addr), E_NOT_CREATOR);

        let store = borrow_global_mut<LicenseStore>(creator_addr);
        assert!(table::contains(&store.licenses, license_id), E_LICENSE_NOT_FOUND);

        let license = table::borrow_mut(&mut store.licenses, license_id);
        assert!(license.creator == creator_addr, E_UNAUTHORIZED);

        license.is_active = false;
    }

    #[test_only]
    public fun initialize_for_test(account: &signer) {
        initialize(account);
    }
}
