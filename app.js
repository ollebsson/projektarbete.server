var express = require('express');
var app = express();


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	extended: true
}));





var threads = [{id: 1, title: 'Titel', text: 'hello'}, {id: 2, title: 'asdas', text: 'asds'}];

function getThread(id) {
	for (var i = 0; i < threads.length; i ++) {
 
    if(threads[i].id === parseInt(id)) {
    	return threads[i];
    	/*console.log(i);*/
    }
}
    
};
function getThreadIndex(id) {
	for (var i = 0; i < threads.length; i++) {
		if(threads[i].id === parseInt(id)) {
			return i;
		}


	}
};



/*;*/
app.use(express.static(__dirname + "/public"));

app.get('/threads', function (req, res){
	res.sendFile('index.html', { root: __dirname + '/public'});
});

app.get('/api/threads', function (req, res) {
	res.json({ threads: threads });

});
app.get('/api/threads/:id', function (req, res) {

	var thread = getThread(req.params.id);


	console.log(thread);


	res.json(thread);
});


app.put('/api/threads/:id', function (req, res) {
	
	var threadId = getThread(req.params.id);
	var status = 'ERROR';
	console.log(threadId);
	if (threadId.id !== 'undefined') {
		threadId.title = req.body.title;
		threadId.text = req.body.text;

		status = 'OK';
		res.json({ status: status });
	}
	else {
		res.sendStatus(500);
	}

	
});


app.post('/api/threads', function (req, res) {
	var a = getThread(req.body.id);
	console.log(a);

	 
	threads.push({
		id: parseInt(req.body.id),
		title: req.body.title,
		text: req.body.text
	});


	res.json({ status: 'CREATED' });

});


app.delete('/api/threads/:id', function (req, res) {
	
	var deleteThread = getThreadIndex((req.params.id));

	if(deleteThread !== undefined) {
	threads.splice(deleteThread, 1);

	res.json({ status: 'OK', message: 'deleted successfully' });
	}
	else {
		res.send(404);
	}
});




var server = app.listen(3000, function () {
	console.log('Server started. Listening to connections on port 3000\n');
});