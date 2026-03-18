"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PolicyDetail() {
    const params = useParams();
    const slug = params.slug as string;

    const [content, setContent] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8000/api/pages/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.data?.content) {
                    let html = data.data.content;

                    html = html.replace(/className=/g, "class=");
                    html = html.replace(/\t+/g, "  ");
                    html = html.replace(/\r\n/g, "\n");
                    html = html.replace(/^\s+|\s+$/gm, "");

                    setContent(html);
                }
            });
    }, [slug]);

    return (
        <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}