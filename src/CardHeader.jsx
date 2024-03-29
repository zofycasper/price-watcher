import React from "react";

export default function CardHeader() {
    return (
        <div className="flex h-11 items-center flex-shrink-0 justify-between w-full text-gray-300 text-xs font-medium border-b-[1px] border-gray-300">
            <h1 className="pl-8">NAME</h1>
            <h1 className="pl-16">PRICE</h1>
            <h1>24H%</h1>
        </div>
    );
}
