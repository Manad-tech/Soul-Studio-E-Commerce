import { useState } from "react";
import type { Product } from "@/types/product";

import ProductContent from "./ProductContent";
import ReviewList from "./ReviewList";

const tabs = [
  "Description",
  "Specifications",
  "Shipping",
  "Reviews",
] as const;

type Tab = (typeof tabs)[number];

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>("Description");

  return (
    <div>

      <div className="mb-10 flex flex-wrap gap-3 border-b border-white/10 pb-6">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-6 py-3 transition ${
              activeTab === tab
                ? "bg-[#C58A5C] text-black"
                : "border border-white/10 bg-[#111111] hover:border-[#C58A5C]"
            }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {activeTab === "Reviews" ? (
        <ReviewList />
      ) : (
        <ProductContent tab={activeTab} product={product} />
      )}

    </div>
  );
}