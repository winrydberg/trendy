const validate =(val, rules)=>{
        let isValid = true;
        for(let rule in rules){
                switch(rule){
                        case "isEmail":
                        isValid = isValid && emailValidator(val);
                        break;

                        case "minLength":
                        isValid = isValid && minLengthValidator(val, rules[rule]);
                        break;

                        case "confirmPassword":
                        isValid = isValid && equalToValidator(val, rules[rule])
                        break;

                        default: 
                        isValid = true;
                }
                   
        }
}


const emailValidator = val =>{
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(val);
   // return /[-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/.test(val);
}


const minLengthValidator =(val, minLength)=>{
        return val.length >= minLength;
}


const equalToValidator = (val, checkValue)=>{
        return val === checkValue;
}


export default validate;