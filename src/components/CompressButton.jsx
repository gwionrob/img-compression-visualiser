import React from "react";
import propTypes from "prop-types";
import useIsMobile from "../hooks/useIsMobile";

function CompressButton(props) {
    const { onCompress, algo } = props;
    const isMobile = useIsMobile();

    const onClickHandler = () => {
        onCompress(algo.slice(1));
    };

    const style = {
        height: `${(isMobile ? 50 : 25).toString()}%`,
        width: `${(100).toString()}%`,
    };

    return (
        <button type="button" onClick={onClickHandler} style={style}>
            Compress
        </button>
    );
}

CompressButton.propTypes = {
    onCompress: propTypes.func.isRequired,
    algo: propTypes.string.isRequired,
};

export default CompressButton;
