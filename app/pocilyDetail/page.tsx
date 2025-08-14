"use client";
import { useEffect, useState } from "react";

export default function PolicyDetail({ params }: { params: { slug: string } }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/pages/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.description) {
          // Đổi className thành class
          const htmlWithClass = data.data.description.replace(/className=/g, "class=");
          setContent(htmlWithClass);
        }
      })
      .catch((err) => {
        console.error("Lỗi gọi API:", err);
      });
  }, [params.slug]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
