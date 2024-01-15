import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import axios from "axios";

function App() {
    useEffect(() => {
        // 서버에서 렌더링된 HTML 문서에서 CSRF 토큰을 가져오는 로직
        const csrfTokenMeta = document.querySelector("meta[name='_csrf']");

        // CSRF 토큰이 존재하는지 확인 후 요청 헤더에 추가
        if (csrfTokenMeta) {
            const csrfToken = csrfTokenMeta.content;
            axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
        }
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <Router />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
