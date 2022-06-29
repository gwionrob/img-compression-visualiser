import { useState } from "react";
import Pixel from "../components/Pixel";
import XByXButton from "../components/XByXButton";

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
            <XByXButton x={3} xByX={xByX} />
            <XByXButton x={4} xByX={xByX} />
            <XByXButton x={5} xByX={xByX} />
        </div>
    );
};

export default KMeans;
