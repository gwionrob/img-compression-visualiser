import { useState, useEffect } from "react";

function getWindowWidth() {
    const { innerWidth: width } = window;
    return width;
}

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(getWindowWidth() < 600);

    useEffect(() => {
        function handleResize() {
            setIsMobile(getWindowWidth() < 600);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
}
