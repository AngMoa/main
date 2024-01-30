import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../components/Index";
import SignIn from "../views/SignIn";
// import SignUp from "../views/SignUp";
import RegisterSuccess from "../views/RegisterSuccess";
import FindIdPw from "../views/FindIdPw";

import SignUpTest from "../components/user/SignUpTest";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signUp" element={<SignUpTest />} />
            <Route path="/regSuccess" element={<RegisterSuccess />} />
            <Route path="/findIdPw" element={<FindIdPw />} />
        </Routes>
    );
};

export default Router;
