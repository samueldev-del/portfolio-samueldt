import type { Metadata } from "next";

import CarteCard from "@/components/carte/CarteCard";
import { CARD } from "@/lib/carte";

export const metadata: Metadata = {
  title: `${CARD.fullName} — Contact`,
  description: `Digital business card for ${CARD.fullName}, ${CARD.role} in ${CARD.location}.`,
};

export default function CartePageEn() {
  return <CarteCard lang="en" />;
}
