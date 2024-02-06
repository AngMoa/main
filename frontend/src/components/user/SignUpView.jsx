import React, { useState } from "react";
import MemberAgreement from "./MemberAgreement";
import MemberEmailAuth from "./MemberEmailAuth";
import MemberInfoEntry from "./MemberInfoEntry";
import RegisterSuccess from "../../views/RegisterSuccess";

const SignUpView = () => {
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
            return <MemberAgreement nextStep={nextStep} />;
        case 2:
            return (
                <MemberEmailAuth
                    prevStep={prevStep}
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            );
        case 3:
            return (
                <MemberInfoEntry
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            );
        case 4:
            return <RegisterSuccess />;
        default:
        // do nothing
    }
};

export default SignUpView;
