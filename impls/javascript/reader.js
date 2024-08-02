 

const TRUE_LENGTH            ="true".length;
const FALSE_LENGTH           ="false".length;
const NIL_LENGTH             ="nil".length;
const MAL_SPECIAL_TWO_CHAR   ='~@';
const MAL_LEFT_BRACKET       ='[';
const MAL_RIGHT_BRACKET      =']';
const MAL_LEFT_BRACE         ='{';
const MAL_RIGHT_BRACE        ='}';
const MAL_LEFT_PARENS        ='(';
const MAL_RIGHT_PARENS       =')';
const MAL_QUOTE              ="'";
const MAL_BACK_QUOTE         ="`";
const MAL_TILDE              ="~";
const MAL_CARET              ="^";
const MAL_AT                 ="@";

const MAL_SYMBOLS = [ 
 MAL_LEFT_BRACKET     ,
 MAL_RIGHT_BRACKET    ,
 MAL_LEFT_BRACE       ,
 MAL_RIGHT_BRACE      ,
 MAL_LEFT_PARENS      ,
 MAL_RIGHT_PARENS     ,
 MAL_QUOTE            ,
 MAL_BACK_QUOTE       ,
 MAL_TILDE            ,
 MAL_CARET            ,
 MAL_AT               ,
];

class Reader {
 tokens;
 position = 0;
 
 constructor(tokens){
  this.tokens = tokens;
 }
 
 next(){
    return this.tokens[this.position++];
 }

 peek(){ 
    return this.tokens[this.position];
 }
}


function read_str(str){
 const tokens = tokenize(str);
 
 if (tokens.length === 0) return Symbol('nil');
 
 const reader = new Reader(tokens);
	
 return read_form(reader);
}

function tokenize(str){
 re =/[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"?|;.*|[^\s\[\]{}('"`,;)]*)/g
   const result =str.match(re).map((s) => s.replaceAll(',',' ')).map((s) => s.trim()).filter((s) => s !== "");
 return result;
}

function read_form(reader){
  const lookahead = reader.peek();
  
  if(lookahead[0] ==='('){
	return read_list(reader);
  }
  else {
	return read_atom(reader);
  }
}

function read_list(reader){
 	const list=[];
 	let cur = reader.peek();
	while( cur !== ')') {
		reader.next();
		
		if (reader.position >= reader.tokens.length) {
			throw "expected right parens ')'";
		}
		
		cur = reader.peek();
		if (cur === ')') continue;
		 
		list.push(read_form(reader));
	}
//  	console.log(list)
	return list ;
}

function read_atom(reader){
	let atom, rest;
	const lookAhead = reader.peek();
	
	[atom, rest] = read_nil(lookAhead)
	if (atom!== null)
	    return atom;

	[atom, rest] = read_integer(lookAhead);
// 	console.log(atom, rest)
	if (atom !== null && atom !== NaN)
		return atom;
		
	[atom, rest] = read_bool(lookAhead)
	if (atom !== null)
		return atom;
	
	return Symbol(lookAhead);
}
/*
 function read_atom(reader){
// 	let atom = [];
	const lookAhead = reader.peek()
	let parseAtom, restLookAhead;
// 	let lookAheadCur = 0
// 	while(lookAheadCur<lookAhead.length) {
// 		[parseAtom, restLookAhead] = read_number(lookAhead)
// 		if (parseAtom !== null)
// 			
// 	}
	
	[parseAtom,restLookAhead] = read_number(lookAhead)
	if (parseAtom !== null){
		return parseAtom;
	}
	return Symbol(lookAhead)
	
	
// 	if(restLookAhead === lookAhead){
// 		[parseAtom,restLookAhead] = read_bool(lookAhead)
// 		if (parseAtom !== null)
// 			return {type: "bool", attribute: parseAtom};
// 		
// 		if (restLookAhead === lookAhead){
// 			[parseAtom,restLookAhead] = read_special(lookAhead)
// 			if (parseAtom !== null){
// 				return {type: "special", attribute: parseAtom}
// 			}
// 			if (restLookAhead === lookAhead){
// 				return {type: "symbol", attribute: lookAhead }
// 			}
// 		}
// 	}
}
*/

function read_integer(str){
	let num = '';
	
	const numbersChars = ['0', '1','2','3','4','5','6','7','8','9']
// 	console.log(str)
	const negative = str[0] === '-';
// 	 console.log("negative", negative)
	 const chars= negative ? str.slice(1) : str;
// 	 console.log("chars", chars)
	 
	for (const char of  chars ){
		if (numbersChars.includes(char))
			num+= char;
		else
			break;
	}
	
	if( num.length === 0)
		return [null, str]
	if ( negative && num.length > 0){
		return [ -parseInt(num),str.slice(num.length) ] 
	}
		
	return [parseInt(num), str.slice(num.length)]
}


 function read_number(str){
	let num = '';
	
	const numbersChars = ['0', '1','2','3','4','5','6','7','8','9','-','e','.']
	
	for (const char of str){
		if (numbersChars.includes(char))
			num+= char;
		else
			break;
	}
	
	const rest = str.slice(num.length)
	
	if( num.length === 0)
		return [null, str]
	
// 	if (num.length === 1 && num === '-')
// 		return 
	
// 	if (num.length === 1 && num === '.')
//		return
		
		 
	if (num.includes('.'))
		return [parseFloat(num), rest]
		
	return [parseInt(num), rest]
}

 function read_nil(str){
	if (str.length >= NIL_LENGTH && str.slice(0,NIL_LENGTH) === 'nil')
		return [Symbol('nil'), str.slice(NIL_LENGTH)]
		
	return [null,str]
}

 function read_bool(str){
	if (str.length >= TRUE_LENGTH && str.slice(0,TRUE_LENGTH) === 'true')
		return [true,str.slice(TRUE_LENGTH)]
	else if (str.length >= FALSE_LENGTH && str.slice(0,FALSE_LENGTH) === 'false')	
		return [false, str.slice(FALSE_LENGTH)]
		
	return [null,str]
}

 function read_special(str){
	if (str.length >= 1 && (str.splice(0,1) in MAL_SYMBOLS)){
		return [str.slice(0,1), str.slice(1)]
	}
	if (str.length >=2 && str.splice(0,2) === MAL_SPECIAL_TWO_CHAR){
		return [str.slice(0,2), str.slice(2)]
	}
	return [null, str]
}
	
// function read_string(str){
// 	if (str[0] === MAL_QUOTE)
// 		str = str.slice(1)
// 	else 
// 		return [null, str]
// 	
// 	for (const char in str){
// 		
// 		
// 	}
// }
module.exports = read_str; 
