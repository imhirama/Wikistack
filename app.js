const express = require('express');
const morgan = require("morgan");
const app = express();
const bodyParser = require('body-parser')

// Modules we created
const layout = require('./views/layout')
const { db, Page, User } = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req,res) => {
	res.send(layout(''));
});

const init = async() => {
	await db.sync()// if we need to drop tables and recreate them : {force:true}
	const PORT = 1337;
	app.listen(PORT, ()=> {
	console.log(`App listening in port ${PORT}`);
	})
};

init();