#!/bin/bash
# Find correct Supabase connection string by testing with psql

PROJECT_REF="xnzruzquuvovtucbqdrw"
PASSWORD="xfoH4B7jNt7TQOw5"

echo "🔍 Testing Supabase connection strings..."

# Test different formats
FORMATS=(
  "postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
  "postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
  "postgresql://postgres:${PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres"
  "postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"
  "postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-eu-west-1.pooler.supabase.com:6543/postgres"
  "postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
  "postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
)

for conn in "${FORMATS[@]}"; do
  echo "Testing: ${conn//:${PASSWORD}@/:****@}"
  if psql "$conn" -c "SELECT version();" > /dev/null 2>&1; then
    echo "✅ SUCCESS! Working connection string:"
    echo "$conn"
    echo ""
    echo "Update .env with:"
    echo "DATABASE_URL=\"$conn\""
    exit 0
  fi
done

echo "❌ No working connection string found"
echo "Please get the exact connection string from Supabase dashboard"
exit 1

