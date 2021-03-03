import {useEffect} from "react";

const useGetMovies = (query, currentPage, dispatch) => {
    useEffect(() => {
        const getMovies = async () => {
            if (query === '') return;
            try {
                dispatch({type: 'SEARCHING_STARTED'})
                const movies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=73af5ff64b88abf0ae31c59e2c4b3f18&query=${query}&page=${currentPage}`).then(res => res.json());

                dispatch({type: 'SEARCHING_FINISHED'})
                dispatch({type: 'SEARCH_MOVIES', payload: movies})

            } catch (err) {
                console.log(err)
                return err;
            }
        }

        getMovies();

    }, [query, dispatch, currentPage]);
}

export default useGetMovies;