/************************************************************************************************************
       _                   _____           _       _                 _                 _   _                 
      | |                 / ____|         (_)     | |               (_)               | | (_)                
      | | __ ___   ____ _| (___   ___ _ __ _ _ __ | |_    __ _ _ __  _ _ __ ___   __ _| |_ _  ___  _ __  ___ 
  _   | |/ _` \ \ / / _` |\___ \ / __| '__| | '_ \| __|  / _` | '_ \| | '_ ` _ \ / _` | __| |/ _ \| '_ \/ __|
 | |__| | (_| |\ V / (_| |____) | (__| |  | | |_) | |_  | (_| | | | | | | | | | | (_| | |_| | (_) | | | \__ \
  \____/ \__,_| \_/ \__,_|_____/ \___|_|  |_| .__/ \__|  \__,_|_| |_|_|_| |_| |_|\__,_|\__|_|\___/|_| |_|___/
                                            | |                                                              
                                            |_|                                                              
************************************************************************************************************/

if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	})();
}



function animate({duration, timing, draw, callback}) {

	let start = performance.now();

	requestAnimationFrame(function animate_frame(time) {

		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		let progress = timing(timeFraction)

		draw(progress);

		if (timeFraction < 1) {

			requestAnimationFrame(animate_frame);

		}else{
			callback();
		}

	});
}




/************************************************************************************************************
  _______ _           _                __                  _   _                 
 |__   __(_)         (_)              / _|                | | (_)                
    | |   _ _ __ ___  _ _ __   __ _  | |_ _   _ _ __   ___| |_ _  ___  _ __  ___ 
    | |  | | '_ ` _ \| | '_ \ / _` | |  _| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
    | |  | | | | | | | | | | | (_| | | | | |_| | | | | (__| |_| | (_) | | | \__ \
    |_|  |_|_| |_| |_|_|_| |_|\__, | |_|  \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                               __/ |                                             
                              |___/                                              
*************************************************************************************************************/

function linear(timeFraction) {
	return timeFraction;
}

function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}

function back(x, timeFraction) {
  return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

function sin(timeFraction) {
  return Math.sin(Math.PI * timeFraction);
}

function bounce(timeFraction) {
	for (let a = 0, b = 1; 1; a += b, b /= 2) {
		if (timeFraction >= (7 - 4 * a) / 11) {
			return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
		}
	}
}

function elastic(x, timeFraction) {
  return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}



let bounceEaseOut = makeEaseOut(bounce);
function makeEaseOut(timing) {
	return function(timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}

function makeEaseInOut(timing) {
  return function(timeFraction) {
	if (timeFraction < .5)
		return timing(2 * timeFraction) / 2;
	else
		return (2 - timing(2 * (1 - timeFraction))) / 2;
  }
}


/************************************************************************************************************
  _______                    _                 _                             
 |__   __|                  | |               | |                            
    | |  ___    __ _   __ _ | |  ___      ___ | |  __ _  ___  ___   ___  ___ 
    | | / _ \  / _` | / _` || | / _ \    / __|| | / _` |/ __|/ __| / _ \/ __|
    | || (_) || (_| || (_| || ||  __/   | (__ | || (_| |\__ \\__ \|  __/\__ \
    |_| \___/  \__, | \__, ||_| \___|    \___||_| \__,_||___/|___/ \___||___/
                __/ |  __/ |                                                 
               |___/  |___/                                                                                                 
*************************************************************************************************************/


/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

 /*jshint browser: true, strict: true, undef: true */
 /*global define: false */

 ( function( window ) {

 	'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
	return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
	hasClass = function( elem, c ) {
		return elem.classList.contains( c );
	};
	addClass = function( elem, c ) {
		elem.classList.add( c );
	};
	removeClass = function( elem, c ) {
		elem.classList.remove( c );
	};
}
else {
	hasClass = function( elem, c ) {
		return classReg( c ).test( elem.className );
	};
	addClass = function( elem, c ) {
		if ( !hasClass( elem, c ) ) {
			elem.className = elem.className + ' ' + c;
		}
	};
	removeClass = function( elem, c ) {
		elem.className = elem.className.replace( classReg( c ), ' ' );
	};
}

function toggleClass( elem, c ) {
	var fn = hasClass( elem, c ) ? removeClass : addClass;
	fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );





/************************************************************************************************************
   _____                           _    _        _____                    _  _ 
  / ____|                         | |  | |      / ____|                  | || |
 | (___   _ __ ___    ___    ___  | |_ | |__   | (___    ___  _ __  ___  | || |
  \___ \ | '_ ` _ \  / _ \  / _ \ | __|| '_ \   \___ \  / __|| '__|/ _ \ | || |
  ____) || | | | | || (_) || (_) || |_ | | | |  ____) || (__ | |  | (_) || || |
 |_____/ |_| |_| |_| \___/  \___/  \__||_| |_| |_____/  \___||_|   \___/ |_||_|
                                                                               
                                                                               
/************************************************************************************************************/


function smoothScroll(event) {

    if (this.hash !== '' && this.hash !== '#' && this.hash !== undefined ) { //Check if tag is an anchor

    	//this = event.currentTarget – это текущий элемент,
    	//event.target – это исходный элемент


        event.preventDefault()
        const hash = this.hash.replace("#", "")
        // const link = document.getElementsByName(hash) 
        const link = document.getElementById(hash) 
        //Find the where you want to scroll
        // const position = link.getBoundingClientRect().y 
        // let top = document.documentElement.scrollTop;

        var top = window.pageYOffset,
    		position = link.offsetTop,
    		offset = position - top;

    	animate(

				{

					duration: 600,

					timing: linear,				

					// timing: function(timeFraction) {
					// 	return  Math.pow(timeFraction, 1.5);
					// },

					draw: function(progress) {
						window.scrollTo( 0, top + offset*progress);
					}, 
					callback: function(){}
				}
		);
    }
}



/************************************************************************************************************
                                                                               
/************************************************************************************************************/