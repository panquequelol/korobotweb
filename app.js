const newDiv = document.querySelector('.vtubers-en-vivo');

const carruselOnline = document.getElementById('vtubers-en-vivo');

const carruselUpcoming = document.getElementById('vtubers-upcoming');

const newOnlineText = document.getElementById('vtubers-en-vivo-texto');

const newUpcomingText = document.getElementById('vtubers-upcoming-texto');

//verificar si no hay items in HTML
function isEmpty(node) {
	return node.textContent.trim() === '';
}

console.log(isEmpty(carruselOnline));

const crearCarruselHololiveOficial = (imagen, nombre, titulo, link, idHTML, platform) => {
	const createDiv = document.createElement('div');
	createDiv.classList.add('carousel-item');
	// siempre debe haber min 1 elemento con active
	if (isEmpty(idHTML)) {
		createDiv.classList.add('active');
	}
	createDiv.innerHTML = `
		<img src="${imagen}" class="d-block w-100" alt="..." style = "filter: brightness(70%);" />
		<div class="carousel-caption d-none d-md-block">
			<h5>${nombre}</h5>
			<b><a class="link-carrusel" target="_blank" href="${link}"><i class="bi bi-${platform}"></i>
			${titulo}</a></b>
		</div>`;

	idHTML.appendChild(createDiv);
};

const crearVtuberCarrusel = (
	imagen,
	nombre,
	viewers,
	link,
	titulo,
	idHTML,
	fecha = false
) => {
	const createDiv = document.createElement('div');
	createDiv.classList.add('carousel-item');
	// siempre debe haber min 1 elemento con active
	if (isEmpty(idHTML)) {
		createDiv.classList.add('active');
	}
	createDiv.innerHTML = !fecha
		? viewers == null
			? `
		<img src="${imagen}" class="d-block w-100" alt="..." style = "filter: brightness(70%);" />
		<div class="carousel-caption d-none d-md-block">
			<h5>${nombre}</h5>
			<p>
				Transmitiendo <b>solo para miembros</b> 
			</p>
			<b><a class="link-carrusel" target="_blank" href="${link}">🔗${titulo}</a></b>
		</div>`
			: `
		<img src="${imagen}" class="d-block w-100" alt="..." style = "filter: brightness(70%);" />
		<div class="carousel-caption d-none d-md-block">
			<h5>${nombre}</h5>
			<p>
				Tiene actualmente <b>${viewers}</b> viewers
			</p>
			<b><a class="link-carrusel" target="_blank" href="${link}">🔗${titulo}</a></b>
		</div>`
		: `
	<img src="${imagen}" class="d-block w-100" alt="..." style = "filter: brightness(70%);" />
	<div class="carousel-caption d-none d-md-block">
		<h5>${nombre}</h5>
		<p>
			Stream proximo: 
		</p>
		<b><a class="link-carrusel" target="_blank" href="${link}">🔗${titulo}</a></b>
	</div>`;

	idHTML.appendChild(createDiv);
};

const createVtuberCart = (imagen, nombre) => {
	const createDiv = document.createElement('div');
	createDiv.innerHTML = `<img src="${imagen}" alt="${nombre} channel picture">`;
	newDiv.appendChild(createDiv);
};

const createOnlineText = (numero) => {
	newOnlineText.innerHTML =
		numero == 1
			? `Actualmente hay <b>${numero}</b> vtuber de Hololive ★ streameando.`
			: `Actualmente hay <b>${numero}</b> vtubers de Hololive ★ streameando.`;
};

const createUpcomingText = (numero) => {
	newUpcomingText.innerHTML =
		numero == 1
			? `Comenzara a streamear proximamente <b>${numero}</b> vtuber de Hololive ★ hoy (hora Chile).`
			: `Comenzaran a streamear proximamente <b>${numero}</b> vtubers de Hololive ★ hoy (hora Chile).`;
};

const hololiveTwitter = {
	nombre: 'ホロライブプロダクション【公式】',
	link: 'https://twitter.com/hololivetv',
	titulo: 'Twitter Oficial de Hololive',
	imagen:
		'https://yt3.ggpht.com/ytc/AKedOLTj0OSWM9TvPy4e8v1_o99OtP3Bg7FXthdkgr2bCQ=s900-c-k-c0x00ffffff-no-rj',
};

