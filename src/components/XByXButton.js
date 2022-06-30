const XByXButton = (props) => {
    const onClickHandler = () => {
        props.mByN(props.x, props.x);
    };

    const style = {
        height: (25).toString() + "%",
        width: (100).toString() + "%",
    };

    return (
        <button onClick={onClickHandler} style={style}>
            {props.x} x {props.x}
        </button>
    );
};

export default XByXButton;
