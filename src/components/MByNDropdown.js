import { useRef } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

const MByNDropdown = (props) => {
    const mSelectRef = useRef(null);
    const nSelectRef = useRef(null);
    const { height, width } = useWindowDimensions();
    const isMobile = width < 600;

    const changeHandler = () => {
        const newM = parseInt(mSelectRef.current.value);
        const newN = parseInt(nSelectRef.current.value);
        props.mByN(newM, newN);
    };

    const containerStyle = {
        height: (isMobile ? 50 : 25).toString() + "%",
        width: (100).toString() + "%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const ddStyle = {
        height: (100).toString() + "%",
        width: (45).toString() + "%",
    };

    return (
        <div className="m-by-n-dd" style={containerStyle}>
            <select
                style={ddStyle}
                ref={mSelectRef}
                value={props.m}
                onChange={changeHandler}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
            </select>
            <div className="x">x</div>
            <select
                style={ddStyle}
                ref={nSelectRef}
                value={props.n}
                onChange={changeHandler}
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
            </select>
        </div>
    );
};

export default MByNDropdown;
