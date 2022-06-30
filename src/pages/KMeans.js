import { useState } from "react";
import MByNDropdown from "../components/MByNDropdown";
import Pixel from "../components/Pixel";
import XByXButton from "../components/XByXButton";

const KMeans = () => {
    const [noOfPixels, setNoOfPixels] = useState(9);

    const xByX = (x) => {
        setNoOfPixels(x * x);
    };

    const pixels = [];

    for (let i = 0; i < noOfPixels; i++) {
        pixels.push(<Pixel id={i} key={i} />);
    }

    const gridTempCol = Array(Math.sqrt(noOfPixels)).fill("1fr").join(" ");

    const portraitStyle = {
        display: "grid",
        gridTemplateColumns: gridTempCol,
        height: "50vw",
        width: "50vw",
        maxHeight: "80vh",
        maxWidth: "80vh",
    };

    return (
        <div className="k-means">
            <div className="info"></div>
            <div className="portrait" style={portraitStyle}>
                {pixels}
            </div>
            <div className="dropdown">
                <XByXButton x={3} xByX={xByX} />
                <XByXButton x={5} xByX={xByX} />
                <XByXButton x={7} xByX={xByX} />
                <MByNDropdown />
            </div>
        </div>
    );
};

export default KMeans;
