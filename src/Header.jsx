import React from "react";

export default function Header({
    toggleWatchList,
    isWatchList,
    handleChange,
    inputData,
    handleClose,
}) {
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <nav className="bg-gray-300  flex h-10 justify-between items-center px-5 text-sm fixed shadow-sm">
            <div className="font-bold text-xs italic text-gray-700">
                Price Watcher
            </div>
            <form
                onSubmit={handleSubmit}
                action="GET"
                className="flex items-center"
            >
                <input
                    onChange={() => handleChange(event)}
                    value={inputData}
                    placeholder="search"
                    className="h-6 border-none rounded-l-md hover:bg-gray-600 placeholder:text-gray-500 px-2  py-1 placeholder:text-xs text-xs text-gray-300 focus:outline-none"
                />
                <button
                    onClick={handleClose}
                    className="h-6 w-6 p-1 rounded-r-md border-none flex items-center justify-center text-xs font-bold text-gray-400"
                >
                    X
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
