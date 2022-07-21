import useWindowDimensions from "../hooks/useWindowDimensions";

const XByXButton = (props) => {
    const { height, width } = useWindowDimensions();
    const isMobile = width < 600;

    const onClickHandler = () => {
        props.mByN(props.x, props.x);
    };

    const style = {
        height: (isMobile ? 50 : 25).toString() + "%",
        width: (isMobile ? 100 / 3 : 100).toString() + "%",
    };

    return (
        <button onClick={onClickHandler} style={style}>
            {props.x} x {props.x}
        </button>
    );
};

export default XByXButton;
