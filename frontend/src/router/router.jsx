import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../components/Index";
import SignIn from "../views/SignIn";
import SignUp from "../views/SignUp";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>
    );
};

export default Router;
