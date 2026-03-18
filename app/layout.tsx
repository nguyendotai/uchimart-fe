import "./globals.css";
import PageLayout from "./components/layout/PageLayout";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Uchimart - Mua sắm trực tuyến",
  description: "Mua sắm thực phẩm và đồ tiêu dùng giá rẻ mỗi ngày",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="font-sans text-gray-800 overflow-x-hidden">
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}