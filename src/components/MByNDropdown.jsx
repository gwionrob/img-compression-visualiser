import React, { useRef } from "react";
import propTypes from "prop-types";
import useIsMobile from "../hooks/useIsMobile";

function MByNDropdown(props) {
    const { mByN, m, n } = props;
    const mSelectRef = useRef(null);
    const nSelectRef = useRef(null);
    const isMobile = useIsMobile();

    const changeHandler = () => {
        const newM = parseInt(mSelectRef.current.value, 10);
        const newN = parseInt(nSelectRef.current.value, 10);
        mByN(newM, newN);
    };

    const containerStyle = {
        height: `${(isMobile ? 50 : 25).toString()}%`,
        width: `${(100).toString()}%`,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const ddStyle = {
        height: `${(100).toString()}%`,
        width: `${(45).toString()}%`,
    };

    const options = [];
    const maxOptions = isMobile ? 10 : 13;
    for (let i = 1; i < maxOptions; i++) {
        options.push(
            <option value={i} key={i}>
                {i}
            </option>,
        );
    }

    return (
        <div className="m-by-n-dd" style={containerStyle}>
            <select
                style={ddStyle}
                ref={mSelectRef}
                value={m}
                onChange={changeHandler}
            >
                {options}
            </select>
            <div className="x">x</div>
            <select
                style={ddStyle}
                ref={nSelectRef}
                value={n}
                onChange={changeHandler}
            >
                {options}
            </select>
        </div>
    );
}

MByNDropdown.propTypes = {
    mByN: propTypes.func.isRequired,
    m: propTypes.number.isRequired,
    n: propTypes.number.isRequired,
};

export default MByNDropdown;
