import React, { useEffect, useState } from "react";
import url from "./url";
import Header from "./Header";
import CardHeader from "./CardHeader";
import Card from "./Card";

export default function App() {
    const [priceData, setPriceData] = useState([]);
    const [watchList, setWatchList] = useState([]);
    const [isWatchList, setIsWatchList] = useState(false);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log("data fetched!");
                setPriceData(() => {
                    const newPriceData = data.map((item) => {
                        return watchList.includes(item)
                            ? {
                                  ...item,
                                  isFavorite: true,
                              }
                            : {
                                  ...item,
                                  isFavorite: false,
                              };
                    });
                    return newPriceData;
                });
            });
    }, []);

    function toggleWatchList() {
        setIsWatchList((prev) => !prev);

        // setWatchList(() => {
        //     return priceData.filter((item) => {
        //         return item.isFavorite;
        //     });
        // });

        console.log("watchlist clicked!");
    }

    function toggleFavorite(id) {
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

        console.log(id);
    }

    function cardShown() {
        return isWatchList
            ? priceData.filter((item) => {
                  return item.isFavorite;
              })
            : priceData;
    }

    const cardElements = cardShown().map((item) => {
        return (
            <Card
                {...item}
                key={item.symbol}
                toggleFavorite={toggleFavorite}
                id={item.symbol}
            />
        );
    });

    return (
        <div className="app-container bg-slate-400 flex flex-col items-center ">
            <Header
                toggleWatchList={toggleWatchList}
                isWatchList={isWatchList}
            />
            <div className="card-container flex flex-col items-center w-full mt-12 overflow-auto pl-8 pr-10">
                <CardHeader />
                {cardElements}
            </div>
        </div>
    );
}
