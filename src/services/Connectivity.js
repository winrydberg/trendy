import {NetInfo} from 'react-native'




export const getConnectivity = ()=>{
    let amConnected = false;
    NetInfo.isConnected.fetch().then(isConnected => {
       amConnected = isConnected;
       return amConnected 
    }).catch(error=>{
        return false;
    })

}