"use client";

import CategoryLayout from "../../../components/CategoryLayout";
import { coordProducts } from "../../data/coord";

export default function CoordPage() {
  return (
    <CategoryLayout
      title="Co-Ord Set"
      products={coordProducts}
    />
  );
}