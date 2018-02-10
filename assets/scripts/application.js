
function ready(){

}
document.addEventListener("DOMContentLoaded", ready);

var svgDoc, fs_items;

var fs_elements = [];

window.onload = function() {

	svgDoc 						= document.getElementById("fs-svg").contentDocument;
	fs_items					= ["fs-wordpress-monitor", "fs-notebook-graph", "fs-gear-red", 
	"fs-gear-blue", "fs-gear-orange", 'fs-speedo', "fs-magnifier", 
	"fs-tablet-chart", "fs-stopwatch", "fs-bulb", "fs-page-2-center", 
	"fs-screwdriver", "fs-penсil", "fs-a4-graph", "fs-page-1-left", 
	"fs-page-3-right", "fs-key", "fs-mobile-phone", "fs-text-code"];

	for (let i = 0, len = fs_items.length; i < len; i++) {

		if( svgDoc.getElementById( fs_items[i] ) != null ){

			;
			fs_elements.push(  svgDoc.getElementById( fs_items[i] )  );

		}

	}  


	initialization_svg(  fs_elements  );

	document.getElementById("fs-svg").style.opacity = 1;

	animation_svg(  fs_elements  );

};

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

function animate({duration, timing, draw}) {

	let start = performance.now();

	requestAnimationFrame(function animate_frame(time) {

		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		let progress = timing(timeFraction)

		draw(progress);

		if (timeFraction < 1) {

			requestAnimationFrame(animate_frame);

		}

	});
}

function animation_svg(  fs_elements  ){

	for ( let j = 0,  lenh = fs_elements.length; j < lenh; j++) {

		if( fs_elements[j] !== undefined ){

			setTimeout(
				animate, 
				200*j,
				{

									duration: 1000,

									timing: bounceEaseOut,				

									// timing: function(timeFraction) {
									// 	return  Math.pow(timeFraction, 1.5);
									// },

									draw: function(progress) {
										
										fs_elements[j].style.opacity = progress;

										// matrix(  scaleX(), skewY(), skewX() ,scaleY() ,translateX() ,translateY()  )

										fs_elements[j].style.transform  = "matrix("+ progress +","+ (0.5-progress/2) +","+ (0.2-progress/5) +", "+progress +","+ (250- 250*progress) +","+ (-100 + 100*progress) +")";
									}
				});
		}
	}
}



function initialization_svg( fs_elements ){


	for (let k = 0, leng = fs_elements.length; k < leng; k++) {

		if(  fs_elements[k] != null ){

			fs_elements[k].style.opacity = 0;
		   //matrix(  scaleX(), skewY(), skewX() ,scaleY() ,translateX() ,translateY()  )
		   fs_elements[k].style.transform  = "matrix(  0, 0, 0, 0, 250, -100  )";
		}

	}

}





function makeEaseOut(timing) {
	return function(timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}

function bounce(timeFraction) {
	for (let a = 0, b = 1; 1; a += b, b /= 2) {
		if (timeFraction >= (7 - 4 * a) / 11) {
			return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
		}
	}
}

let bounceEaseOut = makeEaseOut(bounce);
