
function pr_str(data){
    switch(typeof data){
        case 'symbol':
            return data.toString().slice(7, data.toString().length-1);
        case 'number':
            return String(data);
        case 'boolean':
            return data
        case 'object':
            if (Array.isArray(data)){
                const res = data
                .map((struct) => pr_str(struct))
                .flat()
                .join(' ');
               
             return '('.concat(res).concat(')')
            }
            return String(data);
    }    
}

module.exports=pr_str
