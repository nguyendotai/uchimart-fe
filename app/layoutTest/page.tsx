'use client';

export default function Home() {
    return (
        <div className="relative w-full h-[85vh] overflow-hidden">
            <div className="absolute inset-0 ">
                {/* Ảnh nền 1 */}
                <div
                    className="absolute inset-0 z-1 bg-contain bg-right bg-no-repeat opacity-40 "
                    style={{
                        backgroundImage: "url('./img/bglogin1.png')",
                    }}
                ></div>

                {/* Ảnh nền 2 */}
                <div
                    className="absolute inset-0 z-1 bg-contain bg-left bg-no-repeat opacity-50"
                    style={{
                        backgroundImage: "url('./img/bglogin2.png')",
                    }}
                ></div>
            </div>

            {/* SVG background */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0,0 L0,97 C15,70 20,0 180,0 Z"
                    fill="#00A63E"
                />
            </svg>

            {/* Foreground content */}
            <div className="relative z-10 p-10">
            </div>
        </div>
    );
}
