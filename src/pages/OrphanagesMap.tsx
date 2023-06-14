import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiPlus, FiArrowRight } from 'react-icons/fi';

import '../stylesheets/pages/orphanages-map.css';

import api from '../services/api';
import { IOrphanageProps } from '../interfaces/IOrphanageProps';

import happyMapIcon from '../helpers/happyMapIcon';
import MapMarkerIcon from '../images/map-marker.svg';

function OrphanagesMap () {
	const [orphanages, setOrphanages] = useState<IOrphanageProps[]>([]);

	useEffect(() => {
		api.get('orphanages').then(response => {
			setOrphanages(response.data);
		});
	}, []);

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={ MapMarkerIcon } alt="Happy" className="logo" />

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>São Paulo</strong>
					<span>Locais Fictícios</span>
				</footer>
			</aside>

			<MapContainer
				center={ [-23.5576073, -46.6461921] }
				zoom={ 13 }
				style={{ width: '100%', height: '100%' }}
			>
				<TileLayer
					url={
						'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=' +
						process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
					}
				/>

				{ orphanages.map(orphanage => {
					return (
						<Marker
							key={ orphanage.id }
							icon={ happyMapIcon }
							position={ [orphanage.latitude, orphanage.longitude] }
						>
							<Popup className="map-popup" closeButton={ false } minWidth={ 240 } maxWidth={ 240 }>
								{ orphanage.name }
								<Link to={ `/orphanages/${ orphanage.id }` }>
									<FiArrowRight size={ 20 } color="#FFFFFF" />
								</Link>
							</Popup>
						</Marker>
					)
				}) }
			</MapContainer>

			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size={ 32 } color="#FFFFFF" />
			</Link>
		</div>
	);
}

export default OrphanagesMap;
