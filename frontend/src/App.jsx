import React, { useEffect, useState } from "react";
import axiosInstance from "./api/axiosInstance";

function App() {
    const [hello, setHello] = useState("");

    useEffect(() => {
        axiosInstance.get("/test").then((res) => {
            setHello(res.data);
        });
    }, []);
    return (
        <div className="ml-5">
            백엔드 데이터 : {hello}
            테스트문구
        </div>
    );
}

export default App;
