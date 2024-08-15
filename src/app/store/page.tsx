import Image from "next/image";
import StoreComponent from "../../../components/StoreComponent/StoreComponent";

export default function store() {
    return (
        <div className="flex h-screen items-center justify-center">
            <StoreComponent />
        </div>
    );
}