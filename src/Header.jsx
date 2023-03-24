import React from "react";

export default function Header({ toggleWatchList, isWatchList }) {
    return (
        <nav className="bg-gray-300  flex h-10 justify-between items-center px-5 text-sm fixed shadow-sm">
            <div className="font-bold text-xs italic text-gray-700">
                Price Watcher
            </div>
            <form action="GET" className="flex items-center">
                <input
                    placeholder="search"
                    className="h-5 border-none rounded-l-md hover:bg-gray-600 placeholder:text-gray-500 px-2  py-1 placeholder:text-xs text-xs text-gray-300"
                />
                <button className="h-5 w-5 p-1 rounded-r-md border-none">
                    <img
                        src="./image/search.svg"
                        alt="search-icon"
                        className="search-icon "
                    />
                </button>
            </form>

            <button
                onClick={toggleWatchList}
                className=" text-gray-300 italic px-3 py-1 rounded-xl text-xs font-light"
            >
                {isWatchList ? "Back" : "Watch list"}
            </button>
        </nav>
    );
}
