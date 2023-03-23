import React, { useEffect, useState } from "react";
import url from "./url";
import Header from "./Header";
import CardHeader from "./CardHeader";
import Card from "./Card";

export default function App() {
    const [priceData, setPriceData] = useState([]);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        // setInterval(() => {

        // }, 5000)
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log("data fetched!");
                setPriceData(() => {
                    const newPriceData = data.map((item) => {
                        return {
                            symbol: item.symbol,
                            image: item.image,
                            current_price: item.current_price,
                            price_change_percentage_24h:
                                item.price_change_percentage_24h,
                            // isFavorite: false,
                        };
                    });
                    return newPriceData;
                });
            });
    }, []);

    function handleClick(id) {
        setPriceData((prev) => {
            return prev.map((item) => {
                return item.symbol === id
                    ? {
                          ...item,
                          isFavorite: !item.isFavorite,
                      }
                    : item;
            });
        });
    }

    const cardElements = priceData.map((item) => {
        return (
            <Card
                {...item}
                key={item.symbol}
                handleClick={handleClick}
                id={item.symbol}
            />
        );
    });

    return (
        <div className="app-container bg-slate-400 flex flex-col items-center ">
            <Header />
            <div className="card-container flex flex-col items-center w-full mt-12 overflow-auto pl-8 pr-10">
                <CardHeader />
                {cardElements}
            </div>
        </div>
    );
}
