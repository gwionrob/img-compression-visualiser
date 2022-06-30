import { useState } from "react";
import MByNDropdown from "../components/MByNDropdown";
import Pixel from "../components/Pixel";
import XByXButton from "../components/XByXButton";

const KMeans = () => {
    const [columns, setNoOfColumns] = useState(3);
    const [rows, setNoOfRows] = useState(3);

    const mByN = (m, n) => {
        setNoOfColumns(m);
        setNoOfRows(n);
    };

    const pixels = [];

    for (let i = 0; i < columns * rows; i++) {
        pixels.push(<Pixel id={i} key={i} />);
    }

    const gridTempCol = Array(columns).fill("1fr").join(" ");
    const gridTempRow = Array(rows).fill("1fr").join(" ");

    const colVRow = columns > rows;

    const portraitStyle = {
        display: "grid",
        gridTemplateColumns: gridTempCol,
        gridTemplateRows: gridTempRow,
        height: "50vw",
        width: "50vw",
        maxHeight: colVRow ? (80 * (rows / columns)).toString() + "vh" : "80vh",
        maxWidth: colVRow ? "80vh" : (80 * (columns / rows)).toString() + "vh",
    };

    return (
        <div className="k-means">
            <div className="info"></div>
            <div className="portrait" style={portraitStyle}>
                {pixels}
            </div>
            <div className="dropdown">
                <XByXButton x={3} mByN={mByN} />
                <XByXButton x={5} mByN={mByN} />
                <XByXButton x={7} mByN={mByN} />
                <MByNDropdown m={columns} n={rows} mByN={mByN} />
            </div>
        </div>
    );
};

export default KMeans;
