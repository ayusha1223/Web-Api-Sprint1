"use client";

import CategoryLayout from "../../../components/CategoryLayout";
import { weddingProducts } from "../../data/wedding";

export default function CoordPage() {
  return (
    <CategoryLayout
      title="Co-Ord Set"
      products={weddingProducts}
    />
  );
}