"use client";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import StoreComponentStyles from "./StoreComponent.module.css";
import tshirt1 from "../../public/UnluckyFam/t-shirt1.jpg";
import tshirt2 from "../../public/UnluckyFam/t-shirt2.jpg";
import tshirt3 from "../../public/UnluckyFam/t-shirt3.jpg";
import tshirt4 from "../../public/UnluckyFam/t-shirt4.jpg";

export default function ImgGallery() {
    const images = [
        { original: tshirt1.src, thumbnail: tshirt1.src },
        { original: tshirt2.src, thumbnail: tshirt2.src },
        { original: tshirt3.src, thumbnail: tshirt3.src },
        { original: tshirt4.src, thumbnail: tshirt4.src },
    ];

    return (
        <ImageGallery items={images} showPlayButton={false} />
    );
}