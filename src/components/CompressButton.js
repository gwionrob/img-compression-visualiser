import useWindowDimensions from "../hooks/useWindowDimensions";

const CompressButton = (props) => {
    const { height, width } = useWindowDimensions();
    const isMobile = width < 600;

    const onClickHandler = () => {
        props.onCompress(props.algo.slice(1));
    };

    const style = {
        height: (isMobile ? 50 : 25).toString() + "%",
        width: (100).toString() + "%",
    };

    return (
        <button onClick={onClickHandler} style={style}>
            Compress
        </button>
    );
};

export default CompressButton;
