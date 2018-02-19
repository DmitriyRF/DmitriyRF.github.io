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



//	let bounceEaseOut = makeEaseOut(bounce);
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