"use client";

import CategoryLayout from "../../../components/CategoryLayout";
import { casualProducts } from "../../data/casual";

export default function CasualPage() {
  return (
    <CategoryLayout
      title="Casual Wear"
      products={casualProducts}
    />
  );
}