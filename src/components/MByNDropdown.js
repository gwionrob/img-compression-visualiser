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

    const options = [];
    const maxOptions = isMobile ? 10 : 13;
    for (let i = 1; i < maxOptions; i++) {
        options.push(
            <option value={i} key={i}>
                {i}
            </option>
        );
    }

    return (
        <div className="m-by-n-dd" style={containerStyle}>
            <select
                style={ddStyle}
                ref={mSelectRef}
                value={props.m}
                onChange={changeHandler}
            >
                {options}
            </select>
            <div className="x">x</div>
            <select
                style={ddStyle}
                ref={nSelectRef}
                value={props.n}
                onChange={changeHandler}
            >
                {options}
            </select>
        </div>
    );
};

export default MByNDropdown;
