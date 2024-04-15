import { useEffect } from 'react';
import MoviesCarousel from '../components/Movies/MovieCarousel';
import { useAppContext } from '../app/context/AppContext';
import { getMockMovies } from '../utils';

const HomeScreen = () => {
	const movies = getMockMovies(12);
	const { appState, getTopN } = useAppContext();
	
	useEffect(() => {
		if (appState.user && !appState.movies && !appState.error) {
			getTopN();
		}
	}, [appState.user, appState.movies, getTopN, appState.error]);
	
	return (
		<>
			{appState.movies && (
				<MoviesCarousel header="Recommended for you" movies={appState.movies} />
				)}
			<MoviesCarousel header="New and Trending" movies={movies} />
			<MoviesCarousel header="Because you watched..." movies={movies} />
			<MoviesCarousel header="Action" movies={movies} />
		</>
	);
};

export default HomeScreen;
