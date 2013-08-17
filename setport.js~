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
	setGPIO(req.params.portid,states[req.params.state], function(){

        sys.puts("Setted ");
        
	});
  },
  toggle: function(req, res){
    res.send('toggle port ' + req.params.portid );
	toggleStateFromGPIO(req.params.portid, function(){

        sys.puts("Setted ");
        
	});
  },
  readDirection: function(req, res){
    res.send('Going to get port ' + req.params.portid );
	getDirectionFromGPIO(req.params.portid, function(){

        sys.puts("getted ");
        
	});
  },
  readState: function(req, res){
    res.send('Going to get port ' + req.params.portid );
	getStateFromGPIO(req.params.portid, function(){

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
		'/toggle':
		{
	              	get: ports.toggle
		},
		'/getdirection': {
			get: ports.readDirection
      			},
		'/getstate': {
			get: ports.readState
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
//ports[5] = 22;
ports[6] = 11;
ports[7] = 18;

var states = new Array();
states[0] = 0;
states[1] = 1;


function setGPIO(pin, state, callback) {  
	sys.puts("Setting Pin: " + pin + " to " + state);  
	gpio.open(ports[pin], "output", function(err) {        // port 2
    		gpio.write(ports[pin], state, function() {            // Set port 2 high (1)
    		});
	});
    
	callback();  
}  

function initGPIO(pin, callback) {  
	gpio.open(ports[pin], "output", function(err) { 
	    gpio.read(ports[pin], function(err, value) {
	
		    sys.puts("Getting state of Pin: " + ports[pin] );  
		    console.log('The value is ' + value);
	    	    port_states[pin] = value;

	    })
	    });
}  
function getStateFromGPIO(pin, callback) {  
	    gpio.read(ports[pin], function(err, value) {

	    if (err) throw err;	    
		    sys.puts("Getting state of Pin: " + ports[pin] );  
		    console.log('The value is ' + value);
	    	    port_states[pin] = value;

	    })
}  
function toggleStateFromGPIO(pin, callback) {  
	    gpio.read(ports[pin], function(err, value) {
		
	    if (err){throw err}	    
		    sys.puts("Getting state of Pin: " + ports[pin] );  
		    console.log('The value is ' + value);
	    	    
		    if (value == 0){
		    
			    console.log('The new value is 1');
		//	    gpio.write(ports[pin], 1);
		    }
		    else if(value == 1){
		    
			    console.log('The new value is 0');
			    gpio.write(ports[pin], 0);
		    }

		    port_states[pin] = value;

	});
}  
function getDirectionFromGPIO(pin, callback) {  
	    gpio.getDirection(ports[pin], function(err, value) {
	
		    sys.puts("Getting direction of Pin: " + ports[pin] );  
		    console.log('The value is ' + value);
	    	    port_states[pin] = value;

	    })
}  

//gpio.open(16, "output", function(err) {        // port 1
//    gpio.write(16, 1, function() {            // Set port 1 high (1)
//        gpio.close(16);                        // Close port 1
//    });
//});

port_states = new Array();

for( var i = 1; i <= 7; i++ ) {

//getDirectionFromGPIO(i);
initGPIO(i);


}


