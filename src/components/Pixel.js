import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const Pixel = () => {
    const [displayColPick, setDisplayColPick] = useState(false);
    const [color, setColor] = useState("#000000");

    const onClickMethod = () => {
        setDisplayColPick(!displayColPick);
    };

    const onColChangeMethod = (color) => {
        setColor(color);
    };
    const onMUMethod = (element) => {
        if (element.target) {
            if (element.target.className.includes("hue")) {
                return;
            }
        }
        setDisplayColPick(false);
    };
    return (
        <div className="pixel-container">
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
                    onMouseUp={onMUMethod}
                />
            ) : null}
        </div>
    );
};

export default Pixel;
