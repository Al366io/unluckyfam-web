"use client";
import React, { useState, useEffect } from "react";
import StoreComponentStyles from "./StoreComponent.module.css";
import Image from "next/image";
import F from "../../public/F.jpg";
import A from "../../public/A.jpg";
import M from "../../public/M.jpg";

export default function StoreComponent(): React.JSX.Element {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [F, A, M];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className={StoreComponentStyles.wrapper}>
            <div className={StoreComponentStyles.imagesWrapper}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        className={`${StoreComponentStyles.imageContainer} ${
                            index === currentImageIndex ? StoreComponentStyles.active : ""
                        }`}
                        src={image}
                        alt={`Image ${index + 1}`}
                    />
                ))}
            </div>
            <div className={StoreComponentStyles.textWrapper}>
                <h1 className={StoreComponentStyles.title}> € ??.?? </h1>
                <p className={StoreComponentStyles.description}>
                    {" "}
                    Coming Soon...{" "}
                </p>
            </div>
        </div>
    );
}
