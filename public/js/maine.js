window.onload = () => {
	let btnPreliminaryForm = document.querySelector('.btnPreliminaryForm');
	let addClientWrap = document.querySelector(".add-client-wrap")
	let showAddClientForm = document.querySelector(".show-add-client-form")
	let data = ['Волков', 'Николай', 'Сергеевич', 'wolf@mail.ru', '+79670802112', 'Табуретка', 'Должна быть очень удобная'];

	showAddClientForm.addEventListener('click',()=>{
		addClientWrap.style.display = "block";
	})

	for (let i = 0; i < btnPreliminaryForm.parentNode.length - 1; i++) {

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
				let test = res.json();
				for (let key in test) {
					console.log('Ключ: ' + key + ' ЗначениеЖ ' + test[key])
				};
			})
			.then(function (body) {
				console.log(body);
			})

	}


	btnPreliminaryForm.addEventListener('click', () => {
		let formData = {};
		for (let i = 0; i < btnPreliminaryForm.parentNode.length - 1; i++) {

			formData[btnPreliminaryForm.parentNode[i].id] = btnPreliminaryForm.parentNode[i].value
		}
		addClientWrap.style.display = "none";
		sendForm(formData);


	})
}