import React, { useState } from "react";
import propTypes from "prop-types";

function Pixel(props) {
    const { id, innerRef, color } = props;
    const [displayColPick, setDisplayColPick] = useState(false);

    const onClickMethod = () => {
        setDisplayColPick(!displayColPick);
    };

    return (
        <div className="pixel-container" id={id} ref={innerRef}>
            <button
                type="button"
                aria-label="pixel-button"
                className="pixel"
                style={{
                    background: color,
                }}
                onClick={onClickMethod}
            />
        </div>
    );
}

Pixel.propTypes = {
    id: propTypes.number.isRequired,
    innerRef: propTypes.func.isRequired,
    color: propTypes.string.isRequired,
};

export default Pixel;
