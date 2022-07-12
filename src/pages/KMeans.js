import { useState, useRef, useEffect } from "react";
import MByNDropdown from "../components/MByNDropdown";
import Pixel from "../components/Pixel";
import XByXButton from "../components/XByXButton";
import DragSelect from "dragselect";
import { useLocation } from "react-router-dom";

const KMeans = () => {
    const [columns, setNoOfColumns] = useState(3);
    const [rows, setNoOfRows] = useState(3);
    const [selectedPixels, setSelectedPixels] = useState([]);
    const pixelRefs = useRef([]);
    const targetRef = useRef(null);

    useEffect(() => {
        const dragSelect = new DragSelect({
            selectables: pixelRefs.current.filter((el) => {
                return el !== null;
            }),
            area: targetRef.current,
            draggability: false,
            customStyles: true,
        });
        dragSelect.subscribe("callback", (e) => {
            if (e.items.length) {
                setSelectedPixels(e.items.map((el) => el.id));
            }
            console.log(e.items.map((el) => el.id));
        });
        return () => {
            dragSelect.stop();
        };
    }, [pixelRefs, targetRef, columns, rows]);

    const mByN = (m, n) => {
        setNoOfColumns(m);
        setNoOfRows(n);
    };

    const pixels = [];

    for (let i = 0; i < columns * rows; i++) {
        pixels.push(
            <Pixel
                id={i}
                key={i}
                innerRef={(el) => (pixelRefs.current[i] = el)}
            />,
        );
    }

    const gridTempCol = Array(columns).fill("1fr").join(" ");
    const gridTempRow = Array(rows).fill("1fr").join(" ");

    const colVsRow = columns > rows;

    const portraitStyle = {
        display: "grid",
        gridTemplateColumns: gridTempCol,
        gridTemplateRows: gridTempRow,
        height: "50vw",
        width: "50vw",
        maxHeight: colVsRow
            ? (80 * (rows / columns)).toString() + "vh"
            : "80vh",
        maxWidth: colVsRow ? "80vh" : (80 * (columns / rows)).toString() + "vh",
    };

    return (
        <div className="k-means">
            <div className="info"></div>
            <div className="portrait" style={portraitStyle} ref={targetRef}>
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
