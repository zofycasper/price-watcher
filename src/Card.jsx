import React from "react";

export default function Card({
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    handleClick,
    id,
    isFavorite,
}) {
    const priceChange = price_change_percentage_24h.toFixed(2);

    const greenStyle = "text-green-500 font-bold";
    const redStyle = "text-red-500  font-bold";

    const color = priceChange > 0 ? greenStyle : redStyle;
    const star = isFavorite
        ? "./image/star-filled.svg"
        : "./image/star-empty.svg";

    return (
        <div className="flex flex-shrink-0 h-10 items-center justify-between w-full text-gray-300 text-xs font-medium border-b-[1px] border-gray-800">
            <div className="flex items-center gap-4 w-1/3">
                <img
                    src={star}
                    alt="star-icon"
                    className="cursor-pointer w-4 h-4"
                    onClick={() => handleClick(id)}
                />
                <img className="h-5 w-5" src={image} alt="" />
                <h1 className="uppercase font-bold">{symbol}</h1>
            </div>
            <h1 className={color}>${current_price}</h1>
            <h1 className={color}>{priceChange}%</h1>
        </div>
    );
}
