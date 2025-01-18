import { useEffect } from 'react';

const usePreventTelegramCollapse = () => {
    useEffect(() => {
        const preventDefault = (e) => e.preventDefault();

        document.addEventListener("touchmove", preventDefault, {passive: false});

        return () => {
            document.removeEventListener("touchmove", preventDefault);
        }
    },[])
};

export default usePreventTelegramCollapse;