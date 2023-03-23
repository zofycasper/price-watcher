import React from "react";

export default function CardHeader() {
    return (
        <div className="flex h-10 items-center justify-around w-3/4 mt-5 text-gray-300 text-xs font-medium border-b-[1px] border-gray-300">
            <h1>NAME</h1>
            <h1>PRICE</h1>
            <h1>24H%</h1>
        </div>
    );
}
