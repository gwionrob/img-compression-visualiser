const XByXButton = (props) => {
    const onClickHandler = () => {
        props.xByX(props.x);
    };

    const style = {
        height: (50 / 3).toString() + "%",
        width: (100 / 3 - 0.2).toString() + "%",
    };

    return (
        <button onClick={onClickHandler} style={style}>
            {props.x} x {props.x}
        </button>
    );
};

export default XByXButton;
