"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import axios from "axios";
import axiosInstance from "../../../src/api/axiosInstance";
import { useAuthStore } from "../../../store/store";
// import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    // const navigate = useNavigate();
    const idInput = useRef(null);
    const pwInput = useRef(null);

    const [loginInput, setLoginInput] = useState({
        userId: "",
        password: "",
    });

    const { userId, password } = loginInput;

    const [errors, setErrors] = useState({
        invalid: false,
        message: "",
    });

    // zustand로 관리할 로그인 여부
    const { isLoginState, setIsLoginState } = useAuthStore();

    const handleInputChange = (e) => {
        setLoginInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        // console.log(e.target);
    };

    // 로그인
    const handleLogin = (e) => {
        if (userId.length < 1) {
            idInput.current.focus();
            setErrors({
                invalid: true,
                message: "아이디를 입력해주세요.",
            });
            e.preventDefault();
            return;
        }
        if (password.length < 1) {
            pwInput.current.focus();
            setErrors({
                invalid: true,
                message: "비밀번호를 입력해주세요.",
            });
            e.preventDefault();
            return;
        }
        onLogin(e);
    };

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post(`/com/login`, {
                userId: loginInput.userId,
                password: loginInput.password,
            });
            if (res.status === 200) {
                // 헤더에 토큰 포함
                const { token } = res.data;
                axios.defaults.headers.common["Authorization"] =
                    `Bearer ${token}`;

                // 토큰 저장
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);

                // 로그인 여부
                setIsLoginState();
                console.log("로그인 여부 state>", isLoginState);

                // !!! 넥스트로 다시 바꾸기!!!
                // navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h2 className="text-center text-2xl text-gray-700">Sign In</h2>
            <p className="text-center text-gray-500">
                앵모아 계정을 만들고 로그인해보세요.
            </p>
            <form className="max-w-sm mx-auto ">
                <div className="mb-5">
                    <label
                        htmlFor="userId"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                        아이디
                    </label>
                    <input
                        type="userId"
                        id="userId"
                        name="userId"
                        ref={idInput}
                        value={loginInput.userId}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="아이디"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        ref={pwInput}
                        value={loginInput.password}
                        onChange={handleInputChange}
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="비밀번호"
                        required
                    />
                    <Link
                        href="/findIdPw"
                        className="label-text-alt link flex flex-row-reverse text-blue-400"
                    >
                        아이디/비밀번호 찾기
                    </Link>
                </div>
                {/* <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            required
                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        자동로그인
                    </label>
                </div> */}
                {errors.invalid ? (
                    <p className="text-red-500">{errors.message}</p>
                ) : null}
                <button
                    type="submit"
                    onClick={handleLogin}
                    className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-12 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    로그인
                </button>
                {/* <button
                    type="submit"
                    className="text-black bg-white border hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-12 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    회원가입
                </button> */}
            </form>
        </>
    );
}
