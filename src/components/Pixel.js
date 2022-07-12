import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const Pixel = (props) => {
    const [displayColPick, setDisplayColPick] = useState(false);
    const [color, setColor] = useState("#000000");

    const onClickMethod = () => {
        setDisplayColPick(!displayColPick);
    };

    const onColChangeMethod = (color) => {
        setColor(color);
    };

    const onMouseUpMethodCP = (element) => {
        if (element.target) {
            if (element.target.className.includes("hue")) {
                return;
            }
        }
        setDisplayColPick(false);
    };

    return (
        <div className="pixel-container" id={props.id} ref={props.innerRef}>
            <div
                className="pixel"
                style={{
                    background: color,
                }}
                onClick={onClickMethod}
            ></div>
            {displayColPick ? (
                <HexColorPicker
                    color={color}
                    onChange={onColChangeMethod}
                    onMouseUp={onMouseUpMethodCP}
                />
            ) : null}
        </div>
    );
};

export default Pixel;
