// 스타일이거 수정해야됨
import "../styles/global.css";

import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body>
                <Navbar />
                <section className="bg-gray-50">{children}</section>
                <Footer />
            </body>
        </html>
    );
}
