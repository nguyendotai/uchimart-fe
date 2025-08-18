import { notFound } from "next/navigation";
import Image from "next/image";

interface Post {
  id: number;
  name: string;
  slug: string;
  content: string;
  image?: string;
  created_at?: string;
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      next: { revalidate: 60 }, // cache 1 phút
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data; // 👈 API của bạn trả { success: true, data: {...} }
  } catch (e) {
    return null;
  }
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);

  if (!post) return notFound();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">{post.name}</h1>
      {post.created_at && (
        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.created_at).toLocaleDateString("vi-VN")}
        </p>
      )}
      {post.image && (
        <Image
          src={post.image}
          alt={post.name}
          width={800}
          height={400}
          className="rounded-lg mb-6 object-cover w-full h-[400px]"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
