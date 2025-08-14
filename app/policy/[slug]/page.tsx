"use client";

import { useEffect, useState } from "react";

export default function PolicyDetail({ params }: { params: { slug: string } }) {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/api/pages/${params.slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.data?.content) {
                    let html = data.data.content || "";

                    html = html.replace(/className=/g, "class=");

                    // Loại bỏ tab
                    html = html.replace(/\t+/g, "  ");

                    // Chuẩn hóa xuống dòng
                    html = html.replace(/\r\n/g, "\n");

                    // Xoá khoảng trắng ở đầu và cuối dòng
                    html = html.replace(/^\s+|\s+$/gm, "");

                    setContent(html);

                }
            })
            .catch((err) => {
                console.error("Lỗi gọi API:", err);
            });
    }, [params.slug]);

    return (
        <div className="prose max-w-none">
            <div
                dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
