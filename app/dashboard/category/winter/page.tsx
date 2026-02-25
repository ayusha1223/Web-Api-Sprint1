"use client";

import CategoryLayout from "../../../components/CategoryLayout";
import { winterProducts } from "../../data/winter";

export default function CoordPage() {
  return (
    <CategoryLayout
      title="Co-Ord Set"
      products={winterProducts}
    />
  );
}