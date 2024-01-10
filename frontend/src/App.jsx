import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
    // const [hello, setHello] = useState("");

    // useEffect(() => {
    //     axiosInstance.get("/test").then((res) => {
    //         setHello(res.data);
    //     });
    // }, []);

    return (
        <BrowserRouter>
            <Header />
            <Router />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
