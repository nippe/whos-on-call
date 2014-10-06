# Who's on Call?


A small app asking PagerDuty who's on call an if that name changed since the last time it sends a text message using Twilio to the involved parties.

The plan is to use a [Heroku](http://heroku.com)-app to host this and use the scheduler add-on to run the script every morning or something in that fashion. We'll see how it progresses.

### Problem statement
We have a rolling schedule 

## Install
Draft:

* Push to heroku
    * 	```git push heroku master```
* enter config values
    *	```heroku config:set env..```   
* install heroku [scheduler add-on](https://addons.heroku.com/scheduler)
* configure schedule add on
 


## Pre-reqs
Pager duty account
Twilio account with some credits on it.


## Coniguration

### PagerDuty 
#### API KEY
**process.env.PD_APIKEY **

#### Subdomain
**PD_SUBDOMAIN**

### Twilio
****
Twilio API KEY
Twilio Sender Number.




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
