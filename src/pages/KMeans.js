import { useState, useRef, useEffect } from "react";
import MByNDropdown from "../components/MByNDropdown";
import Pixel from "../components/Pixel";
import XByXButton from "../components/XByXButton";
import DragSelect from "dragselect";
import { HexColorPicker } from "react-colorful";
import useWindowDimensions from "../hooks/useWindowDimensions";

const KMeans = () => {
    const [columns, setNoOfColumns] = useState(3);
    const [rows, setNoOfRows] = useState(3);
    const [colors, setColors] = useState(Array(rows * columns).fill("#000000"));
    const [displayColPick, setDisplayColPick] = useState(false);
    const [selectedPixels, setSelectedPixels] = useState([]);
    const { height, width } = useWindowDimensions();
    const isMobile = width < 600;
    const pixelRefs = useRef([]);
    const targetRef = useRef(null);

    useEffect(() => {
        if (displayColPick) {
            return;
        }
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
                setSelectedPixels(e.items);
                for (const el of e.items) {
                    el.classList.add("selected");
                }
                setDisplayColPick(true);
                dragSelect.stop();
            }
        });
    }, [pixelRefs, targetRef, columns, rows, displayColPick]);

    const mByN = (m, n) => {
        if (m === columns && n === rows) {
            return;
        }
        document.querySelector(".ds-selector-area").remove();
        setNoOfColumns(m);
        setNoOfRows(n);
        if (m * n >= colors.length) {
            setColors(
                colors.concat(Array(m * n - colors.length).fill("#000000")),
            );
        } else {
            setColors(colors.slice(0, m * n));
        }
    };

    const onColChangeMethod = (color) => {
        let colorsCopy = [...colors];
        for (const el of selectedPixels) {
            colorsCopy[el.id] = color;
        }
        setColors(colorsCopy);
    };

    const onColMouseUpMethod = (element) => {
        if (element.target) {
            if (element.target.className.includes("hue")) {
                return;
            }
        }
        for (const el of selectedPixels) {
            el.classList.remove("selected");
        }
        setDisplayColPick(false);
    };

    const pixels = [];

    for (let i = 0; i < columns * rows; i++) {
        pixels.push(
            <Pixel
                id={i}
                key={i}
                innerRef={(el) => (pixelRefs.current[i] = el)}
                color={colors[i]}
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
        height: isMobile ? "95vw" : "50vw",
        width: isMobile ? "95vw" : "50vw",
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
                {displayColPick ? (
                    <HexColorPicker
                        onChange={onColChangeMethod}
                        onMouseUp={onColMouseUpMethod}
                        onTouchEnd={onColMouseUpMethod}
                    />
                ) : null}
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
