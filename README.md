# Who's on Call?

##(IN PROGRESS....)

A small app asking PagerDuty who's on call an if that name changed since the last time it sends a text message using Twilio to the involved parties.

The plan is to use a [Heroku](http://heroku.com)-app to host this and use the scheduler add-on to run the script every morning or something in that fashion. We'll see how it progresses.

I wanted to store current user on call to compare with for changes. Using a non resilient hosting as heroku I found no other way than to keep that data external. I chose mongoDB becaues of ease. But it feels like major overkill to use mongo to store one lousy json document... But it works :).

### Problem statement
We have a rolling schedule in PagerDuty on my company. The thing is that I don't know if I'm on or off duty without checking in PagerDuty. So what this app does is to check for changes in who is on call and send a text message to both the user entering on call status and the one leaving. 

## Install

* Clone or fork the repo
* Push to heroku
    * 	```git push heroku master```
* Enter config values (see [Configuration](#Configuration))
    *	```heroku config:set KEY1="VALUE1"```   
* Install heroku [scheduler add-on](https://addons.heroku.com/scheduler)
	* ```heroku addon:add scheduler```	
* Configure schedule add on
	* Enter the schduler UI and enter `node index.js`
 


## Pre-reqs
 * PagerDuty account
 * Twilio account with some credits on it
 * MongoDB instanse somewhere


## Coniguration

### PagerDuty 

**PD_APIKEY ** - API KEY for PagerDuty

**PD_SUBDOMAIN** - Your PagerDuty subdomain. https://__subdomain__.pagerduty.com


### Twilio
**TWILIO_SID** - 

**TWILIO_AUTH**

**TWILIO_FROM_NUMBER** - The SMS-enablen number you have on twilio




## TODO
* Introduce promises or koa to get the code more readable
* Installation instructions



## License

### The MIT License (MIT)

Copyright (c) 2014 Niklas Nihlén

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
