"use client";

import CategoryLayout from "../../../components/CategoryLayout";
import { onePieceProducts } from "../../data/onepiece";

export default function CoordPage() {
  return (
    <CategoryLayout
      title="Co-Ord Set"
      products={onePieceProducts}
    />
  );
}