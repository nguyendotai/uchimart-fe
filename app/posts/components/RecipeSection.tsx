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

export default function RecipeSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/posts");
        const json = await res.json();
        console.log("API posts:", json);
        setPosts(json.data); // 👈 lấy đúng mảng trong object
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-xl font-bold mt-10 mb-4">Công thức nấu ăn</h2>

      {loading && <p>Đang tải...</p>}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`} // 👈 dùng id để gọi API
            className="flex gap-4 items-center"
          >
            <Image
              src={post.image ?? "/img/image_post.png"}
              alt={post.name}
              width={180}
              height={120}
              className="rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{post.name}</p>
              <p className="text-xs text-gray-400">
                {post.created_at
                  ? new Date(post.created_at).toLocaleDateString("vi-VN")
                  : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
