import React from "react";
import propTypes from "prop-types";
import useIsMobile from "../hooks/useIsMobile";

function CompressButton(props) {
    const { onClick, title } = props;
    const isMobile = useIsMobile();

    const onClickHandler = () => {
        onClick();
    };

    const style = {
        height: `${(isMobile ? 50 : 25).toString()}%`,
        width: `${(isMobile ? 50 : 100).toString()}%`,
    };

    return (
        <button type="button" onClick={onClickHandler} style={style}>
            {title}
        </button>
    );
}

CompressButton.propTypes = {
    onClick: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
};

export default CompressButton;
