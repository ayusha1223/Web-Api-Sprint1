"use client";

import CategoryLayout from "../../../components/CategoryLayout";
import { partyProducts } from "../../data/party";

export default function CoordPage() {
  return (
    <CategoryLayout
      title="Co-Ord Set"
      products={partyProducts}
    />
  );
}