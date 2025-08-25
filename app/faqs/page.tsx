"use client";
import React, { useEffect, useState } from "react";

interface Faq {
  id: number;
  question: string;
  answer: string;
  order: number;
  faq_topic_id: number;
  faq_topic_name: string;
}

interface FaqTopic {
  id: number;
  name: string;
}

const FAQs = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [topics, setTopics] = useState<FaqTopic[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/faqs");
        const json = await res.json();
        if (json.success) setFaqs(json.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    const fetchTopics = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/faq-topics");
        const json = await res.json();
        if (json.success) setTopics(json.data);
      } catch (error) {
        console.error("Error fetching Topics:", error);
      }
    };

    Promise.all([fetchFaqs(), fetchTopics()]).finally(() => setLoading(false));
  }, []);

  const categoryFilteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((item) => item.faq_topic_id === activeCategory);

  const filteredFaqs = categoryFilteredFaqs.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.faq_topic_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFaqs = filteredFaqs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Hiển thị tối đa 4 nút trang
  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, start + 3);
    if (end - start < 3) start = Math.max(1, end - 3);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#921573] sm:text-5xl tracking-tight">
            UchiMart FAQs
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Tìm câu trả lời cho câu hỏi của bạn hoặc tìm kiếm những gì bạn cần.
          </p>
          <div className="mt-6 max-w-xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Tìm kiếm câu hỏi..."
              className="w-full px-5 py-3 rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4 bg-white rounded-xl shadow-md p-4 sticky top-4 max-h-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold text-[#921573] mb-3">
              Danh mục
            </h2>
            <ul className="space-y-2 text-sm">
              <li
                className={`cursor-pointer px-3 py-1.5 rounded-md transition-all duration-200 ${
                  activeCategory === "all"
                    ? "bg-[#921573] text-white font-semibold"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
                onClick={() => {
                  setActiveCategory("all");
                  setCurrentPage(1);
                }}
              >
                Tất cả câu hỏi
              </li>
              {topics.map((topic) => (
                <li
                  key={topic.id}
                  className={`cursor-pointer px-3 py-1.5 rounded-md transition-all duration-200 ${
                    activeCategory === topic.id
                      ? "bg-[#921573] text-white font-semibold"
                      : "text-gray-700 hover:bg-indigo-50"
                  }`}
                  onClick={() => {
                    setActiveCategory(topic.id);
                    setCurrentPage(1);
                  }}
                >
                  {topic.name}
                </li>
              ))}
            </ul>
          </aside>

          {/* FAQ Content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {paginatedFaqs.length === 0 ? (
                  <p className="text-center text-[#921573] text-lg">
                    No FAQs found.
                  </p>
                ) : (
                  paginatedFaqs.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-transparent hover:border-indigo-500"
                    >
                      <h3 className="text-lg font-semibold text-[#921573]">
                        {item.question}
                      </h3>
                      <div
                        className="mt-2 text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                      <p className="mt-3 text-sm text-green-600">
                        {item.faq_topic_name}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-[#921573] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQs;
