
module.exports = {
	sendSms: sendSms
}

function sendSms(number, msg, sendOptions){
	var client = require('twilio')(sendOptions.sid, sendOptions.auth);

	if(!sendOptions.fake){
		client.messages.create({
			body: msg,
			to: number,
			from: sendOptions.fromNumber
		},
		function(err, message) { 
			process.stdout.write(err + '\n' + message);
			console.dir(err);
		});
	}
	else{
		console.log('Not sending message but if I would it would look like this: ', {
			body: msg,
			to: number,
			from: sendOptions.fromNumber
		});
	}
}
