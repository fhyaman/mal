const  readline  = require('node:readline')


function READ(line){
 return line
}

function EVAL(str){
	return str
}

function PRINT(str){
	return str
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
   switch(line.trim()) {
     default:
	   console.log(rep(line)); 
     break;
   }
   rl.prompt()
}).on('close', () => {
  console.log('Bye bye');
  process.exit(0);
});

