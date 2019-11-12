//import { db } from '../config/db';
import firebase from 'react-native-firebase';



getAuthUser = ()=>{
    var user = firebase.auth().currentUser;
    if (user) {
     return user.uid
    } else {

        return null;
    }
}


export const addUser =  (user) => {
    //var mref = db.ref('users/user-'+user.auth.uid);
    var ref = firebase.database().ref('users/user-'+user.auth.uid).set({
        name: user.data.name,
        userId: user.auth.uid,
        email: user.auth.email,
        profile_picture : 'NULL',
        phone: user.data.phone,
        password: user.data.password,
        favs:"[]"
    });
    //console.log(mref);
    return 'OK';
}

export const addComment =  async(vid, comment) => {
    let videoId = vid.split(":");
    let uid = getAuthUser();
    let user = firebase.auth().currentUser;
 
    let uArray = Object.values(user)[1];
    //console.log(uArray.providerData[0]);
    // }
   firebase.database().ref('users/user-'+uid).on('value', snapshot=>{
         console.log(snapshot.val());
            firebase.database().ref('videos/'+videoId[0]+'/'+videoId[1]+'/comments/'+uid+'-'+Date.now().toString()).set({
                comment:comment,
                username: snapshot.val().name,
                profile_picture: snapshot.val().profile_picture
        });
   })
  
    return 'OK';
}
export const getComments = (vid) =>{
    let videoId =vid.split(":");
    let data =[];
    //var videos = db.ref.child('videos').orderByChild('category/'+category);
    firebase.database().ref('videos/'+videoId[0]+'/'+videoId[1]+'/comments').on('value',snapshot => {
        let tempData =[]
        snapshot.forEach(function(child){
            var key = child.key;
            var value = child.val();
            var theVal = Object.assign([], value).reverse();
            var childSingle ={
                key:key,
                val:theVal
            }
            tempData.push(childSingle);
        })
        //let data = Object.values(snapshot.val());
       data =tempData;
      })

   // return data;
}


export const getVideo = (category) =>{
    //var videos = db.ref.child('videos').orderByChild('category/'+category);
    videoRef.orderByChild('category/politics').equalTo(true).on('value',snapshot => {
        let prevState = Object.assign({}, this.state.items);   
        let data = snapshot.val();
        let items = Object.values(data);
        prevState.politics = items;
        this.setState({items:prevState});
        console.log(this.state.items);
      })
    return videos;
}


export const userLoveVideo = (videoId,initialVal)=>{
    // db.ref("videos/funny_0").update({
    //     loved:initialVal+1
    // })
}

export const updateUser = (userId, profileImageUrl)=>{
    firebase.database().ref("users/user-"+userId).update({
        profile_picture: profileImageUrl
    })
}



// export const uploadPhoto=(path)=>{
//        let imageUrl = "default"
//        let userId = getAuthUser();
//        firebase.storage()
//        .ref('/users/user_'+userId+'.jpg')
//        .putFile(path)
//        .then(uploadedFile => {
//            //success
//            return uploadedFile.downloadURL;
//        })
//        .catch(err => {
//            //Error
//            return "error"
//        });

//        //return imageUrl;
// }



    // db.ref('videos/' + videoId).update({
    //     loved : initialVal+1
    //   }, function(error) {
    //     if (error) {
    //      return 'error';
    //     } else {
    //     return 'OK';
    //     }
    //   });
    
