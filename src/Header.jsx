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
        <nav className="bg-gray-300  flex h-11 justify-between items-center px-5 text-sm fixed shadow-sm">
            <div className="font-bold text-sm italic title">Price Watcher</div>
            <form
                onSubmit={handleSubmit}
                action="GET"
                className="flex items-center"
            >
                <input
                    onChange={() => handleChange(event)}
                    value={inputData}
                    placeholder="search"
                    className="h-6 border-none rounded-l-md hover:bg-gray-500 placeholder:text-gray-400 placeholder:italic caret-gray-300 px-2  py-1 placeholder:text-xs text-xs text-gray-300 focus:outline-none focus:bg-gray-600"
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
                className=" text-[#4c4c4c] italic bg-transparent border-2 border-[#4c4c4c] px-3 py-1 rounded-xl text-xs font-medium w-[95px] transition ease-in-out hover:bg-[#4c4c4c] hover:border-solid hover:border-2 hover:border-[#4c4c4c] hover:font-bold  hover:text-gray-300"
            >
                {isWatchList ? "Back" : "Watch list"}
            </button>
        </nav>
    );
}
