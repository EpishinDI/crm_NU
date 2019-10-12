window.onload = () => {
	let btnPreliminaryForm = document.querySelector('.btnPreliminaryForm');
	
	let data = ['Волков', 'Николай', 'Сергеевич', 'wolf@mail.ru', '+79670802112', 'Табуретка', 'Должна быть очень удобная'];
	
	

	for (let i = 0; i < btnPreliminaryForm.parentNode.length-1; i++){

		btnPreliminaryForm.parentNode[i].value = data[i];

}


function sendForm(send) {
	fetch('/send-form', {
			method: 'POST',
			body: JSON.stringify(send),
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			}
		})
		.then(function (res) {

		})
		.then(function (body) {
			console.log(body);
		})
}


btnPreliminaryForm.addEventListener('click', () => {
	let formData = {};
	for (let i = 0; i < btnPreliminaryForm.parentNode.length-1; i++) {

		formData[btnPreliminaryForm.parentNode[i].id] = btnPreliminaryForm.parentNode[i].value
	}

	sendForm(formData);
	
})
}
