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

type RGB = { r: number; g: number; b: number };

function Visualiser(): JSX.Element {
    const [k, setK] = useState<number>(3);
    const [columns, setNoOfColumns] = useState<number>(3);
    const [rows, setNoOfRows] = useState<number>(3);
    const [colors, setColors] = useState<Array<RGB>>(
        Array(rows * columns).fill({ r: 0, g: 0, b: 0 }),
    );
    const [displayColPick, setDisplayColPick] = useState<boolean>(false);
    const [selectedPixels, setSelectedPixels] = useState<Array<HTMLDivElement>>(
        [],
    );
    const compSelectRef = useRef<HTMLSelectElement>(null);
    const isMobile: boolean = useIsMobile();
    const colVRow: boolean = columns >= rows;
    const pixelDimensions: string = `calc((${
        isMobile ? "95vw" : "55vw"
    } / ${(colVRow ? columns : rows).toString()}) - 6px)`;
    const pixelRefs = useRef<Array<HTMLDivElement>>([]);
    const targetRef = useRef<HTMLDivElement>(null);
    const params = useParams<string>();
    const [algo, setAlgo] = useState<string | undefined>(params.algo);
    const navigate = useNavigate();

    useEffect(() => {
        setAlgo(params.algo);
    }, [params.algo]);

    useEffect(() => {
        if (displayColPick || document.querySelector(".ds-selector-area")) {
            return;
        }

        if (targetRef.current !== null) {
            const dragSelect = new DragSelect({
                selectables: pixelRefs.current.filter((el) => el !== null),
                area: targetRef.current,
                draggability: false,
                customStyles: true,
            });
            dragSelect.subscribe("callback", (e: CallbackObject) => {
                if (e.items !== undefined) {
                    setSelectedPixels(e.items);
                    e.items.forEach((el) => {
                        el.classList.add("selected");
                    });
                    setDisplayColPick(true);
                    dragSelect.stop();
                }
            });
        }
    }, [pixelRefs, targetRef, rows, columns, displayColPick]);

    const mByN = (m: number, n: number) => {
        if (m === rows && n === columns) {
            return;
        }
        document.querySelector(".ds-selector-area")!.remove();
        setNoOfRows(m);
        setNoOfColumns(n);
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

    const onColChangeMethod = (color: RGB) => {
        const colorsCopy = [...colors];
        selectedPixels.forEach((el) => {
            colorsCopy[parseInt(el.id, 10)] = color;
        });
        setColors(colorsCopy);
    };

    const onColMouseUpMethod = (event: React.MouseEvent) => {
        event.preventDefault();
        if (event.target instanceof Element) {
            if (event.target.className.includes("hue")) {
                return;
            }
        }
        selectedPixels.forEach((el) => {
            el.classList.remove("selected");
        });
        setDisplayColPick(false);
    };

    const onTouchEndMethod = (event: React.TouchEvent) => {
        event.preventDefault();
        if (event.target instanceof Element) {
            if (event.target.className.includes("hue")) {
                return;
            }
        }
        selectedPixels.forEach((el) => {
            el.classList.remove("selected");
        });
        setDisplayColPick(false);
    };

    const onCompSelect = () => {
        setAlgo(compSelectRef.current!.value);
        navigate(`../${compSelectRef.current!.value}`, {
            replace: true,
        });
    };

    const onCompress = () => {
        if (algo === undefined) {
            return;
        }
        const algorithm: string = algo.slice(1);
        const colArray: Array<Array<number>> = colors.map((col) =>
            Object.values(col),
        );
        if (algorithm === "k-means") {
            setColors(kMeans(colArray, k));
        }
    };

    const onRandomize = () => {
        const randCol: Array<RGB> = [];
        const noOfCols: number = rows * columns;
        for (let i = 0; i < noOfCols; i++) {
            randCol.push({
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
            });
        }
        setColors(randCol);
    };

    const pixelStyle: React.CSSProperties = {
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

    const portraitStyle: React.CSSProperties = {
        width: colVRow
            ? `${isMobile ? "95vw" : "55vw"}`
            : `calc(${isMobile ? "95vw" : "55vw"} - (${rows - columns} * ${
                  isMobile ? "95vw" : "55vw"
              } / ${rows}))`,
        maxWidth: isMobile ? "95vw" : "90vh",
        maxHeight: isMobile ? "95vw" : "90vh",
    };

    const pixels: Array<JSX.Element> = [];
    for (let i = 0; i < columns * rows; i++) {
        pixels.push(
            <Pixel
                id={i.toString()}
                key={i}
                innerRef={(el: HTMLDivElement) => {
                    pixelRefs.current[i] = el;
                }}
                color={colors[i]}
                style={pixelStyle}
            />,
        );
    }

    const optionsK: Array<JSX.Element> = [];
    for (let i = 1; i < Math.min(17, columns * rows); i++) {
        optionsK.push(
            <option value={i} key={i}>
                {i}
            </option>,
        );
    }

    const selectStyle: React.CSSProperties = {
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
                {algo!.slice(1) === "k-means" ? (
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
                        onTouchEnd={onTouchEndMethod}
                    />
                ) : null}
            </div>
            <div className="dropdown">
                <XByXButton x={3} mByN={mByN} />
                <XByXButton x={5} mByN={mByN} />
                <XByXButton x={7} mByN={mByN} />
                <MByNDropdown m={rows} n={columns} mByN={mByN} />
            </div>
        </div>
    );
}

export default Visualiser;
