//TODO: Use strategy pattern to swtich between different storages.

var mongodb = require('mongodb');


module.exports = {
	saveCurrent: saveCurrent,
	getCurrent: getCurrent
};


function saveCurrent (user, callback) {
	mongodb.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
		if(err) throw err;
		var userStore = db.collection('users');
		//Clear store
		userStore.remove({}, function(err){
			if(err) throw err;
			userStore.insert(user, function(err, result){
				if(err) throw err;
				callback(err, true);
				db.close();
			});
		});
	});
}


function getCurrent(callback){
		mongodb.MongoClient.connect(process.env.MONGOLAB_URI, function(err, db){
		if(err) throw err;
		var userStore = db.collection('users');
		//Clear store
		userStore.find().limit(1).toArray(function(err, docs) {
			callback(err, docs[0]);
			db.close();
		});
	});	
}
