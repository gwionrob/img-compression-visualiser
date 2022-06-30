const XByXButton = (props) => {
    const onClickHandler = () => {
        props.xByX(props.x);
    };

    const style = {
        height: (25).toString() + "%",
        width: (100).toString() + "%",
        fontFamily: "'Ubuntu Mono', monospace",
        fontSize: "30px",
        color: "white",
    };

    return (
        <button onClick={onClickHandler} style={style}>
            {props.x} x {props.x}
        </button>
    );
};

export default XByXButton;
