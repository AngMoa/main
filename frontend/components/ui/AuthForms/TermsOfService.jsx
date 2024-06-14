export default function TermsOfService({ nextStep }) {
    const Continue = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
            <h2 className="text-lg font-bold">앵모아 회원가입(1. 이용약관)</h2>

            <ol className="items-center sm:flex sm:justify-between">
                <li className="relative mb-6 sm:mb-0">
                    <div className="flex items-center">
                        <div className="z-10 flex items-center justify-center w-4 h-4  rounded-full ring-4 ring-blue-400 sm:ring-4 shrink-0"></div>
                        <div className="hidden sm:flex w-full bg-gray-200 h-0.5"></div>
                    </div>
                    <div className="mt-3 sm:pe-8">
                        <h3 className="font-semibold text-blue-400">STEP 01</h3>
                        <p className="text-base font-normal text-blue-400">
                            이용약관
                        </p>
                    </div>
                </li>
                <li className="relative mb-6 sm:mb-0">
                    <div className="flex items-center">
                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full ring-0 ring-white  sm:ring-8  shrink-0"></div>
                        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                    </div>
                    <div className="mt-3 sm:pe-8">
                        <h3 className="font-semibold text-gray-900 ">
                            STEP 02
                        </h3>
                        <p className="text-base font-normal text-gray-500 ">
                            본인인증
                        </p>
                    </div>
                </li>
                <li className="relative mb-6 sm:mb-0">
                    <div className="flex items-center">
                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full ring-0 ring-white  sm:ring-8  shrink-0"></div>
                        <div className="hidden sm:flex w-full bg-gray-200 h-0.5 "></div>
                    </div>
                    <div className="mt-3 sm:pe-8">
                        <h3 className="font-semibold text-gray-900 ">
                            STEP 03
                        </h3>
                        <p className="text-base font-normal text-gray-500 ">
                            정보입력
                        </p>
                    </div>
                </li>
                <li className="relative mb-6 sm:mb-0">
                    <div className=" w-fit">
                        <div className="z-10 flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full ring-0 ring-white sm:ring-8  shrink-0"></div>
                        {/* <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div> */}
                    </div>
                    <div className="mt-3">
                        <h3 className=" font-semibold text-gray-900 ">
                            STEP 04
                        </h3>
                        <p className="text-base font-normal text-gray-500 ">
                            가입완료
                        </p>
                    </div>
                </li>
            </ol>

            <button onClick={Continue} className="border border-blue-200">
                Next
            </button>
        </div>
    );
}
