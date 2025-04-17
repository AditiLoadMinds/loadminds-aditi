import VerticalNavbar from "../components/vertical-nav"
import { Link } from "react-router-dom"
import { FaPaperclip } from "react-icons/fa"
export const Authorization = () => {
    return (
        <div className="max-h-screen flex flex-row w-screen overflow-hidden">
            <VerticalNavbar />

            <div className="flex flex-col w-full px-10 py-8">
                {/* Header */}
                <div className="flex flex-row justify-between items-center h-10 border-b-2 border-gray-400 mb-4 mx-auto w-full max-w-2xl">
                    <Link to="/ai-tool">
                        <h2 className="font-medium">← Authorization</h2>
                    </Link>
                    <Link to="/settings">
                        <div className="flex flex-row justify-center items-center gap-2 font-medium">
                            <img src="/images/settings.png" className="flex w-4 h-4 py-0" />
                            <h1>Settings</h1>
                        </div>
                    </Link>
                </div>

                {/* Chat Area - takes full remaining space and scrolls if needed */}
                <div className="flex-grow overflow-y-auto mb-6 justify-between items-center mx-auto w-full max-w-2xl">
                    {/* This is where chatbot responses will appear */}
                    <div className="space-y-4">
                        {/* Example messages */}
                        <div className="bg-gray-100 p-4 rounded-xl w-fit max-w-2xl">Hi, how can I assist you?</div>
                        <div className="bg-blue-100 p-4 rounded-xl w-fit max-w-2xl self-end">I need help with my documents.</div>
                        {/* Add more messages dynamically here */}
                    </div>
                </div>

                {/* Input/Search Bar fixed at the bottom */}
                <div className="flex items-center w-full max-w-2xl gap-4 self-center">
                    <div className="flex items-center flex-grow border border-zinc-400 rounded-3xl px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-grow outline-none bg-transparent"
                        />
                        <button><FaPaperclip className="text-zinc-500" /></button>
                    </div>
                    <button className="flex justify-center items-center rounded-full bg-blue-600 w-10 h-10">
                        <img src="/images/send.png" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

