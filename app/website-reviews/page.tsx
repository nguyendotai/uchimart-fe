"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaRegSmile } from "react-icons/fa";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Review, RatingCounts } from "../types/Review";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";


const WebsiteReviews = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);


    const [content, setContent] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const emojiRef = useRef<HTMLDivElement>(null);
    const [reviews, setReviews] = useState<Review[]>([]);


    const token = localStorage.getItem("token");



    // Khai báo thêm state cho summary
    const [summary, setSummary] = useState<{
        total: number;
        average: number;
        counts: RatingCounts;
    }>({
        total: 0,
        average: 0,
        counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    });




    // Lấy dữ liệu từ API khi load trang
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/website-reviews")
            .then((res) => {
                if (res.data.success) {
                    const sorted: Review[] = res.data.data.sort(
                        (a: Review, b: Review) =>
                            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    );
                    setReviews(sorted);

                    // Tính toán dữ liệu thật
                    const approved = sorted.filter(r => r.status === 2);
                    const total = approved.length;
                    const counts: RatingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
                    let sum = 0;

                    approved.forEach((r) => {
                        counts[r.rating as 1 | 2 | 3 | 4 | 5] += 1;
                        sum += r.rating;
                    });

                    const average = total > 0 ? (sum / total).toFixed(1) : "0";

                    setSummary({ total, average: Number(average), counts });
                }
            })
            .catch((err) => console.error(err));
    }, []);


    const renderStars = (average: number) => {
        const fullStars = Math.floor(average);
        const halfStar = average - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <>
                {"★".repeat(fullStars)}
                {halfStar && "⯪"} {/* hoặc icon half-star */}
                {"☆".repeat(emptyStars)}
            </>
        );
    };





    const handleAddReview = async () => {
        if (!content.trim() || rating === 0) return;
        if (!token) {
            toast.error("Vui lòng đăng nhập để bình luận!");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8000/api/web-reviews/store",
                {
                    rating,
                    comment: content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            

            if (res.data.success) {
                const newReview: Review = res.data.data;
                setReviews((prev) => (newReview?.status === 2 ? [newReview, ...prev] : prev));
                setContent("");
                setRating(0);
                setIsFocused(false);
                toast.success("Bình luận đang được phê duyệt"); // thông báo duyệt
            }
        } catch (error) {
            console.error("Lỗi khi gửi review:", error);
        }
    };




    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setContent((prev) => prev + emojiData.emoji);
    };


    const handleCancel = () => {
        setIsFocused(false);
        setContent("");
        setRating(0);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
                setShowEmoji(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Tiêu đề */}
            <h2 className="text-2xl font-bold text-center mb-6">
                Đánh Giá Về Website
            </h2>

            {/* Tóm tắt đánh giá */}
            <div className="bg-yellow-50 rounded-lg p-6 flex flex-col md:flex-row gap-6 mb-10 shadow">
                <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = summary.counts[star as keyof RatingCounts] || 0;
                        const percent = summary.total > 0 ? (count / summary.total) * 100 : 0;

                        return (
                            <div key={star} className="flex items-center text-sm">
                                <span className="w-14">{star} sao</span>
                                <div className="flex-1 h-2 bg-gray-200 rounded mx-2 overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400"
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                                <span className="w-12 text-right">{count}</span>
                            </div>
                        );
                    })}

                </div>

                <div className="flex flex-col items-center justify-center min-w-[120px]">
                    <span className="text-4xl font-bold">{summary.average}</span>
                    <span className="text-yellow-400 text-lg">
                        {renderStars(summary.average)}
                    </span>
                    <span className="text-sm text-gray-600">
                        {summary.total} lượt đánh giá
                    </span>
                </div>
            </div>


            {/* Form đánh giá kiểu YouTube */}
            <div className="flex items-start gap-3 mb-8">
                <Image
                    src={
                        JSON.parse(localStorage.getItem("user") || "{}")?.avatar ||
                        "/img/login.jpg"
                    }
                    alt="avatar"
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                    {/* Dãy sao khi focus */}
                    {isFocused && (
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    size={22}
                                    className={`cursor-pointer transition-colors duration-200 ${star <= (hover || rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                        }`}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Ô nhập giống YouTube */}
                    <div className="flex items-center gap-2 border-b border-gray-400 dark:border-gray-500">
                        <FaRegSmile
                            className="text-gray-500 cursor-pointer"
                            onClick={() => setShowEmoji((prev) => !prev)}
                        />
                        <input
                            type="text"
                            placeholder="Viết bình luận..."
                            className="flex-1 bg-transparent outline-none placeholder-gray-500"
                            value={content}
                            onFocus={() => setIsFocused(true)}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    {showEmoji && (
                        <div ref={emojiRef} className="absolute z-50 mt-2">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}

                    {/* Nút hành động khi focus */}
                    {isFocused && (
                        <div className="flex justify-end gap-3 mt-3">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-1 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-full "
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleAddReview}
                                disabled={!content.trim() || rating === 0}
                                className={`px-4 py-1 text-sm font-medium rounded-full text-white  ${content.trim() && rating !== 0
                                    ? "bg-[#00A63E] hover:bg-[#008C34] cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Bình luận
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Danh sách bình luận */}
            <div className="space-y-6">
                {reviews
                    ?.filter((review) => review?.status === 2)
                    .map((review) => (

                        <div
                            key={review.id}
                            className="bg-white rounded-lg shadow p-5 border border-gray-100 hover:shadow-lg transition"
                        >
                            <div className="flex items-center mb-3">
                                <img
                                    src={review.avatar || "/img/login.jpg"}
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-semibold">{review.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(review.created_at).toLocaleDateString("vi-VN")}
                                    </p>
                                </div>
                                <span className="ml-auto text-yellow-400">
                                    {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                                </span>
                            </div>
                            <p className="text-gray-600 italic relative pl-6">
                                <span className="absolute left-0 top-0 text-3xl text-yellow-400">
                                    “
                                </span>
                                {review.comment}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default WebsiteReviews;
