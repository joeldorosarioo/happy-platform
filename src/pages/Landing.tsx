import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../stylesheets/pages/landing.css';
import LogoIcon from '../images/logo.svg';

function Landing () {
	return (
		<div id="page-landing">
			<div className="content-wrapper">
				<img src={ LogoIcon } alt="Happy" className="logo" />

				<main>
					<h1>Leve felicidade para o mundo</h1>
					<p>Visite orfanatos e mude o dia de muitas crianças.</p>
				</main>

				<div className="location">
					<strong>São Paulo</strong>
					<span>Locais Fictícios</span>
				</div>

				<Link to="/map" className="enter-app">
					<FiArrowRight size={ 26 } color="#8D734B" />
				</Link>
			</div>
		</div>
	);
}

export default Landing;
