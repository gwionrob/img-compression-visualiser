import React from "react";
import useIsMobile from "../hooks/useIsMobile";

type Props = {
    mByN: Function;
    x: number;
};

function XByXButton({ mByN, x }: Props) {
    const isMobile: boolean = useIsMobile();

    const onClickHandler = () => {
        mByN(x, x);
    };

    const style: React.CSSProperties = {
        height: `${(isMobile ? 50 : 25).toString()}%`,
        width: `${(isMobile ? 100 / 3 : 100).toString()}%`,
    };

    return (
        <button type="button" onClick={onClickHandler} style={style}>
            {`${x} `}x{` ${x}`}
        </button>
    );
}

export default XByXButton;
