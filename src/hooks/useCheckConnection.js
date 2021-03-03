import { useEffect } from "react";

const useCheckConnection = (dispatch) => {

    const status = window.navigator.onLine;

    useEffect(() => {
        status ? dispatch({ type: 'USER_IS_ONLINE'}) : dispatch({ type: 'USER_IS_OFFLINE'});
    }, [status, dispatch])
}

export default useCheckConnection;