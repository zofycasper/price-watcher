import React, { useEffect, useState } from "react";
import url from "./url";
import Header from "./Header";
import CardHeader from "./CardHeader";
import Card from "./Card";

export default function App() {
    // localStorage.clear();
    const [priceData, setPriceData] = useState([]);
    const [watchList, setWatchList] = useState(
        JSON.parse(localStorage.getItem("watchList")) || []
    );
    const [inputData, setInputData] = useState("");

    const [isWatchList, setIsWatchList] = useState(false);
    const [searchList, setSearchList] = useState(priceData);
    const [isSearchList, setIsSearchList] = useState(false);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log("data fetched!");

                setPriceData(() => {
                    const newPriceData = data.map((item) => {
                        if (watchList.length === 0) {
                            return {
                                ...item,
                                isFavorite: false,
                            };
                        } else {
                            const updatedItem = watchList.filter((coin) => {
                                if (coin.id === item.id) {
                                    return {
                                        ...item,
                                        isFavorite: true,
                                    };
                                }
                            });

                            return (
                                updatedItem.find(
                                    (coin) => coin.isFavorite === true
                                ) || {
                                    ...item,
                                    isFavorite: false,
                                }
                            );
                        }
                    });
                    return newPriceData;
                });
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(watchList));
    }, [watchList]);

    function toggleWatchList() {
        setIsWatchList((prev) => !prev);

        console.log("watchlist clicked!");
    }

    function handleClose() {
        setInputData("");
        setIsSearchList(false);
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

        setWatchList((prev) => {
            let newList = [...prev];
            priceData.map((item) => {
                if (item.symbol === id && item.isFavorite === false) {
                    const newItem = {
                        ...item,
                        isFavorite: true,
                    };

                    newList.push(newItem);
                } else if (item.symbol === id) {
                    newList = prev.filter((item) => {
                        return item.symbol !== id;
                    });
                }
            });
            return newList;
        });
    }

    function handleChange(event) {
        const { value } = event.target;
        console.log(value);
        setInputData(value);

        value ? setIsSearchList(true) : setIsSearchList(false);
        setSearchList(() => {
            return priceData.filter((item) => {
                return (
                    item.id.includes(inputData) ||
                    item.symbol.includes(inputData)
                );
            });
        });
    }

    function cardShown() {
        return isSearchList ? searchList : isWatchList ? watchList : priceData;
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

    console.log(watchList);

    console.log(priceData);

    return (
        <div className="app-container bg-slate-400 flex flex-col items-center">
            <Header
                toggleWatchList={toggleWatchList}
                isWatchList={isWatchList}
                handleChange={handleChange}
                inputData={inputData}
                handleClose={handleClose}
            />
            <div className="card-container flex flex-col items-center w-full mt-12 overflow-auto pl-8 pr-10">
                <CardHeader />
                {cardElements}
            </div>
        </div>
    );
}
