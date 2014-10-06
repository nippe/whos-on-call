//require('./services/pdjs');
var _ = require('lodash-node/underscore');
var userStore = require('./services/userStorage');

var pd_settings = {
    subdomain: process.env.PD_SUBDOMAIN,
    token: process.env.PD_APIKEY,
	  sid: process.env.TWILIO_SID,
		auth: process.env.TWILIO_AUTH,
		fromNumber: process.env.TWILIO_FROM_NUMBER
}

var messageSender = require('./services/sendMessageService');
var request = require('request');

var options = {
	url: 'https://' + pd_settings.subdomain + '.pagerduty.com/api/v1/escalation_policies/on_call',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Token token=' + pd_settings.token
	}
};

//Get the person on call
request(options, function(err, response, body){
	if(err) throw err;
	var data = JSON.parse(body);

	var current_user_oncall = data.escalation_policies[0].on_call[0].user;

	userStore.getCurrent(function(err, user_signing_off){

		var first_shift = user_signing_off ? false : true;
		var user_signing_off = user_signing_off || {id: 'N/A'};
		 // process.env.ONCALL_USER ? JSON.parse(process.env.ONCALL_USER) : '';
		
		// Has user switched?
		//console.log('%s <-> %s', current_user_oncall.id, user_signing_off.id	);
		if( current_user_oncall.id !== user_signing_off.id) {

			pd_settings.fake = true;
			// Get phonenumbers
			getUserPhoneNumber(current_user_oncall.id, pd_settings, function(err, result){
				var number_on = result;
				if(number_on) {
					var message = 'Hi ' + current_user_oncall.name + ', \nYou\'re now on call';
					if(user_signing_off)
						message += user_signing_off.name + ' is signing off.';

					messageSender.sendSms(number_on, message, pd_settings);

					if(!first_shift){
						getUserPhoneNumber(user_signing_off.id, pd_settings, function(err, result){
							var number_off = result;
							if(number_off){
								var message = 'Hi ' + user_signing_off.name + ', \nYou\'re off PagerDuty. ';
								if(current_user_oncall)
									message += current_user_oncall.name + ' is signing on.';

								messageSender.sendSms(number_off, user_signing_off.name, pd_settings);
							}
						});
					}
				}
			});

			

			// Swittch on call user
			userStore.saveCurrent(current_user_oncall, function(err, result){
				if(err) throw err;
				console.log('Saved new user?');
			});
		}
		else {
			console.log('All is good, no change');
		}
	});
});


function getUserPhoneNumber(user_id, settings, callback){
	var options = {
			url: 'https://' + settings.subdomain + '.pagerduty.com/api/v1/users/' + user_id + '/contact_methods',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Token token=' + settings.token
			}
		};

	request( options, function(err, response, body){
			var contact_options = JSON.parse(body);	
			var result = _.findWhere(contact_options.contact_methods, { type: 'SMS'});

			if(callback){
				if(result){
					var number = '+' + result.country_code + result.phone_number;
					if(number){
						callback(null, number);
				}	
				else{
					var err = new Error('No number available');
					callback(err, null);
				}
			}
		}	
	});
}
