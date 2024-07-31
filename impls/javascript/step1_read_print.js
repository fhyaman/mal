
const  readline  = require('node:readline')
const  read_str  = require('./reader.js');
const  pr_str  = require('./printer.js');

function READ(line){
 return read_str(line);
}

function EVAL(str){
	return str;
}

function PRINT(str){
	return pr_str(str)
}

function rep(line){
      return PRINT(EVAL(READ(line)))
}



const rl  = readline.createInterface({
	input: process.stdin, 
	output: process.stdout, 
	prompt: 'user> ',
});

rl.prompt();	
 
rl.on('line', (line) => {
   console.log(rep(line)); 
   rl.prompt()
}).on('close', () => {
  console.log('Bye bye');
  process.exit(0);
});

