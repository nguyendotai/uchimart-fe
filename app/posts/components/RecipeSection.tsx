"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: number;
  name: string;
  slug: string;
  content: string;
  image?: string;
  created_at?: string;
}

export default function RecipeSection({
  categoryId,
}: {
  categoryId: number | null;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://127.0.0.1:8000/api/post-categories");
        const json = await res.json();

        // nếu API trả về { success: true, data: [...] }
        const categories = Array.isArray(json.data) ? json.data : json;

        const category = categories.find((c: any) => c.id === categoryId);
        setPosts(category?.posts ?? []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categoryId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {loading && <p>Đang tải...</p>}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`} // nên dùng slug thay vì id
            className="flex gap-4 items-center"
          >
            <Image
              src={post.image ?? "/img/image_post.png"}
              alt={post.name}
              width={180}
              height={90}
              className="w-[180px] h-[90px] rounded-lg object-cover"
            />

            <div>
              <p className="font-semibold">{post.name}</p>
              <p className="text-xs text-gray-400">
                {post.created_at
                  ? new Date(post.created_at).toLocaleDateString("vi-VN")
                  : ""}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {post.content.replace(/<[^>]+>/g, "")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
