import React from "react";
import VerticalNavbar from "../components/vertical-nav";
import { FaSearch } from "react-icons/fa"; 
import { FaPaperclip } from "react-icons/fa";
import { Link } from "react-router-dom";


export const AiTool = () => {
    return (
        <div className="flex flex-row h-screen w-screen">
            <VerticalNavbar />
            
            <div className="flex flex-col justify-center items-center flex-grow px-10">
                <h3 className="font-medium text-lg text-gray-600 mb-6 text-center">
                    How can we help you today?
                </h3>

                {/* Input with search icon */}
                <div className="flex items-center w-full max-w-2xl gap-4 py-10">
                    <div className="flex items-center flex-grow border border-zinc-400 rounded-3xl px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-grow outline-none bg-transparent"
                        />
                        <button><FaPaperclip className="text-zinc-500" /></button>
                        
                        
                    </div>
                    <button className="flex justify-center items-center rounded-full bg-blue-600 w-10 h-10">
                        <img src="/images/send.png" className="align-middle items-center w-5 h-5"></img>
                    </button>
                </div>
                <div className="flex items-center w-full max-w-2xl gap-6">
                    <Link to="/ai-tool/authorization">
                    <button className="flex flex-col flex-grow rounded-2xl border border-gray-200 w-80 h-40">
                        <div className="font-medium m-5 flex flex-col justify-center align-middle text-left">
                                <img src="/images/hamburger.png" className="w-6 h-6 m-2"></img>
                                <h4>Load quote</h4>
                                <div className="font-normal text-gray-400 text-xs">Fill in various customs documents with ease</div>
                        </div>
                    </button></Link>
                    <Link to="/ai-tool/loadquote">
                    <button className="flex flex-col flex-grow rounded-2xl border border-gray-200 w-80 h-40">
                        <div className="font-medium m-5 flex flex-col justify-center align-middle text-left">
                            <img src="/images/hamburger.png" className="w-6 h-6 m-2"></img>
                            <h4>Load quote</h4>
                            <div className="font-normal text-gray-400 text-xs">Fill in various customs documents with ease</div>
                        </div>
                    </button>
                    </Link>
                </div>
            </div>
            
        </div>
    );
}
