import { useState } from "react";
import Pixel from "./Pixel";

const KMeans = () => {
    const [noOfPixels, setNoOfPixels] = useState(9);

    const xByX = (x) => {
        setNoOfPixels(x * x);
    };

    const pixels = [];

    for (let i = 0; i < noOfPixels; i++) {
        pixels.push(
            <Pixel height={100 / Math.sqrt(noOfPixels)} id={i} key={i} />,
        );
    }

    return (
        <div className="portrait">
            {pixels}
            <button
                onClick={() => {
                    xByX(3);
                }}
                style={{
                    height: (50 / 3).toString() + "%",
                    width: (100 / 3 - 0.2).toString() + "%",
                }}
            >
                3x3
            </button>
            <button
                onClick={() => {
                    xByX(4);
                }}
                style={{
                    height: (50 / 3).toString() + "%",
                    width: (100 / 3 - 0.2).toString() + "%",
                }}
            >
                4x4
            </button>
            <button
                onClick={() => {
                    xByX(5);
                }}
                style={{
                    height: (50 / 3).toString() + "%",
                    width: (100 / 3 - 0.2).toString() + "%",
                }}
            >
                5x5
            </button>
        </div>
    );
};

export default KMeans;
