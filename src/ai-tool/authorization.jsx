import VerticalNavbar from "../components/vertical-nav"
import { Link } from "react-router-dom"
import { FaPaperclip } from "react-icons/fa"
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";


export const Authorization = () => {
    const [isBotTyping, setIsBotTyping] = useState(true);
    const [showBotMessage, setShowBotMessage] = useState(false);

    const simulateBotResponse = () => {
        setIsBotTyping(true);
        setShowBotMessage(false);
        setTimeout(() => {
            setIsBotTyping(false);
            setShowBotMessage(true);
        }, 1500);
    };

    useEffect(() => {
        simulateBotResponse();
    }, []);

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

                {/* Chat Section */}
                <div className="flex-grow overflow-y-auto mb-6 mx-auto w-full max-w-2xl space-y-6">
                    {/* Bot Message */}
                    {showBotMessage && (
                        <div className="flex items-end gap-2">
                            <img src="/images/logo1.png" className="w-8 h-8 rounded-full bg-black" />
                            <div className="bg-gray-200 px-4 py-3 rounded-2xl max-w-[80%] text-sm">
                                Hi, please provide the following details to get your authorization documents.
                                <br /><br />
                                • PARS/PAPS number<br />
                                • Name of border<br />
                                • Name of carrier
                                <br /><br />
                                Feel free to add other relevant information.
                            </div>
                        </div>
                    )}

                    {/* Typing Indicator */}
                    {isBotTyping && (
                        <div className="flex items-end gap-2 ml-1">
                            <img src="/images/logo1.png" className="w-8 h-8 rounded-full bg-black" />
                            <div className="bg-gray-100 px-4 py-3 rounded-2xl max-w-[60%]">
                                <div className="flex items-center space-x-1">
                                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce delay-200"></span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User Message */}
                    <div className="flex justify-end">
                        <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl max-w-[80%] text-sm">
                            I need help with my documents.
                        </div>
                    </div>
                </div>

                {/* Input Bar */}
                <div className="flex items-center w-full max-w-2xl gap-4 self-center">
                    <div className="flex items-center flex-grow border border-zinc-400 rounded-3xl px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-grow outline-none bg-transparent"
                        />
                        <button><FaPaperclip className="text-zinc-500" /></button>
                        <button onClick={simulateBotResponse} className="ml-2">
                            <FiRefreshCcw className="text-zinc-500 hover:text-black transition duration-200" />
                        </button>
                    </div>
                    <button className="flex justify-center items-center rounded-full bg-blue-600 w-10 h-10">
                        <img src="/images/send.png" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
