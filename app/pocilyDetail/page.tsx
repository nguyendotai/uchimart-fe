"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

type PolicyDetail = {
  id: number;
  name: string;
  title: string;
  content?: string;
};

export default function PolicyDetail() {
  const { slug } = useParams();
  const [policy, setPolicy] = useState<PolicyDetail | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pages/${slug}`)
      .then(res => {
        if (res.data.success) {
          setPolicy(res.data.data);
        }
      })
      .catch(err => console.error(err));
  }, [slug]);

  if (!policy) return <p>Đang tải...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{policy.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: policy.content || "" }} />
    </div>
  );
}
