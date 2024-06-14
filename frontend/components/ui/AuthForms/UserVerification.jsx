// 엑시오스 인스턴스 바꾸기

export default function UserVerification({ nextStep, handleChange, values }) {
    // 인증번호 요청
    const sendAuthNumber = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post(`/mailSend`, {
                email: values.userEmail,
            });
            if (res.status === 200) {
                console.log("성공? >", res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 인증번호 맞는지 처리
    const handleMailAuth = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post(`/mailAuthCheck`, {
                email: values.userEmail,
                authNum: values.authNumber,
            });
            if (res.status === 200) {
                console.log("성공? >", res.data);
                nextStep();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <form className="space-y-6">
                <h5 className="text-xl font-medium text-gray-900">
                    앵모아 회원가입(2. 본인인증)
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
                            <div className="z-10 flex items-center justify-center w-4 h-4  rounded-full ring-4 ring-blue-400 sm:ring-4 shrink-0"></div>
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
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full ring-0 ring-white  sm:ring-8  shrink-0"></div>
                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                        </div>
                        <div className="mt-3 sm:pe-8">
                            <h3 className="font-semibold text-gray-900 ">
                                STEP 03
                            </h3>
                            <p className="text-base font-normal text-gray-500 ">
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
                        htmlFor="userEmail"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        이메일
                    </label>
                    <input
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        // ref={emailInput}
                        value={values.userEmail}
                        onChange={handleChange("userEmail")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="name@company.com"
                        required
                    />
                    <button
                        onClick={sendAuthNumber}
                        className="text-blue-400 bg-white border border-blue-400"
                    >
                        인증번호 요청
                    </button>
                </div>
            </form>
            <form className="space-y-6">
                <div>
                    <label
                        htmlFor="authNumber"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        인증번호
                    </label>
                    <input
                        type="text"
                        name="authNumber"
                        id="authNumber"
                        // ref={emailInput}
                        value={values.authNumber}
                        onChange={handleChange("authNumber")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="6자리 인증번호"
                        required
                    />
                </div>
                <button
                    type="submit"
                    onClick={handleMailAuth}
                    className="w-50 text-blue-400 bg-white border border-blue-400 hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    인증하기
                </button>
            </form>
        </div>
    );
}
