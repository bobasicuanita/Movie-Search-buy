import { useEffect } from "react";

const useTemporaryPage = (timedPage, dispatch ) => {
    useEffect(() => {
        const timedOutPage = setTimeout(() => dispatch({ type: 'SET_PAGE', payload: timedPage}), 1000);
        return () => clearTimeout(timedOutPage);
    }, [timedPage, dispatch]);
}

export default useTemporaryPage;