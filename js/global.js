//! annyang
//! version : 1.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
(function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #00f;",k=/\s*\((.*?)\)\s*/g,l=/(\(\?:[^)]+\))\?/g,m=/(\(\?)?:\w+/g,n=/\*\w+/g,o=/[\-{}\[\]+?.,\\\^$|#]/g,p=function(a){return a=a.replace(o,"\\$&").replace(k,"(?:$1)?").replace(m,function(a,b){return b?a:"([^\\s]+)"}).replace(n,"(.*?)").replace(l,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},q=function(a){a.forEach(function(a){a.callback.apply(a.context)})},r=function(){d===a&&b.annyang.init({},!1)};b.annyang={init:function(k,l){l=l===a?!0:!!l,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous=!0,d.lang="en-US",d.onstart=function(){q(g.start)},d.onerror=function(a){switch(q(g.error),a.error){case"network":q(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,(new Date).getTime()-h<200?q(g.errorPermissionBlocked):q(g.errorPermissionDenied)}},d.onend=function(){if(q(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){q(g.result);for(var c,d=a.results[a.resultIndex],e=0;e<d.length;e++){c=d[e].transcript.trim(),i&&b.console.log("Speech recognized: %c"+c,j);for(var h=0,k=f.length;k>h;h++){var l=f[h].command.exec(c);if(l){var m=l.slice(1);return i&&(b.console.log("command matched: %c"+f[h].originalPhrase,j),m.length&&b.console.log("with parameters",m)),f[h].callback.apply(this,m),q(g.resultMatch),!0}}}return q(g.resultNoMatch),!1},l&&(f=[]),k.length&&this.addCommands(k)},start:function(b){r(),b=b||{},e=b.autoRestart!==a?!!b.autoRestart:!0,h=(new Date).getTime(),d.start()},abort:function(){r(),e=!1,d.abort()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){r(),d.lang=a},addCommands:function(a){var c,d;r();for(var e in a)if(a.hasOwnProperty(e)){if(c=b[a[e]]||a[e],"function"!=typeof c)continue;d=p(e),f.push({command:d,callback:c,originalPhrase:e})}i&&b.console.log("Commands successfully loaded: %c"+f.length,j)},removeCommands:function(a){a=Array.isArray(a)?a:[a],f=f.filter(function(b){for(var c=0;c<a.length;c++)if(a[c]===b.originalPhrase)return!1;return!0})},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);

/*! tinysort.js
 * version: 2.0.100
 * author: Ron Valstar
 * license: MIT/GPL
 * build: 2014-12-31
 */
var tinysort=function(a){"use strict";function b(b){function g(){0===arguments.length?k({}):e(arguments,function(a){k(d(a)?{selector:a}:a)}),o=B.length}function k(a){var b=!!a.selector,c=b&&":"===a.selector[0],d=f(a||{},r);B.push(f({bFind:b,bAttr:!(d.attr===i||""===d.attr),bData:d.data!==i,bFilter:c,mFilter:i,fnSort:d.sortFunction,iAsc:"asc"===d.order?1:-1},d))}function q(){e(b,function(a,b){w?w!==a.parentNode&&(C=!1):w=a.parentNode;var c=B[0],d=c.bFilter,e=c.selector,f=!e||d&&a.matchesSelector(e)||e&&a.querySelector(e),g=f?z:A,h={elm:a,pos:b,posn:g.length};y.push(h),g.push(h)}),v=z.slice(0)}function s(){z.sort(t)}function t(b,f){var g=0;for(0!==p&&(p=0);0===g&&o>p;){var i=B[p],k=i.ignoreDashes?m:l;if(e(n,function(a){var b=a.prepare;b&&b(i)}),i.sortFunction)g=i.sortFunction(b,f);else if("rand"==i.order)g=Math.random()<.5?1:-1;else{var q=h,r=c(b,i),s=c(f,i);if(!i.forceStrings){var t=d(r)?r&&r.match(k):h,u=d(s)?s&&s.match(k):h;if(t&&u){var v=r.substr(0,r.length-t[0].length),w=s.substr(0,s.length-u[0].length);v==w&&(q=!h,r=j(t[0]),s=j(u[0]))}}g=r===a||s===a?0:i.iAsc*(s>r?-1:r>s?1:0)}e(n,function(a){var b=a.sort;b&&(g=b(i,q,r,s,g))}),0===g&&p++}return 0===g&&(g=b.pos>f.pos?1:-1),g}function u(){var a=z.length===y.length;C&&a?(z.forEach(function(a){x.appendChild(a.elm)}),w.appendChild(x)):(z.forEach(function(a){var b=a.elm,c=document.createElement("div");a.ghost=c,b.parentNode.insertBefore(c,b)}),z.forEach(function(a,b){var c=v[b].ghost;c.parentNode.insertBefore(a.elm,c),c.parentNode.removeChild(c)}))}d(b)&&(b=document.querySelectorAll(b)),0===b.length&&console.warn("No elements to sort");var v,w,x=document.createDocumentFragment(),y=[],z=[],A=[],B=[],C=!0;return g.apply(i,Array.prototype.slice.call(arguments,1)),q(),s(),u(),z.map(function(a){return a.elm})}function c(a,b){var c,e=a.elm;return b.selector&&(b.bFilter?e.matchesSelector(b.selector)||(e=i):e=e.querySelector(b.selector)),b.bAttr?c=e.getAttribute(b.attr):b.useVal?c=e.value:b.bData?c=e.getAttribute("data-"+b.data):e&&(c=e.textContent),d(c)&&!b.cases&&(c=c.toLowerCase()),c}function d(a){return"string"==typeof a}function e(a,b){for(var c,d=a.length,e=d;e--;)c=d-e-1,b(a[c],c)}function f(b,c,d){for(var e in c)(d||b[e]===a)&&(b[e]=c[e]);return b}function g(a,b,c){n.push({prepare:a,sort:b,sortBy:c})}var h=!1,i=null,j=parseFloat,k=Array.prototype.indexOf,l=/(-?\d+\.?\d*)$/g,m=/(\d+\.?\d*)$/g,n=[],o=0,p=0,q="2.0.100",r={selector:i,order:"asc",attr:i,data:i,useVal:h,place:"start",returns:h,cases:h,forceStrings:h,ignoreDashes:h,sortFunction:i};return f(g,{indexOf:k,loop:e}),f(b,{plugin:g,version:q,defaults:r})}();!function(){"use strict";window.Element&&function(a){a.matchesSelector=a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector||function(a){for(var b=this,c=(b.parentNode||b.document).querySelectorAll(a),d=-1;c[++d]&&c[d]!=b;);return!!c[d]}}(Element.prototype)}();


$(function(){
// keyMaker.js, Copyright 2015, Bob Wadholm, MIT & GPL
var keyMaker= function(num) { // Creates a unique id of specified length (number)
	var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'];				
	var uuidA = [];
	var i=0;
	while(i<num) {
		uuidA.push(letters[Math.floor(Math.random()*26)]);
		i++;
	};
	return uuidA.join('');	
};
currentFun = '';
currentVar = '';
	if (annyang) {
	  	// Let's define our first command. First the text we expect, and then the function it should call
	  	var commands = {
	  	'*term': function(a){
			$('#stream').append(a +' <br>');
			var wholeText = $('#stream').text(); // Get all text
			// Find high frequency words
			var countEm = function(){
				$('#analysis').html('');
				var wordArray = [];
				var wordObject = {};
				var dumbWords = ["a","about","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can","can't","cannot","could","couldn't","did","didn't","do","don't","does","doesn't","doing","don't","down","during","each","ed","few","for","from","further","had","hadn't","has","hasn't","hast","hath","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","just","let's","me","more","most","mustn't","my","myself","nd","no","nor","not","o","oh","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","s","same","see","shall","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","sure","than","that","that's","that’s","the","thee","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","thou","thy","through","to","too","under","until","up","us","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","will","with","won't","would","wouldn't","ye","you","yeah","you'd","you'll","you're","you've","your","yours","yourself","yourselves","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"," "];
				var minFrequency = 2;
				var frequentWhole = wholeText;
				wordArray = frequentWhole.split(" "); // Create array out of text
				var totalWordCount = wordArray.length;
				
				// Get all of the words from the array, and create
				// an object that lists all of the occurences of the
				// words in the text.
				$.each(wordArray, function (i, v) {
					// Don't count words that are too common
					v = v.toLowerCase();
					if (dumbWords.indexOf(v) === -1 && v !== '') {
						if (wordObject[v]) {
							wordObject[v].push(i);
						} else {
							wordObject[v] = [];
							wordObject[v].push(i);
						}
					}
				});
				var totalWordsUsed = 0;		
				$.each(wordObject, function (i) {
					// Delete all words that occur less than the specified number of times						
					if (wordObject[i].length < minFrequency) {
						delete wordObject[i];
					} 
					totalWordsUsed++;
				});
				for(var property in wordObject){
					var howCommon = (5 * wordObject[property].length);
					$('#analysis').append('<span class="singleResult" data-num="'+ wordObject[property].length +'"><span class="count" style="width:'+ howCommon +'px" title="The word &quot;'+ property +'&quot; appears in the text '+ wordObject[property].length +' times" >'+ wordObject[property].length +'</span>'+ property +'</span>');
				}
				if($('div#analysis>span.singleResult').length){
					tinysort('div#analysis>span.singleResult',{attr:'data-num', order: 'desc'}); // Sort results
				}
				$('#analysis').prepend('<p><b>Total words:</b> '+ totalWordCount.toLocaleString() +'</p>');
			};
			countEm();
		}
	  };
	
	  // Add our commands to annyang
	  annyang.addCommands(commands);
	  	
	  // Start listening. You can call this here, or attach this call to an event, button, etc.
	  annyang.start();	  
	}
});