const hololiveYoutube = {
	nombre: 'hololive ホロライブ - VTuber Group',
	link: 'https://www.youtube.com/channel/UCJFZiqLMntJufDCHc6bQixg',
	titulo: 'Canal oficial de YouTube de Hololive',
	imagen:
		'https://yt3.ggpht.com/ytc/AKedOLTj0OSWM9TvPy4e8v1_o99OtP3Bg7FXthdkgr2bCQ=s900-c-k-c0x00ffffff-no-rj',
};

// ! HOLOLIVE API
const holoApi = async () => {
	try {
		const respuesta = await fetch('https://api.holotools.app/v1/live');
		const data = await respuesta.json();

		const onlineInfo = data.live.map((vtuber) => ({
			nombre:
				vtuber.channel.name.split(' ').length >= 2
					? `${vtuber.channel.name.split(' ')[0]} ${
							vtuber.channel.name.split(' ')[1]
					  }`
					: vtuber.channel.name.split(' ')[0],
			link: `https://www.youtube.com/watch?v=${vtuber.yt_video_key}`,
			ytID: vtuber.yt_video_key,
			titulo: vtuber.title,
			imagen: vtuber.channel.photo,
			viewers: vtuber.live_viewers,
		}));

		const upcomingInfo = data.upcoming.map((vtuber) => ({
			nombre:
				vtuber.channel.name.split(' ').length >= 2
					? `${vtuber.channel.name.split(' ')[0]} ${
							vtuber.channel.name.split(' ')[1]
					  }`
					: vtuber.channel.name.split(' ')[0],
			link: `https://www.youtube.com/watch?v=${vtuber.yt_video_key}`,
			ytID: vtuber.yt_video_key,
			titulo: vtuber.title,
			imagen: vtuber.channel.photo,
			viewers: vtuber.live_viewers,
			fecha: vtuber.live_schedule,
		}));

		createOnlineText(onlineInfo.length);



		if (onlineInfo.length == 0) {
			// (imagen, nombre, titulo, link, idHTML)
			console.log(onlineInfo.length);
			crearCarruselHololiveOficial(
				hololiveYoutube.imagen, hololiveYoutube.nombre, hololiveYoutube.titulo, hololiveYoutube.link, carruselOnline,"youtube"
			)}

		onlineInfo.forEach((vtuber) => {
			// createVtuberCart(vtuber.imagen, vtuber.nombre);
			// console.log(vtuber.fecha);

			crearVtuberCarrusel(
				vtuber.imagen,
				vtuber.nombre,
				vtuber.viewers,
				vtuber.link,
				vtuber.titulo,
				carruselOnline
			);

			console.log(onlineInfo.length);
			// <img src="${vtuber.imagen}" alt="${vtuber.nombre} channel picture">

			console.log(vtuber.nombre, vtuber.imagen);
		});

		let contadorUpcoming = 0;

		upcomingInfo.forEach((vtuber) => {
			let monthStream = vtuber.fecha.substring(5, 7) * 1,
				yearStream = vtuber.fecha.substring(0, 4) * 1,
				dayStream = vtuber.fecha.substring(8, 10) * 1 - 1;

			let hourStream =
				vtuber.fecha.substring(10, 12) * 1 != 0
					? vtuber.fecha.substring(11, 13) * 1 - 3
					: 9;
			let minuteStream = vtuber.fecha.substring(14, 16);

			const horaMinuto = `${hourStream}:${minuteStream}`;

			const d = new Date();
			let monthNow = d.getMonth() + 1,
				yearNow = d.getFullYear() * 1,
				dayNow = d.getDate() * 1;

			if (monthNow === monthStream && yearNow === yearStream) {
				if (dayStream == dayNow) {
					contadorUpcoming++;

					crearVtuberCarrusel(
						vtuber.imagen,
						vtuber.nombre,
						vtuber.viewers,
						vtuber.link,
						vtuber.titulo,
						carruselUpcoming,
						horaMinuto
					);
				}
			}
		});

		if (contadorUpcoming == 0) {
			// (imagen, nombre, titulo, link, idHTML)
			console.log(onlineInfo.length);
			crearCarruselHololiveOficial(
				hololiveTwitter.imagen, hololiveTwitter.nombre, hololiveTwitter.titulo, hololiveTwitter.link, carruselUpcoming, "twitter"
			)}

		createUpcomingText(contadorUpcoming);
	} catch (error) {
		console.log(`hubo este error: ${error}`);
	}
};

holoApi();
