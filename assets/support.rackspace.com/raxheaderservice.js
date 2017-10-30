!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.injectTemplate=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],2:[function(require,module,exports){
/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));

},{}],3:[function(require,module,exports){
module.exports = require('cssify');
},{"cssify":1}],4:[function(require,module,exports){
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}],5:[function(require,module,exports){
module.exports = require('sassify').byUrl('data:text/css;base64,LyogU1RBUlQgSGVhZGVyIFJlc2V0IC0tIGJhc2VkIG9uIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIHYyLjBiMSB8IDIwMTEwMSAqLwojcmF4LXN1cHBvcnQtaGVhZGVyIHsKICBsaW5lLWhlaWdodDogMTsKICAvKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovIH0KICAjcmF4LXN1cHBvcnQtaGVhZGVyIGRpdiwgI3JheC1zdXBwb3J0LWhlYWRlciB1bCwgI3JheC1zdXBwb3J0LWhlYWRlciBsaSwgI3JheC1zdXBwb3J0LWhlYWRlciBoMSwgI3JheC1zdXBwb3J0LWhlYWRlciBwLCAjcmF4LXN1cHBvcnQtaGVhZGVyIGEsICNyYXgtc3VwcG9ydC1oZWFkZXIgc3Ryb25nLCAjcmF4LXN1cHBvcnQtaGVhZGVyIGhlYWRlciwgI3JheC1zdXBwb3J0LWhlYWRlciBmb3JtLCAjcmF4LXN1cHBvcnQtaGVhZGVyIGFydGljbGUsICNyYXgtc3VwcG9ydC1oZWFkZXIgYXNpZGUsICNyYXgtc3VwcG9ydC1oZWFkZXIgbmF2LCAjcmF4LXN1cHBvcnQtaGVhZGVyIHNlY3Rpb24gewogICAgbWFyZ2luOiAwOwogICAgcGFkZGluZzogMDsKICAgIGJvcmRlcjogMDsKICAgIG91dGxpbmU6IDA7CiAgICBmb250LXNpemU6IDEwMCU7CiAgICBmb250OiBpbmhlcml0OwogICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lOyB9CiAgI3JheC1zdXBwb3J0LWhlYWRlciBvbCwgI3JheC1zdXBwb3J0LWhlYWRlciB1bCB7CiAgICBsaXN0LXN0eWxlOiBub25lOyB9CiAgI3JheC1zdXBwb3J0LWhlYWRlciBhcnRpY2xlLCAjcmF4LXN1cHBvcnQtaGVhZGVyIGFzaWRlLCAjcmF4LXN1cHBvcnQtaGVhZGVyIGhlYWRlciwgI3JheC1zdXBwb3J0LWhlYWRlciBuYXYsICNyYXgtc3VwcG9ydC1oZWFkZXIgc2VjdGlvbiB7CiAgICBkaXNwbGF5OiBibG9jazsgfQoKLyogRU5EIEhlYWRlciBSZXNldCAqLwovKiBCYXNpYyBDbGVhcmZpeCAqLwoucmF4LWNsZWFyZml4IHsKICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH0KICAucmF4LWNsZWFyZml4OmFmdGVyIHsKICAgIGNvbnRlbnQ6ICcuJzsKICAgIGRpc3BsYXk6IGJsb2NrOwogICAgaGVpZ2h0OiAwOwogICAgY2xlYXI6IGJvdGg7CiAgICB2aXNpYmlsaXR5OiBoaWRkZW47IH0KCi8qIEhpZGVzIGZyb20gSUUtbWFjIFwqLwouaWU2IC5yYXgtY2xlYXJmaXggewogIGhlaWdodDogMSU7IH0KCi5yYXgtY2xlYXJmaXggewogIGRpc3BsYXk6IGJsb2NrOyB9CgovKiBFbmQgaGlkZSBmcm9tIElFLW1hYyAqLwoubGF5b3V0LXJlZ2lvbi1pbm5lci5jb250ZW50IC5zdXBwb3J0LXJlc3VsdHMtY29udGFpbmVyIGg0IHsKICBtYXJnaW4tdG9wOiA1cHg7IH0KCiNjb250ZW50LXdyYXBwZXIgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgewogIHBhZGRpbmctbGVmdDogMDsKICBtYXJnaW4tbGVmdDogMDsgfQoKI21haW4tY29udGVudCAjY29udGFpbmVyIC5zdXBwb3J0LXJlc3VsdHMtY29udGFpbmVyIHVsLnN1cHBvcnQtY29udGVudC1maWx0ZXIgewogIG1hcmdpbi1sZWZ0OiAwOyB9CgojY29udGVudC13cmFwcGVyIC5zdXBwb3J0LXJlc3VsdHMtY29udGFpbmVyIHVsLnN1cHBvcnQtY29udGVudC1maWx0ZXIgbGkgewogIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgJ0hlbHZldGljYU5ldWUnLCAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmOwogIGZvbnQtd2VpZ2h0OiA0MDA7CiAgZm9udC1zaXplOiAxNHB4OwogIGxpbmUtaGVpZ2h0OiAxNnB4OwogIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsKICBtYXJnaW4tYm90dG9tOiAyNXB4OwogIHBhZGRpbmc6IDA7IH0KCiNtYWluLWNvbnRlbnQgLmNvbnRhaW5lciAuc3VwcG9ydC1yZXN1bHRzLWNvbnRhaW5lciBoNCB7CiAgcGFkZGluZy10b3A6IDI1cHg7CiAgZm9udC1mYW1pbHk6ICdTb3VyY2UgU2FucyBQcm8nLCAnSGVsdmV0aWNhTmV1ZScsICdIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7CiAgZm9udC13ZWlnaHQ6IDMwMDsKICBjb2xvcjogIzY2NjsKICBmb250LXNpemU6IDI0cHg7CiAgbWFyZ2luLWJvdHRvbTogMjBweDsgfQoKI2NvbnRlbnQtd3JhcHBlciAuc3VwcG9ydC1yZXN1bHRzLWNvbnRhaW5lciAjc2VhcmNoLXJlc3VsdHMgaDUgewogIGZvbnQtZmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywgJ0hlbHZldGljYU5ldWUnLCAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmOwogIGZvbnQtd2VpZ2h0OiA0MDA7CiAgZm9udC1zaXplOiAxNnB4OwogIGxpbmUtaGVpZ2h0OiAxNnB4OwogIG1hcmdpbi1ib3R0b206IDVweDsgfQoKI2NvbnRlbnQtd3JhcHBlciAuc3VwcG9ydC1yZXN1bHRzLWNvbnRhaW5lciAjc2VhcmNoLXJlc3VsdHMgcCB7CiAgZm9udC1mYW1pbHk6ICdTb3VyY2UgU2FucyBQcm8nLCAnSGVsdmV0aWNhTmV1ZScsICdIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7CiAgZm9udC13ZWlnaHQ6IDMwMDsKICBmb250LXNpemU6IDE0cHg7CiAgbGluZS1oZWlnaHQ6IDE2cHg7CiAgbWFyZ2luOiAwIDAgNXB4OwogIGNvbG9yOiAjNjY2OyB9CgojY29udGVudC13cmFwcGVyIC5zdXBwb3J0LXJlc3VsdHMtY29udGFpbmVyICNzZWFyY2gtcmVzdWx0cyBwLm1ldGEgewogIGZvbnQtZmFtaWx5OiAnU291cmNlIFNhbnMgUHJvJywgJ0hlbHZldGljYU5ldWUnLCAnSGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmOwogIGZvbnQtd2VpZ2h0OiA0MDA7CiAgZm9udC1zaXplOiAxMnB4OwogIGxpbmUtaGVpZ2h0OiAxNnB4OwogIG1hcmdpbi1ib3R0b206IDIwcHg7IH0KCiNjb250ZW50LXdyYXBwZXIgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgcC5zdXBwb3J0LXJlc3VsdHMtbW9yZSB7CiAgbWFyZ2luOiA0MHB4IDA7CiAgZm9udC13ZWlnaHQ6IDQwMDsKICBmb250LXN0eWxlOiBpdGFsaWM7CiAgZm9udC1zaXplOiAxNnB4OyB9CgovKiBGT1IgU1VQUE9SVCBIVUIgKi8KI2NvbnRhaW5lciAuc3VwcG9ydC1yZXN1bHRzLWNvbnRhaW5lciB7CiAgd2lkdGg6IDk2MHB4OwogIG1hcmdpbjogMCBhdXRvOyB9Cgouc3VwcG9ydC1yZXN1bHRzLWNvbnRhaW5lciBoNCB7CiAgZm9udC1mYW1pbHk6ICdTb3VyY2UgU2FucyBQcm8nLCAnSGVsdmV0aWNhTmV1ZScsICdIZWx2ZXRpY2EgTmV1ZScsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7CiAgZm9udC13ZWlnaHQ6IDMwMDsKICBjb2xvcjogIzY2NjsKICBmb250LXNpemU6IDI0cHg7CiAgbWFyZ2luLWJvdHRvbTogMjBweDsgfQoKLyogRk9SIEtDICovCiNjb250ZW50ICNjb250ZW50LXdyYXAgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgaDQgewogIG1hcmdpbi10b3A6IDVweDsgfQoKLyogRU5EIEFkanVzdG1lbnRzICovCi51aS1hdXRvY29tcGxldGUudWktY29ybmVyLWFsbCB7CiAgYm9yZGVyLXJhZGl1czogMDsKICBib3JkZXItd2lkdGg6IDA7IH0KCi51aS1hdXRvY29tcGxldGUudWktY29ybmVyLWFsbCBsaS51aS1tZW51LWl0ZW0gewogIGJvcmRlci1yYWRpdXM6IDA7CiAgY29sb3I6ICM2NjY7CiAgbGluZS1oZWlnaHQ6IDEuNjsgfQoKLnVpLWF1dG9jb21wbGV0ZS51aS1jb3JuZXItYWxsIGxpLnVpLW1lbnUtaXRlbSBhLnVpLWNvcm5lci1hbGwsCi51aS1hdXRvY29tcGxldGUudWktY29ybmVyLWFsbCBsaS51aS1tZW51LWl0ZW0gYS51aS1jb3JuZXItYWxsOmhvdmVyIHsKICBib3JkZXItcmFkaXVzOiAwOwogIHBhZGRpbmc6IDdweCAxMHB4OwogIGJvcmRlci13aWR0aDogMDsKICBmb250LXNpemU6IDE0cHg7CiAgZm9udC13ZWlnaHQ6IDMwMDsKICBtYXJnaW46IDA7IH0KCmEgewogIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuMTVzIGVhc2U7CiAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4xNXMgZWFzZTsKICB0cmFuc2l0aW9uOiBhbGwgMC4xNXMgZWFzZTsgfQoKI3JheC1zdXBwb3J0LWhlYWRlciB7CiAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OwogIC8qIFNhZmFyaS9DaHJvbWUsIG90aGVyIFdlYktpdCAqLwogIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDsKICAvKiBGaXJlZm94LCBvdGhlciBHZWNrbyAqLwogIGJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgLyogSUUgOCsgKi8KICB3aWR0aDogMTAwJTsKICBtaW4td2lkdGg6IDk2MHB4OwogIHotaW5kZXg6IDEwMDA7CiAgcG9zaXRpb246IHJlbGF0aXZlOwogIGZvbnQtZmFtaWx5OiAiVGl0aWxsaXVtIFdlYiIsICJIZWx2ZXRpY2FOZXVlIiwgIkhlbHZldGljYSBOZXVlIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsKICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDsKICAvKiBGaXggZm9yIHdlYmtpdCByZW5kZXJpbmcgKi8KICAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IDEwMCU7IH0KICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyIHsKICAgIHdpZHRoOiAxMDAlOwogICAgcGFkZGluZzogMTVweCAwOyB9CiAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgewogICAgICB3aWR0aDogOTYwcHg7CiAgICAgIG1hcmdpbjogMCBhdXRvOwogICAgICBmb250LWZhbWlseTogIk9wZW4gU2FucyIsICJIZWx2ZXRpY2FOZXVlIiwgIkhlbHZldGljYSBOZXVlIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsKICAgICAgZm9udC13ZWlnaHQ6IDYwMDsKICAgICAgZm9udC1zaXplOiAxMHB4OwogICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyB9CiAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1leWVicm93LXdyYXBwZXIgI3JheC1leWVicm93LWNvbnRhaW5lciAjcmF4LWV5ZWJyb3ctdXRpbGl0eSB7CiAgICAgICAgZmxvYXQ6IGxlZnQ7IH0KICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgI3JheC1leWVicm93LXV0aWxpdHkgdWwgbGkgewogICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9CiAgICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgI3JheC1leWVicm93LXV0aWxpdHkgdWwgbGkgYSB7CiAgICAgICAgICAgIGNvbG9yOiAjNDE0MTQxOwogICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7CiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDsKICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMTBweDsKICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgIzQxNDE0MTsgfQogICAgICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgI3JheC1leWVicm93LXV0aWxpdHkgdWwgbGkgYTpob3ZlciB7CiAgICAgICAgICAgICAgY29sb3I6ICMxZTgyZDc7IH0KICAgICAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1leWVicm93LXdyYXBwZXIgI3JheC1leWVicm93LWNvbnRhaW5lciAjcmF4LWV5ZWJyb3ctdXRpbGl0eSB1bCBsaTpsYXN0LWNoaWxkIGEgewogICAgICAgICAgICBib3JkZXItcmlnaHQtd2lkdGg6IDA7IH0KICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LWV5ZWJyb3ctd3JhcHBlciAjcmF4LWV5ZWJyb3ctY29udGFpbmVyICNyYXgtZXllYnJvdy1zdGF0dXMgewogICAgICAgIG1hcmdpbi1sZWZ0OiA4cHg7CiAgICAgICAgZmxvYXQ6IHJpZ2h0OyB9CiAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1leWVicm93LXdyYXBwZXIgI3JheC1leWVicm93LWNvbnRhaW5lciAjcmF4LWV5ZWJyb3ctc2lnbnVwLCAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgI3JheC1leWVicm93LWxvZ2luIHsKICAgICAgICBtYXJnaW4tbGVmdDogOHB4OwogICAgICAgIGZsb2F0OiByaWdodDsgfQogICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgI3JheC1leWVicm93LXN0YXR1cyBhIHsKICAgICAgICBjb2xvcjogIzQxNDE0MTsKICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH0KICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgI3JheC1leWVicm93LXN0YXR1cyBhOmhvdmVyIHsKICAgICAgICAgIGNvbG9yOiAjMWU4MmQ3OyB9CiAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1leWVicm93LXdyYXBwZXIgI3JheC1leWVicm93LWNvbnRhaW5lciAjcmF4LWV5ZWJyb3ctc2lnbnVwLnJheC1kcm9wZG93bi1tZW51IHNwYW4ucmF4LWJ0biwKICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LWV5ZWJyb3ctd3JhcHBlciAjcmF4LWV5ZWJyb3ctY29udGFpbmVyICNyYXgtZXllYnJvdy1zaWdudXAucmF4LWRyb3Bkb3duLW1lbnUgPiB1bCA+IGxpID4gdWwgewogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM1YWFhMjg7IH0KICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LWV5ZWJyb3ctd3JhcHBlciAjcmF4LWV5ZWJyb3ctY29udGFpbmVyICNyYXgtZXllYnJvdy1sb2dpbi5yYXgtZHJvcGRvd24tbWVudSBzcGFuLnJheC1idG4sCiAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1leWVicm93LXdyYXBwZXIgI3JheC1leWVicm93LWNvbnRhaW5lciAjcmF4LWV5ZWJyb3ctbG9naW4ucmF4LWRyb3Bkb3duLW1lbnUgPiB1bCA+IGxpID4gdWwgewogICAgICAgIGJhY2tncm91bmQtY29sb3I6ICM2NjY7IH0KICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LWV5ZWJyb3ctd3JhcHBlciAjcmF4LWV5ZWJyb3ctY29udGFpbmVyICNyYXgtZXllYnJvdy1zaWdudXAucmF4LWRyb3Bkb3duLW1lbnUgPiB1bCA+IGxpID4gdWwgPiBsaSBhOmhvdmVyIHsKICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjViZjJkOyB9CiAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1leWVicm93LXdyYXBwZXIgI3JheC1leWVicm93LWNvbnRhaW5lciAjcmF4LWV5ZWJyb3ctbG9naW4ucmF4LWRyb3Bkb3duLW1lbnUgPiB1bCA+IGxpID4gdWwgPiBsaSBhOmhvdmVyIHsKICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzM3MzczOyB9CiAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1leWVicm93LXdyYXBwZXIgI3JheC1leWVicm93LWNvbnRhaW5lciAucmF4LWRyb3Bkb3duLW1lbnUgewogICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsgfQogICAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1leWVicm93LXdyYXBwZXIgI3JheC1leWVicm93LWNvbnRhaW5lciAucmF4LWRyb3Bkb3duLW1lbnUgc3Bhbi5yYXgtYnRuIHsKICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7CiAgICAgICAgICBwYWRkaW5nOiA3cHggMjBweDsKICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjsKICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDsKICAgICAgICAgIGNvbG9yOiAjZmZmOyB9CiAgICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LWV5ZWJyb3ctd3JhcHBlciAjcmF4LWV5ZWJyb3ctY29udGFpbmVyIC5yYXgtZHJvcGRvd24tbWVudSA+IHVsID4gbGkgPiB1bCB7CiAgICAgICAgICBkaXNwbGF5OiBub25lOwogICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICAgICAgdG9wOiAxOXB4OwogICAgICAgICAgbGluZS1oZWlnaHQ6IDE4cHg7CiAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7CiAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZjsKICAgICAgICAgIHJpZ2h0OiAwOwogICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKICAgICAgICAgIHotaW5kZXg6IDkwMDsKICAgICAgICAgIHdpZHRoOiBhdXRvOwogICAgICAgICAgbWluLXdpZHRoOiAxMDAlOwogICAgICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4xNXMgbGluZWFyOwogICAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4xNXMgbGluZWFyOwogICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMTVzIGxpbmVhcjsgfQogICAgICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LWV5ZWJyb3ctd3JhcHBlciAjcmF4LWV5ZWJyb3ctY29udGFpbmVyIC5yYXgtZHJvcGRvd24tbWVudSA+IHVsID4gbGkgPiB1bCA+IGxpIHsKICAgICAgICAgICAgbGlzdC1zdHlsZTogbm9uZTsKICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsgfQogICAgICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgLnJheC1kcm9wZG93bi1tZW51ID4gdWwgPiBsaSA+IHVsID4gbGk6Omxhc3QtY2hpbGQgewogICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7IH0KICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy13cmFwcGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgLnJheC1kcm9wZG93bi1tZW51ID4gdWwgPiBsaTpob3ZlciA+IHVsIHsKICAgICAgICAgIGRpc3BsYXk6IGJsb2NrOyB9CiAgICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LWV5ZWJyb3ctd3JhcHBlciAjcmF4LWV5ZWJyb3ctY29udGFpbmVyIC5yYXgtZHJvcGRvd24tbWVudSA+IHVsID4gbGkgPiB1bCA+IGxpIGEgewogICAgICAgICAgY29sb3I6ICNmZmY7CiAgICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICAgIHBhZGRpbmc6IDNweCAxMHB4OwogICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7IH0KICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtc3VwcG9ydC1iYW5uZXItd3JhcHBlciB7CiAgICB3aWR0aDogMTAwJTsKICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCgiaHR0cHM6Ly9kNDM2YzU2ZjVhMDhjNjFjMTA4OS0yZDlmNDViYmRiYjA0YmZhODBiMzk4OWQzZjRjMDhiNS5zc2wuY2Y1LnJhY2tjZG4uY29tL2JnLWhlYWRlci0yZmQwNTNmYmE3Nzg0ZGUyMDllM2FlOTlhYmE2YzQ5N2JmZDE2NTliNDJiZTQ4YmI3ZWY5MTJmY2ZmZmU2MzdjLnBuZyIpOwogICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsKICAgIG1pbi13aWR0aDogOTYwcHg7IH0KICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtc3VwcG9ydC1uYXYtd3JhcHBlciB7CiAgICB3aWR0aDogMTAwJTsKICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7IH0KICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1zdXBwb3J0LW5hdi13cmFwcGVyICNyYXgtc3VwcG9ydC1uYXYtY29udGFpbmVyIHsKICAgICAgd2lkdGg6IDk2MHB4OwogICAgICBtYXJnaW46IDAgYXV0bzsgfQogICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1zdXBwb3J0LWJhbm5lci1jb250YWluZXIgewogICAgd2lkdGg6IDk2MHB4OwogICAgbWFyZ2luOiAwIGF1dG87CiAgICBwYWRkaW5nOiA0NXB4IDA7IH0KICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1zdXBwb3J0LWJhbm5lci1jb250YWluZXIgI3JheC1oZWFkZXItbGluayB7CiAgICAgIGZsb2F0OiBsZWZ0OwogICAgICBjb2xvcjogI2ZmZjsgfQogICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtc3VwcG9ydC1iYW5uZXItY29udGFpbmVyICNyYXgtaGVhZGVyLWxpbmsgaDEgewogICAgICAgIGZvbnQtc2l6ZTogMzVweDsKICAgICAgICBmb250LXdlaWdodDogMzAwOwogICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IH0KICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtc3VwcG9ydC1iYW5uZXItY29udGFpbmVyICNyYXgtaGVhZGVyLWxpbmsgaDEgc3BhbiB7CiAgICAgICAgICBkaXNwbGF5OiBibG9jazsKICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDsKICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7CiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAzcHg7IH0KICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1zdXBwb3J0LWJhbm5lci1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaC1jb250YWluZXIgewogICAgICBmbG9hdDogcmlnaHQ7CiAgICAgIHdpZHRoOiA1ODBweDsgfQogICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtc3VwcG9ydC1iYW5uZXItY29udGFpbmVyICNyYXgtc3VwcG9ydC1zZWFyY2gtY29udGFpbmVyICNyYXgtc3VwcG9ydC1zZWFyY2ggewogICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsKICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICBtYXJnaW4tdG9wOiA1cHg7CiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjsgfQogICAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1zdXBwb3J0LWJhbm5lci1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaC1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaCBpbnB1dFt0eXBlPSd0ZXh0J10jcmF4LXN1cHBvcnQtc2VhcmNoLWlucHV0IHsKICAgICAgICAgIGJvcmRlci13aWR0aDogMDsKICAgICAgICAgIG91dGxpbmUtd2lkdGg6IDA7CiAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lOwogICAgICAgICAgd2lkdGg6IDkwJTsKICAgICAgICAgIGhlaWdodDogMjVweDsKICAgICAgICAgIHBhZGRpbmc6IDEwcHggMTVweDsKICAgICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7CiAgICAgICAgICBmb250LXNpemU6IDE2cHg7CiAgICAgICAgICBjb2xvcjogIzAwMDsKICAgICAgICAgIGZvbnQtZmFtaWx5OiAiVGl0aWxsaXVtIFdlYiIsICJIZWx2ZXRpY2FOZXVlIiwgIkhlbHZldGljYSBOZXVlIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsKICAgICAgICAgIC13ZWJraXQtYm94LXNoYWRvdzogbm9uZTsKICAgICAgICAgIC1tb3otYm94LXNoYWRvdzogbm9uZTsKICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7IH0KICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtc3VwcG9ydC1iYW5uZXItY29udGFpbmVyICNyYXgtc3VwcG9ydC1zZWFyY2gtY29udGFpbmVyICNyYXgtc3VwcG9ydC1zZWFyY2ggaW5wdXRbdHlwZT0ndGV4dCddI3JheC1zdXBwb3J0LXNlYXJjaC1pbnB1dDpmb2N1cyB7CiAgICAgICAgICBvdXRsaW5lLXdpZHRoOiAwOwogICAgICAgICAgYmFja2dyb3VuZDogbm9uZTsgfQogICAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1zdXBwb3J0LWJhbm5lci1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaC1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaCAjcmF4LXN1cHBvcnQtc2VhcmNoLWlucHV0Ojotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHsKICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYzsgfQogICAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1zdXBwb3J0LWJhbm5lci1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaC1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaCAjcmF4LXN1cHBvcnQtc2VhcmNoLWlucHV0Oi1tb3otcGxhY2Vob2xkZXIgewogICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljOyB9CiAgICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LXN1cHBvcnQtYmFubmVyLWNvbnRhaW5lciAjcmF4LXN1cHBvcnQtc2VhcmNoLWNvbnRhaW5lciAjcmF4LXN1cHBvcnQtc2VhcmNoICNyYXgtc3VwcG9ydC1zZWFyY2gtaW5wdXQ6Oi1tb3otcGxhY2Vob2xkZXIgewogICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljOyB9CiAgICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LXN1cHBvcnQtYmFubmVyLWNvbnRhaW5lciAjcmF4LXN1cHBvcnQtc2VhcmNoLWNvbnRhaW5lciAjcmF4LXN1cHBvcnQtc2VhcmNoICNyYXgtc3VwcG9ydC1zZWFyY2gtaW5wdXQ6LW1zLWlucHV0LXBsYWNlaG9sZGVyIHsKICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYzsgfQogICAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI3JheC1zdXBwb3J0LWJhbm5lci1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaC1jb250YWluZXIgI3JheC1zdXBwb3J0LXNlYXJjaCBidXR0b24jcmF4LXN1cHBvcnQtc2VhcmNoLWJ1dHRvbiB7CiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgICAgICAgICB0b3A6IDA7CiAgICAgICAgICByaWdodDogMDsKICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjsKICAgICAgICAgIGJvcmRlci13aWR0aDogMDsKICAgICAgICAgIG91dGxpbmUtd2lkdGg6IDA7CiAgICAgICAgICBmb250LXNpemU6IDIwcHg7CiAgICAgICAgICBwYWRkaW5nOiAxMXB4OwogICAgICAgICAgYmFja2dyb3VuZDogbm9uZTsKICAgICAgICAgIGNvbG9yOiAjNTU1OwogICAgICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4xNXMgbGluZWFyOwogICAgICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4xNXMgbGluZWFyOwogICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMTVzIGxpbmVhcjsgfQogICAgICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjcmF4LXN1cHBvcnQtYmFubmVyLWNvbnRhaW5lciAjcmF4LXN1cHBvcnQtc2VhcmNoLWNvbnRhaW5lciAjcmF4LXN1cHBvcnQtc2VhcmNoIGJ1dHRvbiNyYXgtc3VwcG9ydC1zZWFyY2gtYnV0dG9uOmhvdmVyIHsKICAgICAgICAgICAgY29sb3I6ICMxMTE7IH0KICAjcmF4LXN1cHBvcnQtaGVhZGVyIG5hdiNuYXYtZ2xvYmFsIHsKICAgIGZvbnQtZmFtaWx5OiAiT3BlbiBTYW5zIiwgIkhlbHZldGljYU5ldWUiLCAiSGVsdmV0aWNhIE5ldWUiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmOwogICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsKICAgIGZvbnQtd2VpZ2h0OiA2MDA7CiAgICBmb250LXNpemU6IDEzcHg7IH0KICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgbmF2I25hdi1nbG9iYWwgYSB7CiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICAgICAgcGFkZGluZzogMjRweCAxOXB4IDIzcHg7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgICBjb2xvcjogI2ZmZjsKICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4xNXMgbGluZWFyOwogICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjE1cyBsaW5lYXI7CiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cyBsaW5lYXI7IH0KICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciBuYXYjbmF2LWdsb2JhbCBhOmhvdmVyIHsKICAgICAgICBiYWNrZ3JvdW5kOiAjMjIyOyB9CiAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgbmF2I25hdi1nbG9iYWwgYS5hY3RpdmUgewogICAgICAgIGJhY2tncm91bmQ6ICMyYTJhMmE7IH0KICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciBuYXYjbmF2LWdsb2JhbCBhLnJheC1sb2dvIHsKICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoImh0dHBzOi8vYjYyYWNmNWExMzkwYzViMDg0ZTAtNGZkODMwMDdjYjg4MTVlOGNmOTlhN2E5MmU5ZDZhNzMuc3NsLmNmMi5yYWNrY2RuLmNvbS9sb2dvLXJhY2tzcGFjZS5wbmciKTsKICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lLCB1cmwoImh0dHBzOi8vYjYyYWNmNWExMzkwYzViMDg0ZTAtNGZkODMwMDdjYjg4MTVlOGNmOTlhN2E5MmU5ZDZhNzMuc3NsLmNmMi5yYWNrY2RuLmNvbS9sb2dvLXJhY2tzcGFjZS5zdmciKTsKICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0OwogICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDE3cHggOXB4OwogICAgICAgIHRleHQtaW5kZW50OiAtOTk5OXB4OwogICAgICAgIHdpZHRoOiAxNDBweDsKICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzQwMDIyOyB9CiAgICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciBuYXYjbmF2LWdsb2JhbCBhLnJheC1sb2dvOmhvdmVyIHsKICAgICAgICAgIGJhY2tncm91bmQ6ICNjNDAwMjI7CiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoImh0dHBzOi8vYjYyYWNmNWExMzkwYzViMDg0ZTAtNGZkODMwMDdjYjg4MTVlOGNmOTlhN2E5MmU5ZDZhNzMuc3NsLmNmMi5yYWNrY2RuLmNvbS9sb2dvLXJhY2tzcGFjZS5wbmciKTsKICAgICAgICAgIGJhY2tncm91bmQtaW1hZ2U6IG5vbmUsIHVybCgiaHR0cHM6Ly9iNjJhY2Y1YTEzOTBjNWIwODRlMC00ZmQ4MzAwN2NiODgxNWU4Y2Y5OWE3YTkyZTlkNmE3My5zc2wuY2YyLnJhY2tjZG4uY29tL2xvZ28tcmFja3NwYWNlLnN2ZyIpOwogICAgICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDsKICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IDE3cHggOXB4OyB9CiAgI3JheC1zdXBwb3J0LWhlYWRlciAjYmFubmVyLWFubm91bmNlbWVudC1jb250YWluZXIgewogICAgYmFja2dyb3VuZDogI2ZmZWRjZjsgfQogICAgI3JheC1zdXBwb3J0LWhlYWRlciAjYmFubmVyLWFubm91bmNlbWVudC1jb250YWluZXIgLmJhbm5lci1hbm5vdW5jZW1lbnQgewogICAgICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgICAgIHdpZHRoOiA5NjBweDsKICAgICAgbWFyZ2luOiAwIGF1dG87CiAgICAgIHBhZGRpbmc6IDE1cHggMDsgfQogICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNiYW5uZXItYW5ub3VuY2VtZW50LWNvbnRhaW5lciAuYmFubmVyLWFubm91bmNlbWVudCBpIHsKICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgICAgICAgdG9wOiAxNXB4OwogICAgICAgIGxlZnQ6IDA7CiAgICAgICAgZm9udC1zaXplOiAxOHB4OwogICAgICAgIGNvbG9yOiAjYzIzZTRmOyB9CiAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI2Jhbm5lci1hbm5vdW5jZW1lbnQtY29udGFpbmVyIC5iYW5uZXItYW5ub3VuY2VtZW50IHAgewogICAgICAgIG1hcmdpbjogMCA0NXB4IDAgMzBweDsKICAgICAgICBmb250LWZhbWlseTogIk9wZW4gU2FucyIsICJIZWx2ZXRpY2FOZXVlIiwgIkhlbHZldGljYSBOZXVlIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsKICAgICAgICBmb250LXNpemU6IDE0cHg7CiAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDsKICAgICAgICBsaW5lLWhlaWdodDogMTdweDsKICAgICAgICBjb2xvcjogIzY2NWU0ZTsgfQogICAgICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI2Jhbm5lci1hbm5vdW5jZW1lbnQtY29udGFpbmVyIC5iYW5uZXItYW5ub3VuY2VtZW50IHAgc3Ryb25nIHsKICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7IH0KICAgICAgICAjcmF4LXN1cHBvcnQtaGVhZGVyICNiYW5uZXItYW5ub3VuY2VtZW50LWNvbnRhaW5lciAuYmFubmVyLWFubm91bmNlbWVudCBwIGEgewogICAgICAgICAgY29sb3I6ICM2NjVlNGU7CiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsgfQogICAgICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjYmFubmVyLWFubm91bmNlbWVudC1jb250YWluZXIgLmJhbm5lci1hbm5vdW5jZW1lbnQgcCBhOmhvdmVyIHsKICAgICAgICAgICAgY29sb3I6ICMyMjI7IH0KICAgICNyYXgtc3VwcG9ydC1oZWFkZXIgI2Jhbm5lci1hbm5vdW5jZW1lbnQtY29udGFpbmVyICNiYW5uZXItYW5ub3VuY2VtZW50LWNsb3NlIHsKICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICB0b3A6IDE4cHg7CiAgICAgIHJpZ2h0OiAwOwogICAgICBmb250LXNpemU6IDM2cHg7CiAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7CiAgICAgIGxpbmUtaGVpZ2h0OiAzcHg7CiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICAgICAgY29sb3I6ICM2NjVlNGU7IH0KICAgICAgI3JheC1zdXBwb3J0LWhlYWRlciAjYmFubmVyLWFubm91bmNlbWVudC1jb250YWluZXIgI2Jhbm5lci1hbm5vdW5jZW1lbnQtY2xvc2U6aG92ZXIgewogICAgICAgIGNvbG9yOiAjMzEyZDI2OyB9CgoudWktdG9vbHRpcCB7CiAgZm9udC1mYW1pbHk6ICJPcGVuIFNhbnMiLCAiSGVsdmV0aWNhTmV1ZSIsICJIZWx2ZXRpY2EgTmV1ZSIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7CiAgZm9udC13ZWlnaHQ6IDMwMDsKICBmb250LXNpemU6IDEycHg7CiAgbGluZS1oZWlnaHQ6IDE2cHg7CiAgYmFja2dyb3VuZDogIzExMTsKICBjb2xvcjogI2ZmZjsKICBwYWRkaW5nOiAxMHB4IDE1cHg7CiAgcG9zaXRpb246IGFic29sdXRlOwogIHotaW5kZXg6IDk5OTk7IH0KCiNyYXgtZm9vdGVyLXdyYXBwZXIgewogIGZvbnQtZmFtaWx5OiAiT3BlbiBTYW5zIiwgIkhlbHZldGljYU5ldWUiLCAiSGVsdmV0aWNhIE5ldWUiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmOwogIHdpZHRoOiAxMDAlOwogIG1pbi13aWR0aDogOTYwcHg7CiAgYm9yZGVyLXRvcDogMTBweCBzb2xpZCAjYzQwMDIyOwogIGJhY2tncm91bmQ6ICMyYTJhMmE7IH0KICAjcmF4LWZvb3Rlci13cmFwcGVyICNyYXgtZm9vdGVyLWNvbnRhaW5lciB7CiAgICB3aWR0aDogOTYwcHg7CiAgICBtYXJnaW46IDAgYXV0bzsKICAgIHBhZGRpbmc6IDI1cHggMTBweCAzMHB4OwogICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94OwogICAgLyogU2FmYXJpL0Nocm9tZSwgb3RoZXIgV2ViS2l0ICovCiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgICAvKiBGaXJlZm94LCBvdGhlciBHZWNrbyAqLwogICAgYm94LXNpemluZzogYm9yZGVyLWJveDsKICAgIC8qIElFIDgrICovIH0KICAgICNyYXgtZm9vdGVyLXdyYXBwZXIgI3JheC1mb290ZXItY29udGFpbmVyIC5yYXgtZm9vdGVyLWNvbCB7CiAgICAgIGZsb2F0OiBsZWZ0OwogICAgICB3aWR0aDogMjAlOyB9CiAgICAgICNyYXgtZm9vdGVyLXdyYXBwZXIgI3JheC1mb290ZXItY29udGFpbmVyIC5yYXgtZm9vdGVyLWNvbC5yYXgtZm9vdGVyLWFib3V0IHsKICAgICAgICB3aWR0aDogMzUlOyB9CiAgICAgICAgI3JheC1mb290ZXItd3JhcHBlciAjcmF4LWZvb3Rlci1jb250YWluZXIgLnJheC1mb290ZXItY29sLnJheC1mb290ZXItYWJvdXQgLnJheC1mb290ZXItYWJvdXQtbGlzdCB7CiAgICAgICAgICBmbG9hdDogbGVmdDsKICAgICAgICAgIHdpZHRoOiA0NSU7IH0KICAgICNyYXgtZm9vdGVyLXdyYXBwZXIgI3JheC1mb290ZXItY29udGFpbmVyIGg0IHsKICAgICAgZm9udC1zaXplOiAxM3B4OwogICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOwogICAgICBjb2xvcjogI2ZmZjsKICAgICAgbWFyZ2luOiAwIDAgMTBweDsKICAgICAgZm9udC13ZWlnaHQ6IDQwMDsgfQogICAgI3JheC1mb290ZXItd3JhcHBlciAjcmF4LWZvb3Rlci1jb250YWluZXIgdWwgewogICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7CiAgICAgIG1hcmdpbjogMDsKICAgICAgbGluZS1oZWlnaHQ6IDIxcHg7CiAgICAgIHBhZGRpbmc6IDA7IH0KICAgICNyYXgtZm9vdGVyLXdyYXBwZXIgI3JheC1mb290ZXItY29udGFpbmVyIGEgewogICAgICBmb250LXNpemU6IDEycHg7CiAgICAgIGNvbG9yOiAjYWFhOwogICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH0KICAgICAgI3JheC1mb290ZXItd3JhcHBlciAjcmF4LWZvb3Rlci1jb250YWluZXIgYTpob3ZlciB7CiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH0KICAjcmF4LWZvb3Rlci13cmFwcGVyICNyYXgtYmFzZW1lbnQtd3JhcHBlciB7CiAgICB3aWR0aDogMTAwJTsKICAgIGJhY2tncm91bmQ6ICMwMDA7CiAgICBjb2xvcjogI2ZmZjsgfQogICAgI3JheC1mb290ZXItd3JhcHBlciAjcmF4LWJhc2VtZW50LXdyYXBwZXIgI3JheC1iYXNlbWVudC1jb250YWluZXIgewogICAgICBtYXgtd2lkdGg6IDk4MHB4OwogICAgICBtYXJnaW46IDAgYXV0bzsKICAgICAgcGFkZGluZzogMjBweCAxMHB4OwogICAgICBmb250LXNpemU6IDEycHg7CiAgICAgIC13ZWJraXQtYm94LXNpemluZzogYm9yZGVyLWJveDsKICAgICAgLyogU2FmYXJpL0Nocm9tZSwgb3RoZXIgV2ViS2l0ICovCiAgICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDsKICAgICAgLyogRmlyZWZveCwgb3RoZXIgR2Vja28gKi8KICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsKICAgICAgLyogSUUgOCsgKi8gfQoKdWwudWktYXV0b2NvbXBsZXRlIHsKICB6LWluZGV4OiA0NDQ0OwogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7CiAgYmFja2dyb3VuZDogI2VlZTsKICBwYWRkaW5nOiAwOyB9CiAgdWwudWktYXV0b2NvbXBsZXRlIGEgewogICAgZGlzcGxheTogYmxvY2s7CiAgICBwYWRkaW5nOiA3cHggMTBweDsKICAgIGZvbnQtZmFtaWx5OiAiVGl0aWxsaXVtIFdlYiIsICJIZWx2ZXRpY2FOZXVlIiwgIkhlbHZldGljYSBOZXVlIiwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjsKICAgIGZvbnQtd2VpZ2h0OiAzMDA7CiAgICBmb250LXNpemU6IDE0cHg7CiAgICBjb2xvcjogIzY2NjsgfQogICAgdWwudWktYXV0b2NvbXBsZXRlIGE6aG92ZXIgewogICAgICBjdXJzb3I6IHBvaW50ZXI7CiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICAgICAgYmFja2dyb3VuZDogI2NjYzsKICAgICAgY29sb3I6ICM2NjY7IH0KICB1bC51aS1hdXRvY29tcGxldGUgbGk6bGFzdC1jaGlsZCBhIHsKICAgIGJvcmRlci1ib3R0b206IG5vbmU7IH0KCi51aS1zdGF0ZS1ob3ZlciwKLnVpLXdpZGdldC1jb250ZW50IC51aS1zdGF0ZS1ob3ZlciwKLnVpLXdpZGdldC1oZWFkZXIgLnVpLXN0YXRlLWhvdmVyLAoudWktc3RhdGUtZm9jdXMsCi51aS13aWRnZXQtY29udGVudCAudWktc3RhdGUtZm9jdXMsCi51aS13aWRnZXQtaGVhZGVyIC51aS1zdGF0ZS1mb2N1cyB7CiAgY3Vyc29yOiBwb2ludGVyOwogIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICBiYWNrZ3JvdW5kOiAjY2NjOwogIGNvbG9yOiAjNjY2OyB9CgoudWktYXV0b2NvbXBsZXRlLnNvdXJjZTpob3ZlciB7CiAgYmFja2dyb3VuZDogIzQ1NDU0NTsgfQoKLnVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZSB7CiAgYm9yZGVyOiAwOwogIGNsaXA6IHJlY3QoMCAwIDAgMCk7CiAgaGVpZ2h0OiAxcHg7CiAgbWFyZ2luOiAtMXB4OwogIG92ZXJmbG93OiBoaWRkZW47CiAgcGFkZGluZzogMDsKICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgd2lkdGg6IDFweDsgfQoKQC1tb3otZG9jdW1lbnQgdXJsLXByZWZpeCgpIHsKICAjcmF4LXN1cHBvcnQtaGVhZGVyICNyYXgtZXllYnJvdy1jb250YWluZXIgLnJheC1kcm9wZG93bi1tZW51ID4gdWwgPiBsaSA+IHVsIHsKICAgIHRvcDogMjJweDsgfSB9Cgouc3Bpbm5lciB7CiAgZGlzcGxheTogYmxvY2s7CiAgaGVpZ2h0OiAyMHB4OwogIHdpZHRoOiAyMHB4OwogIG1hcmdpbjogMzBweCBhdXRvOwogIHBvc2l0aW9uOiByZWxhdGl2ZTsKICAtd2Via2l0LWFuaW1hdGlvbjogcm90YXRpb24gMC41cyBpbmZpbml0ZSBsaW5lYXI7CiAgLW1vei1hbmltYXRpb246IHJvdGF0aW9uIDAuNXMgaW5maW5pdGUgbGluZWFyOwogIC1vLWFuaW1hdGlvbjogcm90YXRpb24gMC41cyBpbmZpbml0ZSBsaW5lYXI7CiAgYW5pbWF0aW9uOiByb3RhdGlvbiAwLjVzIGluZmluaXRlIGxpbmVhcjsKICBib3JkZXItbGVmdDogM3B4IHNvbGlkIHJnYmEoMzAsIDEzMCwgMjE1LCAwLjE1KTsKICBib3JkZXItcmlnaHQ6IDNweCBzb2xpZCByZ2JhKDMwLCAxMzAsIDIxNSwgMC4xNSk7CiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkIHJnYmEoMzAsIDEzMCwgMjE1LCAwLjE1KTsKICBib3JkZXItdG9wOiAzcHggc29saWQgcmdiYSgzMCwgMTMwLCAyMTUsIDAuOCk7CiAgYm9yZGVyLXJhZGl1czogMTAwJTsgfQoKQC13ZWJraXQta2V5ZnJhbWVzIHJvdGF0aW9uIHsKICBmcm9tIHsKICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH0KICB0byB7CiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM1OWRlZyk7IH0gfQoKdWwuc3VwcG9ydC1jb250ZW50LWZpbHRlciB7CiAgZm9udC13ZWlnaHQ6IDQwMDsKICBmb250LXNpemU6IDE0cHg7CiAgbGlzdC1zdHlsZS10eXBlOiBub25lOwogIG1hcmdpbi1ib3R0b206IDI1cHg7CiAgcGFkZGluZzogMDsgfQogIHVsLnN1cHBvcnQtY29udGVudC1maWx0ZXIgbGkgewogICAgZGlzcGxheTogaW5saW5lOwogICAgbWFyZ2luOiAwIDI1cHggMCAwOyB9CiAgICB1bC5zdXBwb3J0LWNvbnRlbnQtZmlsdGVyIGxpIGEgewogICAgICBwYWRkaW5nLWJvdHRvbTogMnB4OwogICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7CiAgICAgIGNvbG9yOiAjMWU4MmQ3OyB9CiAgICAgIHVsLnN1cHBvcnQtY29udGVudC1maWx0ZXIgbGkgYTpob3ZlciB7CiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjZGRkOyB9CiAgICB1bC5zdXBwb3J0LWNvbnRlbnQtZmlsdGVyIGxpOmxhc3QtY2hpbGQgYSB7CiAgICAgIG1hcmdpbi1yaWdodDogMDsgfQogICAgdWwuc3VwcG9ydC1jb250ZW50LWZpbHRlciBsaS5hY3RpdmUgYSB7CiAgICAgIGNvbG9yOiAjMzMzOwogICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsKICAgICAgY3Vyc29yOiBkZWZhdWx0OwogICAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzFlODJkNzsgfQoKLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgewogIHBvc2l0aW9uOiByZWxhdGl2ZTsKICB3aWR0aDogMTAwJTsKICBjb2xvcjogIzMzMzsgfQogIC5zdXBwb3J0LXJlc3VsdHMtY29udGFpbmVyIGg1IHsKICAgIGZvbnQtc2l6ZTogMTRweDsKICAgIG1hcmdpbi1ib3R0b206IDVweDsgfQogICAgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgaDUgYSB7CiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICAgICAgY29sb3I6ICMxZTgyZDc7IH0KICAgICAgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgaDUgYTpob3ZlciB7CiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH0KICAuc3VwcG9ydC1yZXN1bHRzLWNvbnRhaW5lciBwIHsKICAgIGZvbnQtc2l6ZTogMTRweDsKICAgIGxpbmUtaGVpZ2h0OiAxNnB4OwogICAgbWFyZ2luOiAwIDAgNXB4OyB9CiAgICAuc3VwcG9ydC1yZXN1bHRzLWNvbnRhaW5lciBwLm1ldGEgewogICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OwogICAgICBjb2xvcjogIzg4ODsgfQogICAgICAuc3VwcG9ydC1yZXN1bHRzLWNvbnRhaW5lciBwLm1ldGEgYSB7CiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgICAgIGNvbG9yOiAjNjY2OyB9CiAgICAgICAgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgcC5tZXRhIGE6aG92ZXIgewogICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH0KICAgICAgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgcC5tZXRhIHNwYW4gewogICAgICAgIHBhZGRpbmctbGVmdDogN3B4OwogICAgICAgIG1hcmdpbi1sZWZ0OiA3cHg7CiAgICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjODg4OyB9CiAgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgcC5zdXBwb3J0LXJlc3VsdHMtbW9yZSB7CiAgICB3aWR0aDogNTAwcHg7CiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICBtYXJnaW46IDU1cHggYXV0bzsKICAgIGZvbnQtd2VpZ2h0OiA0MDA7CiAgICBmb250LXNpemU6IDE2cHg7IH0KICAgIC5zdXBwb3J0LXJlc3VsdHMtY29udGFpbmVyIHAuc3VwcG9ydC1yZXN1bHRzLW1vcmUgYSB7CiAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7CiAgICAgIGZvbnQtc2l6ZTogMTRweDsKICAgICAgY29sb3I6ICM2NjY7CiAgICAgIGJhY2tncm91bmQ6ICNkZGQ7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgcGFkZGluZzogMTBweCAxNTBweDsKICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgICB3aWR0aDogMTAwJTsKICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlOwogICAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7CiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7IH0KICAgICAgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgcC5zdXBwb3J0LXJlc3VsdHMtbW9yZSBhOmhvdmVyIHsKICAgICAgICBiYWNrZ3JvdW5kOiAjY2NjOyB9CiAgICAgIC5zdXBwb3J0LXJlc3VsdHMtY29udGFpbmVyIHAuc3VwcG9ydC1yZXN1bHRzLW1vcmUgYSBpIHsKICAgICAgICBkaXNwbGF5OiBub25lOyB9CiAgLnN1cHBvcnQtcmVzdWx0cy1jb250YWluZXIgcC5zdXBwb3J0LXJlc3VsdHMtbm9uZSB7CiAgICBtYXJnaW46IDMwcHggMDsKICAgIGZvbnQtd2VpZ2h0OiAzMDA7CiAgICBmb250LXNpemU6IDE2cHg7CiAgICBjb2xvcjogIzU1NTsgfQoKLnN1cHBvcnQtcmVzdWx0cy10b3AgewogIHBvc2l0aW9uOiBmaXhlZDsKICBib3R0b206IC01MDBweDsKICByaWdodDogNTBweDsKICB6LWluZGV4OiA5OTk5OwogIHBhZGRpbmc6IDEwcHggMTVweDsKICBmb250LXNpemU6IDI0cHg7CiAgY29sb3I6ICNmZmY7CiAgYmFja2dyb3VuZDogIzMzMzsKICBvcGFjaXR5OiAwLjU7CiAgLW1vei1vcGFjaXR5OiAwLjU7CiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTUwKTsKICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjE1cyBlYXNlOwogIC1tb3otdHJhbnNpdGlvbjogYWxsIDAuMTVzIGVhc2U7CiAgdHJhbnNpdGlvbjogYWxsIDAuMTVzIGVhc2U7IH0KICAuc3VwcG9ydC1yZXN1bHRzLXRvcCA6aG92ZXIgewogICAgb3BhY2l0eTogMS4wOwogICAgLW1vei1vcGFjaXR5OiAxLjA7CiAgICBmaWx0ZXI6IGFscGhhKG9wYWNpdHk9MTAwKTsgfQoKI3JheC1zdXBwb3J0LXNlYXJjaC1pbnB1dCB7CiAgbWFyZ2luLWJvdHRvbTogMDsgfQoKI3JheC1mb290ZXItd3JhcCAjcmF4LXJ1Zy13cmFwIHsKICBwYWRkaW5nOiAzMHB4IDAgMDsKICBiYWNrZ3JvdW5kOiAjMGRhZmNjOyB9CgouZm9vdGVyLWZyYWdtZW50cyAuY29udGVudC1mcmFnbWVudC5odG1sLWNvbnRlbnQgLnVzZXItZGVmaW5lZC1tYXJrdXAgewogIHdpZHRoOiA5NjBweDsKICBtYXJnaW46IDAgYXV0bzsKICBiYWNrZ3JvdW5kOiBub25lOwogIGJvcmRlci13aWR0aDogMDsKICBtYXJnaW4tdG9wOiAwOwogIHBhZGRpbmc6IDA7IH0KCi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXdvSkluWmxjbk5wYjI0aU9pQXpMQW9KSW1acGJHVWlPaUFpYzNSNWJHVXVjMk56Y3lJc0Nna2ljMjkxY21ObGN5STZJRnNLQ1FraWMzUjViR1V1YzJOemN5SXNDZ2tKSW5KbGMyVjBMbk5qYzNNaUxBb0pDU0pqYkdWaGNtWnBlQzV6WTNOeklpd0tDUWtpWVdScWRYTjBiV1Z1ZEhNdWMyTnpjeUlLQ1Ywc0Nna2ljMjkxY21ObGMwTnZiblJsYm5RaU9pQmJDZ2tKSWtCcGJYQnZjblFnSjNKbGMyVjBKenRjYmtCcGJYQnZjblFnSjJOc1pXRnlabWw0Snp0Y2JrQnBiWEJ2Y25RZ0oyRmthblZ6ZEcxbGJuUnpKenRjYmx4dUpHSmhjMlV0Wm05dWRDMW1ZVzFwYkhrNklDZFBjR1Z1SUZOaGJuTW5MQ0FuU0dWc2RtVjBhV05oVG1WMVpTY3NJQ2RJWld4MlpYUnBZMkVnVG1WMVpTY3NJRWhsYkhabGRHbGpZU3dnUVhKcFlXd3NJSE5oYm5NdGMyVnlhV1k3WEc0a2MyVmpiMjVrWVhKNUxXWnZiblF0Wm1GdGFXeDVPaUFuVkdsMGFXeHNhWFZ0SUZkbFlpY3NJQ2RJWld4MlpYUnBZMkZPWlhWbEp5d2dKMGhsYkhabGRHbGpZU0JPWlhWbEp5d2dTR1ZzZG1WMGFXTmhMQ0JCY21saGJDd2djMkZ1Y3kxelpYSnBaanRjYmx4dUpIUmxlSFF0WTI5c2IzSTZJQ0FnSUNBZ0lDTTBNVFF4TkRFN1hHNGtZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJekJrWVdaall6dGNiaVJpY21GdVpDMWpiMnh2Y2pvZ0lDQWdJQ0FqWXpRd01ESXlPMXh1WEc1aElIdGNiaUFnSUNBdGQyVmlhMmwwTFhSeVlXNXphWFJwYjI0NklHRnNiQ0F3TGpFMWN5QmxZWE5sTzF4dUlDQWdJQzF0YjNvdGRISmhibk5wZEdsdmJqb2dZV3hzSURBdU1UVnpJR1ZoYzJVN1hHNGdJQ0FnZEhKaGJuTnBkR2x2YmpvZ1lXeHNJREF1TVRWeklHVmhjMlU3WEc1OVhHNWNiaTh2SUVobFlXUmxjbHh1WEc0amNtRjRMWE4xY0hCdmNuUXRhR1ZoWkdWeUlIdGNiaUFnSUNBdGQyVmlhMmwwTFdKdmVDMXphWHBwYm1jNklHSnZjbVJsY2kxaWIzZzdJQzhxSUZOaFptRnlhUzlEYUhKdmJXVXNJRzkwYUdWeUlGZGxZa3RwZENBcUwxeHVJQ0FnSUMxdGIzb3RZbTk0TFhOcGVtbHVaem9nWW05eVpHVnlMV0p2ZURzZ0lDQWdMeW9nUm1seVpXWnZlQ3dnYjNSb1pYSWdSMlZqYTI4Z0tpOWNiaUFnSUNCaWIzZ3RjMmw2YVc1bk9pQmliM0prWlhJdFltOTRPeUFnSUNBZ0lDQWdJQzhxSUVsRklEZ3JJQ292WEc1Y2JpQWdJQ0IzYVdSMGFEb2dNVEF3SlR0Y2JpQWdJQ0J0YVc0dGQybGtkR2c2SURrMk1IQjRPMXh1SUNBZ0lIb3RhVzVrWlhnNklERXdNREE3WEc0Z0lDQWdjRzl6YVhScGIyNDZJSEpsYkdGMGFYWmxPMXh1SUNBZ0lHWnZiblF0Wm1GdGFXeDVPaUFrYzJWamIyNWtZWEo1TFdadmJuUXRabUZ0YVd4NU8xeHVYRzRnSUNBZ0xYZGxZbXRwZEMxbWIyNTBMWE50YjI5MGFHbHVaem9nWVc1MGFXRnNhV0Z6WldRN0lDQWdJQzhxSUVacGVDQm1iM0lnZDJWaWEybDBJSEpsYm1SbGNtbHVaeUFxTDF4dUlDQWdJQzEzWldKcmFYUXRkR1Y0ZEMxemFYcGxMV0ZrYW5WemREb2dNVEF3SlR0Y2JseHVJQ0FnSUNOeVlYZ3RaWGxsWW5KdmR5MTNjbUZ3Y0dWeUlIdGNiaUFnSUNBZ0lDQWdkMmxrZEdnNklERXdNQ1U3WEc0Z0lDQWdJQ0FnSUhCaFpHUnBibWM2SURFMWNIZ2dNRHRjYmx4dUlDQWdJQ0FnSUNBamNtRjRMV1Y1WldKeWIzY3RZMjl1ZEdGcGJtVnlJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIZHBaSFJvT2lBNU5qQndlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHMWhjbWRwYmpvZ01DQmhkWFJ2TzF4dUlDQWdJQ0FnSUNBZ0lDQWdabTl1ZEMxbVlXMXBiSGs2SUNSaVlYTmxMV1p2Ym5RdFptRnRhV3g1TzF4dUlDQWdJQ0FnSUNBZ0lDQWdabTl1ZEMxM1pXbG5hSFE2SURZd01EdGNiaUFnSUNBZ0lDQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01UQndlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUmxlSFF0ZEhKaGJuTm1iM0p0T2lCMWNIQmxjbU5oYzJVN1hHNWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0kzSmhlQzFsZVdWaWNtOTNMWFYwYVd4cGRIa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1pzYjJGME9pQnNaV1owTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RXd2diR2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmthWE53YkdGNU9pQnBibXhwYm1VdFlteHZZMnM3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjJ4dmNqb2dKSFJsZUhRdFkyOXNiM0k3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwWlhoMExXUmxZMjl5WVhScGIyNDZJRzV2Ym1VN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCdFlYSm5hVzR0Y21sbmFIUTZJREV3Y0hnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCd1lXUmthVzVuTFhKcFoyaDBPaUF4TUhCNE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ltOXlaR1Z5TFhKcFoyaDBPaUF4Y0hnZ2MyOXNhV1FnSkhSbGVIUXRZMjlzYjNJN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDWTZhRzkyWlhJZ2UyTnZiRzl5T2lBak1XVTRNbVEzTzMxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDWTZiR0Z6ZEMxamFHbHNaQ0JoSUh0aWIzSmtaWEl0Y21sbmFIUXRkMmxrZEdnNklEQTdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWpjbUY0TFdWNVpXSnliM2N0YzNSaGRIVnpJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J0WVhKbmFXNHRiR1ZtZERvZ09IQjRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1pzYjJGME9pQnlhV2RvZER0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDTnlZWGd0WlhsbFluSnZkeTF6YVdkdWRYQXNJQ055WVhndFpYbGxZbkp2ZHkxc2IyZHBiaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYldGeVoybHVMV3hsWm5RNklEaHdlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYkc5aGREb2djbWxuYUhRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ055WVhndFpYbGxZbkp2ZHkxemRHRjBkWE1nZTF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1lTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJHOXlPaUFrZEdWNGRDMWpiMnh2Y2p0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR1Y0ZEMxa1pXTnZjbUYwYVc5dU9pQnViMjVsTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1k2YUc5MlpYSWdlMk52Ykc5eU9pQWpNV1U0TW1RM08zMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0kzSmhlQzFsZVdWaWNtOTNMWE5wWjI1MWNDNXlZWGd0WkhKdmNHUnZkMjR0YldWdWRTQnpjR0Z1TG5KaGVDMWlkRzRzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWpjbUY0TFdWNVpXSnliM2N0YzJsbmJuVndMbkpoZUMxa2NtOXdaRzkzYmkxdFpXNTFJRDRnZFd3Z1BpQnNhU0ErSUhWc0lIdGlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpOV0ZoWVRJNE8zMWNiaUFnSUNBZ0lDQWdJQ0FnSUNOeVlYZ3RaWGxsWW5KdmR5MXNiMmRwYmk1eVlYZ3RaSEp2Y0dSdmQyNHRiV1Z1ZFNCemNHRnVMbkpoZUMxaWRHNHNYRzRnSUNBZ0lDQWdJQ0FnSUNBamNtRjRMV1Y1WldKeWIzY3RiRzluYVc0dWNtRjRMV1J5YjNCa2IzZHVMVzFsYm5VZ1BpQjFiQ0ErSUd4cElENGdkV3dnZTJKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNNMk5qWTdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWpjbUY0TFdWNVpXSnliM2N0YzJsbmJuVndMbkpoZUMxa2NtOXdaRzkzYmkxdFpXNTFJRDRnZFd3Z1BpQnNhU0ErSUhWc0lENGdiR2tnWVRwb2IzWmxjaUI3WW1GamEyZHliM1Z1WkMxamIyeHZjam9nSXpZMVltWXlaRHQ5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWpjbUY0TFdWNVpXSnliM2N0Ykc5bmFXNHVjbUY0TFdSeWIzQmtiM2R1TFcxbGJuVWdQaUIxYkNBK0lHeHBJRDRnZFd3Z1BpQnNhU0JoT21odmRtVnlJSHRpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqTnpNM016Y3pPMzFjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdMbkpoZUMxa2NtOXdaRzkzYmkxdFpXNTFJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQnZjMmwwYVc5dU9pQnlaV3hoZEdsMlpUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2MzQmhiaTV5WVhndFluUnVJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYjI1MExYZGxhV2RvZERvZ056QXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEJoWkdScGJtYzZJRGR3ZUNBeU1IQjRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR04xY25OdmNqb2djRzlwYm5SbGNqdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmliM0prWlhJdGNtRmthWFZ6T2lBemNIZzdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjlzYjNJNklDTm1abVk3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBbU9taHZkbVZ5SUh0OVhHNWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnUGlCMWJDQStJR3hwSUQ0Z2RXd2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1JwYzNCc1lYazZJRzV2Ym1VN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NHOXphWFJwYjI0NklHRmljMjlzZFhSbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUnZjRG9nTVRsd2VEdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnNhVzVsTFdobGFXZG9kRG9nTVRod2VEdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmliM0prWlhJdGNtRmthWFZ6T2lBemNIZzdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbTl5WkdWeUxYUnZjRG9nTVhCNElITnZiR2xrSUNObVptWTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbWxuYUhRNklEQTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkMmhwZEdVdGMzQmhZMlU2SUc1dmQzSmhjRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I2TFdsdVpHVjRPaUE1TURBN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2QybGtkR2c2SUdGMWRHODdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiV2x1TFhkcFpIUm9PaUF4TURBbE8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMVzF2ZWkxMGNtRnVjMmwwYVc5dU9pQmhiR3dnTUM0eE5YTWdiR2x1WldGeU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDMTNaV0pyYVhRdGRISmhibk5wZEdsdmJqb2dZV3hzSURBdU1UVnpJR3hwYm1WaGNqdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBjbUZ1YzJsMGFXOXVPaUJoYkd3Z01DNHhOWE1nYkdsdVpXRnlPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUGlCc2FTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUd4cGMzUXRjM1I1YkdVNklHNXZibVU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHUnBjM0JzWVhrNklHSnNiMk5yTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnRZWEpuYVc0NklEQTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhCaFpHUnBibWM2SURBN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSmpvNmJHRnpkQzFqYUdsc1pDQjdiV0Z5WjJsdUxXSnZkSFJ2YlRvZ01UQndlRHQ5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJRDRnZFd3Z1BpQnNhVHBvYjNabGNpQStJSFZzSUh0a2FYTndiR0Y1T2lCaWJHOWphenQ5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJRDRnZFd3Z1BpQnNhU0ErSUhWc0lENGdiR2tnWVNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXNiM0k2SUNObVptWTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR2x6Y0d4aGVUb2dZbXh2WTJzN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NHRmtaR2x1WnpvZ00zQjRJREV3Y0hnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHVjRkQzFrWldOdmNtRjBhVzl1T2lCdWIyNWxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJsZUhRdFlXeHBaMjQ2SUhKcFoyaDBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDFjYmx4dUlDQWdJQ055WVhndGMzVndjRzl5ZEMxaVlXNXVaWEl0ZDNKaGNIQmxjaUI3WEc0Z0lDQWdJQ0FnSUhkcFpIUm9PaUF4TURBbE8xeHVJQ0FnSUNBZ0lDQmlZV05yWjNKdmRXNWtMV2x0WVdkbE9pQjFjbXdvSjJoMGRIQnpPaTh2WkRRek5tTTFObVkxWVRBNFl6WXhZekV3T0RrdE1tUTVaalExWW1Ka1ltSXdOR0ptWVRnd1lqTTVPRGxrTTJZMFl6QTRZalV1YzNOc0xtTm1OUzV5WVdOclkyUnVMbU52YlM5aVp5MW9aV0ZrWlhJdE1tWmtNRFV6Wm1KaE56YzROR1JsTWpBNVpUTmhaVGs1WVdKaE5tTTBPVGRpWm1ReE5qVTVZalF5WW1VME9HSmlOMlZtT1RFeVptTm1abVpsTmpNM1l5NXdibWNuS1R0Y2JpQWdJQ0FnSUNBZ1ltRmphMmR5YjNWdVpDMXphWHBsT2lCamIzWmxjanRjYmlBZ0lDQWdJQ0FnYldsdUxYZHBaSFJvT2lBNU5qQndlRHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQWpjbUY0TFhOMWNIQnZjblF0Ym1GMkxYZHlZWEJ3WlhJZ2UxeHVJQ0FnSUNBZ0lDQjNhV1IwYURvZ01UQXdKVHRjYmlBZ0lDQWdJQ0FnWW1GamEyZHliM1Z1WkMxamIyeHZjam9nSXpBd01EdGNibHh1SUNBZ0lDQWdJQ0FqY21GNExYTjFjSEJ2Y25RdGJtRjJMV052Ym5SaGFXNWxjaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjNhV1IwYURvZ09UWXdjSGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnRZWEpuYVc0NklEQWdZWFYwYnp0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUNOeVlYZ3RjM1Z3Y0c5eWRDMWlZVzV1WlhJdFkyOXVkR0ZwYm1WeUlIdGNiaUFnSUNBZ0lDQWdkMmxrZEdnNklEazJNSEI0TzF4dUlDQWdJQ0FnSUNCdFlYSm5hVzQ2SURBZ1lYVjBienRjYmlBZ0lDQWdJQ0FnY0dGa1pHbHVaem9nTkRWd2VDQXdPMXh1WEc0Z0lDQWdJQ0FnSUNOeVlYZ3RhR1ZoWkdWeUxXeHBibXNnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdabXh2WVhRNklHeGxablE3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMnh2Y2pvZ0kyWm1aanRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdhREVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ016VndlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYjI1MExYZGxhV2RvZERvZ016QXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJsZUhRdGRISmhibk5tYjNKdE9pQjFjSEJsY21OaGMyVTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6Y0dGdUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWkdsemNHeGhlVG9nWW14dlkyczdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01qQndlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ptOXVkQzEzWldsbmFIUTZJRGN3TUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiV0Z5WjJsdUxXSnZkSFJ2YlRvZ00zQjRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0kzSmhlQzF6ZFhCd2IzSjBMWE5sWVhKamFDMWpiMjUwWVdsdVpYSWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1pteHZZWFE2SUhKcFoyaDBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2QybGtkR2c2SURVNE1IQjRPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWpjbUY0TFhOMWNIQnZjblF0YzJWaGNtTm9JSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J3YjNOcGRHbHZiam9nY21Wc1lYUnBkbVU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZDJsa2RHZzZJREV3TUNVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXRnlaMmx1TFhSdmNEb2dOWEI0TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdKaFkydG5jbTkxYm1RNklDTm1abVk3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcGJuQjFkRnQwZVhCbFBTZDBaWGgwSjEwamNtRjRMWE4xY0hCdmNuUXRjMlZoY21Ob0xXbHVjSFYwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbTl5WkdWeUxYZHBaSFJvT2lBd08xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J2ZFhSc2FXNWxMWGRwWkhSb09pQXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCaVlXTnJaM0p2ZFc1a09pQnViMjVsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjNhV1IwYURvZ09UQWxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCb1pXbG5hSFE2SURJMWNIZzdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhCaFpHUnBibWM2SURFd2NIZ2dNVFZ3ZUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdabTl1ZEMxM1pXbG5hSFE2SURNd01EdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm05dWRDMXphWHBsT2lBeE5uQjRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyeHZjam9nSXpBd01EdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm05dWRDMW1ZVzFwYkhrNklDUnpaV052Ym1SaGNua3RabTl1ZEMxbVlXMXBiSGs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDMTNaV0pyYVhRdFltOTRMWE5vWVdSdmR6b2dibTl1WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMVzF2ZWkxaWIzZ3RjMmhoWkc5M09pQnViMjVsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmliM2d0YzJoaFpHOTNPaUJ1YjI1bE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2x1Y0hWMFczUjVjR1U5SjNSbGVIUW5YU055WVhndGMzVndjRzl5ZEMxelpXRnlZMmd0YVc1d2RYUTZabTlqZFhNZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J2ZFhSc2FXNWxMWGRwWkhSb09pQXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCaVlXTnJaM0p2ZFc1a09pQnViMjVsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDTnlZWGd0YzNWd2NHOXlkQzF6WldGeVkyZ3RhVzV3ZFhRNk9pMTNaV0pyYVhRdGFXNXdkWFF0Y0d4aFkyVm9iMnhrWlhJZ2UyWnZiblF0YzNSNWJHVTZJR2wwWVd4cFl6dDlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJM0poZUMxemRYQndiM0owTFhObFlYSmphQzFwYm5CMWREb3RiVzk2TFhCc1lXTmxhRzlzWkdWeUlIdG1iMjUwTFhOMGVXeGxPaUJwZEdGc2FXTTdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ055WVhndGMzVndjRzl5ZEMxelpXRnlZMmd0YVc1d2RYUTZPaTF0YjNvdGNHeGhZMlZvYjJ4a1pYSWdlMlp2Ym5RdGMzUjViR1U2SUdsMFlXeHBZenQ5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSTNKaGVDMXpkWEJ3YjNKMExYTmxZWEpqYUMxcGJuQjFkRG90YlhNdGFXNXdkWFF0Y0d4aFkyVm9iMnhrWlhJZ2UyWnZiblF0YzNSNWJHVTZJR2wwWVd4cFl6dDlYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JpZFhSMGIyNGpjbUY0TFhOMWNIQnZjblF0YzJWaGNtTm9MV0oxZEhSdmJpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhCdmMybDBhVzl1T2lCaFluTnZiSFYwWlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkRzl3T2lBd08xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5YVdkb2REb2dNRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kzVnljMjl5T2lCd2IybHVkR1Z5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmliM0prWlhJdGQybGtkR2c2SURBN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzkxZEd4cGJtVXRkMmxrZEdnNklEQTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01qQndlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NHRmtaR2x1WnpvZ01URndlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ltRmphMmR5YjNWdVpEb2dibTl1WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjlzYjNJNklDTTFOVFU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDMXRiM290ZEhKaGJuTnBkR2x2YmpvZ1lXeHNJREF1TVRWeklHeHBibVZoY2p0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMWGRsWW10cGRDMTBjbUZ1YzJsMGFXOXVPaUJoYkd3Z01DNHhOWE1nYkdsdVpXRnlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGNtRnVjMmwwYVc5dU9pQmhiR3dnTUM0eE5YTWdiR2x1WldGeU8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNZNmFHOTJaWElnZTJOdmJHOXlPaUFqTVRFeE8zMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdibUYySTI1aGRpMW5iRzlpWVd3Z2UxeHVJQ0FnSUNBZ0lDQm1iMjUwTFdaaGJXbHNlVG9nSkdKaGMyVXRabTl1ZEMxbVlXMXBiSGs3WEc0Z0lDQWdJQ0FnSUhSbGVIUXRkSEpoYm5ObWIzSnRPaUIxY0hCbGNtTmhjMlU3WEc0Z0lDQWdJQ0FnSUdadmJuUXRkMlZwWjJoME9pQTJNREE3WEc0Z0lDQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01UTndlRHRjYmx4dUlDQWdJQ0FnSUNCaElIdGNiaUFnSUNBZ0lDQWdJQ0FnWkdsemNHeGhlVG9nYVc1c2FXNWxMV0pzYjJOck8xeHVJQ0FnSUNBZ0lDQWdJQ0J3WVdSa2FXNW5PaUF5TkhCNElERTVjSGdnTWpOd2VEdGNiaUFnSUNBZ0lDQWdJQ0FnZEdWNGRDMWhiR2xuYmpvZ1kyVnVkR1Z5TzF4dVhHNGdJQ0FnSUNBZ0lDQWdJSFJsZUhRdFpHVmpiM0poZEdsdmJqb2dibTl1WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdZMjlzYjNJNklDTm1abVk3WEc0Z0lDQWdJQ0FnSUNBZ0lDMXRiM290ZEhKaGJuTnBkR2x2YmpvZ1lXeHNJREF1TVRWeklHeHBibVZoY2p0Y2JpQWdJQ0FnSUNBZ0lDQWdMWGRsWW10cGRDMTBjbUZ1YzJsMGFXOXVPaUJoYkd3Z01DNHhOWE1nYkdsdVpXRnlPMXh1SUNBZ0lDQWdJQ0FnSUNCMGNtRnVjMmwwYVc5dU9pQmhiR3dnTUM0eE5YTWdiR2x1WldGeU8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNZNmFHOTJaWElnZTJKaFkydG5jbTkxYm1RNklDTXlNakk3ZlZ4dUlDQWdJQ0FnSUNBZ0lDQW1MbUZqZEdsMlpTQjdZbUZqYTJkeWIzVnVaRG9nSXpKaE1tRXlZVHQ5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdKaTV5WVhndGJHOW5ieUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0JpWVdOclozSnZkVzVrTFdsdFlXZGxPaUIxY213b0oyaDBkSEJ6T2k4dllqWXlZV05tTldFeE16a3dZelZpTURnMFpUQXROR1prT0RNd01EZGpZamc0TVRWbE9HTm1PVGxoTjJFNU1tVTVaRFpoTnpNdWMzTnNMbU5tTWk1eVlXTnJZMlJ1TG1OdmJTOXNiMmR2TFhKaFkydHpjR0ZqWlM1d2JtY25LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJR0poWTJ0bmNtOTFibVF0YVcxaFoyVTZJRzV2Ym1Vc0lIVnliQ2duYUhSMGNITTZMeTlpTmpKaFkyWTFZVEV6T1RCak5XSXdPRFJsTUMwMFptUTRNekF3TjJOaU9EZ3hOV1U0WTJZNU9XRTNZVGt5WlRsa05tRTNNeTV6YzJ3dVkyWXlMbkpoWTJ0alpHNHVZMjl0TDJ4dloyOHRjbUZqYTNOd1lXTmxMbk4yWnljcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ltRmphMmR5YjNWdVpDMXlaWEJsWVhRNklHNXZMWEpsY0dWaGREdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lHSmhZMnRuY205MWJtUXRjRzl6YVhScGIyNDZJREUzY0hnZ09YQjRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR1Y0ZEMxcGJtUmxiblE2SUMwNU9UazVjSGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0IzYVdSMGFEb2dNVFF3Y0hnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNCaVlXTnJaM0p2ZFc1a0xXTnZiRzl5T2lBa1luSmhibVF0WTI5c2IzSTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ1k2YUc5MlpYSWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdKaFkydG5jbTkxYm1RNklDUmljbUZ1WkMxamIyeHZjanRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCaVlXTnJaM0p2ZFc1a0xXbHRZV2RsT2lCMWNtd29KMmgwZEhCek9pOHZZall5WVdObU5XRXhNemt3WXpWaU1EZzBaVEF0Tkdaa09ETXdNRGRqWWpnNE1UVmxPR05tT1RsaE4yRTVNbVU1WkRaaE56TXVjM05zTG1ObU1pNXlZV05yWTJSdUxtTnZiUzlzYjJkdkxYSmhZMnR6Y0dGalpTNXdibWNuS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmlZV05yWjNKdmRXNWtMV2x0WVdkbE9pQnViMjVsTENCMWNtd29KMmgwZEhCek9pOHZZall5WVdObU5XRXhNemt3WXpWaU1EZzBaVEF0Tkdaa09ETXdNRGRqWWpnNE1UVmxPR05tT1RsaE4yRTVNbVU1WkRaaE56TXVjM05zTG1ObU1pNXlZV05yWTJSdUxtTnZiUzlzYjJkdkxYSmhZMnR6Y0dGalpTNXpkbWNuS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmlZV05yWjNKdmRXNWtMWEpsY0dWaGREb2dibTh0Y21Wd1pXRjBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdKaFkydG5jbTkxYm1RdGNHOXphWFJwYjI0NklERTNjSGdnT1hCNE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1JXMWxjbWRsYm1ONUlFNXZkR2xqWlZ4dVhHNGdJQ0FnSTJKaGJtNWxjaTFoYm01dmRXNWpaVzFsYm5RdFkyOXVkR0ZwYm1WeUlIdGNiaUFnSUNBZ0lDQWdZbUZqYTJkeWIzVnVaRG9nSTJabVpXUmpaanRjYmx4dUlDQWdJQ0FnSUNBdVltRnVibVZ5TFdGdWJtOTFibU5sYldWdWRDQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCd2IzTnBkR2x2YmpvZ2NtVnNZWFJwZG1VN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IzYVdSMGFEb2dPVFl3Y0hnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J0WVhKbmFXNDZJREFnWVhWMGJ6dGNiaUFnSUNBZ0lDQWdJQ0FnSUhCaFpHUnBibWM2SURFMWNIZ2dNRHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdhU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY0c5emFYUnBiMjQ2SUdGaWMyOXNkWFJsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSdmNEb2dNVFZ3ZUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCc1pXWjBPaUF3TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01UaHdlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjJ4dmNqb2dJMk15TTJVMFpqdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0lDQWdJQ0FnY0NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXRnlaMmx1T2lBd0lEUTFjSGdnTUNBek1IQjRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1p2Ym5RdFptRnRhV3g1T2lBa1ltRnpaUzFtYjI1MExXWmhiV2xzZVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIyNTBMWE5wZW1VNklERTBjSGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm05dWRDMTNaV2xuYUhRNklEUXdNRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JzYVc1bExXaGxhV2RvZERvZ01UZHdlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjJ4dmNqb2dJelkyTldVMFpUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE4wY205dVp5QjdabTl1ZEMxM1pXbG5hSFE2SURjd01EdDlYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JoSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjlzYjNJNklDTTJOalZsTkdVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJsZUhRdFpHVmpiM0poZEdsdmJqb2dkVzVrWlhKc2FXNWxPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDWTZhRzkyWlhJZ2UyTnZiRzl5T2lBak1qSXlPMzFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNBalltRnVibVZ5TFdGdWJtOTFibU5sYldWdWRDMWpiRzl6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J3YjNOcGRHbHZiam9nWVdKemIyeDFkR1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBiM0E2SURFNGNIZzdYRzRnSUNBZ0lDQWdJQ0FnSUNCeWFXZG9kRG9nTUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1p2Ym5RdGMybDZaVG9nTXpad2VEdGNiaUFnSUNBZ0lDQWdJQ0FnSUdadmJuUXRkMlZwWjJoME9pQXpNREE3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnNhVzVsTFdobGFXZG9kRG9nTTNCNE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdWNGRDMWtaV052Y21GMGFXOXVPaUJ1YjI1bE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5c2IzSTZJQ00yTmpWbE5HVTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDWTZhRzkyWlhJZ2UyTnZiRzl5T2lBak16RXlaREkyTzMxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JuMWNibHh1THk4Z1ZHOXZiSFJwY0Z4dVhHNHVkV2t0ZEc5dmJIUnBjQ0I3WEc0Z0lDQWdabTl1ZEMxbVlXMXBiSGs2SUNSaVlYTmxMV1p2Ym5RdFptRnRhV3g1TzF4dUlDQWdJR1p2Ym5RdGQyVnBaMmgwT2lBek1EQTdYRzRnSUNBZ1ptOXVkQzF6YVhwbE9pQXhNbkI0TzF4dUlDQWdJR3hwYm1VdGFHVnBaMmgwT2lBeE5uQjRPMXh1SUNBZ0lHSmhZMnRuY205MWJtUTZJQ014TVRFN1hHNGdJQ0FnWTI5c2IzSTZJQ05tWm1ZN1hHNGdJQ0FnY0dGa1pHbHVaem9nTVRCd2VDQXhOWEI0TzF4dUlDQWdJSEJ2YzJsMGFXOXVPaUJoWW5OdmJIVjBaVHRjYmlBZ0lDQjZMV2x1WkdWNE9pQTVPVGs1TzF4dWZWeHVYRzR2THlCR2IyOTBaWEpjYmx4dUkzSmhlQzFtYjI5MFpYSXRkM0poY0hCbGNpQjdYRzRnSUNBZ1ptOXVkQzFtWVcxcGJIazZJQ1JpWVhObExXWnZiblF0Wm1GdGFXeDVPMXh1SUNBZ0lIZHBaSFJvT2lBeE1EQWxPMXh1SUNBZ0lHMXBiaTEzYVdSMGFEb2dPVFl3Y0hnN1hHNGdJQ0FnWW05eVpHVnlMWFJ2Y0RvZ01UQndlQ0J6YjJ4cFpDQWtZbkpoYm1RdFkyOXNiM0k3WEc0Z0lDQWdZbUZqYTJkeWIzVnVaRG9nSXpKaE1tRXlZVHRjYmx4dUlDQWdJQ055WVhndFptOXZkR1Z5TFdOdmJuUmhhVzVsY2lCN1hHNGdJQ0FnSUNBZ0lIZHBaSFJvT2lBNU5qQndlRHRjYmlBZ0lDQWdJQ0FnYldGeVoybHVPaUF3SUdGMWRHODdYRzRnSUNBZ0lDQWdJSEJoWkdScGJtYzZJREkxY0hnZ01UQndlQ0F6TUhCNE8xeHVJQ0FnSUNBZ0lDQXRkMlZpYTJsMExXSnZlQzF6YVhwcGJtYzZJR0p2Y21SbGNpMWliM2c3SUM4cUlGTmhabUZ5YVM5RGFISnZiV1VzSUc5MGFHVnlJRmRsWWt0cGRDQXFMMXh1SUNBZ0lDQWdJQ0F0Ylc5NkxXSnZlQzF6YVhwcGJtYzZJR0p2Y21SbGNpMWliM2c3SUM4cUlFWnBjbVZtYjNnc0lHOTBhR1Z5SUVkbFkydHZJQ292WEc0Z0lDQWdJQ0FnSUdKdmVDMXphWHBwYm1jNklHSnZjbVJsY2kxaWIzZzdJQzhxSUVsRklEZ3JJQ292WEc1Y2JpQWdJQ0FnSUNBZ0xuSmhlQzFtYjI5MFpYSXRZMjlzSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1pzYjJGME9pQnNaV1owTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkMmxrZEdnNklESXdKVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdKaTV5WVhndFptOXZkR1Z5TFdGaWIzVjBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IzYVdSMGFEb2dNelVsTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0xuSmhlQzFtYjI5MFpYSXRZV0p2ZFhRdGJHbHpkQ0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHWnNiMkYwT2lCc1pXWjBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCM2FXUjBhRG9nTkRVbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR2cwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1p2Ym5RdGMybDZaVG9nTVROd2VEdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSbGVIUXRkSEpoYm5ObWIzSnRPaUIxY0hCbGNtTmhjMlU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMnh2Y2pvZ0kyWm1aanRjYmlBZ0lDQWdJQ0FnSUNBZ0lHMWhjbWRwYmpvZ01DQXdJREV3Y0hnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JtYjI1MExYZGxhV2RvZERvZ05EQXdPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ2RXd2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2JHbHpkQzF6ZEhsc1pTMTBlWEJsT2lCdWIyNWxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2JXRnlaMmx1T2lBd08xeHVJQ0FnSUNBZ0lDQWdJQ0FnYkdsdVpTMW9aV2xuYUhRNklESXhjSGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQndZV1JrYVc1bk9pQXdPMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ1lTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCbWIyNTBMWE5wZW1VNklERXljSGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMnh2Y2pvZ0kyRmhZVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUmxlSFF0WkdWamIzSmhkR2x2YmpvZ2JtOXVaVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdKanBvYjNabGNpQjdkR1Y0ZEMxa1pXTnZjbUYwYVc5dU9pQjFibVJsY214cGJtVTdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdJM0poZUMxaVlYTmxiV1Z1ZEMxM2NtRndjR1Z5SUh0Y2JpQWdJQ0FnSUNBZ2QybGtkR2c2SURFd01DVTdYRzRnSUNBZ0lDQWdJR0poWTJ0bmNtOTFibVE2SUNNd01EQTdYRzRnSUNBZ0lDQWdJR052Ykc5eU9pQWpabVptTzF4dVhHNGdJQ0FnSUNBZ0lDTnlZWGd0WW1GelpXMWxiblF0WTI5dWRHRnBibVZ5SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzFoZUMxM2FXUjBhRG9nT1Rnd2NIZzdYRzRnSUNBZ0lDQWdJQ0FnSUNCdFlYSm5hVzQ2SURBZ1lYVjBienRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQmhaR1JwYm1jNklESXdjSGdnTVRCd2VEdGNiaUFnSUNBZ0lDQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01USndlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDMTNaV0pyYVhRdFltOTRMWE5wZW1sdVp6b2dZbTl5WkdWeUxXSnZlRHNnTHlvZ1UyRm1ZWEpwTDBOb2NtOXRaU3dnYjNSb1pYSWdWMlZpUzJsMElDb3ZYRzRnSUNBZ0lDQWdJQ0FnSUNBdGJXOTZMV0p2ZUMxemFYcHBibWM2SUdKdmNtUmxjaTFpYjNnN0lDOHFJRVpwY21WbWIzZ3NJRzkwYUdWeUlFZGxZMnR2SUNvdlhHNGdJQ0FnSUNBZ0lDQWdJQ0JpYjNndGMybDZhVzVuT2lCaWIzSmtaWEl0WW05NE95QXZLaUJKUlNBNEt5QXFMMXh1SUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0I5WEc1Y2JuMWNibHh1THk4Z1FYVjBieTFqYjIxd2JHVjBaVnh1WEc1MWJDNTFhUzFoZFhSdlkyOXRjR3hsZEdVZ2UxeHVJQ0FnSUhvdGFXNWtaWGc2SURRME5EUTdYRzRnSUNBZ2NHOXphWFJwYjI0NklHRmljMjlzZFhSbE8xeHVJQ0FnSUd4cGMzUXRjM1I1YkdVdGRIbHdaVG9nYm05dVpUdGNiaUFnSUNCaVlXTnJaM0p2ZFc1a09pQWpaV1ZsTzF4dUlDQWdJSEJoWkdScGJtYzZJREE3WEc1Y2JpQWdJQ0JoSUh0Y2JpQWdJQ0FnSUNBZ1pHbHpjR3hoZVRvZ1lteHZZMnM3WEc0Z0lDQWdJQ0FnSUhCaFpHUnBibWM2SURkd2VDQXhNSEI0TzF4dUlDQWdJQ0FnSUNCbWIyNTBMV1poYldsc2VUb2dKSE5sWTI5dVpHRnllUzFtYjI1MExXWmhiV2xzZVR0Y2JpQWdJQ0FnSUNBZ1ptOXVkQzEzWldsbmFIUTZJRE13TUR0Y2JpQWdJQ0FnSUNBZ1ptOXVkQzF6YVhwbE9pQXhOSEI0TzF4dUlDQWdJQ0FnSUNCamIyeHZjam9nSXpZMk5qdGNibHh1SUNBZ0lDQWdJQ0FtT21odmRtVnlJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTjFjbk52Y2pvZ2NHOXBiblJsY2p0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJsZUhRdFpHVmpiM0poZEdsdmJqb2dibTl1WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR0poWTJ0bmNtOTFibVE2SUNOalkyTTdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyeHZjam9nSXpZMk5qdGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdmVnh1WEc0Z0lDQWdiR2s2YkdGemRDMWphR2xzWkNCaElIdGliM0prWlhJdFltOTBkRzl0T2lCdWIyNWxPMzFjYmx4dWZWeHVYRzR1ZFdrdGMzUmhkR1V0YUc5MlpYSXNYRzR1ZFdrdGQybGtaMlYwTFdOdmJuUmxiblFnTG5WcExYTjBZWFJsTFdodmRtVnlMRnh1TG5WcExYZHBaR2RsZEMxb1pXRmtaWElnTG5WcExYTjBZWFJsTFdodmRtVnlMRnh1TG5WcExYTjBZWFJsTFdadlkzVnpMRnh1TG5WcExYZHBaR2RsZEMxamIyNTBaVzUwSUM1MWFTMXpkR0YwWlMxbWIyTjFjeXhjYmk1MWFTMTNhV1JuWlhRdGFHVmhaR1Z5SUM1MWFTMXpkR0YwWlMxbWIyTjFjeUI3WEc0Z0lDQWdZM1Z5YzI5eU9pQndiMmx1ZEdWeU8xeHVJQ0FnSUhSbGVIUXRaR1ZqYjNKaGRHbHZiam9nYm05dVpUdGNiaUFnSUNCaVlXTnJaM0p2ZFc1a09pQWpZMk5qTzF4dUlDQWdJR052Ykc5eU9pQWpOalkyTzF4dWZWeHVYRzR1ZFdrdFlYVjBiMk52YlhCc1pYUmxMbk52ZFhKalpUcG9iM1psY2lCN1hHNGdJQ0FnWW1GamEyZHliM1Z1WkRvZ0l6UTFORFUwTlR0Y2JuMWNibHh1TG5WcExXaGxiSEJsY2kxb2FXUmtaVzR0WVdOalpYTnphV0pzWlNCN1hHNGdJQ0FnWW05eVpHVnlPaUF3TzF4dUlDQWdJR05zYVhBNklISmxZM1FvTUNBd0lEQWdNQ2s3WEc0Z0lDQWdhR1ZwWjJoME9pQXhjSGc3WEc0Z0lDQWdiV0Z5WjJsdU9pQXRNWEI0TzF4dUlDQWdJRzkyWlhKbWJHOTNPaUJvYVdSa1pXNDdYRzRnSUNBZ2NHRmtaR2x1WnpvZ01EdGNiaUFnSUNCd2IzTnBkR2x2YmpvZ1lXSnpiMngxZEdVN1hHNGdJQ0FnZDJsa2RHZzZJREZ3ZUR0Y2JuMWNibHh1THk4Z1JVNUVJQ055WVhndGMzVndjRzl5ZEMxb1pXRmtaWEpjYmx4dVFDMXRiM290Wkc5amRXMWxiblFnZFhKc0xYQnlaV1pwZUNncElIdGNiaUFnSUNBamNtRjRMWE4xY0hCdmNuUXRhR1ZoWkdWeUlDTnlZWGd0WlhsbFluSnZkeTFqYjI1MFlXbHVaWElnTG5KaGVDMWtjbTl3Wkc5M2JpMXRaVzUxSUQ0Z2RXd2dQaUJzYVNBK0lIVnNJSHQwYjNBNklESXljSGc3ZlZ4dWZWeHVYRzR2THlCTWIyRmthVzVuSUhOd2FXNXVaWEpjYmx4dUxuTndhVzV1WlhJZ2UxeHVJQ0FnSUdScGMzQnNZWGs2SUdKc2IyTnJPMXh1SUNBZ0lHaGxhV2RvZERvZ01qQndlRHRjYmlBZ0lDQjNhV1IwYURvZ01qQndlRHRjYmlBZ0lDQnRZWEpuYVc0NklETXdjSGdnWVhWMGJ6dGNiaUFnSUNCd2IzTnBkR2x2YmpvZ2NtVnNZWFJwZG1VN1hHNGdJQ0FnTFhkbFltdHBkQzFoYm1sdFlYUnBiMjQ2SUhKdmRHRjBhVzl1SURBdU5YTWdhVzVtYVc1cGRHVWdiR2x1WldGeU8xeHVJQ0FnSUMxdGIzb3RZVzVwYldGMGFXOXVPaUJ5YjNSaGRHbHZiaUF3TGpWeklHbHVabWx1YVhSbElHeHBibVZoY2p0Y2JpQWdJQ0F0YnkxaGJtbHRZWFJwYjI0NklISnZkR0YwYVc5dUlEQXVOWE1nYVc1bWFXNXBkR1VnYkdsdVpXRnlPMXh1SUNBZ0lHRnVhVzFoZEdsdmJqb2djbTkwWVhScGIyNGdNQzQxY3lCcGJtWnBibWwwWlNCc2FXNWxZWEk3WEc0Z0lDQWdZbTl5WkdWeUxXeGxablE2SUROd2VDQnpiMnhwWkNCeVoySmhLRE13TERFek1Dd3lNVFVzTGpFMUtUdGNiaUFnSUNCaWIzSmtaWEl0Y21sbmFIUTZJRE53ZUNCemIyeHBaQ0J5WjJKaEtETXdMREV6TUN3eU1UVXNMakUxS1R0Y2JpQWdJQ0JpYjNKa1pYSXRZbTkwZEc5dE9pQXpjSGdnYzI5c2FXUWdjbWRpWVNnek1Dd3hNekFzTWpFMUxDNHhOU2s3WEc0Z0lDQWdZbTl5WkdWeUxYUnZjRG9nTTNCNElITnZiR2xrSUhKblltRW9NekFzTVRNd0xESXhOU3d1T0NrN1hHNGdJQ0FnWW05eVpHVnlMWEpoWkdsMWN6b2dNVEF3SlR0Y2JuMWNibHh1UUMxM1pXSnJhWFF0YTJWNVpuSmhiV1Z6SUhKdmRHRjBhVzl1SUh0Y2JpQWdJQ0JtY205dElIdGNiaUFnSUNBZ0lDQWdMWGRsWW10cGRDMTBjbUZ1YzJadmNtMDZJSEp2ZEdGMFpTZ3daR1ZuS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdkRzhnZTF4dUlDQWdJQ0FnSUNBdGQyVmlhMmwwTFhSeVlXNXpabTl5YlRvZ2NtOTBZWFJsS0RNMU9XUmxaeWs3WEc0Z0lDQWdmVnh1ZlZ4dVhHNHZMeUJUUlVGU1EwZ2dVa1ZUVlV4VVV6b2dabWxzZEdWeWMxeHVYRzUxYkM1emRYQndiM0owTFdOdmJuUmxiblF0Wm1sc2RHVnlJSHRjYmlBZ0lDQm1iMjUwTFhkbGFXZG9kRG9nTkRBd08xeHVJQ0FnSUdadmJuUXRjMmw2WlRvZ01UUndlRHRjYmlBZ0lDQnNhWE4wTFhOMGVXeGxMWFI1Y0dVNklHNXZibVU3WEc0Z0lDQWdiV0Z5WjJsdUxXSnZkSFJ2YlRvZ01qVndlRHRjYmlBZ0lDQndZV1JrYVc1bk9pQXdPMXh1WEc0Z0lDQWdiR2tnZTF4dUlDQWdJQ0FnSUNCa2FYTndiR0Y1T2lCcGJteHBibVU3WEc0Z0lDQWdJQ0FnSUcxaGNtZHBiam9nTUNBeU5YQjRJREFnTUR0Y2JseHVJQ0FnSUNBZ0lDQmhJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQmhaR1JwYm1jdFltOTBkRzl0T2lBeWNIZzdYRzRnSUNBZ0lDQWdJQ0FnSUNCMFpYaDBMV1JsWTI5eVlYUnBiMjQ2SUc1dmJtVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyeHZjam9nSXpGbE9ESmtOenRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdKanBvYjNabGNpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR1Y0ZEMxa1pXTnZjbUYwYVc5dU9pQnViMjVsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdKdmNtUmxjaTFpYjNSMGIyMDZJRE53ZUNCemIyeHBaQ0FqWkdSa08xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdKanBzWVhOMExXTm9hV3hrSUdFZ2UyMWhjbWRwYmkxeWFXZG9kRG9nTUR0OVhHNWNiaUFnSUNBZ0lDQWdKaTVoWTNScGRtVWdZU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMnh2Y2pvZ0l6TXpNenRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQnZhVzUwWlhJdFpYWmxiblJ6T2lCdWIyNWxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kzVnljMjl5T2lCa1pXWmhkV3gwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdZbTl5WkdWeUxXSnZkSFJ2YlRvZ00zQjRJSE52Ykdsa0lDTXhaVGd5WkRjN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOVhHNWNibjFjYmx4dUx5OGdVMFZCVWtOSUlGSkZVMVZNVkZNNklHTnZiblJsYm5SY2JseHVMbk4xY0hCdmNuUXRjbVZ6ZFd4MGN5MWpiMjUwWVdsdVpYSWdlMXh1SUNBZ0lIQnZjMmwwYVc5dU9pQnlaV3hoZEdsMlpUdGNiaUFnSUNCM2FXUjBhRG9nTVRBd0pUdGNiaUFnSUNCamIyeHZjam9nSXpNek16dGNibHh1SUNBZ0lHZzFJSHRjYmlBZ0lDQWdJQ0FnWm05dWRDMXphWHBsT2lBeE5IQjRPMXh1SUNBZ0lDQWdJQ0J0WVhKbmFXNHRZbTkwZEc5dE9pQTFjSGc3WEc1Y2JpQWdJQ0FnSUNBZ1lTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMFpYaDBMV1JsWTI5eVlYUnBiMjQ2SUc1dmJtVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCamIyeHZjam9nSXpGbE9ESmtOenRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdKanBvYjNabGNpQjdkR1Y0ZEMxa1pXTnZjbUYwYVc5dU9pQjFibVJsY214cGJtVTdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjQ0I3WEc0Z0lDQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01UUndlRHRjYmlBZ0lDQWdJQ0FnYkdsdVpTMW9aV2xuYUhRNklERTJjSGc3WEc0Z0lDQWdJQ0FnSUcxaGNtZHBiam9nTUNBd0lEVndlRHRjYmx4dUlDQWdJQ0FnSUNBbUxtMWxkR0VnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdiV0Z5WjJsdUxXSnZkSFJ2YlRvZ01qQndlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZiRzl5T2lBak9EZzRPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQmhJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwWlhoMExXUmxZMjl5WVhScGIyNDZJRzV2Ym1VN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXNiM0k2SUNNMk5qWTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FtT21odmRtVnlJSHQwWlhoMExXUmxZMjl5WVhScGIyNDZJSFZ1WkdWeWJHbHVaVHQ5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lITndZVzRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhCaFpHUnBibWN0YkdWbWREb2dOM0I0TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUcxaGNtZHBiaTFzWldaME9pQTNjSGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWW05eVpHVnlMV3hsWm5RNklERndlQ0J6YjJ4cFpDQWpPRGc0TzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjQzV6ZFhCd2IzSjBMWEpsYzNWc2RITXRiVzl5WlNCN1hHNGdJQ0FnSUNBZ0lIZHBaSFJvT2lBMU1EQndlRHRjYmlBZ0lDQWdJQ0FnZEdWNGRDMWhiR2xuYmpvZ1kyVnVkR1Z5TzF4dUlDQWdJQ0FnSUNCdFlYSm5hVzQ2SURVMWNIZ2dZWFYwYnp0Y2JpQWdJQ0FnSUNBZ1ptOXVkQzEzWldsbmFIUTZJRFF3TUR0Y2JpQWdJQ0FnSUNBZ1ptOXVkQzF6YVhwbE9pQXhObkI0TzF4dVhHNGdJQ0FnSUNBZ0lHRWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1ptOXVkQzEzWldsbmFIUTZJRFF3TUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR1p2Ym5RdGMybDZaVG9nTVRSd2VEdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJHOXlPaUFqTmpZMk8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWW1GamEyZHliM1Z1WkRvZ0kyUmtaRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUmxlSFF0WVd4cFoyNDZJR05sYm5SbGNqdGNiaUFnSUNBZ0lDQWdJQ0FnSUhCaFpHUnBibWM2SURFd2NIZ2dNVFV3Y0hnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwWlhoMExXUmxZMjl5WVhScGIyNDZJRzV2Ym1VN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IzYVdSMGFEb2dNVEF3SlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzEzWldKcmFYUXRkSEpoYm5OcGRHbHZiam9nWVd4c0lEQXVNM01nWldGelpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUMxdGIzb3RkSEpoYm5OcGRHbHZiam9nWVd4c0lEQXVNM01nWldGelpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSeVlXNXphWFJwYjI0NklHRnNiQ0F3TGpOeklHVmhjMlU3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ1k2YUc5MlpYSWdlMkpoWTJ0bmNtOTFibVE2SUNOalkyTTdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBJSHRrYVhOd2JHRjVPaUJ1YjI1bE8zMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1SUNBZ0lIQXVjM1Z3Y0c5eWRDMXlaWE4xYkhSekxXNXZibVVnZTF4dUlDQWdJQ0FnSUNCdFlYSm5hVzQ2SURNd2NIZ2dNRHRjYmlBZ0lDQWdJQ0FnWm05dWRDMTNaV2xuYUhRNklETXdNRHRjYmlBZ0lDQWdJQ0FnWm05dWRDMXphWHBsT2lBeE5uQjRPMXh1SUNBZ0lDQWdJQ0JqYjJ4dmNqb2dJelUxTlR0Y2JpQWdJQ0I5WEc1OVhHNWNiaTh2SUZSdkxYUnZjQ0JzYVc1clhHNWNiaTV6ZFhCd2IzSjBMWEpsYzNWc2RITXRkRzl3SUh0Y2JpQWdJQ0J3YjNOcGRHbHZiam9nWm1sNFpXUTdYRzRnSUNBZ1ltOTBkRzl0T2lBdE5UQXdjSGc3WEc0Z0lDQWdjbWxuYUhRNklEVXdjSGc3WEc0Z0lDQWdlaTFwYm1SbGVEb2dPVGs1T1R0Y2JpQWdJQ0J3WVdSa2FXNW5PaUF4TUhCNElERTFjSGc3WEc0Z0lDQWdabTl1ZEMxemFYcGxPaUF5TkhCNE8xeHVJQ0FnSUdOdmJHOXlPaUFqWm1abU8xeHVJQ0FnSUdKaFkydG5jbTkxYm1RNklDTXpNek03WEc0Z0lDQWdiM0JoWTJsMGVUb2dNQzQxTzF4dUlDQWdJQzF0YjNvdGIzQmhZMmwwZVRvZ01DNDFPMXh1SUNBZ0lHWnBiSFJsY2pwaGJIQm9ZU2h2Y0dGamFYUjVQVFV3S1R0Y2JpQWdJQ0F0ZDJWaWEybDBMWFJ5WVc1emFYUnBiMjQ2SUdGc2JDQXdMakUxY3lCbFlYTmxPMXh1SUNBZ0lDMXRiM290ZEhKaGJuTnBkR2x2YmpvZ1lXeHNJREF1TVRWeklHVmhjMlU3WEc0Z0lDQWdkSEpoYm5OcGRHbHZiam9nWVd4c0lEQXVNVFZ6SUdWaGMyVTdYRzVjYmlBZ0lDQTZhRzkyWlhJZ2UxeHVJQ0FnSUNBZ0lDQnZjR0ZqYVhSNU9pQXhMakE3WEc0Z0lDQWdJQ0FnSUMxdGIzb3RiM0JoWTJsMGVUb2dNUzR3TzF4dUlDQWdJQ0FnSUNCbWFXeDBaWEk2WVd4d2FHRW9iM0JoWTJsMGVUMHhNREFwTzF4dUlDQWdJSDFjYmx4dWZWeHVYRzRqY21GNExYTjFjSEJ2Y25RdGMyVmhjbU5vTFdsdWNIVjBJSHRjYmlBZ0lDQnRZWEpuYVc0dFltOTBkRzl0T2lBd08xeHVmVnh1STNKaGVDMW1iMjkwWlhJdGQzSmhjQ0FqY21GNExYSjFaeTEzY21Gd0lIdGNiaUFnSUNCd1lXUmthVzVuT2lBek1IQjRJREFnTUR0Y2JpQWdJQ0JpWVdOclozSnZkVzVrT2lBak1HUmhabU5qTzF4dWZWeHVMbVp2YjNSbGNpMW1jbUZuYldWdWRITWdMbU52Ym5SbGJuUXRabkpoWjIxbGJuUXVhSFJ0YkMxamIyNTBaVzUwSUM1MWMyVnlMV1JsWm1sdVpXUXRiV0Z5YTNWd0lIdGNiaUFnSUNCM2FXUjBhRG9nT1RZd2NIZzdYRzRnSUNBZ2JXRnlaMmx1T2lBd0lHRjFkRzg3WEc0Z0lDQWdZbUZqYTJkeWIzVnVaRG9nYm05dVpUdGNiaUFnSUNCaWIzSmtaWEl0ZDJsa2RHZzZJREE3WEc0Z0lDQWdiV0Z5WjJsdUxYUnZjRG9nTUR0Y2JpQWdJQ0J3WVdSa2FXNW5PaUF3TzF4dWZWeHVJaXdLQ1FraUx5b2dVMVJCVWxRZ1NHVmhaR1Z5SUZKbGMyVjBJQzB0SUdKaGMyVmtJRzl1SUdoMGRIQTZMeTl0WlhsbGNuZGxZaTVqYjIwdlpYSnBZeTkwYjI5c2N5OWpjM012Y21WelpYUXZJSFl5TGpCaU1TQjhJREl3TVRFd01TQXFMMXh1WEc0amNtRjRMWE4xY0hCdmNuUXRhR1ZoWkdWeUlIdGNiaUFnSUNCc2FXNWxMV2hsYVdkb2REb2dNVHRjYmx4dUlDQWdJR1JwZGl3Z2RXd3NJR3hwTENCb01Td2djQ3dnWVN3Z2MzUnliMjVuTENCb1pXRmtaWElzSUdadmNtMHNJR0Z5ZEdsamJHVXNJR0Z6YVdSbExDQnVZWFlzSUhObFkzUnBiMjRnZTF4dUlDQWdJQ0FnSUNCdFlYSm5hVzQ2SURBN1hHNGdJQ0FnSUNBZ0lIQmhaR1JwYm1jNklEQTdYRzRnSUNBZ0lDQWdJR0p2Y21SbGNqb2dNRHRjYmlBZ0lDQWdJQ0FnYjNWMGJHbHVaVG9nTUR0Y2JpQWdJQ0FnSUNBZ1ptOXVkQzF6YVhwbE9pQXhNREFsTzF4dUlDQWdJQ0FnSUNCbWIyNTBPaUJwYm1obGNtbDBPMXh1SUNBZ0lDQWdJQ0IyWlhKMGFXTmhiQzFoYkdsbmJqb2dZbUZ6Wld4cGJtVTdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2Iyd3NJSFZzSUhzZ2JHbHpkQzF6ZEhsc1pUb2dibTl1WlRzZ2ZWeHVJQ0FnSUZ4dUlDQWdJQzhxSUVoVVRVdzFJR1JwYzNCc1lYa3RjbTlzWlNCeVpYTmxkQ0JtYjNJZ2IyeGtaWElnWW5KdmQzTmxjbk1nS2k5Y2JpQWdJQ0JoY25ScFkyeGxMQ0JoYzJsa1pTd2dhR1ZoWkdWeUxDQnVZWFlzSUhObFkzUnBiMjRnZXlCa2FYTndiR0Y1T2lCaWJHOWphenNnZlZ4dUlDQWdJRnh1ZlZ4dVhHNHZLaUJGVGtRZ1NHVmhaR1Z5SUZKbGMyVjBJQ292WEc0aUxBb0pDU0l2S2lCQ1lYTnBZeUJEYkdWaGNtWnBlQ0FxTDF4dUxuSmhlQzFqYkdWaGNtWnBlQ0I3WEc0Z0lDQWdaR2x6Y0d4aGVUb2dhVzVzYVc1bExXSnNiMk5yTzF4dVhHNGdJQ0FnSmpwaFpuUmxjaUI3SUNCY2JpQWdJQ0FnSUNBZ1kyOXVkR1Z1ZERvZ0p5NG5PMXh1SUNBZ0lDQWdJQ0JrYVhOd2JHRjVPaUJpYkc5amF6dGNiaUFnSUNBZ0lDQWdhR1ZwWjJoME9pQXdPMXh1SUNBZ0lDQWdJQ0JqYkdWaGNqb2dZbTkwYUR0Y2JpQWdJQ0FnSUNBZ2RtbHphV0pwYkdsMGVUb2dhR2xrWkdWdU8xeHVJQ0FnSUgxY2JuMWNibHh1THlvZ1NHbGtaWE1nWm5KdmJTQkpSUzF0WVdNZ1hGd3FMMXh1TG1sbE5pQXVjbUY0TFdOc1pXRnlabWw0SUh0b1pXbG5hSFE2SURFbE8zMWNiaTV5WVhndFkyeGxZWEptYVhnZ2UyUnBjM0JzWVhrNklHSnNiMk5yTzMxY2JpOHFJRVZ1WkNCb2FXUmxJR1p5YjIwZ1NVVXRiV0ZqSUNvdlhHNGlMQW9KQ1NJdkx5QlRWRUZTVkNCQlpHcDFjM1J0Wlc1MGMxeHVYRzR2THlCRGIyMXRkVzVwZEhsY2JpNXNZWGx2ZFhRdGNtVm5hVzl1TFdsdWJtVnlMbU52Ym5SbGJuUWdMbk4xY0hCdmNuUXRjbVZ6ZFd4MGN5MWpiMjUwWVdsdVpYSWdhRFFnZTF4dUlDQWdJRzFoY21kcGJpMTBiM0E2SURWd2VEdGNibjFjYmx4dUx5OGdSRzlqYzF4dUkyTnZiblJsYm5RdGQzSmhjSEJsY2lBdWMzVndjRzl5ZEMxeVpYTjFiSFJ6TFdOdmJuUmhhVzVsY2lCN1hHNGdJQ0FnY0dGa1pHbHVaeTFzWldaME9pQXdPMXh1SUNBZ0lHMWhjbWRwYmkxc1pXWjBPaUF3TzF4dWZWeHVYRzRqYldGcGJpMWpiMjUwWlc1MElDTmpiMjUwWVdsdVpYSWdMbk4xY0hCdmNuUXRjbVZ6ZFd4MGN5MWpiMjUwWVdsdVpYSWdkV3d1YzNWd2NHOXlkQzFqYjI1MFpXNTBMV1pwYkhSbGNpQjdiV0Z5WjJsdUxXeGxablE2SURBN2ZWeHVYRzRqWTI5dWRHVnVkQzEzY21Gd2NHVnlJQzV6ZFhCd2IzSjBMWEpsYzNWc2RITXRZMjl1ZEdGcGJtVnlJSFZzTG5OMWNIQnZjblF0WTI5dWRHVnVkQzFtYVd4MFpYSWdiR2tnZTF4dUlDQWdJR1p2Ym5RdFptRnRhV3g1T2lBblQzQmxiaUJUWVc1ekp5d2dKMGhsYkhabGRHbGpZVTVsZFdVbkxDQW5TR1ZzZG1WMGFXTmhJRTVsZFdVbkxDQklaV3gyWlhScFkyRXNJRUZ5YVdGc0xDQnpZVzV6TFhObGNtbG1PMXh1SUNBZ0lHWnZiblF0ZDJWcFoyaDBPaUEwTURBN1hHNGdJQ0FnWm05dWRDMXphWHBsT2lBeE5IQjRPMXh1SUNBZ0lHeHBibVV0YUdWcFoyaDBPaUF4Tm5CNE8xeHVJQ0FnSUd4cGMzUXRjM1I1YkdVdGRIbHdaVG9nYm05dVpUdGNiaUFnSUNCdFlYSm5hVzR0WW05MGRHOXRPaUF5TlhCNE8xeHVJQ0FnSUhCaFpHUnBibWM2SURBN1hHNTlYRzVjYmlOdFlXbHVMV052Ym5SbGJuUWdMbU52Ym5SaGFXNWxjaUF1YzNWd2NHOXlkQzF5WlhOMWJIUnpMV052Ym5SaGFXNWxjaUJvTkNCN1hHNGdJQ0FnY0dGa1pHbHVaeTEwYjNBNklESTFjSGc3WEc0Z0lDQWdabTl1ZEMxbVlXMXBiSGs2SUNkVGIzVnlZMlVnVTJGdWN5QlFjbThuTENBblNHVnNkbVYwYVdOaFRtVjFaU2NzSUNkSVpXeDJaWFJwWTJFZ1RtVjFaU2NzSUVobGJIWmxkR2xqWVN3Z1FYSnBZV3dzSUhOaGJuTXRjMlZ5YVdZN1hHNGdJQ0FnWm05dWRDMTNaV2xuYUhRNklETXdNRHRjYmlBZ0lDQmpiMnh2Y2pvZ0l6WTJOanRjYmlBZ0lDQm1iMjUwTFhOcGVtVTZJREkwY0hnN1hHNGdJQ0FnYldGeVoybHVMV0p2ZEhSdmJUb2dNakJ3ZUR0Y2JuMWNibHh1STJOdmJuUmxiblF0ZDNKaGNIQmxjaUF1YzNWd2NHOXlkQzF5WlhOMWJIUnpMV052Ym5SaGFXNWxjaUFqYzJWaGNtTm9MWEpsYzNWc2RITWdhRFVnZTF4dUlDQWdJR1p2Ym5RdFptRnRhV3g1T2lBblUyOTFjbU5sSUZOaGJuTWdVSEp2Snl3Z0owaGxiSFpsZEdsallVNWxkV1VuTENBblNHVnNkbVYwYVdOaElFNWxkV1VuTENCSVpXeDJaWFJwWTJFc0lFRnlhV0ZzTENCellXNXpMWE5sY21sbU8xeHVJQ0FnSUdadmJuUXRkMlZwWjJoME9pQTBNREE3WEc0Z0lDQWdabTl1ZEMxemFYcGxPaUF4Tm5CNE8xeHVJQ0FnSUd4cGJtVXRhR1ZwWjJoME9pQXhObkI0TzF4dUlDQWdJRzFoY21kcGJpMWliM1IwYjIwNklEVndlRHRjYm4xY2JpTmpiMjUwWlc1MExYZHlZWEJ3WlhJZ0xuTjFjSEJ2Y25RdGNtVnpkV3gwY3kxamIyNTBZV2x1WlhJZ0kzTmxZWEpqYUMxeVpYTjFiSFJ6SUhBZ2UxeHVJQ0FnSUdadmJuUXRabUZ0YVd4NU9pQW5VMjkxY21ObElGTmhibk1nVUhKdkp5d2dKMGhsYkhabGRHbGpZVTVsZFdVbkxDQW5TR1ZzZG1WMGFXTmhJRTVsZFdVbkxDQklaV3gyWlhScFkyRXNJRUZ5YVdGc0xDQnpZVzV6TFhObGNtbG1PMXh1SUNBZ0lHWnZiblF0ZDJWcFoyaDBPaUF6TURBN1hHNGdJQ0FnWm05dWRDMXphWHBsT2lBeE5IQjRPMXh1SUNBZ0lHeHBibVV0YUdWcFoyaDBPaUF4Tm5CNE8xeHVJQ0FnSUcxaGNtZHBiam9nTUNBd0lEVndlRHRjYmlBZ0lDQmpiMnh2Y2pvZ0l6WTJOanRjYm4xY2JpTmpiMjUwWlc1MExYZHlZWEJ3WlhJZ0xuTjFjSEJ2Y25RdGNtVnpkV3gwY3kxamIyNTBZV2x1WlhJZ0kzTmxZWEpqYUMxeVpYTjFiSFJ6SUhBdWJXVjBZU0I3WEc0Z0lDQWdabTl1ZEMxbVlXMXBiSGs2SUNkVGIzVnlZMlVnVTJGdWN5QlFjbThuTENBblNHVnNkbVYwYVdOaFRtVjFaU2NzSUNkSVpXeDJaWFJwWTJFZ1RtVjFaU2NzSUVobGJIWmxkR2xqWVN3Z1FYSnBZV3dzSUhOaGJuTXRjMlZ5YVdZN1hHNGdJQ0FnWm05dWRDMTNaV2xuYUhRNklEUXdNRHRjYmlBZ0lDQm1iMjUwTFhOcGVtVTZJREV5Y0hnN1hHNGdJQ0FnYkdsdVpTMW9aV2xuYUhRNklERTJjSGc3WEc0Z0lDQWdiV0Z5WjJsdUxXSnZkSFJ2YlRvZ01qQndlRHRjYm4xY2JpTmpiMjUwWlc1MExYZHlZWEJ3WlhJZ0xuTjFjSEJ2Y25RdGNtVnpkV3gwY3kxamIyNTBZV2x1WlhJZ2NDNXpkWEJ3YjNKMExYSmxjM1ZzZEhNdGJXOXlaU0I3WEc0Z0lDQWdiV0Z5WjJsdU9pQTBNSEI0SURBN1hHNGdJQ0FnWm05dWRDMTNaV2xuYUhRNklEUXdNRHRjYmlBZ0lDQm1iMjUwTFhOMGVXeGxPaUJwZEdGc2FXTTdYRzRnSUNBZ1ptOXVkQzF6YVhwbE9pQXhObkI0TzF4dWZWeHVYRzR2S2lCR1QxSWdVMVZRVUU5U1ZDQklWVUlnS2k5Y2JpTmpiMjUwWVdsdVpYSWdMbk4xY0hCdmNuUXRjbVZ6ZFd4MGN5MWpiMjUwWVdsdVpYSWdlMXh1SUNBZ0lIZHBaSFJvT2lBNU5qQndlRHRjYmlBZ0lDQnRZWEpuYVc0NklEQWdZWFYwYnp0Y2JuMWNiaTV6ZFhCd2IzSjBMWEpsYzNWc2RITXRZMjl1ZEdGcGJtVnlJR2cwSUh0Y2JpQWdJQ0JtYjI1MExXWmhiV2xzZVRvZ0oxTnZkWEpqWlNCVFlXNXpJRkJ5Ynljc0lDZElaV3gyWlhScFkyRk9aWFZsSnl3Z0owaGxiSFpsZEdsallTQk9aWFZsSnl3Z1NHVnNkbVYwYVdOaExDQkJjbWxoYkN3Z2MyRnVjeTF6WlhKcFpqdGNiaUFnSUNCbWIyNTBMWGRsYVdkb2REb2dNekF3TzF4dUlDQWdJR052Ykc5eU9pQWpOalkyTzF4dUlDQWdJR1p2Ym5RdGMybDZaVG9nTWpSd2VEdGNiaUFnSUNCdFlYSm5hVzR0WW05MGRHOXRPaUF5TUhCNE8xeHVmVnh1WEc0dktpQkdUMUlnUzBNZ0tpOWNiaU5qYjI1MFpXNTBJQ05qYjI1MFpXNTBMWGR5WVhBZ0xuTjFjSEJ2Y25RdGNtVnpkV3gwY3kxamIyNTBZV2x1WlhJZ2FEUWdlMXh1SUNBZ0lHMWhjbWRwYmkxMGIzQTZJRFZ3ZUR0Y2JuMWNibHh1THlvZ1JVNUVJRUZrYW5WemRHMWxiblJ6SUNvdlhHNWNiaTUxYVMxaGRYUnZZMjl0Y0d4bGRHVXVkV2t0WTI5eWJtVnlMV0ZzYkNCN1hHNGdJQ0FnWW05eVpHVnlMWEpoWkdsMWN6b2dNRHRjYmlBZ0lDQmliM0prWlhJdGQybGtkR2c2SURBN1hHNTlYRzR1ZFdrdFlYVjBiMk52YlhCc1pYUmxMblZwTFdOdmNtNWxjaTFoYkd3Z2JHa3VkV2t0YldWdWRTMXBkR1Z0SUh0Y2JpQWdJQ0JpYjNKa1pYSXRjbUZrYVhWek9pQXdPMXh1SUNBZ0lHTnZiRzl5T2lBak5qWTJPMXh1SUNBZ0lHeHBibVV0YUdWcFoyaDBPaUF4TGpZN1hHNTlYRzR1ZFdrdFlYVjBiMk52YlhCc1pYUmxMblZwTFdOdmNtNWxjaTFoYkd3Z2JHa3VkV2t0YldWdWRTMXBkR1Z0SUdFdWRXa3RZMjl5Ym1WeUxXRnNiQ3hjYmk1MWFTMWhkWFJ2WTI5dGNHeGxkR1V1ZFdrdFkyOXlibVZ5TFdGc2JDQnNhUzUxYVMxdFpXNTFMV2wwWlcwZ1lTNTFhUzFqYjNKdVpYSXRZV3hzT21odmRtVnlJSHRjYmlBZ0lDQmliM0prWlhJdGNtRmthWFZ6T2lBd08xeHVJQ0FnSUhCaFpHUnBibWM2SURkd2VDQXhNSEI0TzF4dUlDQWdJR0p2Y21SbGNpMTNhV1IwYURvZ01EdGNiaUFnSUNCbWIyNTBMWE5wZW1VNklERTBjSGc3WEc0Z0lDQWdabTl1ZEMxM1pXbG5hSFE2SURNd01EdGNiaUFnSUNCdFlYSm5hVzQ2SURBN1hHNTlYRzRpQ2dsZExBb0pJbTFoY0hCcGJtZHpJam9nSWtGRFFVRXNPRVpCUVRoR08wRkJSVGxHTEVGQlFVRXNiVUpCUVcxQ0xFTkJRVU03UlVGRGFFSXNWMEZCVnl4RlFVRkZMRU5CUVVVN1JVRmpaaXhwUkVGQmFVUXNSVUZIY0VRN1JVRnNRa1FzUVVGSFNTeHRRa0ZJWlN4RFFVZG1MRWRCUVVjc1JVRklVQ3hCUVVkVExHMUNRVWhWTEVOQlIxWXNSVUZCUlN4RlFVaFlMRUZCUjJFc2JVSkJTRTBzUTBGSFRpeEZRVUZGTEVWQlNHWXNRVUZIYVVJc2JVSkJTRVVzUTBGSFJpeEZRVUZGTEVWQlNHNUNMRUZCUjNGQ0xHMUNRVWhHTEVOQlIwVXNRMEZCUXl4RlFVaDBRaXhCUVVkM1FpeHRRa0ZJVEN4RFFVZExMRU5CUVVNc1JVRklla0lzUVVGSE1rSXNiVUpCU0ZJc1EwRkhVU3hOUVVGTkxFVkJTR3BETEVGQlIyMURMRzFDUVVob1FpeERRVWRuUWl4TlFVRk5MRVZCU0hwRExFRkJSekpETEcxQ1FVaDRRaXhEUVVkM1FpeEpRVUZKTEVWQlNDOURMRUZCUjJsRUxHMUNRVWc1UWl4RFFVYzRRaXhQUVVGUExFVkJTSGhFTEVGQlJ6QkVMRzFDUVVoMlF5eERRVWQxUXl4TFFVRkxMRVZCU0M5RUxFRkJSMmxGTEcxQ1FVZzVReXhEUVVjNFF5eEhRVUZITEVWQlNIQkZMRUZCUjNORkxHMUNRVWh1UkN4RFFVZHRSQ3hQUVVGUExFTkJRVU03U1VGRGRFVXNUVUZCVFN4RlFVRkZMRU5CUVVVN1NVRkRWaXhQUVVGUExFVkJRVVVzUTBGQlJUdEpRVU5ZTEUxQlFVMHNSVUZCUlN4RFFVRkZPMGxCUTFZc1QwRkJUeXhGUVVGRkxFTkJRVVU3U1VGRFdDeFRRVUZUTEVWQlFVVXNTVUZCU3p0SlFVTm9RaXhKUVVGSkxFVkJRVVVzVDBGQlVUdEpRVU5rTEdOQlFXTXNSVUZCUlN4UlFVRlRMRWRCUXpWQ08wVkJXRXdzUVVGaFNTeHRRa0ZpWlN4RFFXRm1MRVZCUVVVc1JVRmlUaXhCUVdGUkxHMUNRV0pYTEVOQllWZ3NSVUZCUlN4RFFVRkRPMGxCUVVVc1ZVRkJWU3hGUVVGRkxFbEJRVXNzUjBGQlNUdEZRV0pzUXl4QlFXZENTU3h0UWtGb1FtVXNRMEZuUW1Zc1QwRkJUeXhGUVdoQ1dDeEJRV2RDWVN4dFFrRm9RazBzUTBGblFrNHNTMEZCU3l4RlFXaENiRUlzUVVGblFtOUNMRzFDUVdoQ1JDeERRV2RDUXl4TlFVRk5MRVZCYUVJeFFpeEJRV2RDTkVJc2JVSkJhRUpVTEVOQlowSlRMRWRCUVVjc1JVRm9RaTlDTEVGQlowSnBReXh0UWtGb1FtUXNRMEZuUW1Nc1QwRkJUeXhEUVVGRE8wbEJRVVVzVDBGQlR5eEZRVUZGTEV0QlFVMHNSMEZCU1RzN1FVRkpPVVFzYzBKQlFYTkNPMEZEZEVKMFFpeHZRa0ZCYjBJN1FVRkRjRUlzUVVGQlFTeGhRVUZoTEVOQlFVTTdSVUZEVml4UFFVRlBMRVZCUVVVc1dVRkJZU3hIUVZONlFqdEZRVlpFTEVGQlFVRXNZVUZCWVN4QlFVZFNMRTFCUVUwc1EwRkJRenRKUVVOS0xFOUJRVThzUlVGQlJTeEhRVUZKTzBsQlEySXNUMEZCVHl4RlFVRkZMRXRCUVUwN1NVRkRaaXhOUVVGTkxFVkJRVVVzUTBGQlJUdEpRVU5XTEV0QlFVc3NSVUZCUlN4SlFVRkxPMGxCUTFvc1ZVRkJWU3hGUVVGRkxFMUJRVThzUjBGRGRFSTdPMEZCUjB3c2QwSkJRWGRDTzBGQlEzaENMRUZCUVVzc1NVRkJSQ3hEUVVGRExHRkJRV0VzUTBGQlF6dEZRVUZETEUxQlFVMHNSVUZCUlN4RlFVRkhMRWRCUVVjN08wRkJRMnhETEVGQlFVRXNZVUZCWVN4RFFVRkRPMFZCUVVNc1QwRkJUeXhGUVVGRkxFdEJRVTBzUjBGQlJ6czdRVUZEYWtNc01FSkJRVEJDTzBGRFlqRkNMRUZCUVhkRUxHOUNRVUZ3UXl4QlFVRkJMRkZCUVZFc1EwRkJReXd3UWtGQk1FSXNRMEZCUXl4RlFVRkZMRU5CUVVNN1JVRkRka1FzVlVGQlZTeEZRVUZGTEVkQlFVa3NSMEZEYmtJN08wRkJSMFFzUVVGQmFVSXNaMEpCUVVRc1EwRkJReXd3UWtGQk1FSXNRMEZCUXp0RlFVTjRReXhaUVVGWkxFVkJRVVVzUTBGQlJUdEZRVU5vUWl4WFFVRlhMRVZCUVVVc1EwRkJSU3hIUVVOc1FqczdRVUZGUkN4QlFVRnpSQ3hoUVVGNlF5eERRVUZETEZWQlFWVXNRMEZCUXl3d1FrRkJNRUlzUTBGQlF5eEZRVUZGTEVGQlFVRXNkVUpCUVhWQ0xFTkJRVU03UlVGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUlN4SFFVRkhPenRCUVVWcVJ5eEJRVUZ6UlN4blFrRkJkRVFzUTBGQlF5d3dRa0ZCTUVJc1EwRkJReXhGUVVGRkxFRkJRVUVzZFVKQlFYVkNMRU5CUVVNc1JVRkJSU3hEUVVGRE8wVkJRM0pGTEZkQlFWY3NSVUZCUlN3MFJVRkJOa1U3UlVGRE1VWXNWMEZCVnl4RlFVRkZMRWRCUVVrN1JVRkRha0lzVTBGQlV5eEZRVUZGTEVsQlFVczdSVUZEYUVJc1YwRkJWeXhGUVVGRkxFbEJRVXM3UlVGRGJFSXNaVUZCWlN4RlFVRkZMRWxCUVVzN1JVRkRkRUlzWVVGQllTeEZRVUZGTEVsQlFVczdSVUZEY0VJc1QwRkJUeXhGUVVGRkxFTkJRVVVzUjBGRFpEczdRVUZGUkN4QlFVRnZSQ3hoUVVGMlF5eERRVUZETEZWQlFWVXNRMEZCUXl3d1FrRkJNRUlzUTBGQlF5eEZRVUZGTEVOQlFVTTdSVUZEYmtRc1YwRkJWeXhGUVVGRkxFbEJRVXM3UlVGRGJFSXNWMEZCVnl4RlFVRkZMR3RHUVVGdFJqdEZRVU5vUnl4WFFVRlhMRVZCUVVVc1IwRkJTVHRGUVVOcVFpeExRVUZMTEVWQlFVVXNTVUZCU3p0RlFVTmFMRk5CUVZNc1JVRkJSU3hKUVVGTE8wVkJRMmhDTEdGQlFXRXNSVUZCUlN4SlFVRkxMRWRCUTNaQ096dEJRVVZFTEVGQlFUUkVMR2RDUVVFMVF5eERRVUZETERCQ1FVRXdRaXhEUVVGRExHVkJRV1VzUTBGQlF5eEZRVUZGTEVOQlFVTTdSVUZETTBRc1YwRkJWeXhGUVVGRkxHdEdRVUZ0Ump0RlFVTm9SeXhYUVVGWExFVkJRVVVzUjBGQlNUdEZRVU5xUWl4VFFVRlRMRVZCUVVVc1NVRkJTenRGUVVOb1FpeFhRVUZYTEVWQlFVVXNTVUZCU3p0RlFVTnNRaXhoUVVGaExFVkJRVVVzUjBGQlNTeEhRVU4wUWpzN1FVRkRSQ3hCUVVFMFJDeG5Ra0ZCTlVNc1EwRkJReXd3UWtGQk1FSXNRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJReXhEUVVGRE8wVkJRekZFTEZkQlFWY3NSVUZCUlN4clJrRkJiVVk3UlVGRGFFY3NWMEZCVnl4RlFVRkZMRWRCUVVrN1JVRkRha0lzVTBGQlV5eEZRVUZGTEVsQlFVczdSVUZEYUVJc1YwRkJWeXhGUVVGRkxFbEJRVXM3UlVGRGJFSXNUVUZCVFN4RlFVRkZMRTlCUVZFN1JVRkRhRUlzUzBGQlN5eEZRVUZGTEVsQlFVc3NSMEZEWmpzN1FVRkRSQ3hCUVVFMlJDeG5Ra0ZCTjBNc1EwRkJReXd3UWtGQk1FSXNRMEZCUXl4bFFVRmxMRU5CUVVNc1EwRkJReXhCUVVGQkxFdEJRVXNzUTBGQlF6dEZRVU12UkN4WFFVRlhMRVZCUVVVc2EwWkJRVzFHTzBWQlEyaEhMRmRCUVZjc1JVRkJSU3hIUVVGSk8wVkJRMnBDTEZOQlFWTXNSVUZCUlN4SlFVRkxPMFZCUTJoQ0xGZEJRVmNzUlVGQlJTeEpRVUZMTzBWQlEyeENMR0ZCUVdFc1JVRkJSU3hKUVVGTExFZEJRM1pDT3p0QlFVTkVMRUZCUVRaRExHZENRVUUzUWl4RFFVRkRMREJDUVVFd1FpeERRVUZETEVOQlFVTXNRVUZCUVN4eFFrRkJjVUlzUTBGQlF6dEZRVU12UkN4TlFVRk5MRVZCUVVVc1RVRkJUenRGUVVObUxGZEJRVmNzUlVGQlJTeEhRVUZKTzBWQlEycENMRlZCUVZVc1JVRkJSU3hOUVVGUE8wVkJRMjVDTEZOQlFWTXNSVUZCUlN4SlFVRkxMRWRCUTI1Q096dEJRVVZFTEhGQ1FVRnhRanRCUVVOeVFpeEJRVUZYTEZWQlFVUXNRMEZCUXl3d1FrRkJNRUlzUTBGQlF6dEZRVU5zUXl4TFFVRkxMRVZCUVVVc1MwRkJUVHRGUVVOaUxFMUJRVTBzUlVGQlJTeE5RVUZQTEVkQlEyeENPenRCUVVORUxFRkJRVEpDTERCQ1FVRkVMRU5CUVVNc1JVRkJSU3hEUVVGRE8wVkJRekZDTEZkQlFWY3NSVUZCUlN4clJrRkJiVVk3UlVGRGFFY3NWMEZCVnl4RlFVRkZMRWRCUVVrN1JVRkRha0lzUzBGQlN5eEZRVUZGTEVsQlFVczdSVUZEV2l4VFFVRlRMRVZCUVVVc1NVRkJTenRGUVVOb1FpeGhRVUZoTEVWQlFVVXNTVUZCU3l4SFFVTjJRanM3UVVGRlJDeFpRVUZaTzBGQlExb3NRVUZCYTBRc1VVRkJNVU1zUTBGQlF5eGhRVUZoTEVOQlFVTXNNRUpCUVRCQ0xFTkJRVU1zUlVGQlJTeERRVUZETzBWQlEycEVMRlZCUVZVc1JVRkJSU3hIUVVGSkxFZEJRMjVDT3p0QlFVVkVMSEZDUVVGeFFqdEJRVVZ5UWl4QlFVRm5RaXhuUWtGQlFTeEJRVUZCTEdOQlFXTXNRMEZCUXp0RlFVTXpRaXhoUVVGaExFVkJRVVVzUTBGQlJUdEZRVU5xUWl4WlFVRlpMRVZCUVVVc1EwRkJSU3hIUVVOdVFqczdRVUZEUkN4QlFVRnBReXhuUWtGQmFrSXNRVUZCUVN4alFVRmpMRU5CUVVNc1JVRkJSU3hCUVVGQkxHRkJRV0VzUTBGQlF6dEZRVU16UXl4aFFVRmhMRVZCUVVVc1EwRkJSVHRGUVVOcVFpeExRVUZMTEVWQlFVVXNTVUZCU3p0RlFVTmFMRmRCUVZjc1JVRkJSU3hIUVVGSkxFZEJRM0JDT3p0QlFVTkVMRUZCUVdkRUxHZENRVUZvUXl4QlFVRkJMR05CUVdNc1EwRkJReXhGUVVGRkxFRkJRVUVzWVVGQllTeERRVUZETEVOQlFVTXNRVUZCUVN4alFVRmpPMEZCUXpsRUxFRkJRVGhFTEdkQ1FVRTVReXhCUVVGQkxHTkJRV01zUTBGQlF5eEZRVUZGTEVGQlFVRXNZVUZCWVN4RFFVRkRMRU5CUVVNc1FVRkJRU3hqUVVGakxFRkJRVUVzVFVGQlRTeERRVUZETzBWQlEycEZMR0ZCUVdFc1JVRkJSU3hEUVVGRk8wVkJRMnBDTEU5QlFVOHNSVUZCUlN4UlFVRlRPMFZCUTJ4Q0xGbEJRVmtzUlVGQlJTeERRVUZGTzBWQlEyaENMRk5CUVZNc1JVRkJSU3hKUVVGTE8wVkJRMmhDTEZkQlFWY3NSVUZCUlN4SFFVRkpPMFZCUTJwQ0xFMUJRVTBzUlVGQlJTeERRVUZGTEVkQlEySTdPMEZJZWtaRUxFRkJRVUVzUTBGQlF5eERRVUZETzBWQlEwVXNhMEpCUVd0Q0xFVkJRVVVzWTBGQlpUdEZRVU51UXl4bFFVRmxMRVZCUVVVc1kwRkJaVHRGUVVOb1F5eFZRVUZWTEVWQlFVVXNZMEZCWlN4SFFVTTVRanM3UVVGSlJDeEJRVUZCTEcxQ1FVRnRRaXhEUVVGRE8wVkJRMmhDTEd0Q1FVRnJRaXhGUVVGRkxGVkJRVmM3UlVGQlJTeHBRMEZCYVVNN1JVRkRiRVVzWlVGQlpTeEZRVUZGTEZWQlFWYzdSVUZCU3l3d1FrRkJNRUk3UlVGRE0wUXNWVUZCVlN4RlFVRkZMRlZCUVZjN1JVRkJWU3hYUVVGWE8wVkJSVFZETEV0QlFVc3NSVUZCUlN4SlFVRkxPMFZCUTFvc1UwRkJVeXhGUVVGRkxFdEJRVTA3UlVGRGFrSXNUMEZCVHl4RlFVRkZMRWxCUVVzN1JVRkRaQ3hSUVVGUkxFVkJRVVVzVVVGQlV6dEZRVU51UWl4WFFVRlhMRVZCZGtKVExHVkJRV1VzUlVGQlJTeGxRVUZsTEVWQlFVVXNaMEpCUVdkQ0xFVkJRVVVzVTBGQlV5eEZRVUZGTEV0QlFVc3NSVUZCUlN4VlFVRlZPMFZCZVVKd1J5eHpRa0ZCYzBJc1JVRkJSU3hYUVVGWk8wVkJRVXNzT0VKQlFUaENPMFZCUTNaRkxIZENRVUYzUWl4RlFVRkZMRWxCUVVzc1IwRjNWR3hETzBWQmNGVkVMRUZCWTBrc2JVSkJaR1VzUTBGalppeHZRa0ZCYjBJc1EwRkJRenRKUVVOcVFpeExRVUZMTEVWQlFVVXNTVUZCU3p0SlFVTmFMRTlCUVU4c1JVRkJSU3hOUVVGUExFZEJhMGh1UWp0SlFXeEpUQ3hCUVd0Q1VTeHRRa0ZzUWxjc1EwRmpaaXh2UWtGQmIwSXNRMEZKYUVJc2MwSkJRWE5DTEVOQlFVTTdUVUZEYmtJc1MwRkJTeXhGUVVGRkxFdEJRVTA3VFVGRFlpeE5RVUZOTEVWQlFVVXNUVUZCVHp0TlFVTm1MRmRCUVZjc1JVRndRMG9zVjBGQlZ5eEZRVUZGTEdWQlFXVXNSVUZCUlN4blFrRkJaMElzUlVGQlJTeFRRVUZUTEVWQlFVVXNTMEZCU3l4RlFVRkZMRlZCUVZVN1RVRnhRMjVHTEZkQlFWY3NSVUZCUlN4SFFVRkpPMDFCUTJwQ0xGTkJRVk1zUlVGQlJTeEpRVUZMTzAxQlEyaENMR05CUVdNc1JVRkJSU3hUUVVGVkxFZEJlVWMzUWp0TlFXcEpWQ3hCUVRKQ1dTeHRRa0V6UWs4c1EwRmpaaXh2UWtGQmIwSXNRMEZKYUVJc2MwSkJRWE5DTEVOQlUyeENMRzlDUVVGdlFpeERRVUZETzFGQlEycENMRXRCUVVzc1JVRkJSU3hKUVVGTExFZEJhMEptTzFGQk9VTmlMRUZCT0VKdFFpeHRRa0U1UWtFc1EwRmpaaXh2UWtGQmIwSXNRMEZKYUVJc2MwSkJRWE5DTEVOQlUyeENMRzlDUVVGdlFpeERRVWRvUWl4RlFVRkZMRU5CUVVNc1JVRkJSU3hEUVVGRE8xVkJRMFlzVDBGQlR5eEZRVUZGTEZsQlFXRXNSMEZqZWtJN1ZVRTNRMnBDTEVGQmFVTnZRaXh0UWtGcVEwUXNRMEZqWml4dlFrRkJiMElzUTBGSmFFSXNjMEpCUVhOQ0xFTkJVMnhDTEc5Q1FVRnZRaXhEUVVkb1FpeEZRVUZGTEVOQlFVTXNSVUZCUlN4RFFVZEVMRU5CUVVNc1EwRkJRenRaUVVORkxFdEJRVXNzUlVFNVExWXNUMEZCVHp0WlFTdERSaXhsUVVGbExFVkJRVVVzU1VGQlN6dFpRVU4wUWl4WlFVRlpMRVZCUVVVc1NVRkJTenRaUVVOdVFpeGhRVUZoTEVWQlFVVXNTVUZCU3p0WlFVTndRaXhaUVVGWkxFVkJRVVVzUjBGQlJ5eERRVUZETEV0QlFVc3NRMEZzUkRWQ0xFOUJRVThzUjBGeFJFdzdXVUY2UTNKQ0xFRkJhVU52UWl4dFFrRnFRMFFzUTBGalppeHZRa0ZCYjBJc1EwRkphRUlzYzBKQlFYTkNMRU5CVTJ4Q0xHOUNRVUZ2UWl4RFFVZG9RaXhGUVVGRkxFTkJRVU1zUlVGQlJTeERRVWRFTEVOQlFVTXNRVUZQU1N4TlFVRk5MRU5CUVVNN1kwRkJReXhMUVVGTExFVkJRVVVzVDBGQlVTeEhRVUZITzFWQmVFTnVSQ3hCUVRKRGFVTXNiVUpCTTBOa0xFTkJZMllzYjBKQlFXOUNMRU5CU1doQ0xITkNRVUZ6UWl4RFFWTnNRaXh2UWtGQmIwSXNRMEZIYUVJc1JVRkJSU3hEUVVGRExFVkJRVVVzUVVGaFFTeFhRVUZYTEVOQlFVTXNRMEZCUXl4RFFVRkRPMWxCUVVNc2EwSkJRV3RDTEVWQlFVVXNRMEZCUlN4SFFVRkhPMDFCTTBNM1JDeEJRV2RFV1N4dFFrRm9SRThzUTBGalppeHZRa0ZCYjBJc1EwRkphRUlzYzBKQlFYTkNMRU5CT0VKc1FpeHRRa0ZCYlVJc1EwRkJRenRSUVVOb1FpeFhRVUZYTEVWQlFVVXNSMEZCU1R0UlFVTnFRaXhMUVVGTExFVkJRVVVzUzBGQlRTeEhRVU5vUWp0TlFXNUVZaXhCUVc5RVdTeHRRa0Z3UkU4c1EwRmpaaXh2UWtGQmIwSXNRMEZKYUVJc2MwSkJRWE5DTEVOQmEwTnNRaXh0UWtGQmJVSXNSVUZ3UkM5Q0xFRkJiMFJwUXl4dFFrRndSR1FzUTBGalppeHZRa0ZCYjBJc1EwRkphRUlzYzBKQlFYTkNMRU5CYTBOSExHdENRVUZyUWl4RFFVRkRPMUZCUTNCRExGZEJRVmNzUlVGQlJTeEhRVUZKTzFGQlEycENMRXRCUVVzc1JVRkJSU3hMUVVGTkxFZEJRMmhDTzAxQmRrUmlMRUZCTWtSblFpeHRRa0V6UkVjc1EwRmpaaXh2UWtGQmIwSXNRMEZKYUVJc2MwSkJRWE5DTEVOQmRVTnNRaXh0UWtGQmJVSXNRMEZGWml4RFFVRkRMRU5CUVVNN1VVRkRSU3hMUVVGTExFVkJlRVZPTEU5QlFVODdVVUY1UlU0c1pVRkJaU3hGUVVGRkxFbEJRVXNzUjBGSmVrSTdVVUZxUldwQ0xFRkJNa1JuUWl4dFFrRXpSRWNzUTBGalppeHZRa0ZCYjBJc1EwRkphRUlzYzBKQlFYTkNMRU5CZFVOc1FpeHRRa0ZCYlVJc1EwRkZaaXhEUVVGRExFRkJTVWtzVFVGQlRTeERRVUZETzFWQlFVTXNTMEZCU3l4RlFVRkZMRTlCUVZFc1IwRkJSenROUVM5RUwwTXNRVUZ2UlhORUxHMUNRWEJGYmtNc1EwRmpaaXh2UWtGQmIwSXNRMEZKYUVJc2MwSkJRWE5DTEVOQmEwUnNRaXh0UWtGQmJVSXNRVUZCUVN4clFrRkJhMElzUTBGQlF5eEpRVUZKTEVGQlFVRXNVVUZCVVR0TlFYQkZPVVFzUVVGeFJUaEVMRzFDUVhKRk0wTXNRMEZqWml4dlFrRkJiMElzUTBGSmFFSXNjMEpCUVhOQ0xFTkJiVVJzUWl4dFFrRkJiVUlzUVVGQlFTeHJRa0ZCYTBJc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEhRVUZITEVWQlFVVXNRMEZCUXp0UlFVRkRMR2RDUVVGblFpeEZRVUZGTEU5QlFWRXNSMEZCUnp0TlFYSkZMMFlzUVVGelJYRkVMRzFDUVhSRmJFTXNRMEZqWml4dlFrRkJiMElzUTBGSmFFSXNjMEpCUVhOQ0xFTkJiMFJzUWl4clFrRkJhMElzUVVGQlFTeHJRa0ZCYTBJc1EwRkJReXhKUVVGSkxFRkJRVUVzVVVGQlVUdE5RWFJGTjBRc1FVRjFSVFpFTEcxQ1FYWkZNVU1zUTBGalppeHZRa0ZCYjBJc1EwRkphRUlzYzBKQlFYTkNMRU5CY1VSc1FpeHJRa0ZCYTBJc1FVRkJRU3hyUWtGQmEwSXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzUTBGQlF6dFJRVUZETEdkQ1FVRm5RaXhGUVVGRkxFbEJRVXNzUjBGQlJ6dE5RWFpGTTBZc1FVRjVSWFZGTEcxQ1FYcEZjRVFzUTBGalppeHZRa0ZCYjBJc1EwRkphRUlzYzBKQlFYTkNMRU5CZFVSc1FpeHRRa0ZCYlVJc1FVRkJRU3hyUWtGQmEwSXNSMEZCUnl4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVOQlFVTXNRMEZCUXl4QlFVRkJMRTFCUVUwc1EwRkJRenRSUVVGRExHZENRVUZuUWl4RlFVRkZMRTlCUVZFc1IwRkJSenROUVhwRk5VY3NRVUV3UlhORkxHMUNRVEZGYmtRc1EwRmpaaXh2UWtGQmIwSXNRMEZKYUVJc2MwSkJRWE5DTEVOQmQwUnNRaXhyUWtGQmEwSXNRVUZCUVN4clFrRkJhMElzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1IwRkJSeXhGUVVGRkxFTkJRVU1zUTBGQlF5eEJRVUZCTEUxQlFVMHNRMEZCUXp0UlFVRkRMR2RDUVVGblFpeEZRVUZGTEU5QlFWRXNSMEZCUnp0TlFURkZNMGNzUVVFMFJWa3NiVUpCTlVWUExFTkJZMllzYjBKQlFXOUNMRU5CU1doQ0xITkNRVUZ6UWl4RFFUQkViRUlzYTBKQlFXdENMRU5CUVVNN1VVRkRia0lzVVVGQlVTeEZRVUZGTEZGQlFWTXNSMEZ0UkhSQ08xRkJhRWxVTEVGQkswVm5RaXh0UWtFdlJVY3NRMEZqWml4dlFrRkJiMElzUTBGSmFFSXNjMEpCUVhOQ0xFTkJNRVJzUWl4clFrRkJhMElzUTBGSGJFSXNTVUZCU1N4QlFVRkJMRkZCUVZFc1EwRkJRenRWUVVOVUxGZEJRVmNzUlVGQlJTeEhRVUZKTzFWQlEycENMRTlCUVU4c1JVRkJSU3hSUVVGVE8xVkJRMnhDTEUxQlFVMHNSVUZCUlN4UFFVRlJPMVZCUTJoQ0xHRkJRV0VzUlVGQlJTeEhRVUZKTzFWQlEyNUNMRXRCUVVzc1JVRkJSU3hKUVVGTExFZEJTV1k3VVVGNFJtSXNRVUV3Um5kQ0xHMUNRVEZHVEN4RFFXTm1MRzlDUVVGdlFpeERRVWxvUWl4elFrRkJjMElzUTBFd1JHeENMR3RDUVVGclFpeEhRV05vUWl4RlFVRkZMRWRCUVVjc1JVRkJSU3hIUVVGSExFVkJRVVVzUTBGQlF6dFZRVU5ZTEU5QlFVOHNSVUZCUlN4SlFVRkxPMVZCUTJRc1VVRkJVU3hGUVVGRkxGRkJRVk03VlVGRGJrSXNSMEZCUnl4RlFVRkZMRWxCUVVzN1ZVRkRWaXhYUVVGWExFVkJRVVVzU1VGQlN6dFZRVU5zUWl4aFFVRmhMRVZCUVVVc1IwRkJTVHRWUVVOdVFpeFZRVUZWTEVWQlFVVXNZMEZCWlR0VlFVTXpRaXhMUVVGTExFVkJRVVVzUTBGQlJUdFZRVU5VTEZkQlFWY3NSVUZCUlN4TlFVRlBPMVZCUTNCQ0xFOUJRVThzUlVGQlJTeEhRVUZKTzFWQlEySXNTMEZCU3l4RlFVRkZMRWxCUVVzN1ZVRkRXaXhUUVVGVExFVkJRVVVzU1VGQlN6dFZRVVZvUWl4bFFVRmxMRVZCUVVVc1owSkJRV2xDTzFWQlEyeERMR3RDUVVGclFpeEZRVUZGTEdkQ1FVRnBRanRWUVVOeVF5eFZRVUZWTEVWQlFVVXNaMEpCUVdsQ0xFZEJWMmhETzFWQmNFaGlMRUZCTWtkclFpeHRRa0V6UjBNc1EwRmpaaXh2UWtGQmIwSXNRMEZKYUVJc2MwSkJRWE5DTEVOQk1FUnNRaXhyUWtGQmEwSXNSMEZqYUVJc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQmFVSlNMRVZCUVVVc1EwRkJRenRaUVVORUxGVkJRVlVzUlVGQlJTeEpRVUZMTzFsQlEycENMRTlCUVU4c1JVRkJSU3hMUVVGTk8xbEJRMllzVFVGQlRTeEZRVUZGTEVOQlFVVTdXVUZEVml4UFFVRlBMRVZCUVVVc1EwRkJSU3hIUVVsa08xbEJia2hxUWl4QlFUSkhhMElzYlVKQk0wZERMRU5CWTJZc2IwSkJRVzlDTEVOQlNXaENMSE5DUVVGelFpeERRVEJFYkVJc2EwSkJRV3RDTEVkQlkyaENMRVZCUVVVc1IwRkJSeXhGUVVGRkxFZEJRVWNzUlVGQlJTeEhRV2xDVWl4RlFVRkZMRUZCVFVNc1dVRkJXU3hEUVVGRE8yTkJRVU1zWVVGQllTeEZRVUZGTEVsQlFVc3NSMEZCUnp0UlFXcElNVVFzUVVGelNEaENMRzFDUVhSSVdDeERRV05tTEc5Q1FVRnZRaXhEUVVsb1FpeHpRa0ZCYzBJc1EwRXdSR3hDTEd0Q1FVRnJRaXhIUVRCRGFFSXNSVUZCUlN4SFFVRkhMRVZCUVVVc1FVRkJRU3hOUVVGTkxFZEJRVWNzUlVGQlJTeERRVUZETzFWQlFVTXNUMEZCVHl4RlFVRkZMRXRCUVUwc1IwRkJSenRSUVhSSWNFUXNRVUYzU0dkRExHMUNRWGhJWWl4RFFXTm1MRzlDUVVGdlFpeERRVWxvUWl4elFrRkJjMElzUTBFd1JHeENMR3RDUVVGclFpeEhRVFJEYUVJc1JVRkJSU3hIUVVGSExFVkJRVVVzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4RFFVRkRMRU5CUVVNc1EwRkJRenRWUVVOc1FpeExRVUZMTEVWQlFVVXNTVUZCU3p0VlFVTmFMRTlCUVU4c1JVRkJSU3hMUVVGTk8xVkJRMllzVDBGQlR5eEZRVUZGTEZGQlFWTTdWVUZEYkVJc1pVRkJaU3hGUVVGRkxFbEJRVXM3VlVGRGRFSXNWVUZCVlN4RlFVRkZMRXRCUVUwc1IwRkRja0k3UlVFNVNHSXNRVUZ2U1Vrc2JVSkJjRWxsTEVOQmIwbG1MREpDUVVFeVFpeERRVUZETzBsQlEzaENMRXRCUVVzc1JVRkJSU3hKUVVGTE8wbEJRMW9zWjBKQlFXZENMRVZCUVVVc2RVdEJRVWM3U1VGRGNrSXNaVUZCWlN4RlFVRkZMRXRCUVUwN1NVRkRka0lzVTBGQlV5eEZRVUZGTEV0QlFVMHNSMEZEY0VJN1JVRjZTVXdzUVVFeVNVa3NiVUpCTTBsbExFTkJNa2xtTEhkQ1FVRjNRaXhEUVVGRE8wbEJRM0pDTEV0QlFVc3NSVUZCUlN4SlFVRkxPMGxCUTFvc1owSkJRV2RDTEVWQlFVVXNTVUZCU3l4SFFVMHhRanRKUVc1S1RDeEJRU3RKVVN4dFFrRXZTVmNzUTBFeVNXWXNkMEpCUVhkQ0xFTkJTWEJDTERCQ1FVRXdRaXhEUVVGRE8wMUJRM1pDTEV0QlFVc3NSVUZCUlN4TFFVRk5PMDFCUTJJc1RVRkJUU3hGUVVGRkxFMUJRVThzUjBGRGJFSTdSVUZzU2xRc1FVRnhTa2tzYlVKQmNrcGxMRU5CY1VwbUxEWkNRVUUyUWl4RFFVRkRPMGxCUXpGQ0xFdEJRVXNzUlVGQlJTeExRVUZOTzBsQlEySXNUVUZCVFN4RlFVRkZMRTFCUVU4N1NVRkRaaXhQUVVGUExFVkJRVVVzVFVGQlR5eEhRVGhGYmtJN1NVRjBUMHdzUVVFd1NsRXNiVUpCTVVwWExFTkJjVXBtTERaQ1FVRTJRaXhEUVV0NlFpeG5Ra0ZCWjBJc1EwRkJRenROUVVOaUxFdEJRVXNzUlVGQlJTeEpRVUZMTzAxQlExb3NTMEZCU3l4RlFVRkZMRWxCUVVzc1IwRmxaanROUVROTFZDeEJRVGhLV1N4dFFrRTVTazhzUTBGeFNtWXNOa0pCUVRaQ0xFTkJTM3BDTEdkQ1FVRm5RaXhEUVVsYUxFVkJRVVVzUTBGQlF6dFJRVU5ETEZOQlFWTXNSVUZCUlN4SlFVRkxPMUZCUTJoQ0xGZEJRVmNzUlVGQlJTeEhRVUZKTzFGQlEycENMR05CUVdNc1JVRkJSU3hUUVVGVkxFZEJVVGRDTzFGQmVrdGlMRUZCYlV0blFpeHRRa0Z1UzBjc1EwRnhTbVlzTmtKQlFUWkNMRU5CUzNwQ0xHZENRVUZuUWl4RFFVbGFMRVZCUVVVc1EwRkxSU3hKUVVGSkxFTkJRVU03VlVGRFJDeFBRVUZQTEVWQlFVVXNTMEZCVFR0VlFVTm1MRk5CUVZNc1JVRkJSU3hKUVVGTE8xVkJRMmhDTEZkQlFWY3NSVUZCUlN4SFFVRkpPMVZCUTJwQ0xHRkJRV0VzUlVGQlJTeEhRVUZKTEVkQlEzUkNPMGxCZUV0cVFpeEJRVFpMVVN4dFFrRTNTMWNzUTBGeFNtWXNOa0pCUVRaQ0xFTkJkMEo2UWl3MlFrRkJOa0lzUTBGQlF6dE5RVU14UWl4TFFVRkxMRVZCUVVVc1MwRkJUVHROUVVOaUxFdEJRVXNzUlVGQlJTeExRVUZOTEVkQmMwUm9RanROUVhKUFZDeEJRV2xNV1N4dFFrRnFURThzUTBGeFNtWXNOa0pCUVRaQ0xFTkJkMEo2UWl3MlFrRkJOa0lzUTBGSmVrSXNiVUpCUVcxQ0xFTkJRVU03VVVGRGFFSXNVVUZCVVN4RlFVRkZMRkZCUVZNN1VVRkRia0lzUzBGQlN5eEZRVUZGTEVsQlFVczdVVUZEV2l4VlFVRlZMRVZCUVVVc1IwRkJTVHRSUVVOb1FpeFZRVUZWTEVWQlFVVXNTVUZCU3l4SFFUaERjRUk3VVVGdVQySXNRVUYxVEd0RExHMUNRWFpNWml4RFFYRktaaXcyUWtGQk5rSXNRMEYzUW5wQ0xEWkNRVUUyUWl4RFFVbDZRaXh0UWtGQmJVSXNRMEZOWml4TFFVRkxMRU5CUVVFc1FVRkJRU3hKUVVGRExFTkJRVXNzVFVGQlRTeEJRVUZZTEVOQlFWa3NlVUpCUVhsQ0xFTkJRVU03VlVGRGVFTXNXVUZCV1N4RlFVRkZMRU5CUVVVN1ZVRkRhRUlzWVVGQllTeEZRVUZGTEVOQlFVVTdWVUZEYWtJc1ZVRkJWU3hGUVVGRkxFbEJRVXM3VlVGRGFrSXNTMEZCU3l4RlFVRkZMRWRCUVVrN1ZVRkRXQ3hOUVVGTkxFVkJRVVVzU1VGQlN6dFZRVU5pTEU5QlFVOHNSVUZCUlN4VFFVRlZPMVZCUTI1Q0xGZEJRVmNzUlVGQlJTeEhRVUZKTzFWQlEycENMRk5CUVZNc1JVRkJSU3hKUVVGTE8xVkJRMmhDTEV0QlFVc3NSVUZCUlN4SlFVRkxPMVZCUTFvc1YwRkJWeXhGUVM5TlVDeGxRVUZsTEVWQlFVVXNaVUZCWlN4RlFVRkZMR2RDUVVGblFpeEZRVUZGTEZOQlFWTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1ZVRkJWVHRWUVdkT2NFWXNhMEpCUVd0Q0xFVkJRVVVzU1VGQlN6dFZRVU42UWl4bFFVRmxMRVZCUVVVc1NVRkJTenRWUVVOMFFpeFZRVUZWTEVWQlFVVXNTVUZCU3l4SFFVTndRanRSUVhKTmFrSXNRVUYxVFRKRUxHMUNRWFpOZUVNc1EwRnhTbVlzTmtKQlFUWkNMRU5CZDBKNlFpdzJRa0ZCTmtJc1EwRkpla0lzYlVKQlFXMUNMRU5CYzBKbUxFdEJRVXNzUTBGQlFTeEJRVUZCTEVsQlFVTXNRMEZCU3l4TlFVRk5MRUZCUVZnc1EwRkJXU3g1UWtGQmVVSXNRVUZCUVN4TlFVRk5MRU5CUVVNN1ZVRkRPVU1zWVVGQllTeEZRVUZGTEVOQlFVVTdWVUZEYWtJc1ZVRkJWU3hGUVVGRkxFbEJRVXNzUjBGRGNFSTdVVUV4VFdwQ0xFRkJORTE1UXl4dFFrRTFUWFJDTEVOQmNVcG1MRFpDUVVFMlFpeERRWGRDZWtJc05rSkJRVFpDTEVOQlNYcENMRzFDUVVGdFFpeERRVEpDWml4NVFrRkJlVUlzUVVGQlFTd3lRa0ZCTWtJc1EwRkJRenRWUVVGRExGVkJRVlVzUlVGQlJTeE5RVUZQTEVkQlFVYzdVVUUxVFRWR0xFRkJOazE1UXl4dFFrRTNUWFJDTEVOQmNVcG1MRFpDUVVFMlFpeERRWGRDZWtJc05rSkJRVFpDTEVOQlNYcENMRzFDUVVGdFFpeERRVFJDWml4NVFrRkJlVUlzUVVGQlFTeHBRa0ZCYVVJc1EwRkJRenRWUVVGRExGVkJRVlVzUlVGQlJTeE5RVUZQTEVkQlFVYzdVVUUzVFd4R0xFRkJPRTE1UXl4dFFrRTVUWFJDTEVOQmNVcG1MRFpDUVVFMlFpeERRWGRDZWtJc05rSkJRVFpDTEVOQlNYcENMRzFDUVVGdFFpeERRVFpDWml4NVFrRkJlVUlzUVVGQlFTeHJRa0ZCYTBJc1EwRkJRenRWUVVGRExGVkJRVlVzUlVGQlJTeE5RVUZQTEVkQlFVYzdVVUU1VFc1R0xFRkJLMDE1UXl4dFFrRXZUWFJDTEVOQmNVcG1MRFpDUVVFMlFpeERRWGRDZWtJc05rSkJRVFpDTEVOQlNYcENMRzFDUVVGdFFpeERRVGhDWml4NVFrRkJlVUlzUVVGQlFTeHpRa0ZCYzBJc1EwRkJRenRWUVVGRExGVkJRVlVzUlVGQlJTeE5RVUZQTEVkQlFVYzdVVUV2VFhaR0xFRkJhVTV6UWl4dFFrRnFUa2dzUTBGeFNtWXNOa0pCUVRaQ0xFTkJkMEo2UWl3MlFrRkJOa0lzUTBGSmVrSXNiVUpCUVcxQ0xFTkJaME5tTEUxQlFVMHNRVUZCUVN3d1FrRkJNRUlzUTBGQlF6dFZRVU0zUWl4UlFVRlJMRVZCUVVVc1VVRkJVenRWUVVOdVFpeEhRVUZITEVWQlFVVXNRMEZCUlR0VlFVTlFMRXRCUVVzc1JVRkJSU3hEUVVGRk8xVkJRMVFzVFVGQlRTeEZRVUZGTEU5QlFWRTdWVUZEYUVJc1dVRkJXU3hGUVVGRkxFTkJRVVU3VlVGRGFFSXNZVUZCWVN4RlFVRkZMRU5CUVVVN1ZVRkRha0lzVTBGQlV5eEZRVUZGTEVsQlFVczdWVUZEYUVJc1QwRkJUeXhGUVVGRkxFbEJRVXM3VlVGRFpDeFZRVUZWTEVWQlFVVXNTVUZCU3p0VlFVTnFRaXhMUVVGTExFVkJRVVVzU1VGQlN6dFZRVU5hTEdWQlFXVXNSVUZCUlN4blFrRkJhVUk3VlVGRGJFTXNhMEpCUVd0Q0xFVkJRVVVzWjBKQlFXbENPMVZCUTNKRExGVkJRVlVzUlVGQlJTeG5Ra0ZCYVVJc1IwRkhhRU03VlVGcVQycENMRUZCYVU1elFpeHRRa0ZxVGtnc1EwRnhTbVlzTmtKQlFUWkNMRU5CZDBKNlFpdzJRa0ZCTmtJc1EwRkpla0lzYlVKQlFXMUNMRU5CWjBObUxFMUJRVTBzUVVGQlFTd3dRa0ZCTUVJc1FVRmxNMElzVFVGQlRTeERRVUZETzFsQlFVTXNTMEZCU3l4RlFVRkZMRWxCUVVzc1IwRkJSenRGUVdoUE5VTXNRVUYzVDA4c2JVSkJlRTlaTEVOQmQwOW1MRWRCUVVjc1FVRkJRU3hYUVVGWExFTkJRVU03U1VGRFdDeFhRVUZYTEVWQmVGQkJMRmRCUVZjc1JVRkJSU3hsUVVGbExFVkJRVVVzWjBKQlFXZENMRVZCUVVVc1UwRkJVeXhGUVVGRkxFdEJRVXNzUlVGQlJTeFZRVUZWTzBsQmVWQjJSaXhqUVVGakxFVkJRVVVzVTBGQlZUdEpRVU14UWl4WFFVRlhMRVZCUVVVc1IwRkJTVHRKUVVOcVFpeFRRVUZUTEVWQlFVVXNTVUZCU3l4SFFXMURia0k3U1VFdlVVd3NRVUU0VDFFc2JVSkJPVTlYTEVOQmQwOW1MRWRCUVVjc1FVRkJRU3hYUVVGWExFTkJUVllzUTBGQlF5eERRVUZETzAxQlEwTXNUMEZCVHl4RlFVRkZMRmxCUVdFN1RVRkRkRUlzVDBGQlR5eEZRVUZGTEdOQlFXVTdUVUZEZUVJc1ZVRkJWU3hGUVVGRkxFMUJRVTg3VFVGRmJrSXNaVUZCWlN4RlFVRkZMRWxCUVVzN1RVRkRkRUlzUzBGQlN5eEZRVUZGTEVsQlFVczdUVUZEV2l4bFFVRmxMRVZCUVVVc1owSkJRV2xDTzAxQlEyeERMR3RDUVVGclFpeEZRVUZGTEdkQ1FVRnBRanROUVVOeVF5eFZRVUZWTEVWQlFVVXNaMEpCUVdsQ0xFZEJkVUpvUXp0TlFUbFJVaXhCUVRoUFVTeHRRa0U1VDFjc1EwRjNUMllzUjBGQlJ5eEJRVUZCTEZkQlFWY3NRMEZOVml4RFFVRkRMRUZCVjBjc1RVRkJUU3hEUVVGRE8xRkJRVU1zVlVGQlZTeEZRVUZGTEVsQlFVc3NSMEZCUnp0TlFYcFFlRU1zUVVFNFQxRXNiVUpCT1U5WExFTkJkMDltTEVkQlFVY3NRVUZCUVN4WFFVRlhMRU5CVFZZc1EwRkJReXhCUVZsSExFOUJRVThzUTBGQlF6dFJRVUZETEZWQlFWVXNSVUZCUlN4UFFVRlJMRWRCUVVjN1RVRXhVRFZETEVGQk9FOVJMRzFDUVRsUFZ5eERRWGRQWml4SFFVRkhMRUZCUVVFc1YwRkJWeXhEUVUxV0xFTkJRVU1zUVVGalJ5eFRRVUZUTEVOQlFVTTdVVUZEVUN4blFrRkJaMElzUlVGQlJTd3lSMEZCUnp0UlFVTnlRaXhuUWtGQlowSXNSVUZCUlN4SlFVRkpMRVZCUVVVc01rZEJRVWM3VVVGRE0wSXNhVUpCUVdsQ0xFVkJRVVVzVTBGQlZUdFJRVU0zUWl4dFFrRkJiVUlzUlVGQlJTeFJRVUZUTzFGQlF6bENMRmRCUVZjc1JVRkJSU3hQUVVGUk8xRkJRM0pDTEV0QlFVc3NSVUZCUlN4TFFVRk5PMUZCUTJJc1owSkJRV2RDTEVWQk4xRmFMRTlCUVU4c1IwRnpVbVE3VVVFMVVWb3NRVUU0VDFFc2JVSkJPVTlYTEVOQmQwOW1MRWRCUVVjc1FVRkJRU3hYUVVGWExFTkJUVllzUTBGQlF5eEJRV05ITEZOQlFWTXNRVUZUVEN4TlFVRk5MRU5CUVVNN1ZVRkRTaXhWUVVGVkxFVkJhRkpXTEU5QlFVODdWVUZwVWxBc1owSkJRV2RDTEVWQlFVVXNNa2RCUVVjN1ZVRkRja0lzWjBKQlFXZENMRVZCUVVVc1NVRkJTU3hGUVVGRkxESkhRVUZITzFWQlF6TkNMR2xDUVVGcFFpeEZRVUZGTEZOQlFWVTdWVUZETjBJc2JVSkJRVzFDTEVWQlFVVXNVVUZCVXl4SFFVTnFRenRGUVROUmFFSXNRVUZ0VWtrc2JVSkJibEpsTEVOQmJWSm1MRGhDUVVFNFFpeERRVUZETzBsQlF6TkNMRlZCUVZVc1JVRkJSU3hQUVVGUkxFZEJLME4yUWp0SlFXNVZUQ3hCUVhOU1VTeHRRa0YwVWxjc1EwRnRVbVlzT0VKQlFUaENMRU5CUnpGQ0xHOUNRVUZ2UWl4RFFVRkRPMDFCUTJwQ0xGRkJRVkVzUlVGQlJTeFJRVUZUTzAxQlEyNUNMRXRCUVVzc1JVRkJSU3hMUVVGTk8wMUJRMklzVFVGQlRTeEZRVUZGTEUxQlFVODdUVUZEWml4UFFVRlBMRVZCUVVVc1RVRkJUeXhIUVRKQ2JrSTdUVUZ5VkZRc1FVRTBVbGtzYlVKQk5WSlBMRU5CYlZKbUxEaENRVUU0UWl4RFFVY3hRaXh2UWtGQmIwSXNRMEZOYUVJc1EwRkJReXhEUVVGRE8xRkJRMFVzVVVGQlVTeEZRVUZGTEZGQlFWTTdVVUZEYmtJc1IwRkJSeXhGUVVGRkxFbEJRVXM3VVVGRFZpeEpRVUZKTEVWQlFVVXNRMEZCUlR0UlFVTlNMRk5CUVZNc1JVRkJSU3hKUVVGTE8xRkJRMmhDTEV0QlFVc3NSVUZCUlN4UFFVRlJMRWRCUTJ4Q08wMUJiRk5pTEVGQmIxTlpMRzFDUVhCVFR5eERRVzFTWml3NFFrRkJPRUlzUTBGSE1VSXNiMEpCUVc5Q0xFTkJZMmhDTEVOQlFVTXNRMEZCUXp0UlFVTkZMRTFCUVUwc1JVRkJSU3hoUVVGak8xRkJRM1JDTEZkQlFWY3NSVUZ5VkZJc1YwRkJWeXhGUVVGRkxHVkJRV1VzUlVGQlJTeG5Ra0ZCWjBJc1JVRkJSU3hUUVVGVExFVkJRVVVzUzBGQlN5eEZRVUZGTEZWQlFWVTdVVUZ6VkM5RkxGTkJRVk1zUlVGQlJTeEpRVUZMTzFGQlEyaENMRmRCUVZjc1JVRkJSU3hIUVVGSk8xRkJRMnBDTEZkQlFWY3NSVUZCUlN4SlFVRkxPMUZCUTJ4Q0xFdEJRVXNzUlVGQlJTeFBRVUZSTEVkQlZXeENPMUZCY0ZSaUxFRkJORk5uUWl4dFFrRTFVMGNzUTBGdFVtWXNPRUpCUVRoQ0xFTkJSekZDTEc5Q1FVRnZRaXhEUVdOb1FpeERRVUZETEVOQlVVY3NUVUZCVFN4RFFVRkRPMVZCUVVNc1YwRkJWeXhGUVVGRkxFZEJRVWtzUjBGQlJ6dFJRVFZUTlVNc1FVRTRVMmRDTEcxQ1FUbFRSeXhEUVcxU1ppdzRRa0ZCT0VJc1EwRkhNVUlzYjBKQlFXOUNMRU5CWTJoQ0xFTkJRVU1zUTBGVlJ5eERRVUZETEVOQlFVTTdWVUZEUlN4TFFVRkxMRVZCUVVVc1QwRkJVVHRWUVVObUxHVkJRV1VzUlVGQlJTeFRRVUZWTEVkQlJ6bENPMVZCYmxScVFpeEJRVGhUWjBJc2JVSkJPVk5ITEVOQmJWSm1MRGhDUVVFNFFpeERRVWN4UWl4dlFrRkJiMElzUTBGamFFSXNRMEZCUXl4RFFWVkhMRU5CUVVNc1FVRkpTU3hOUVVGTkxFTkJRVU03V1VGQlF5eExRVUZMTEVWQlFVVXNTVUZCU3l4SFFVRkhPMGxCYkZRMVF5eEJRWFZVVVN4dFFrRjJWRmNzUTBGdFVtWXNPRUpCUVRoQ0xFTkJiME14UWl3d1FrRkJNRUlzUTBGQlF6dE5RVU4yUWl4UlFVRlJMRVZCUVVVc1VVRkJVenROUVVOdVFpeEhRVUZITEVWQlFVVXNTVUZCU3p0TlFVTldMRXRCUVVzc1JVRkJSU3hEUVVGRk8wMUJRMVFzVTBGQlV5eEZRVUZGTEVsQlFVczdUVUZEYUVJc1YwRkJWeXhGUVVGRkxFZEJRVWs3VFVGRGFrSXNWMEZCVnl4RlFVRkZMRWRCUVVrN1RVRkRha0lzWlVGQlpTeEZRVUZGTEVsQlFVczdUVUZEZEVJc1MwRkJTeXhGUVVGRkxFOUJRVkVzUjBGSGJFSTdUVUZzVlZRc1FVRjFWRkVzYlVKQmRsUlhMRU5CYlZKbUxEaENRVUU0UWl4RFFXOURNVUlzTUVKQlFUQkNMRUZCVlhKQ0xFMUJRVTBzUTBGQlF6dFJRVUZETEV0QlFVc3NSVUZCUlN4UFFVRlJMRWRCUVVjN08wRkJUM1pETEVGQlFVRXNWMEZCVnl4RFFVRkRPMFZCUTFJc1YwRkJWeXhGUVhoV1NTeFhRVUZYTEVWQlFVVXNaVUZCWlN4RlFVRkZMR2RDUVVGblFpeEZRVUZGTEZOQlFWTXNSVUZCUlN4TFFVRkxMRVZCUVVVc1ZVRkJWVHRGUVhsV00wWXNWMEZCVnl4RlFVRkZMRWRCUVVrN1JVRkRha0lzVTBGQlV5eEZRVUZGTEVsQlFVczdSVUZEYUVJc1YwRkJWeXhGUVVGRkxFbEJRVXM3UlVGRGJFSXNWVUZCVlN4RlFVRkZMRWxCUVVzN1JVRkRha0lzUzBGQlN5eEZRVUZGTEVsQlFVczdSVUZEV2l4UFFVRlBMRVZCUVVVc1UwRkJWVHRGUVVOdVFpeFJRVUZSTEVWQlFVVXNVVUZCVXp0RlFVTnVRaXhQUVVGUExFVkJRVVVzU1VGQlN5eEhRVU5xUWpzN1FVRkpSQ3hCUVVGQkxHMUNRVUZ0UWl4RFFVRkRPMFZCUTJoQ0xGZEJRVmNzUlVGMFYwa3NWMEZCVnl4RlFVRkZMR1ZCUVdVc1JVRkJSU3huUWtGQlowSXNSVUZCUlN4VFFVRlRMRVZCUVVVc1MwRkJTeXhGUVVGRkxGVkJRVlU3UlVGMVZ6TkdMRXRCUVVzc1JVRkJSU3hKUVVGTE8wVkJRMW9zVTBGQlV5eEZRVUZGTEV0QlFVMDdSVUZEYWtJc1ZVRkJWU3hGUVVGRkxFbEJRVWtzUTBGQlF5eExRVUZMTEVOQmNGZFFMRTlCUVU4N1JVRnhWM1JDTEZWQlFWVXNSVUZCUlN4UFFVRlJMRWRCYVVWMlFqdEZRWFJGUkN4QlFVOUpMRzFDUVZCbExFTkJUMllzY1VKQlFYRkNMRU5CUVVNN1NVRkRiRUlzUzBGQlN5eEZRVUZGTEV0QlFVMDdTVUZEWWl4TlFVRk5MRVZCUVVVc1RVRkJUenRKUVVObUxFOUJRVThzUlVGQlJTeGpRVUZsTzBsQlEzaENMR3RDUVVGclFpeEZRVUZGTEZWQlFWYzdTVUZCUlN4cFEwRkJhVU03U1VGRGJFVXNaVUZCWlN4RlFVRkZMRlZCUVZjN1NVRkJSU3d3UWtGQk1FSTdTVUZEZUVRc1ZVRkJWU3hGUVVGRkxGVkJRVmM3U1VGQlJTeFhRVUZYTEVWQmMwTjJRenRKUVc1RVRDeEJRV1ZSTEcxQ1FXWlhMRU5CVDJZc2NVSkJRWEZDTEVOQlVXcENMR1ZCUVdVc1EwRkJRenROUVVOYUxFdEJRVXNzUlVGQlJTeEpRVUZMTzAxQlExb3NTMEZCU3l4RlFVRkZMRWRCUVVrc1IwRlZaRHROUVROQ1ZDeEJRV1ZSTEcxQ1FXWlhMRU5CVDJZc2NVSkJRWEZDTEVOQlVXcENMR1ZCUVdVc1FVRkpWaXhwUWtGQmFVSXNRMEZCUXp0UlFVTm1MRXRCUVVzc1JVRkJSU3hIUVVGSkxFZEJUV1E3VVVFeFFtSXNRVUZ6UW1kQ0xHMUNRWFJDUnl4RFFVOW1MSEZDUVVGeFFpeERRVkZxUWl4bFFVRmxMRUZCU1ZZc2FVSkJRV2xDTEVOQlIyUXNjMEpCUVhOQ0xFTkJRVU03VlVGRGJrSXNTMEZCU3l4RlFVRkZMRWxCUVVzN1ZVRkRXaXhMUVVGTExFVkJRVVVzUjBGQlNTeEhRVU5rTzBsQmVrSnFRaXhCUVRaQ1VTeHRRa0UzUWxjc1EwRlBaaXh4UWtGQmNVSXNRMEZ6UW1wQ0xFVkJRVVVzUTBGQlF6dE5RVU5ETEZOQlFWTXNSVUZCUlN4SlFVRkxPMDFCUTJoQ0xHTkJRV01zUlVGQlJTeFRRVUZWTzAxQlF6RkNMRXRCUVVzc1JVRkJSU3hKUVVGTE8wMUJRMW9zVFVGQlRTeEZRVUZGTEZGQlFWTTdUVUZEYWtJc1YwRkJWeXhGUVVGRkxFZEJRVWtzUjBGRGNFSTdTVUZ1UTFRc1FVRnhRMUVzYlVKQmNrTlhMRU5CVDJZc2NVSkJRWEZDTEVOQk9FSnFRaXhGUVVGRkxFTkJRVU03VFVGRFF5eGxRVUZsTEVWQlFVVXNTVUZCU3p0TlFVTjBRaXhOUVVGTkxFVkJRVVVzUTBGQlJUdE5RVU5XTEZkQlFWY3NSVUZCUlN4SlFVRkxPMDFCUTJ4Q0xFOUJRVThzUlVGQlJTeERRVUZGTEVkQlEyUTdTVUV4UTFRc1FVRTBRMUVzYlVKQk5VTlhMRU5CVDJZc2NVSkJRWEZDTEVOQmNVTnFRaXhEUVVGRExFTkJRVU03VFVGRFJTeFRRVUZUTEVWQlFVVXNTVUZCU3p0TlFVTm9RaXhMUVVGTExFVkJRVVVzU1VGQlN6dE5RVU5hTEdWQlFXVXNSVUZCUlN4SlFVRkxMRWRCUjNwQ08wMUJiRVJVTEVGQk5FTlJMRzFDUVRWRFZ5eERRVTltTEhGQ1FVRnhRaXhEUVhGRGFrSXNRMEZCUXl4QlFVdEpMRTFCUVUwc1EwRkJRenRSUVVGRExHVkJRV1VzUlVGQlJTeFRRVUZWTEVkQlFVYzdSVUZxUkc1RUxFRkJjVVJKTEcxQ1FYSkVaU3hEUVhGRVppeHhRa0ZCY1VJc1EwRkJRenRKUVVOc1FpeExRVUZMTEVWQlFVVXNTVUZCU3p0SlFVTmFMRlZCUVZVc1JVRkJSU3hKUVVGTE8wbEJRMnBDTEV0QlFVc3NSVUZCUlN4SlFVRkxMRWRCV1dZN1NVRndSVXdzUVVFd1JGRXNiVUpCTVVSWExFTkJjVVJtTEhGQ1FVRnhRaXhEUVV0cVFpeDFRa0ZCZFVJc1EwRkJRenROUVVOd1FpeFRRVUZUTEVWQlFVVXNTMEZCVFR0TlFVTnFRaXhOUVVGTkxFVkJRVVVzVFVGQlR6dE5RVU5tTEU5QlFVOHNSVUZCUlN4VFFVRlZPMDFCUTI1Q0xGTkJRVk1zUlVGQlJTeEpRVUZMTzAxQlEyaENMR3RDUVVGclFpeEZRVUZGTEZWQlFWYzdUVUZCUlN4cFEwRkJhVU03VFVGRGJFVXNaVUZCWlN4RlFVRkZMRlZCUVZjN1RVRkJSU3d3UWtGQk1FSTdUVUZEZUVRc1ZVRkJWU3hGUVVGRkxGVkJRVmM3VFVGQlJTeFhRVUZYTEVWQlEzWkRPenRCUVZGVUxFRkJRVVVzUlVGQlFTeEJRVUZCTEdkQ1FVRm5RaXhEUVVGRE8wVkJRMllzVDBGQlR5eEZRVUZGTEVsQlFVczdSVUZEWkN4UlFVRlJMRVZCUVVVc1VVRkJVenRGUVVOdVFpeGxRVUZsTEVWQlFVVXNTVUZCU3p0RlFVTjBRaXhWUVVGVkxFVkJRVVVzU1VGQlN6dEZRVU5xUWl4UFFVRlBMRVZCUVVVc1EwRkJSU3hIUVhGQ1pEdEZRVEZDUkN4QlFVOUpMRVZCVUVZc1FVRkJRU3huUWtGQlowSXNRMEZQWkN4RFFVRkRMRU5CUVVNN1NVRkRSU3hQUVVGUExFVkJRVVVzUzBGQlRUdEpRVU5tTEU5QlFVOHNSVUZCUlN4UlFVRlRPMGxCUTJ4Q0xGZEJRVmNzUlVGNFlrc3NaVUZCWlN4RlFVRkZMR1ZCUVdVc1JVRkJSU3huUWtGQlowSXNSVUZCUlN4VFFVRlRMRVZCUVVVc1MwRkJTeXhGUVVGRkxGVkJRVlU3U1VGNVltaEhMRmRCUVZjc1JVRkJSU3hIUVVGSk8wbEJRMnBDTEZOQlFWTXNSVUZCUlN4SlFVRkxPMGxCUTJoQ0xFdEJRVXNzUlVGQlJTeEpRVUZMTEVkQlUyWTdTVUYwUWt3c1FVRlBTU3hGUVZCR0xFRkJRVUVzWjBKQlFXZENMRU5CVDJRc1EwRkJReXhCUVZGSkxFMUJRVTBzUTBGQlF6dE5RVU5LTEUxQlFVMHNSVUZCUlN4UFFVRlJPMDFCUTJoQ0xHVkJRV1VzUlVGQlJTeEpRVUZMTzAxQlEzUkNMRlZCUVZVc1JVRkJSU3hKUVVGTE8wMUJRMnBDTEV0QlFVc3NSVUZCUlN4SlFVRkxMRWRCUTJZN1JVRndRbFFzUVVGM1FtdENMRVZCZUVKb1FpeEJRVUZCTEdkQ1FVRm5RaXhEUVhkQ1pDeEZRVUZGTEVGQlFVRXNWMEZCVnl4RFFVRkRMRU5CUVVNc1EwRkJRenRKUVVGRExHRkJRV0VzUlVGQlJTeEpRVUZMTEVkQlFVYzdPMEZCU1RWRExFRkJRVUVzWlVGQlpUdEJRVU5tTEVGQlFXMUNMR3RDUVVGRUxFTkJRVU1zWlVGQlpUdEJRVU5zUXl4QlFVRnJRaXhwUWtGQlJDeERRVUZETEdWQlFXVTdRVUZEYWtNc1FVRkJRU3hsUVVGbE8wRkJRMllzUVVGQmJVSXNhMEpCUVVRc1EwRkJReXhsUVVGbE8wRkJRMnhETEVGQlFXdENMR2xDUVVGRUxFTkJRVU1zWlVGQlpTeERRVUZETzBWQlF6bENMRTFCUVUwc1JVRkJSU3hQUVVGUk8wVkJRMmhDTEdWQlFXVXNSVUZCUlN4SlFVRkxPMFZCUTNSQ0xGVkJRVlVzUlVGQlJTeEpRVUZMTzBWQlEycENMRXRCUVVzc1JVRkJSU3hKUVVGTExFZEJRMlk3TzBGQlJVUXNRVUZCZFVJc1owSkJRVkFzUVVGQlFTeFBRVUZQTEVGQlFVRXNUVUZCVFN4RFFVRkRPMFZCUXpGQ0xGVkJRVlVzUlVGQlJTeFBRVUZSTEVkQlEzWkNPenRCUVVWRUxFRkJRVUVzTkVKQlFUUkNMRU5CUVVNN1JVRkRla0lzVFVGQlRTeEZRVUZGTEVOQlFVVTdSVUZEVml4SlFVRkpMRVZCUVVVc1lVRkJTVHRGUVVOV0xFMUJRVTBzUlVGQlJTeEhRVUZKTzBWQlExb3NUVUZCVFN4RlFVRkZMRWxCUVVzN1JVRkRZaXhSUVVGUkxFVkJRVVVzVFVGQlR6dEZRVU5xUWl4UFFVRlBMRVZCUVVVc1EwRkJSVHRGUVVOWUxGRkJRVkVzUlVGQlJTeFJRVUZUTzBWQlEyNUNMRXRCUVVzc1JVRkJSU3hIUVVGSkxFZEJRMlE3TzBGQlNVUXNZMEZCWXl4RFFVRmtMRmxCUVdNN1JVRkRWaXhCUVVFd1JTeHRRa0ZCZGtRc1EwRkJReXh6UWtGQmMwSXNRMEZCUXl4clFrRkJhMElzUjBGQlJ5eEZRVUZGTEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1EwRkJRenRKUVVGRExFZEJRVWNzUlVGQlJTeEpRVUZMTEVkQlFVYzdPMEZCU3k5R0xFRkJRVUVzVVVGQlVTeERRVUZETzBWQlEwd3NUMEZCVHl4RlFVRkZMRXRCUVUwN1JVRkRaaXhOUVVGTkxFVkJRVVVzU1VGQlN6dEZRVU5pTEV0QlFVc3NSVUZCUlN4SlFVRkxPMFZCUTFvc1RVRkJUU3hGUVVGRkxGTkJRVlU3UlVGRGJFSXNVVUZCVVN4RlFVRkZMRkZCUVZNN1JVRkRia0lzYVVKQlFXbENMRVZCUVVVc05rSkJRVGhDTzBWQlEycEVMR05CUVdNc1JVRkJSU3cyUWtGQk9FSTdSVUZET1VNc1dVRkJXU3hGUVVGRkxEWkNRVUU0UWp0RlFVTTFReXhUUVVGVExFVkJRVVVzTmtKQlFUaENPMFZCUTNwRExGZEJRVmNzUlVGQlJTeEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMSGRDUVVGSk8wVkJRek5DTEZsQlFWa3NSVUZCUlN4SFFVRkhMRU5CUVVNc1MwRkJTeXhEUVVGRExIZENRVUZKTzBWQlF6VkNMR0ZCUVdFc1JVRkJSU3hIUVVGSExFTkJRVU1zUzBGQlN5eERRVUZETEhkQ1FVRkpPMFZCUXpkQ0xGVkJRVlVzUlVGQlJTeEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMSFZDUVVGSk8wVkJRekZDTEdGQlFXRXNSVUZCUlN4SlFVRkxMRWRCUTNaQ096dEJRVVZFTEd0Q1FVRnJRaXhEUVVGc1FpeFJRVUZyUWp0RlFVTmtMRUZCUVVFc1NVRkJTVHRKUVVOQkxHbENRVUZwUWl4RlFVRkZMRmxCUVUwN1JVRkZOMElzUVVGQlFTeEZRVUZGTzBsQlEwVXNhVUpCUVdsQ0xFVkJRVVVzWTBGQlRUczdRVUZOYWtNc1FVRkJSU3hGUVVGQkxFRkJRVUVzZFVKQlFYVkNMRU5CUVVNN1JVRkRkRUlzVjBGQlZ5eEZRVUZGTEVkQlFVazdSVUZEYWtJc1UwRkJVeXhGUVVGRkxFbEJRVXM3UlVGRGFFSXNaVUZCWlN4RlFVRkZMRWxCUVVzN1JVRkRkRUlzWVVGQllTeEZRVUZGTEVsQlFVczdSVUZEY0VJc1QwRkJUeXhGUVVGRkxFTkJRVVVzUjBFeVFtUTdSVUZvUTBRc1FVRlBTU3hGUVZCR0xFRkJRVUVzZFVKQlFYVkNMRU5CVDNKQ0xFVkJRVVVzUTBGQlF6dEpRVU5ETEU5QlFVOHNSVUZCUlN4TlFVRlBPMGxCUTJoQ0xFMUJRVTBzUlVGQlJTeFZRVUZYTEVkQmNVSjBRanRKUVRsQ1RDeEJRVmRSTEVWQldFNHNRVUZCUVN4MVFrRkJkVUlzUTBGUGNrSXNSVUZCUlN4RFFVbEZMRU5CUVVNc1EwRkJRenROUVVORkxHTkJRV01zUlVGQlJTeEhRVUZKTzAxQlEzQkNMR1ZCUVdVc1JVRkJSU3hKUVVGTE8wMUJRM1JDTEV0QlFVc3NSVUZCUlN4UFFVRlJMRWRCVFd4Q08wMUJjRUpVTEVGQlYxRXNSVUZZVGl4QlFVRkJMSFZDUVVGMVFpeERRVTl5UWl4RlFVRkZMRU5CU1VVc1EwRkJReXhCUVV0SkxFMUJRVTBzUTBGQlF6dFJRVU5LTEdWQlFXVXNSVUZCUlN4SlFVRkxPMUZCUTNSQ0xHRkJRV0VzUlVGQlJTeGpRVUZsTEVkQlEycERPMGxCYmtKaUxFRkJjMEp4UWl4RlFYUkNia0lzUVVGQlFTeDFRa0ZCZFVJc1EwRlBja0lzUlVGQlJTeEJRV1ZITEZkQlFWY3NRMEZCUXl4RFFVRkRMRU5CUVVNN1RVRkJReXhaUVVGWkxFVkJRVVVzUTBGQlJTeEhRVUZITzBsQmRFSXpReXhCUVhkQ2FVSXNSVUY0UW1Zc1FVRkJRU3gxUWtGQmRVSXNRMEZQY2tJc1JVRkJSU3hCUVdsQ1J5eFBRVUZQTEVOQlFVTXNRMEZCUXl4RFFVRkRPMDFCUTFBc1MwRkJTeXhGUVVGRkxFbEJRVXM3VFVGRFdpeGpRVUZqTEVWQlFVVXNTVUZCU3p0TlFVTnlRaXhOUVVGTkxFVkJRVVVzVDBGQlVUdE5RVU5vUWl4aFFVRmhMRVZCUVVVc2FVSkJRV3RDTEVkQlEzQkRPenRCUVU5VUxFRkJRVUVzTUVKQlFUQkNMRU5CUVVNN1JVRkRka0lzVVVGQlVTeEZRVUZGTEZGQlFWTTdSVUZEYmtJc1MwRkJTeXhGUVVGRkxFbEJRVXM3UlVGRFdpeExRVUZMTEVWQlFVVXNTVUZCU3l4SFFYTkZaanRGUVhwRlJDeEJRVXRKTERCQ1FVeHpRaXhEUVV0MFFpeEZRVUZGTEVOQlFVTTdTVUZEUXl4VFFVRlRMRVZCUVVVc1NVRkJTenRKUVVOb1FpeGhRVUZoTEVWQlFVVXNSMEZCU1N4SFFWRjBRanRKUVdaTUxFRkJVMUVzTUVKQlZHdENMRU5CUzNSQ0xFVkJRVVVzUTBGSlJTeERRVUZETEVOQlFVTTdUVUZEUlN4bFFVRmxMRVZCUVVVc1NVRkJTenROUVVOMFFpeExRVUZMTEVWQlFVVXNUMEZCVVN4SFFVZHNRanROUVdSVUxFRkJVMUVzTUVKQlZHdENMRU5CUzNSQ0xFVkJRVVVzUTBGSlJTeERRVUZETEVGQlNVa3NUVUZCVFN4RFFVRkRPMUZCUVVNc1pVRkJaU3hGUVVGRkxGTkJRVlVzUjBGQlJ6dEZRV0p1UkN4QlFXbENTU3d3UWtGcVFuTkNMRU5CYVVKMFFpeERRVUZETEVOQlFVTTdTVUZEUlN4VFFVRlRMRVZCUVVVc1NVRkJTenRKUVVOb1FpeFhRVUZYTEVWQlFVVXNTVUZCU3p0SlFVTnNRaXhOUVVGTkxFVkJRVVVzVDBGQlVTeEhRVzFDYmtJN1NVRjJRMHdzUVVGcFFra3NNRUpCYWtKelFpeERRV2xDZEVJc1EwRkJReXhCUVV0SkxFdEJRVXNzUTBGQlF6dE5RVU5JTEdGQlFXRXNSVUZCUlN4SlFVRkxPMDFCUTNCQ0xFdEJRVXNzUlVGQlJTeEpRVUZMTEVkQlkyWTdUVUYwUTFRc1FVRXdRbGtzTUVKQk1VSmpMRU5CYVVKMFFpeERRVUZETEVGQlMwa3NTMEZCU3l4RFFVbEdMRU5CUVVNc1EwRkJRenRSUVVORkxHVkJRV1VzUlVGQlJTeEpRVUZMTzFGQlEzUkNMRXRCUVVzc1JVRkJSU3hKUVVGTExFZEJSMlk3VVVFdlFtSXNRVUV3UWxrc01FSkJNVUpqTEVOQmFVSjBRaXhEUVVGRExFRkJTMGtzUzBGQlN5eERRVWxHTEVOQlFVTXNRVUZKU1N4TlFVRk5MRU5CUVVNN1ZVRkJReXhsUVVGbExFVkJRVVVzVTBGQlZTeEhRVUZITzAxQk9VSjJSQ3hCUVdsRFdTd3dRa0ZxUTJNc1EwRnBRblJDTEVOQlFVTXNRVUZMU1N4TFFVRkxMRU5CVjBZc1NVRkJTU3hEUVVGRE8xRkJRMFFzV1VGQldTeEZRVUZGTEVkQlFVazdVVUZEYkVJc1YwRkJWeXhGUVVGRkxFZEJRVWs3VVVGRGFrSXNWMEZCVnl4RlFVRkZMR05CUVdVc1IwRkRMMEk3UlVGeVEySXNRVUY1UTBzc01FSkJla054UWl4RFFYbERkRUlzUTBGQlF5eEJRVUZCTEhGQ1FVRnhRaXhEUVVGRE8wbEJRMjVDTEV0QlFVc3NSVUZCUlN4TFFVRk5PMGxCUTJJc1ZVRkJWU3hGUVVGRkxFMUJRVTg3U1VGRGJrSXNUVUZCVFN4RlFVRkZMRk5CUVZVN1NVRkRiRUlzVjBGQlZ5eEZRVUZGTEVkQlFVazdTVUZEYWtJc1UwRkJVeXhGUVVGRkxFbEJRVXNzUjBGdFFtNUNPMGxCYWtWTUxFRkJaMFJSTERCQ1FXaEVhMElzUTBGNVEzUkNMRU5CUVVNc1FVRkJRU3h4UWtGQmNVSXNRMEZQYkVJc1EwRkJReXhEUVVGRE8wMUJRMFVzVjBGQlZ5eEZRVUZGTEVkQlFVazdUVUZEYWtJc1UwRkJVeXhGUVVGRkxFbEJRVXM3VFVGRGFFSXNTMEZCU3l4RlFVRkZMRWxCUVVzN1RVRkRXaXhWUVVGVkxFVkJRVVVzU1VGQlN6dE5RVU5xUWl4VlFVRlZMRVZCUVVVc1RVRkJUenROUVVOdVFpeFBRVUZQTEVWQlFVVXNWVUZCVnp0TlFVTndRaXhsUVVGbExFVkJRVVVzU1VGQlN6dE5RVU4wUWl4TFFVRkxMRVZCUVVVc1NVRkJTenROUVVOYUxHdENRVUZyUWl4RlFVRkZMR0ZCUVdNN1RVRkRiRU1zWlVGQlpTeEZRVUZGTEdGQlFXTTdUVUZETDBJc1ZVRkJWU3hGUVVGRkxHRkJRV01zUjBGTE4wSTdUVUZvUlZRc1FVRm5SRkVzTUVKQmFFUnJRaXhEUVhsRGRFSXNRMEZCUXl4QlFVRkJMSEZDUVVGeFFpeERRVTlzUWl4RFFVRkRMRUZCWVVrc1RVRkJUU3hEUVVGRE8xRkJRVU1zVlVGQlZTeEZRVUZGTEVsQlFVc3NSMEZCUnp0TlFUZEVla01zUVVFclJGa3NNRUpCTDBSakxFTkJlVU4wUWl4RFFVRkRMRUZCUVVFc2NVSkJRWEZDTEVOQlQyeENMRU5CUVVNc1EwRmxSeXhEUVVGRExFTkJRVU03VVVGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU3l4SFFVRkhPMFZCTDBSb1F5eEJRVzFGU3l3d1FrRnVSWEZDTEVOQmJVVjBRaXhEUVVGRExFRkJRVUVzY1VKQlFYRkNMRU5CUVVNN1NVRkRia0lzVFVGQlRTeEZRVUZGTEUxQlFVODdTVUZEWml4WFFVRlhMRVZCUVVVc1IwRkJTVHRKUVVOcVFpeFRRVUZUTEVWQlFVVXNTVUZCU3p0SlFVTm9RaXhMUVVGTExFVkJRVVVzU1VGQlN5eEhRVU5tT3p0QlFVdE1MRUZCUVVFc2IwSkJRVzlDTEVOQlFVTTdSVUZEYWtJc1VVRkJVU3hGUVVGRkxFdEJRVTA3UlVGRGFFSXNUVUZCVFN4RlFVRkZMRTFCUVU4N1JVRkRaaXhMUVVGTExFVkJRVVVzU1VGQlN6dEZRVU5hTEU5QlFVOHNSVUZCUlN4SlFVRkxPMFZCUTJRc1QwRkJUeXhGUVVGRkxGTkJRVlU3UlVGRGJrSXNVMEZCVXl4RlFVRkZMRWxCUVVzN1JVRkRhRUlzUzBGQlN5eEZRVUZGTEVsQlFVczdSVUZEV2l4VlFVRlZMRVZCUVVVc1NVRkJTenRGUVVOcVFpeFBRVUZQTEVWQlFVVXNSMEZCU1R0RlFVTmlMRmxCUVZrc1JVRkJSU3hIUVVGSk8wVkJRMnhDTEUxQlFVMHNSVUZCUXl4cFFrRkJTenRGUVVOYUxHdENRVUZyUWl4RlFVRkZMR05CUVdVN1JVRkRia01zWlVGQlpTeEZRVUZGTEdOQlFXVTdSVUZEYUVNc1ZVRkJWU3hGUVVGRkxHTkJRV1VzUjBGUk9VSTdSVUYwUWtRc1FVRm5Ra2tzYjBKQmFFSm5RaXhEUVdkQ2FFSXNUVUZCVFN4RFFVRkRPMGxCUTBnc1QwRkJUeXhGUVVGRkxFZEJRVWs3U1VGRFlpeFpRVUZaTEVWQlFVVXNSMEZCU1R0SlFVTnNRaXhOUVVGTkxFVkJRVU1zYTBKQlFVc3NSMEZEWmpzN1FVRkpUQ3hCUVVGQkxIbENRVUY1UWl4RFFVRkRPMFZCUTNSQ0xHRkJRV0VzUlVGQlJTeERRVUZGTEVkQlEzQkNPenRCUVVORUxFRkJRV2xDTEdkQ1FVRkVMRU5CUVVNc1lVRkJZU3hEUVVGRE8wVkJRek5DTEU5QlFVOHNSVUZCUlN4UlFVRlRPMFZCUTJ4Q0xGVkJRVlVzUlVGQlJTeFBRVUZSTEVkQlEzWkNPenRCUVVORUxFRkJRV2xFTEdsQ1FVRm9ReXhEUVVGRExHbENRVUZwUWl4QlFVRkJMR0ZCUVdFc1EwRkJReXh2UWtGQmIwSXNRMEZCUXp0RlFVTnNSU3hMUVVGTExFVkJRVVVzUzBGQlRUdEZRVU5pTEUxQlFVMHNSVUZCUlN4TlFVRlBPMFZCUTJZc1ZVRkJWU3hGUVVGRkxFbEJRVXM3UlVGRGFrSXNXVUZCV1N4RlFVRkZMRU5CUVVVN1JVRkRhRUlzVlVGQlZTeEZRVUZGTEVOQlFVVTdSVUZEWkN4UFFVRlBMRVZCUVVVc1EwRkJSU3hIUVVOa0lpd0tDU0p1WVcxbGN5STZJRnRkQ24wPSAqLw==');;
},{"sassify":3}],6:[function(require,module,exports){
module.exports = "<div id=\"rax-footer-wrapper\"><div id=\"rax-footer-container\" class=\"rax-clearfix\"><div class=\"rax-footer-col\"><h4>Support Network</h4><ul><li><a href=\"https://support.rackspace.com\" target=\"_blank\">Support Network Home</a></li><li><a href=\"https://support.rackspace.com/how-to\" target=\"_blank\">Rackspace How-To</a></li><li><a href=\"https://community.rackspace.com\" target=\"_blank\">Rackspace Community</a></li><li><a href=\"https://developer.rackspace.com/docs\" target=\"_blank\">API Documentation</a></li><li><a href=\"https://developer.rackspace.com\" target=\"_blank\">Developer Center</a></li></ul></div><div class=\"rax-footer-col rax-footer-about\"><h4>About Rackspace</h4><div class=\"rax-clearfix\"><ul class=\"rax-footer-about-list\"><li><a href=\"http://www.rackspace.com/about/\">About</a></li><li><a href=\"http://stories.rackspace.com\" target=\"_blank\">Customer Stories</a></li><li><a href=\"http://www.rackspace.com/events/\">Events</a></li><li><a href=\"http://www.rackspace.com/programs/\">Programs</a></li></ul><ul class=\"rax-footer-about-list\"><li><a href=\"http://blog.rackspace.com/category/newsroom\">News</a></li><li><a href=\"http://www.rackspace.com/information/contactus/\">Contact Information</a></li><li><a href=\"http://www.rackspace.com/information/legal/\">Legal</a></li><li><a href=\"http://talent.rackspace.com/\" target=\"_blank\">Careers</a></li></ul></div></div><div class=\"rax-footer-col\"><h4>Blogs</h4><ul><li><a href=\"http://blog.rackspace.com\" target=\"_blank\">The Rackspace Blog</a></li><li><a href=\"https://developer.rackspace.com/blog/\" target=\"_blank\">Developer Blog</a></li></ul></div><div class=\"rax-footer-col\"><h4>Site Information</h4><ul><li><a href=\"http://www.rackspace.com/information/legal/privacystatement\" target=\"_blank\">Privacy Statement</a></li><li><a href=\"http://www.rackspace.com/information/legal/websiteterms\" target=\"_blank\">Website Terms</a></li><li><a href=\"http://www.rackspace.com/information/legal/copyrights_trademarks\" target=\"_blank\">Trademarks</a></li><li><a href=\"http://www.rackspace.com/sitemap\" target=\"_blank\">Sitemap</a></li></ul></div></div><div id=\"rax-basement-wrapper\"><div id=\"rax-basement-container\" class=\"rax-clearfix\"><p>&copy; 2017 Rackspace US, Inc.</p></div></div></div>";

},{}],7:[function(require,module,exports){
module.exports = "<!-- Font Includes --><link href=\"https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css\" rel=\"stylesheet\"><link href=\"https://fonts.googleapis.com/css?family=Titillium+Web:400,300,600,700\" rel=\"stylesheet\" type=\"text/css\"><link href=\"https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700\" rel=\"stylesheet\" type=\"text/css\"><!-- IE Fix for HTML5 Tags --><!--[if lt IE 9]>\n\t<script src='//html5shim.googlecode.com/svn/trunk/html5.js'></script>\n<![endif]--><div id=\"rax-support-header\"><div id=\"rax-eyebrow-wrapper\"><div id=\"rax-eyebrow-container\" class=\"rax-clearfix\"><div id=\"rax-eyebrow-utility\"><ul><li><a href=\"tel:+18009614454\">US Support: 1-800-961-4454</a></li><li><a href=\"tel:+08009880300\">UK Support: 0800-988-0300</a></li><li><a href=\"https://www.rackspace.com/information/contactus#form\">Email Us</a></li></ul></div><div id=\"rax-eyebrow-login\" class=\"rax-dropdown-menu\"><ul><li><span class=\"rax-btn\">Log In</span><ul><li><a href=\"https://my.rackspace.com/portal/auth/login\">MyRackspace Portal</a></li><li><a href=\"https://mycloud.rackspace.com\">Cloud Control Panel</a></li><li><a href=\"https://apps.rackspace.com\">Rackspace Webmail Login</a></li><li><a href=\"https://cp.rackspace.com\">Email Admin Login</a></li></ul></li></ul></div><div id=\"rax-eyebrow-signup\" class=\"rax-dropdown-menu\"><ul><li><span class=\"rax-btn\">Sign Up</span><ul><li><a href=\"https://cart.rackspace.com/cloud\">Rackspace Cloud</a></li><li><a href=\"https://cart.rackspace.com/apps\">Email &amp; Apps</a></li></ul></li></ul></div><div id=\"rax-eyebrow-status\"><p><a href=\"https://status.rackspace.com\">System Status</a></p></div></div></div><div id=\"rax-support-nav-wrapper\"><div id=\"rax-support-nav-container\"><nav id=\"nav-global\"><a class=\"rax-logo\" href=\"http://www.rackspace.com\">Rackspace</a><a id=\"raxhs-support\" class=\"raxhs-tab\" href=\"http://support.rackspace.com\">Support Home</a><a id=\"raxhs-how-to\" class=\"raxhs-tab\" href=\"https://support.rackspace.com/how-to/\">How-To</a><a id=\"raxhs-community\" class=\"raxhs-tab\" href=\"https://community.rackspace.com\">Community</a><a id=\"raxhs-api\" class=\"raxhs-tab\" href=\"https://developer.rackspace.com/docs\">API Documentation</a><a id=\"raxhs-developer\" class=\"raxhs-tab\" href=\"https://developer.rackspace.com\">Developers</a><a id=\"raxhs-whitepapers\" class=\"raxhs-tab\" href=\"https://support.rackspace.com/whitepapers\">White Papers</a></nav></div></div><div id=\"rax-support-banner-wrapper\"><div id=\"rax-support-banner-container\"><div class=\"rax-support-banner-utility rax-clearfix\"><a href=\"http://support.rackspace.com\"><aside id=\"rax-header-link\"><h1><span>Rackspace</span> Support Network</h1></aside></a><div class=\"search\"><div data-src-search-box></div></div></div></div></div></div>";

},{}],8:[function(require,module,exports){

var jQuery = require("jquery");
var _ = require('underscore');

var util = require('./util.js');


var BANNER_KEY = 'haasDismissedBanner';

/**
*  dismissMessage dismisses the message and ensures it's not displayed again.
*/

function dismissMessage(messageId) {
    jQuery("#banner-announcement-container").slideUp('fast');
    document.cookie = BANNER_KEY + "=" + messageId + ";domain=rackspace.com;expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

/**
*  displayMessage renders the message as HTML
*/

function displayMessage(messageId, htmlSnippet) {
    jQuery("#banner-announcement-container").css("display", "");
    jQuery("#banner-announcement-content-text").append(htmlSnippet);
    jQuery("#banner-announcement-close").on('click', _.partial(dismissMessage, messageId));
}

/*
*  postMessage displays the message to the user if they haven't dismissed it
*  already
*/

function postMessage(messageId, htmlSnippet) {
    var bannerValue = util.getCookie(BANNER_KEY);

    if (bannerValue && bannerValue === messageId) {
        return;
    }

    displayMessage(messageId, htmlSnippet);
}

module.exports = {
    postMessage: postMessage,
};

},{"./util.js":10,"jquery":2,"underscore":4}],9:[function(require,module,exports){
'use strict';

var jQuery = require('jquery');
var _ = require('underscore');

var banners = require('./banners.js')

var style = require('../css/style.scss');

var headerHtml = require('../html/header.html');
var footerHtml = require('../html/footer.html');
var util = require('./util.js');

var divElements = {
    "how-to": "#raxhs-how-to",
    "api": "#raxhs-api",
    "community": "#raxhs-community",
    "support": "#raxhs-support"
};

/**
* insertHeader injects the header into the specified div and sets the tab
* correctly depending on the team.
*/

function insertHeader(team, headerDivId, headerHtml, contentDivId) {
    jQuery(headerDivId).html(headerHtml);
    jQuery('.raxhs-tab').removeClass('active');
    var elementID = divElements[team];
    setActiveTabBackground(contentDivId, elementID);
    if (team !== undefined) {
        jQuery(elementID).addClass('active');
    }
    checkApiDocsHref();
}

/**
* setActiveTabBackground sets the background color of the active tab with the
* same color as the background color of the page
*/

function setActiveTabBackground(contentID, elementID) {
    var backgroundColor = jQuery(contentID).css("background-color");
    if (backgroundColor !== "transparent" && backgroundColor !== "rgba(0, 0, 0, 0)") {
        jQuery(elementID).css("background-color", backgroundColor);
    } else {
        jQuery(contentID).parents().map(function() {
            backgroundColor = jQuery(this).css("background-color");
            if (this.tagName != 'BODY') {
                if (backgroundColor !== "transparent" && backgroundColor !== "rgba(0, 0, 0, 0)") {
                    jQuery(elementID).css("background-color", backgroundColor);
                }
            }
        });
    }
}

/**
* checkApiDocsHref does something...
*/

function checkApiDocsHref() {
    var hostName = location.hostname;
    if (hostName.substring(0, 5) === "docs-") {
        var newHref = location.origin;
        jQuery('#raxhs-api').attr('href', newHref);
    }
}


/**
* insertFooter injects the footer into the specified footer div.
*/
function insertFooter(team, footerHtml, footerDivId) {
    jQuery(footerDivId).html(footerHtml);
    var today = new Date();
    var presentYear = today.getFullYear();
    jQuery("#rax-basement-copyright").html("&#169; " + presentYear + " Rackspace US, Inc.");
}


//
// Application Entry Point
//
module.exports = function(team, headerDivId, footerDivId, contentDivId, message) {
    jQuery(document).ready(function() {
        // expose the ability for customers to post messages
        window.haasPostMessage = banners.postMessage;

        // insert header
        insertHeader(team, headerDivId, headerHtml, contentDivId);

        // insert footer
        insertFooter(team, footerHtml, footerDivId);

    });
};

},{"../css/style.scss":5,"../html/footer.html":6,"../html/header.html":7,"./banners.js":8,"./util.js":10,"jquery":2,"underscore":4}],10:[function(require,module,exports){
'use strict';

var jQuery = require("jquery");
var _ = require('underscore');


function getCookie(cookieName) {
    var retVal = "";
    if (null != cookieName && cookieName != "") {
        var allCookies = document.cookie;

        // Get all the cookies pairs in an array
        var cookieArray = allCookies.split(';');

        // Now take key value pair out of this array
        for (var i = 0; i < cookieArray.length; i++) {
            var name = cookieArray[i].split('=')[0];
            if (null != name) {
                name = name.trim();
            }

            var value = cookieArray[i].split('=')[1];
            if (null != value) {
                value = value.trim();
            }
            if (cookieName == name) {
                retVal = value;
                break;
            }
        }
    }
    return retVal;
}

function onIE9() {
    var version = 0;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9\{1,}[\.0-9]{0,})");

        if (re.exec(ua) != null)
            version = parseFloat(RegExp.$1);
    }
    return (version > 0 && version < 10);
}

function createJavascriptElement(scriptSrc, isInnerText, id) {
    var script = document.createElement('script');

    if (null != id && id != "") {
        script.id = id;
    }
    script.type = 'text/javascript';

    if (!isInnerText) {
        script.async = true;
        script.src = scriptSrc;
    } else {
        script.innerText = scriptSrc;
        script.innerHtml = scriptSrc;
    }
    return script;
}

function insertIntoDom(element) {
    var s0 = document.getElementsByTagName('script')[0];

    s0.parentNode.insertBefore(element, s0);
    document.getElementsByTagName('script')[0].innerHTML = document.getElementsByTagName('script')[0].innerText;
}

module.exports = {
    getCookie: getCookie,
    onIE9: onIE9,
    createJavascriptElement: createJavascriptElement,
    insertIntoDom: insertIntoDom
};

},{"jquery":2,"underscore":4}]},{},[9])(9)
});