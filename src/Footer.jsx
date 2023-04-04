import React from "react";

export default function Footer() {
    function handleGithub() {
        event.preventDefault();
        chrome.tabs.create({
            url: "https://github.com/zofycasper/price-watcher",
        });
    }

    function handleProfile() {
        event.preventDefault();
        chrome.tabs.create({
            url: "https://zofycasper.com/",
        });
    }

    return (
        <div className="flex flex-col gap-2 justify-center items-center w-full py-4">
            <a
                href="https://github.com/zofycasper/price-watcher"
                className="text-gray-300"
                onClick={handleGithub}
            >
                <img
                    className="w-4 fill-current"
                    src="./image/github.png"
                    alt="github icon"
                />
            </a>
            <p className="text-xs text-gray-300 italic">Built by Casper</p>
            <a
                href="https://zofycasper.com/"
                className="text-xs text-gray-300 italic tracking-wider"
                onClick={handleProfile}
            >
                www.zofycasper.com
            </a>
        </div>
    );
}
