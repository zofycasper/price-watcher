import React, { useEffect, useState } from "react";
import url from "./url";
import Header from "./Header";
import CardHeader from "./CardHeader";
import Card from "./Card";
import Footer from "./Footer";
import Loading from "react-loading";

export default function App() {
    const [priceData, setPriceData] = useState([]);
    const [watchList, setWatchList] = useState(
        JSON.parse(localStorage.getItem("watchList")) || []
    );
    const [inputData, setInputData] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [isWatchList, setIsWatchList] = useState(false);
    const [searchList, setSearchList] = useState(priceData);
    const [isSearchList, setIsSearchList] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPriceData(() => {
                    const newPriceData = data.map((item) => {
                        if (watchList.length === 0) {
                            return {
                                ...item,
                                isFavorite: false,
                            };
                        } else {
                            const foundItem = watchList.find(
                                (coin) => coin.id === item.id
                            );
                            return {
                                ...item,
                                isFavorite: foundItem
                                    ? foundItem.isFavorite
                                    : false,
                            };
                        }
                    });
                    return newPriceData;
                });
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(watchList));
    }, [watchList]);

    function toggleWatchList() {
        setIsWatchList((prev) => !prev);
        setWatchList(() => {
            return priceData.filter((item) => {
                if (item.isFavorite) {
                    return item;
                }
            });
        });
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

    return (
        <div className="app-container bg-slate-400 flex flex-col items-center">
            <Header
                toggleWatchList={toggleWatchList}
                isWatchList={isWatchList}
                handleChange={handleChange}
                inputData={inputData}
                handleClose={handleClose}
            />
            <div className="card-container flex flex-col items-center w-full mt-11 overflow-y-scroll pl-8 pr-8">
                <CardHeader />
                {isLoading ? (
                    <div className="py-32">
                        <Loading
                            type={"spin"}
                            color={"#d1d5db"}
                            height={"2rem"}
                            width={"2rem"}
                        />
                    </div>
                ) : (
                    cardElements
                )}
                <Footer />
            </div>
        </div>
    );
}
