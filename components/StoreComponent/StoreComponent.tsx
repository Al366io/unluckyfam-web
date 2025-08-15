"use client";
import React, { useState, useEffect } from "react";
import StoreComponentStyles from "./StoreComponent.module.css";
import ImgGallery from "./ImageGallery";

export default function StoreComponent(): React.JSX.Element {

    return (
        <div className={StoreComponentStyles.wrapper}>

            <div className={StoreComponentStyles.ImgGallery}>
                <ImgGallery />
            </div>            

            <div className={StoreComponentStyles.description}>
                <h1 className={StoreComponentStyles.title}>UnluckyFam Foam Logo T-Shirt</h1>
                <p className={StoreComponentStyles.text}>
                    This is the official UnluckyFam Foam Logo T-Shirt. Made with high-quality materials, this t-shirt features a unique foam logo design that stands out.
                </p>
                <hr style={{ margin: "20px"}} />
                <ul style={{ listStyle: "disc", paddingLeft: "20px", marginTop: "10px", marginBottom: "10px" }}>
                    <li>100% Cotton</li>
                    <li> 3D foam logo </li>
                    <li> Printed secondary logo and QR code </li>
                    <li> Embroidered Unlucky label</li>
                    <li>Machine washable</li>
                    <li>Unisex design</li>
                </ul>

                <hr style={{ margin: "20px"}} />

                {/* size choose */}

                <div className={StoreComponentStyles.priceBox}>
                    <span className={StoreComponentStyles.price}> €29,90 </span>
                    <button className={StoreComponentStyles.buyNow} disabled> Coming Soon... </button>
                </div>
            </div>
        </div>
    );
}
