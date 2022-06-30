const MByNDropdown = () => {
    const containerStyle = {
        height: (25).toString() + "%",
        width: (100).toString() + "%",
    };

    const ddStyle = {
        height: "100%",
        width: "50%",
    };

    return (
        <div className="m-by-n-dd" style={containerStyle}>
            <select style={ddStyle}></select>
            <select style={ddStyle}></select>
        </div>
    );
};

export default MByNDropdown;
