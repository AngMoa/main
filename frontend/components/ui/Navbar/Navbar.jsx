"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "../../../store/store";
import LogoImage from "../../../public/images/logo.png";

export default function Navbar() {
    // zustand로 관리할 로그인 여부
    const { isLoginState, setIsLoginState } = useAuthStore();

    // 로그아웃
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsLoginState();
    };

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <Image
                            src={LogoImage}
                            className="h-8"
                            alt="AngMoa Logo"
                        />
                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            AngMoa
                        </span> */}
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        {isLoginState && (
                            <a
                                href=""
                                className="text-sm  text-gray-500 dark:text-white hover:underline"
                            >
                                마이페이지
                            </a>
                        )}
                        <a
                            href="#"
                            className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
                        >
                            장바구니
                        </a>
                    </div>
                </div>
            </nav>
            <nav className="bg-white border-t border-gray-200 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center justify-between">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-900 dark:text-white hover:underline"
                                    aria-current="page"
                                >
                                    홈
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-900 dark:text-white hover:underline"
                                >
                                    컨텐츠
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-900 dark:text-white hover:underline"
                                >
                                    병원찾기
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-900 dark:text-white hover:underline"
                                >
                                    커뮤니티
                                </a>
                            </li>
                        </ul>
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            {isLoginState ? (
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-900 dark:text-white hover:underline"
                                        aria-current="page"
                                    >
                                        로그아웃
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href="/login"
                                            className="text-gray-900 dark:text-white hover:underline"
                                            aria-current="page"
                                        >
                                            로그인
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/signUp"
                                            className="text-gray-900 dark:text-white hover:underline"
                                        >
                                            회원가입
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-900 dark:text-white hover:underline"
                                >
                                    고객센터
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
