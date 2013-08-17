var gpio = require("pi-gpio");
var sys = require('sys');
var http = require('http');

var express = require('express');
var app = express();

// app route mapping 
app.map = function(a, route){
  route = route || '';
  for (var key in a) {
    switch (typeof a[key]) {
      // { '/path': { ... }}
      case 'object':
        app.map(a[key], route + key);
        break;
      // get: function(){ ... }
      case 'function':
         console.log('%s %s', key, route);
        app[key](route, a[key]);
        break;
    }
  }
};


var ports = {
  list: function(req, res){
    res.send('port list');
  },

  get: function(req, res){
    res.send('port ' + req.params.portid);
  },

  set: function(req, res){
    res.send('Going to set port ' + req.params.portid + ' to ' + req.params.state);
	setGPIO(ports[req.params.portid],states[req.params.state], function(){

        sys.puts("Setted ");
        
	});
  },
  switchit: function(req, res){
    res.send('Going to set port ' + req.params.portid + ' to ' + req.params.state);
	setGPIO(ports[req.params.portid],states[req.params.state], function(){

        sys.puts("Setted ");
        
	});
  },
  read: function(req, res){
    res.send('Going to get port ' + req.params.portid );
	getGPIO(ports[req.params.portid], function(){

        sys.puts("getted ");
        
	});
  },

};

// app structure

app.map({
  '/port': {
      get: ports.list,
	'/:portid': {
		get: ports.get,
		'/set': {
	        	'/:state': {
	              	get: ports.set
        		}},
		'/switchit': {'/:state':{
	              	get: ports.switchit
		}},
		'/get': {
			get: ports.read
      			}
        
		}
	}
  
});

// simple logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
//  console.log('%s %s', req.method, req.params.name);
	
  next();
});

// respond
//app.use(function(req, res, next){
//  res.send('Hello World');
//});


// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(80);





// Put a friendly message on the terminal
sys.puts("Server running at http://127.0.0.1:8000/");


var ports = new Array();
ports[1] = 16;
ports[2] = 15;
ports[3] = 7;
ports[4] = 22;
ports[5] = 12;
ports[6] = 11;
ports[7] = 18;

var states = new Array();
states[0] = 0;
states[1] = 1;


function setGPIO(pin, state, callback) {  
	sys.puts("Setting Pin: " + pin + " to " + state);  
	gpio.open(pin, "output", function(err) {        // port 2
    		gpio.write(pin, state, function() {            // Set port 2 high (1)
        		gpio.close(pin);                        // Close port 2
    		});
	});
    
	callback();  
}  

function getGPIO(pin, callback) {  
	sys.puts("Getting state of Pin: " + pin );  

	gpio.setup(pin, gpio.DIR_IN, readInput);

	function readInput() {
	    gpio.read(pin, function(err, value) {
	        console.log('The value is ' + value);
		port_states[pin] = pin;
	    });
	}



    
	callback();  
}  

//gpio.open(16, "output", function(err) {        // port 1
//    gpio.write(16, 1, function() {            // Set port 1 high (1)
//        gpio.close(16);                        // Close port 1
//    });
//});

port_states = new Array();

for( var i = 1; i <= 7; i++ ) {

getGPIO(i);


}


setGPIO(ports[7],0, function(){
        
        sys.puts("Setted ");
                        
});

setGPIO(ports[6],0, function(){
        
        sys.puts("Setted ");
                        
});

setGPIO(ports[5],0, function(){
        
        sys.puts("Setted ");
                        
});
