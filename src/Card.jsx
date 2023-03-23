import React from "react";

export default function Card({
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
}) {
    const priceChange = price_change_percentage_24h.toFixed(2);

    function getColor(priceChange) {
        return priceChange > 0 ? "text-green-500" : "text-red-500";
    }

    const greenStyle = "text-green-500 font-bold";
    const redStyle = "text-red-500  font-bold";

    const color = priceChange > 0 ? greenStyle : redStyle;

    return (
        <div className="flex flex-shrink-0 h-10 items-center justify-between w-full text-gray-300 text-xs font-medium border-b-[1px] border-gray-800">
            <div className="flex items-center gap-4 w-1/3">
                <img
                    src="./image/star-empty.svg"
                    alt="star-icon"
                    className="cursor-pointer w-4 h-4"
                />
                <img className="h-5 w-5" src={image} alt="" />
                <h1 className="uppercase font-bold">{symbol}</h1>
            </div>
            <h1 className={color}>${current_price}</h1>
            <h1 className={color}>{priceChange}%</h1>
        </div>
    );
}
