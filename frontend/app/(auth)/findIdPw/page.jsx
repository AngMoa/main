export default function FindIdPwPage() {
    return (
        <div role="tablist" className="tabs tabs-lifted">
            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="아이디"
            />
            <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
                아이디 찾기 컨텐츠
            </div>

            <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label="비밀번호"
                checked
            />
            <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
                비밀번호 찾기 컨텐츠
            </div>
        </div>
    );
}
