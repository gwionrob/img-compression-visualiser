import React, { useState } from "react";
import propTypes from "prop-types";

function Pixel(props) {
    const { id, innerRef, color, style } = props;
    const [displayColPick, setDisplayColPick] = useState(false);

    const onClickMethod = () => {
        setDisplayColPick(!displayColPick);
    };

    return (
        <div className="pixel-container" id={id} ref={innerRef} style={style}>
            <button
                type="button"
                aria-label="pixel-button"
                className="pixel"
                style={{
                    background: `rgb(${color.r}, ${color.g}, ${color.b})`,
                }}
                onClick={onClickMethod}
            />
        </div>
    );
}

Pixel.propTypes = {
    id: propTypes.number.isRequired,
    innerRef: propTypes.func.isRequired,
    color: propTypes.shape({
        r: propTypes.number,
        g: propTypes.number,
        b: propTypes.number,
    }).isRequired,
    style: propTypes.shape({
        height: propTypes.string,
        width: propTypes.string,
    }).isRequired,
};

export default Pixel;
