import React, { useEffect } from "react";
import url from "./url";
import Header from "./Header";
import CardHeader from "./CardHeader";

export default function App() {
    // useEffect(() => {
    //     fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => console.log(data));
    // }, []);

    return (
        <div className="app-container bg-slate-400 flex flex-col items-center">
            <Header />
            <CardHeader />
        </div>
    );
}
