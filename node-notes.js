//The very first thing you should create for your node app is; index.js
	// npm init -this helps you create a package.json file
		//no speacial characters or uppercase letters when naming package
		//package.json will point to index.js
//Node was created so that javascript developers could write server-side code

//Run a node app by running, node index.js in your terminal.

//from within the directory of your project run;		-express & body-parser are packages that helps run the node server.
	//npm i --save express
    //npm i --save body-parser
    //npm i // this will check your packages.json and download everything into the folder for this on its own.
	
	
	//KILL NODE SERVER ctrl C
	//DONT CLOSE TERMINAL WITHOUT KILLING THE SERVER.
	
//get express working	
	var exrpess = require('express');  //default is node_modules folder
	var server = express();
	
//middleware
    server.use(express.static(__dirname + '/public')) //accesses our index.html file and all other public files for our website
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({extened: true}))
//open our port	
	server.listen(8080, () => {
	console.log(`
		whatever message you want
		`)
	})

//when user makes a request to a url	
	server.get('/api/houses', function( request (req), response(res)) {
		console.log('cool this works');
		res.send(houses); //servers can only send strings
	})
	
	server.post('/api/houses', function(req, res){
        var house = req.body // body parser turns user requests into objects
        addHouse(house.description, house.sqft);
        res.send(houses);
    })
    
    // .gitignore file we can put any files in here we want to ignore for pushing to git, node modules need to go in here