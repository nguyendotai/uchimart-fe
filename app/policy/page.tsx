"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Policy = {
  id: number;
  name: string;
  slug: string;
};

export default function PolicyList() {
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pages")
      .then((res) => {
        if (res.data.success) {
          setPolicies(res.data.data);
        }
      })
      .catch((err) => console.error("Lỗi:", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chính sách & Hướng dẫn</h2>
      <ul className="list-disc pl-6">
        {policies.map((policy) => (
          <li key={policy.id} className="mb-2">
            <Link
              href={`/policy/${policy.slug}`}
              className="text-blue-600 hover:underline"
            >
              {policy.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
