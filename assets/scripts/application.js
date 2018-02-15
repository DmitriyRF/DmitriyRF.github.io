
let w = window.outerWidth;
let h = window.innerHeight;
function ready(){
	document.getElementsByClassName("first-screen")[0].style.minHeight = h-56+"px";
}
document.addEventListener("DOMContentLoaded", ready);

var svgDoc, fs_items;

var fs_elements = [];

window.onload = function() {

	svgDoc 						= document.getElementById("fs-svg").contentDocument;
	fs_items					=	[
										"fs-a4-graph", 
										"fs-text-code",
										"fs-tablet-chart", 
										"fs-page-3-right", 
										"fs-mobile-phone", 
										"fs-magnifier", 
										"fs-page-2-center", 
										"fs-key", 
										"fs-screwdriver", 
										"fs-wordpress-monitor", 
										"fs-bulb", 
										"fs-stopwatch", 
										"fs-penсil", 
										"fs-notebook-graph", 
										"fs-gear-orange", 
										"fs-gear-blue", 
										"fs-gear-red", 
										'fs-speedo', 
										"fs-page-1-left", 
									];

	for (let i = 0, len = fs_items.length; i < len; i++) {

		if( svgDoc.getElementById( fs_items[i] ) != null ){

			;
			fs_elements.push(  svgDoc.getElementById( fs_items[i] )  );

		}

	}  


	initialization_svg(  fs_elements  );

	// document.getElementById("fs-svg").style.width = "100%";
	document.getElementById("fs-svg").style.height = h + "px";
	document.getElementById("fs-svg").style.opacity = 1;

	animation_svg(  fs_elements  );

	createPathSVG();

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

function animation_svg(  fs_elements  ){

	var cb = function(){};

	for ( let j = 0,  lenh = fs_elements.length; j < lenh; j++) {

		if( fs_elements[j] !== undefined ){

			if(  lenh-1 === j ){
				cb = fs_callback;
			}

			setTimeout(
				animate, 
				150*j,
				{

									duration: 2000,

									timing: bounceEaseOut,				

									// timing: function(timeFraction) {
									// 	return  Math.pow(timeFraction, 1.5);
									// },

									draw: function(progress) {
										
										fs_elements[j].style.opacity = progress;

										// matrix(  scaleX(), skewY(), skewX() ,scaleY() ,translateX() ,translateY()  )

										fs_elements[j].style.transform  = "matrix("+ progress +","+ (0.5-progress/2) +","+ (0.2-progress/5) +", "+progress +","+ (250- 250*progress) +","+ (-100 + 100*progress) +")";
									},
									callback:  cb

				}
			);
		}
	}
}
function fs_callback(){

		animate(
				{

					duration: 1500,

					timing: bounceEaseOut,				

					// timing: function(timeFraction) {
					// 	return  Math.pow(timeFraction, 1.5);
					// },

					draw: function(progress) {
						document.getElementById("fs-svg").style.width = 100 - 50*progress +"%";
					}, 
					callback: animation_svg_content
				}
		);
		document.getElementById("fs-svg").style.float = "right";

}

function animation_svg_content(){

	document.getElementById("fs-content").style.display = "block";

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




function createPathSVG(){

	var linesSection = document.getElementById('block-line-svg');

	var The_line_SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");  

		The_line_SVG.setAttributeNS(null, "id", "the-line");  
		The_line_SVG.setAttributeNS(null, "width", "100%");  
		The_line_SVG.setAttributeNS(null, "height", h*3+"px"); 

	var the_line_Path = document.createElementNS("http://www.w3.org/2000/svg", "path"); 

		the_line_Path.setAttributeNS(null, "id", "the-line-path");  
		the_line_Path.setAttributeNS(null, "d", getLineOfPath()  );  
		the_line_Path.setAttributeNS(null, "stroke", "black"); 
		the_line_Path.setAttributeNS(null, "stroke-width", 40);  
		the_line_Path.setAttributeNS(null, "opacity", 1);  
		the_line_Path.setAttributeNS(null, "fill", "none");

		linesSection.appendChild(The_line_SVG);

		The_line_SVG.appendChild(the_line_Path);

		ScrollFillLineOfPath({ Anim_Path: the_line_Path, wrapper: linesSection})


}

function ScrollFillLineOfPath({Anim_Path, wrapper}){

	var totalLenghtPath	= Anim_Path.getTotalLength();

		Anim_Path.style.strokeDasharray = totalLenghtPath + ', ' + totalLenghtPath;
		Anim_Path.style.strokeDashoffset = totalLenghtPath;

	window.addEventListener('scroll', onScroll, false);
}
var latestKnownScrollY = 0,
				ticking = false;

function onScroll() {

	latestKnownScrollY = window.scrollY;

	 updatePath();
}

function updatePath() {

	if(!ticking) {
	requestAnimationFrame(updatePath);
	}else{
		ticking = true;
	}

	var currentScrollY = latestKnownScrollY;

}



function getLineOfPath(){

	let tw= Math.round(w/4); 
	let D = "";
	let hl = h/2;

		D += "M"+ (3*tw) +",0";
		D += "v"+hl;
		D += "q 0,50 -50,50";
		D += "h-"+2*tw;
		D += "q -50,0 -50,50";
		D += "v"+hl;
		D += "q 0,50 50,50";
		D += "h"+2*tw;
		D += "q 50,0 50,50";
		D += "v"+hl;
		D += "q 0,50 -50,50";
		D += "h-"+2*tw;
		D += "q -50,0 -50,50";
		D += "v"+hl;
		D += "q 0,50 50,50";
		D += "h"+2*tw;
		D += "q 50,0 50,50";
		D += "v"+hl;
		D += "q 0,50 -50,50";
		D += "h-"+2*tw;
		D += "q -50,0 -50,50";
		D += "v"+hl;


		// D += " z";
		
		return D;

}

