import React from "react";
import propTypes from "prop-types";
import useIsMobile from "../hooks/useIsMobile";

function XByXButton(props) {
    const { mByN, x } = props;
    const isMobile = useIsMobile();

    const onClickHandler = () => {
        mByN(x, x);
    };

    const style = {
        height: `${(isMobile ? 50 : 25).toString()}%`,
        width: `${(isMobile ? 100 / 3 : 100).toString()}%`,
    };

    return (
        <button type="button" onClick={onClickHandler} style={style}>
            {`${x} `}x{` ${x}`}
        </button>
    );
}

XByXButton.propTypes = {
    mByN: propTypes.func.isRequired,
    x: propTypes.number.isRequired,
};

export default XByXButton;
