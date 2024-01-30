import React from "react";
import axiosInstance from "../../api/axiosInstance";

const EmailAuth = ({ nextStep, handleChange, values }) => {
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
};

export default EmailAuth;
