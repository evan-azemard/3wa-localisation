const btnLocation = document.querySelector('#geolocation');
const paragraph = document.querySelector('#paragraph');
const url = "https://api-adresse.data.gouv.fr/reverse/?"

const getLocation = () => {
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition((position) => {
			const longitude = position.coords.longitude;
			const latitude = position.coords.latitude;
			
			fetch(`${url}lon=${longitude}&lat=${latitude}`)
				.then(response => response.json())
				.then(response => {
					if(response.features.length > 0 ){
						const adress = response.features[0].properties.label;
						paragraph.textContent = `adresse : ${adress}`;
					}
				}).catch(error => {
				console.log(error);
			})
			
		},(error) => {
			paragraph.textContent = error;
		})
	}else{
		paragraph.textContent = "La geolocalisation n'est pas activé";
	}
}

btnLocation.addEventListener('click', getLocation);