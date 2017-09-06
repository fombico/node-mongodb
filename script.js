var fs = require('fs'),
	MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://127.0.0.1:27017/lab3-1', (err, db) => {
	if (err) return console.log(err);

	var collection = db.collection('users');

	fs.readFile('test.csv', 'utf8', (err, data) => {
		if (err) return console.log(err);

		var lines = data.split("\n");
		var headers = lines.shift().split(",");
		console.log("Headers: %s", headers.join(", "));
		console.log("Found %s lines", lines.length);
		
		var docs = [];
		for (i = 0; i < lines.length; i++) {
			if (lines[i] !== '') {
				var values = lines[i].split(",");
				var doc = {};
				for (j = 0; j < values.length; j++) {
					doc[headers[j]] = values[j];
				}

				docs.push(doc);
			}
		}

		collection.insert(docs, (err, users) => {
			if (err) return console.log(err);
			console.log(users);

			db.close();
			process.exit();
		});

	});
});