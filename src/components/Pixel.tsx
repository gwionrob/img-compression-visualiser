import React, { LegacyRef, useState } from "react";

type RGB = { r: number; g: number; b: number };
type Props = {
    id: string;
    innerRef: LegacyRef<HTMLDivElement>;
    color: RGB;
    style: React.CSSProperties;
};

function Pixel({ id, innerRef, color, style }: Props) {
    const [displayColPick, setDisplayColPick] = useState<boolean>(false);

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

export default Pixel;
