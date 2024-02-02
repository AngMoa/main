import React from "react";

const RegisterSuccess = () => {
    return (
        <section className="bg-gray-50">
            <div className="text-center max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
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
                                STEP 02
                            </h3>
                            <p className="text-base font-normal text-blue-400">
                                본인인증
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
                                STEP 03
                            </h3>
                            <p className="text-base font-normal text-blue-400">
                                정보입력
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
                            {/* <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div> */}
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="font-semibold text-blue-400">
                                STEP 04
                            </h3>
                            <p className="text-base font-normal text-blue-400">
                                가입완료
                            </p>
                        </div>
                    </li>
                </ol>
                <h2 className="text-xl font-bold text-blue-400">
                    앵모아 회원가입을 환영합니다!
                </h2>
                <p className="text-sm text-gray-400">
                    가입이 완료되었습니다. <br />
                    앵모아와 함께 행복한 반려생활을 시작해볼까요? <br />
                    버튼을 누르면 로그인 페이지로 이동합니다.
                </p>
            </div>
        </section>
    );
};

export default RegisterSuccess;
