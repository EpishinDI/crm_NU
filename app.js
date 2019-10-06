let express = require('express');
let app = express();
let mysql = require('mysql');


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


app.get('/3', (req, res) => {
	
	con.query(
		'SELECT * FROM users',
		(error,result)=>{
		if(error) throw error;
		let usersArr = {};	
		for(let i=0;i<result.length;i++){
			usersArr[result[i]['id']] = result[i];
		}		
		res.render('test',{
			users: JSON.parse(JSON.stringify(usersArr))
		});
		}
	)
});
///