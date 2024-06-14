"use client";

import { useState } from "react";

// 이용약관, 본인인증, 정보입력, 회원가입 성공
import TermsOfService from "../../../components/ui/AuthForms/TermsOfService";
import UserVerification from "../../../components/ui/AuthForms/UserVerification";
import InformationInput from "../../../components/ui/AuthForms/InformationInput";
import SignUpCompletion from "../../../components/ui/AuthForms/SignUpCompletion";

export default function SignUpPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userEmail: "",
        authNumber: "",
        userId: "",
        password: "",
        passwdCheck: "",
        userNm: "",
    });

    // go back to previous step
    const prevStep = () => {
        setStep(step - 1);
    };

    // proceed to the next step
    const nextStep = () => {
        setStep(step + 1);
    };

    // Handle fields change
    const handleChange = (input) => (e) => {
        setFormData({ ...formData, [input]: e.target.value });
    };

    const { userEmail, authNumber, userId, password, passwdCheck, userNm } =
        formData;
    const values = {
        userEmail,
        authNumber,
        userId,
        password,
        passwdCheck,
        userNm,
    };

    switch (step) {
        case 1:
            return <TermsOfService nextStep={nextStep} />;
        case 2:
            return (
                <UserVerification
                    prevStep={prevStep}
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            );
        case 3:
            return (
                <InformationInput
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            );
        case 4:
            return <SignUpCompletion />;
        default:
        // do nothing
    }
}
