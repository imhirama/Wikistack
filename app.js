const express = require('express');
const morgan = require("morgan");
const app = express();
const bodyParser = require('body-parser')

// Modules we created
const layout = require('./views/layout')
const { db, Page, User } = require('./models');
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')


db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/wiki', wikiRouter)
app.use('/user', userRouter)


app.get('/', (req,res) => {
	res.redirect('/wiki');
});

const init = async() => {
	await db.sync()// if we need to drop tables and recreate them : {force:true}
	const PORT = 1337;
	app.listen(PORT, ()=> {
	console.log(`App listening in port ${PORT}`);
	})
};

init();
