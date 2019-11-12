

export const emailValidator = (val) =>{
    //alert(val.length);
    if(val.length === 0){
        isEmpty = true;
    }else{
        isEmpty = false;
    }
    const isValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(val);
   // return /[-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/.test(val);
    const result ={
        isValid: isValid,
        isEmpty: isEmpty
    }
    return result;
}

export const phoneNumberValidator =(val)=>{
    
    if(val.length === 0){
        isEmpty = true;
    }else{
        isEmpty = false;
    }

    const isValid = /^(\+233|0|233)?\d{9}$/.test(val)
    const result ={
        isValid: isValid,
        isEmpty: isEmpty
    }
    return result;
}


export const minLengthValidator =(val, minLength)=>{
    return val.length >= minLength;
}