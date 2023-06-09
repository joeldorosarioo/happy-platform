import { FormEvent, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeafletMouseEvent } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import '../stylesheets/pages/create-orphanage.css';

import api from '../services/api';
import happyMapIcon from '../helpers/happyMapIcon';
import Sidebar from '../components/Sidebar';

export default function CreateOrphanage () {
	const navigate = useNavigate();

	const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	const [instructions, setInstructions] = useState('');
	const [opening_hours, setOpeningHours] = useState('');
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [images, setImages] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	function handleMapClick (event: LeafletMouseEvent) {
		const { lat, lng } = event.latlng;

		setPosition({
			latitude: lat, longitude: lng,
		});
	}

	function MapClickHandler () {
		useMapEvents({
			click: handleMapClick
		});

		return null;
	}

	function handleSelectImages (event: ChangeEvent<HTMLInputElement>) {
		if (!event.target.files) return;

		const selectedImages = Array.from(event.target.files);

		setImages(selectedImages);

		const selectedImagesPreview = selectedImages.map(image => {
			return URL.createObjectURL(image);
		});

		setPreviewImages(selectedImagesPreview);
	}

	async function handleSubmit (event: FormEvent) {
		event.preventDefault();

		const { latitude, longitude } = position;

		const data = new FormData();

		data.append('name', name);
		data.append('about', about);
		data.append('latitude', String(latitude));
		data.append('longitude', String(longitude));
		data.append('instructions', instructions);
		data.append('opening_hours', opening_hours);
		data.append('open_on_weekends', String(open_on_weekends));

		images.forEach(image => {
			data.append('images', image);
		});

		await api.post('orphanages', data);

		alert('Cadastro Realizado com Sucesso!');

		navigate('/map');
	}

	return (
		<div id="page-create-orphanage">
			<Sidebar />

			<main>
				<form onSubmit={ handleSubmit } className="create-orphanage-form">
					<fieldset>
						<legend>Dados</legend>

						<MapContainer
							center={ [-23.5576073, -46.6461921] }
							style={{ width: '100%', height: 420 }}
							zoom={ 15 }
						>
							<TileLayer
								url={
									'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=' +
									process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
								}
							/>

							{ position.latitude !== 0 && (
								<Marker
									interactive={ false }
									icon={ happyMapIcon }
									position={ [position.latitude, position.longitude] }
								/>
							) }

							<MapClickHandler />
						</MapContainer>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input id="name" value={ name } onChange={ event => setName(event.target.value) } />
						</div>

						<div className="input-block">
							<label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
							<textarea id="name" maxLength={ 300 } value={ about } onChange={ event => setAbout(event.target.value) } />
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

							<div className="image-container">
								{ previewImages.map(image => {
									return <img key={ image } src={ image } alt={ name } />
								}) }

								<label className="new-image" htmlFor="image[]">
									<FiPlus size={ 24 } color="#15B6D6" />
								</label>
							</div>

							<input type="file" name="upload-image" id="image[]" onChange={ handleSelectImages } multiple />
						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

						<div className="input-block">
							<label htmlFor="instructions">Instruções</label>
							<textarea id="instructions" value={ instructions } onChange={ event => setInstructions(event.target.value) } />
						</div>

						<div className="input-block">
							<label htmlFor="opening_hours">Horário de Funcionamento</label>
							<input id="opening_hours" value={ opening_hours } onChange={ event => setOpeningHours(event.target.value) } />
						</div>

						<div className="input-block">
							<label htmlFor="open_on_weekends">Atende Fim de Semana</label>

							<div className="button-select">
								<button
									type="button"
									className={ open_on_weekends ? 'active' : '' }
									onClick={ () => setOpenOnWeekends(true) }
								>
									Sim
								</button>

								<button
									type="button"
									className={ !open_on_weekends ? 'active' : '' }
									onClick={ () => setOpenOnWeekends(false) }
								>
									Não
								</button>
							</div>
						</div>
					</fieldset>

					<button type="submit" className="confirm-button">
						Confirmar
					</button>
				</form>
			</main>
		</div>
	);
}
