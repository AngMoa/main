// 엑시오스 인스턴스 수정하기

"use client";

import { useRef } from "react";

export default function InformationInput({ nextStep, handleChange, values }) {
    const nameInput = useRef(null);
    const idInput = useRef(null);
    const pwInput = useRef(null);
    const pwConfirmInput = useRef(null);

    const { userId, password, passwdCheck, userNm } = values;

    // 필수값 입력 핸들링
    const handleSignUp = (e) => {
        if (userNm.length < 1) {
            nameInput.current.focus();
            e.preventDefault();
            return;
        }
        if (userId.length < 1) {
            idInput.current.focus();
            e.preventDefault();
            return;
        }
        if (password.length < 1) {
            pwInput.current.focus();
            e.preventDefault();
            return;
        }
        if (isSame == false) {
            pwConfirmInput.current.focus();
            e.preventDefault();
            return;
        }

        onSignUp(e);
    };

    // 회원가입 요청
    const onSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post(`/com/join`, [
                {
                    userId: values.userId,
                    password: values.password,
                    userNm: values.userNm,
                    userEmail: values.userEmail,
                },
            ]);
            if (res.status === 200) {
                console.log(res.data);
                nextStep();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 비밀번호 같은지 체크
    const isSame = password === passwdCheck;
    return (
        <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form className="space-y-6" action="#">
                <h5 className="text-xl font-medium text-gray-900">
                    앵모아 회원가입(3. 정보입력)
                </h5>
                <ol className="items-center sm:flex sm:justify-between">
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-400  rounded-full ring-blue-400 shrink-0">
                                <svg
                                    className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 16 12"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5.917 5.724 10.5 15 1.5"
                                    />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="font-semibold text-blue-400">
                                STEP 01
                            </h3>
                            <p className="text-base font-normal text-blue-400">
                                이용약관
                            </p>
                        </div>
                    </li>
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-400  rounded-full ring-blue-400 shrink-0">
                                <svg
                                    className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 16 12"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5.917 5.724 10.5 15 1.5"
                                    />
                                </svg>
                            </div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="font-semibold text-blue-400">
                                STEP 01
                            </h3>
                            <p className="text-base font-normal text-blue-400">
                                이용약관
                            </p>
                        </div>
                    </li>
                    <li className="relative mb-6 sm:mb-0">
                        <div className="flex items-center">
                            <div className="z-10 flex items-center justify-center w-4 h-4  rounded-full ring-4 ring-blue-400 sm:ring-4 shrink-0"></div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="font-semibold text-blue-400">
                                STEP 03
                            </h3>
                            <p className="text-base font-normal text-blue-400">
                                정보입력
                            </p>
                        </div>
                    </li>
                    <li className="relative mb-6 sm:mb-0">
                        <div className=" w-fit">
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full ring-0 ring-white sm:ring-8  shrink-0"></div>
                            {/* <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div> */}
                        </div>
                        <div className="mt-3">
                            <h3 className=" font-semibold text-gray-900 ">
                                STEP 04
                            </h3>
                            <p className="text-base font-normal text-gray-500 ">
                                가입완료
                            </p>
                        </div>
                    </li>
                </ol>
                <div>
                    <label
                        htmlFor="userNm"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        이름
                    </label>
                    <input
                        type="userNm"
                        name="userNm"
                        id="userNm"
                        ref={nameInput}
                        value={userNm}
                        onChange={handleChange("userNm")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="홍길동"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="userId"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        아이디
                    </label>
                    <input
                        type="userId"
                        name="userId"
                        id="userId"
                        ref={idInput}
                        value={userId}
                        onChange={handleChange("userId")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="아이디"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        비밀번호
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        ref={pwInput}
                        value={password}
                        onChange={handleChange("password")}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="passwordRe"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        비밀번호 확인
                    </label>
                    <input
                        type="password"
                        name="passwdCheck"
                        id="passwdCheck"
                        ref={pwConfirmInput}
                        value={passwdCheck}
                        onChange={handleChange("passwdCheck")}
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                    {passwdCheck !== "" && !isSame && (
                        <p className="label-text-alt text-red-500">
                            비밀번호가 일치하지 않습니다.
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    onClick={handleSignUp}
                    className="w-50 text-blue-400 bg-white border border-blue-400 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    가입하기
                </button>
            </form>
        </div>
    );
}
