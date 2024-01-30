import React from "react";

const MemberAgreement = ({ nextStep }) => {
    const Continue = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <div className="max-w-sm mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <p>앵모아 회원가입(1. 이용약관)</p>
            <button onClick={Continue} className="border border-blue-200">
                Next
            </button>
        </div>
    );
};

export default MemberAgreement;
