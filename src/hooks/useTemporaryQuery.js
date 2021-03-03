import { useEffect } from "react";

const useTemporaryQuery = (timedQuery, dispatch ) => {
    useEffect(() => {
        const timedOutQuery = setTimeout(() => dispatch({ type: 'SET_QUERY', payload: timedQuery}), 1000);
        return () => clearTimeout(timedOutQuery);
    }, [timedQuery, dispatch]);
}

export default useTemporaryQuery;