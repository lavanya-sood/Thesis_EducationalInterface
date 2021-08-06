//require('dotenv').config();
const express= require('express')
const app =express()
const routes = require('./routes')
const { MongoClient } = require('mongodb');



// set up the app 
app.use(express.json());
app.use((req, res, next) => {
		// ensure cors access 
		// allows calls from frontend
  	res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Headers', '*');
  	next();
});

//app.use('/module',moduleRoutes);

const CONNECTION_URL =  'mongodb+srv://thesisoriginal:thesispassword123@cluster0.qgqkr.mongodb.net/Module?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
//     .then(()=> app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`)))
//     .catch((error)=> error.message);

// mongoose.set('useFindAndModify',false);

const client = new MongoClient(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// connect the db
client.connect(async err => {
		// get one db collection (may move to routes.js so that multiple collections can be opened)
	  const db = client.db("Module");
	  
	  // call the routes function to handle api calls and communicate with blockchain and the db
	  routes(app, db)
	  
      // listen for calls to the app
	  app.listen(PORT, () => {
	     console.log('listening on port '+ PORT);
	  })
});