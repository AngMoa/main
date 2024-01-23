import React from "react";

const RegisterSuccess = () => {
    return (
        <section className="bg-gray-50">
            <div className="text-center max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
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
