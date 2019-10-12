let express = require('express');
let app = express();
let mysql = require('mysql');


app.use(express.json());
app.use(express.static("public"));

app.set('view engine', 'pug');

let con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "crm_nu"
})

app.listen(3000,()=>{
	console.log('node start at 3000');
});

app.get('/new-client', (req, res) => {
	res.render('new-client');
});
app.get('/', (req, res) => {
	res.render('main');
});

app.get('/client-list', (req, res) => {
	
	con.query(
		'SELECT * FROM clientele',
		(error,result)=>{
		if(error) throw error;
		let clienteleArr = {};	
		for(let i=0;i<result.length;i++){
			clienteleArr[result[i]['id']] = result[i];
		}		
		res.render('client-list',{
			clientele: JSON.parse(JSON.stringify(clienteleArr))
		});
		}
	)
});


app.post('/send-form', (req, res) => {
	saveOrder(req.body);
	res.send({"asdasdasd":"aasdasdasd"});
	
});

function saveOrder(data) {
	let sql;
	let maxId = 0;
	let date = new Date()
	let dateNow = date.getDate()+'.'+Number(date.getMonth()+1)+'.'+date.getFullYear()
	
	con.query(
		'SELECT * FROM clientele',
		(error, result) => {
			if (error) throw error;
			for (let i = 0; i < result.length; i++) {
				if(result[i]['id']>maxId) maxId = result[i]['id']
			}
		}
	)


	sql = "INSERT INTO clientele (id, date, lastName, firstName, middName, email, phone) VALUES ('" + maxId + "', '" + dateNow + "', '" + data.lastName + "', '" + data.firstName + "', '" + data.middleName + "','" + data.clientEmail + "','" + data.clientPhone + "')";
	console.log(sql);
	con.query(sql, function (error, result) {
		if (error) throw error;
		console.log("1 record inserted. Дата:"+date);
	});
}


///