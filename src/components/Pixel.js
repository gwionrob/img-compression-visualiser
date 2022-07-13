import { useState } from "react";

const Pixel = (props) => {
    const [displayColPick, setDisplayColPick] = useState(false);

    const onClickMethod = () => {
        setDisplayColPick(!displayColPick);
    };

    return (
        <div className="pixel-container" id={props.id} ref={props.innerRef}>
            <div
                className="pixel"
                style={{
                    background: props.color,
                }}
                onClick={onClickMethod}
            ></div>
        </div>
    );
};

export default Pixel;
