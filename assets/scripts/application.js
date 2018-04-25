
let w = window.outerWidth;
let h = window.innerHeight;
function ready(){
	
}
document.addEventListener("DOMContentLoaded", ready);


window.onload = function() {	

/*                                                                                                     
     __  __     __      __         __  __  __  __                         __      ___ __    ___ __                  __  
 /\ |  \|  \   /__`|   /  \|  |   /__`/  `|__)/  \|   |      |__| /\ |\ ||  \|   |__ |__)    | /  \   |   ||\ ||__//__` 
/~~\|__/|__/   .__/|___\__/|/\|   .__/\__,|  \\__/|___|___   |  |/~~\| \||__/|___|___|  \    | \__/   |___|| \||  \.__/ 

*/
	// var Anchors = document.getElementsByTagName("a");
	var Anchors = document.querySelectorAll(  "a[href^='#']"  );

	for (var i = 0; i < Anchors.length ; i++) {

	    Anchors[i].addEventListener("click", smoothScroll, false);
	}

};



(function() {
	// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
	if (!String.prototype.trim) {
		(function() {
			// Make sure we trim BOM and NBSP
			var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
			String.prototype.trim = function() {
				return this.replace(rtrim, '');
			};
		})();
	}

	[].slice.call( document.querySelectorAll( 'input.input__field__email' ) ).forEach( function( inputEl ) {
		// in case the input is already filled..
		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'input--filled' );
		}

		// events:
		inputEl.addEventListener( 'focus', onInputFocus );
		inputEl.addEventListener( 'blur', onInputBlur );
	} );

	function onInputFocus( ev ) {
		classie.add( ev.target.parentNode, 'input--filled' );
	}

	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			classie.remove( ev.target.parentNode, 'input--filled' );
		}
	}


})();

