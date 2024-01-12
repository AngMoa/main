import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "../components/Index";
import SignIn from "../views/SignIn";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<SignIn />} />
        </Routes>
    );
};

export default Router;
