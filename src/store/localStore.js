import { AsyncStorage } from 'react-native';

export const addToFavorite = async(videoId)=>{
    alert(videoId);
    let existingData = JSON.parse(await AsyncStorage.getItem('favorite'));
    if(existingData == null){
        favorite = [];
        favorite.push(videoId);
        await AsyncStorage.setItem('favorite',favorite);
    }else{
        existingData.push(videoId);
        await AsyncStorage.setItem('favorite',JSON.stringify(existingData));
    }

   // return "OK"
    //await AsyncStorage.setItem('favorite',f)
}

export const getDataFromStorage = async() =>{
    let existingData = JSON.parse(await AsyncStorage.getItem('favorite'));
    return existingData;
}