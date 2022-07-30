import React, { useState, useRef, useEffect } from "react";
import DragSelect from "dragselect";
import { RgbColorPicker } from "react-colorful";
import { useParams, useNavigate } from "react-router-dom";
import CompressButton from "../components/CompressButton";
import MByNDropdown from "../components/MByNDropdown";
import Pixel from "../components/Pixel";
import XByXButton from "../components/XByXButton";
import kMeans from "../utilities/kmeans";
import useIsMobile from "../hooks/useIsMobile";

function Visualiser() {
    const [k, setK] = useState(3);
    const [columns, setNoOfColumns] = useState(3);
    const [rows, setNoOfRows] = useState(3);
    const [colors, setColors] = useState(
        Array(rows * columns).fill({ r: 0, g: 0, b: 0 }),
    );
    const [displayColPick, setDisplayColPick] = useState(false);
    const [selectedPixels, setSelectedPixels] = useState([]);
    const compSelectRef = useRef(null);
    const isMobile = useIsMobile();
    const colVRow = columns >= rows;
    const pixelDimensions = `calc((${isMobile ? "95vw" : "55vw"} / ${(colVRow
        ? columns
        : rows
    ).toString()}) - 6px)`;
    const navigate = useNavigate();
    const params = useParams();
    const [algo, setAlgo] = useState(params.algo);
    const pixelRefs = useRef([]);
    const targetRef = useRef(null);

    useEffect(() => {
        setAlgo(params.algo);
    }, [params.algo]);

    useEffect(() => {
        if (displayColPick || document.querySelector(".ds-selector-area")) {
            return;
        }

        const dragSelect = new DragSelect({
            selectables: pixelRefs.current.filter((el) => el !== null),
            area: targetRef.current,
            draggability: false,
            customStyles: true,
        });

        dragSelect.subscribe("callback", (e) => {
            if (e.items.length) {
                setSelectedPixels(e.items);
                e.items.forEach((el) => {
                    el.classList.add("selected");
                });
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
                colors.concat(
                    Array(m * n - colors.length).fill({ r: 0, g: 0, b: 0 }),
                ),
            );
        } else {
            setColors(colors.slice(0, m * n));
        }
    };

    const onColChangeMethod = (color) => {
        const colorsCopy = [...colors];
        selectedPixels.forEach((el) => {
            colorsCopy[el.id] = color;
        });
        setColors(colorsCopy);
    };

    const onColMouseUpMethod = (element) => {
        if (element.target) {
            if (element.target.className.includes("hue")) {
                return;
            }
        }
        selectedPixels.forEach((el) => {
            el.classList.remove("selected");
        });
        setDisplayColPick(false);
    };

    const onCompSelect = () => {
        setAlgo(compSelectRef.current.value);
        navigate(`../${compSelectRef.current.value}`, {
            replace: true,
        });
    };

    const onCompress = () => {
        const algorithm = algo.slice(1);
        const colArray = colors.map((col) => Object.values(col));
        if (algorithm === "k-means") {
            setColors(kMeans(colArray, k));
        }
    };

    const onRandomize = () => {
        const randCol = [];
        const noOfCols = rows * columns;
        for (let i = 0; i < noOfCols; i++) {
            randCol.push({
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
            });
        }
        setColors(randCol);
    };

    const pixelStyle = {
        height: pixelDimensions,
        width: pixelDimensions,
        maxHeight: `calc(${isMobile ? "95vw" : "90vh"} / ${Math.max(
            rows,
            columns,
        )} - 6px)`,
        maxWidth: `calc(${isMobile ? "95vw" : "90vh"} / ${Math.max(
            rows,
            columns,
        )} - 6px)`,
    };

    const portraitStyle = {
        width: colVRow
            ? `${isMobile ? "95vw" : "55vw"}`
            : `calc(${isMobile ? "95vw" : "55vw"} - (${rows - columns} * ${
                  isMobile ? "95vw" : "55vw"
              } / ${rows}))`,
        maxWidth: isMobile ? "95vw" : "90vh",
        maxHeight: isMobile ? "95vw" : "90vh",
    };

    const pixels = [];
    for (let i = 0; i < columns * rows; i++) {
        pixels.push(
            <Pixel
                id={i}
                key={i}
                innerRef={(el) => {
                    pixelRefs.current[i] = el;
                }}
                color={colors[i]}
                style={pixelStyle}
            />,
        );
    }

    const optionsK = [];
    for (let i = 1; i < Math.min(17, columns * rows); i++) {
        optionsK.push(
            <option value={i} key={i}>
                {i}
            </option>,
        );
    }

    const selectStyle = {
        height: `${(isMobile ? 50 : 25).toString()}%`,
        width: `${(isMobile ? 50 : 100).toString()}%`,
    };

    return (
        <div className="visualiser">
            <div className="compression">
                <select
                    ref={compSelectRef}
                    onChange={onCompSelect}
                    value={algo}
                    style={selectStyle}
                >
                    <option value=":k-means">K-Means</option>
                    <option value=":discrete-cosine-transform">
                        Discrete Cosine Transform
                    </option>
                    <option value=":fractal-compression">
                        Fractal Compression
                    </option>
                </select>
                {algo.slice(1) === "k-means" ? (
                    <div className="k-input-wrapper">
                        <div className="k-title">K:</div>
                        <select
                            value={k}
                            onChange={(e) => setK(parseInt(e.target.value, 10))}
                        >
                            {optionsK}
                        </select>
                    </div>
                ) : null}
                <CompressButton onClick={onCompress} title="Compress" />
                <CompressButton onClick={onRandomize} title="Random Colors" />
            </div>
            <div className="portrait" ref={targetRef} style={portraitStyle}>
                {pixels}
                {displayColPick ? (
                    <RgbColorPicker
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
}

export default Visualiser;
