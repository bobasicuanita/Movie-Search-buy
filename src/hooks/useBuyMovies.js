import {useEffect} from "react";

const useBuyMovies = (query, isBuyButtonClicked, cart, dispatch) => {
    useEffect(() => {
        const buyMovies = async () => {
            if (isBuyButtonClicked === false) return;
            try {
                dispatch({type: 'PURCHASE_STARTED'})

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'X-Mocklets-PublicKey': 'txmovies',
                        'X-Mocklets-Checksum': '830c7cd4a70be6540a4898441ca02951'
                    },
                    body: JSON.stringify({cart: cart})
                };

                const response = await fetch('https://api.mocklets.com/mock68075/', requestOptions).then(res => res.json());

                response.success ? dispatch({type: 'SUCCESSFUL_PURCHASE'}) : dispatch({type: 'FAILURE_PURCHASE'})

                dispatch({type: 'PURCHASE_FINISHED'})
            } catch (err) {
                console.log(err)
                return err;
            }
        }

        buyMovies();
    }, [isBuyButtonClicked, cart, dispatch]);
}

export default useBuyMovies;