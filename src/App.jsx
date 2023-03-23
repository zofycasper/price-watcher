import React, { useEffect, useState } from "react";
import url from "./url";
import Header from "./Header";
import CardHeader from "./CardHeader";
import Card from "./Card";

export default function App() {
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log("data fetched!");
                setPriceData(data);
            });
    }, []);

    const cardElements = priceData.map((item) => {
        return <Card {...item} key={item.symbol} />;
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
