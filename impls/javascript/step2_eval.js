
const  readline  = require('node:readline')
const  read_str  = require('./reader.js');
const  pr_str  = require('./printer.js');

  

const repl_env = {
  '+': (...t) => t.reduce((acc,cur)=> acc + cur),
  '-': (...t) => t.reduce((acc,cur)=> acc - cur),
  '*': (...f) => f.reduce((acc, cur) => acc * cur, 1),
  '/': (...f) => f.slice(1).some((v) => v === 0) ? () => { throw 'divide by zero' ; } : f.reduce((acc,cur) => Number.parseInt(acc/cur) ),
}

function READ(line){
 return read_str(line);
}

function EVAL(ast, env){
    
    if (!Array.isArray(ast))
       return eval_ast(ast, env)
    if (ast.length === 0)
       return ast
    
      const [op, ...rest] = eval_ast(ast, env);
//      console.log('op', op)
//      console.log(typeof op)
//      console.log('rest',rest)
//      console.log(eval_ast(ast, env))
      const result =op.apply(null,rest)
      
	return result;
}

function PRINT(str){
	return pr_str(str);
}

function rep(line, env = repl_env){
      return PRINT(EVAL(READ(line), env));
}

function eval_ast(ast, env){
  switch(typeof ast){
        case 'symbol':
//            console.log("ast sym", ast)
            key = ast.toString().slice(7, ast.toString().length-1);
//             console.log(key)
             const  res = env[key];
//              const numbers = [1,2]
//              console.log('res ',env[key].apply(null,numbers))
           if ( res !== undefined) 
             return res ;
           
            throw `${key} not found` ;
            
        case 'object':
//            console.log("ast obj",ast)
            if (Array.isArray(ast)){
              return ast.map((struct) => EVAL(struct,env));
            }
        case 'number':
//             console.log("ast number",ast)
            return ast;
        case 'boolean':
//             console.log("ast boolean", ast)
            return data
        default:
//           console.log("ast default", ast)
          return ast;
  }
              
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

