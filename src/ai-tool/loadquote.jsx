import VerticalNavbar from "../components/vertical-nav"
import { Link } from "react-router-dom"
import { FaPaperclip } from "react-icons/fa"
import { FiRefreshCw } from "react-icons/fi"
import { useState, useEffect } from "react"

export const LoadQuote = () => {
    const [isBotTyping, setIsBotTyping] = useState(true);
    const [showBotMessage, setShowBotMessage] = useState(false);

    const triggerBotResponse = () => {
        setIsBotTyping(true);
        setShowBotMessage(false);
        const timeout = setTimeout(() => {
            setIsBotTyping(false);
            setShowBotMessage(true);
        }, 1500);

        return () => clearTimeout(timeout);
    };

    useEffect(() => {
        const clear = triggerBotResponse();
        return () => clear?.();
    }, []);

    return (
        <div className="max-h-screen flex flex-row w-screen overflow-hidden">
            <VerticalNavbar />

            <div className="flex flex-col w-full px-10 py-8">
                {/* Header */}
                <div className="flex flex-row justify-between items-center h-10 border-b-2 border-gray-600 mb-4 mx-auto w-full max-w-2xl">
                    <Link to="/ai-tool">
                        <h2 className="font-medium">← Load Quote</h2>
                    </Link>
                    <Link to="/settings">
                        <div className="flex flex-row justify-center items-center gap-2 font-medium">
                            <img src="/images/settings.png" className="flex w-4 h-4 py-0" />
                            <h1>Settings</h1>
                        </div>
                    </Link>
                </div>

                {/* Chat Section */}
                <div className="flex-grow overflow-y-auto mb-6 justify-between items-center mx-auto w-full max-w-2xl">
                <div className="space-y-4">
    {/* Bot Initial Prompt */}
    {showBotMessage && (
        <div className="flex items-end gap-2">
            <img src="/images/logo1.png" className="w-8 h-8 rounded-full bg-black" />
            <div className="bg-gray-200 px-4 py-3 rounded-2xl max-w-[80%] text-sm">
                Hi, please provide the following details to get your load quotation:
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>Pickup location</li>
                    <li>Delivery location</li>
                    <li>Goods to ship</li>
                    <li>Total deck space</li>
                    <li>Total weight</li>
                </ul>
                <p className="mt-2">Feel free to add other relevant information.</p>
            </div>
        </div>
    )}

    {/* Typing indicator (optional) */}
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

    {/* User Reply */}
    <div className="flex justify-end">
        <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl max-w-[80%] text-sm whitespace-pre-line">
            Good day,
            {"\n"}Please quote the following for pickup tomorrow, deliver October 24th.
            {"\n"}Thank you!
            {"\n\n"}Special Assistance request
            {"\n"}Shipper details: 
            {"\n"}902-1 AVENUE NORTH
            {"\n"}MARTENSVILLE, SK
            {"\n"}S0K 0A2
            {"\n\n"}Consignee details:
            {"\n"}4747-76 AVE NW
            {"\n"}EDMONTON, AB
            {"\n"}T6B 0A3
        </div>
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
                        <button
                            className="ml-2"
                            onClick={triggerBotResponse}
                            title="Reload response"
                        >
                            <FiRefreshCw className="text-zinc-500 hover:rotate-90 transition-transform duration-300" />
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
