"use client";

import { PitchDeck } from "@/components/PitchDeck";
import { useRouter } from "next/navigation";

export default function PitchDeckPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return <PitchDeck onClose={handleClose} />;
}

