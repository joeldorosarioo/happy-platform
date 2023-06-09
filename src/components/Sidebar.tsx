import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import mapMarkerImg from '../images/map-marker.svg';

import '../stylesheets/components/sidebar.css';

export default function Sidebar () {
	const navigate = useNavigate();

	return (
		<aside className="app-sidebar">
			<img src={ mapMarkerImg } alt="Happy" />

			<footer>
				<button type="button" onClick={ () => navigate(-1) }>
					<FiArrowLeft size={ 24 } color="#FFFFFF" />
				</button>
			</footer>
		</aside>
	);
}
