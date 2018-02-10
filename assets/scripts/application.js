
function ready(){

}
document.addEventListener("DOMContentLoaded", ready);



window.onload = function() {

	var svgDoc 						= document.getElementById("fs-svg").contentDocument;
	var fs_items					= ["fs-wordpress-monitor", "fs-notebook-graph", "fs-gear-red", 
	"fs-gear-blue", "fs-gear-orange", 'fs-speedo', "fs-magnifier", 
	"fs-tablet-chart", "fs-stopwatch", "fs-bulb", "fs-page-2-center", 
	"fs-screwdriver", "fs-penсil", "fs-a4-graph", "fs-page-1-left", 
	"fs-page-3-right", "fs-key", "fs-mobile-phone", "fs-text-code"];

	var fs_elements = [];

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

function animate(duration, timing, draw) {

	let start = performance.now();

	requestAnimationFrame(function animate(time) {

		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		let progress = timing(timeFraction)

		draw(progress);

		if (timeFraction < 1) {

			requestAnimationFrame(animate);

		}

	});
}

function animation_svg(  fs_elements  ){

	for ( let j = 0,  lenh = fs_elements.length; j < lenh; j++) {

		if( fs_elements[j] !== undefined ){

			animate(

				1000,

				function(timeFraction) {
					return timeFraction;
				},

				function(progress) {
					
					fs_elements[j].style.opacity = progress;
				
					// matrix(  scaleX(), skewY(), skewX() ,scaleY() ,translateX() ,translateY()  )
	
					fs_elements[j].style.transform  = "matrix("+ progress +", 0, 0, "+progress +","+ (2500 - 2500*progress) +","+ (-1000 + 1000 * progress) +")";
				}
			);
		}
	}
}



function initialization_svg( fs_elements ){


	for (let k = 0, leng = fs_elements.length; k < leng; k++) {

		if(  fs_elements[k] != null ){

			fs_elements[k].style.opacity = 0;
		   //matrix(  scaleX(), skewY(), skewX() ,scaleY() ,translateX() ,translateY()  )
			fs_elements[k].style.transform  = "matrix(  0, 0, 0, 0, 2500, -1000  )";
		}

	}

	  //	var  fs_wordpress_monitor 		= svgDoc.getElementById("fs-wordpress-monitor"),
	  //       fs_notebook_graph 			= svgDoc.getElementById("fs-notebook-graph"),
	  //       fs_gear_red 				= svgDoc.getElementById("fs-gear-red"),
	  //       fs_gear_blue				= svgDoc.getElementById("fs-gear-blue"),
	  //       fs_gear_blue				= svgDoc.getElementById("fs-gear-orange"),
	  //       fs_speedo					= svgDoc.getElementById('fs-speedo'),
	  //       fs_magnifier 				= svgDoc.getElementById("fs-magnifier"),
	  //       fs_tablet_chart				= svgDoc.getElementById("fs-tablet-chart"),
	  //       fs_stopwatch				= svgDoc.getElementById("fs-stopwatch"),
	  //       fs_bulb 					= svgDoc.getElementById("fs-bulb"),
	  //       fs_page_2_center 			= svgDoc.getElementById("fs-page-2-center"),
	  //       fs_screwdriver 				= svgDoc.getElementById("fs-screwdriver"),
	  //       fs_penсil_ 					= svgDoc.getElementById("fs-penсil"),
	  //       fs_a4_graph 				= svgDoc.getElementById("fs-a4-graph"),
	  //       fs_page_1_left 				= svgDoc.getElementById("fs-page-1-left"),
	  //       fs_page_3_right				= svgDoc.getElementById("fs-page-3-right"),
	  //       fs_key 						= svgDoc.getElementById("fs-key"),
	  //       fs_mobile_phone 			= svgDoc.getElementById("fs-mobile-phone"),
	  //       fs_text_code 				= svgDoc.getElementById("fs-text-code");

	}



