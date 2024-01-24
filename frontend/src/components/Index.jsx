import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Banner from "./Banner";

const Index = () => {
    const [hello, setHello] = useState("");

    useEffect(() => {
        axiosInstance.get("/test").then((res) => {
            setHello(res.data);
        });
    }, []);

    return (
        <div className="ml-5">
            백엔드 데이터 : {hello}
            <span></span>홈 화면
            <Banner />
        </div>
    );
};

export default Index;
