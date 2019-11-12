import React from "react";
import { AppRegistry, Alert, BackHandler,ScrollView , Dimensions, StyleSheet,View,AsyncStorage, Share,ToastAndroid,StatusBar, Image, ActivityIndicator } from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button, Text, Item, Input } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import YouTube from 'react-native-youtube';
import { addComment, getComments } from '../../services/UserService';




const video ={};
 class VideoDetails extends React.Component {
  
   constructor(props){
     super(props);
     this.state={
        video:null,
        isInFavorite: false,
        key: null,
        comment : null,
        comments : [],
        height: 215
     }
     this.getAllComments();
    console.log(Dimensions.get('window').width/2);
   }

   handleReady = () => {
    setTimeout(() => this.setState({ height: 216 }), 200);
   }

  
  componentDidMount() {
    const  params  = this.props.navigation.state.params.data;
    const  key  = this.props.navigation.state.params.data.key;
    // console.log(params);
    // console.log(key);

    this.setState({video:params, key:key});
    //video = params;
    this.checkExistence();
  }
 

  // postComment = () =>{

  // }



    


  
  shareWithOthers = ()=>{
    Share.share({
        message: 'Hi Watch Funny vieos from Ghana and beyond',
        url: "https://play.google.com/store/search?q=fun%20V&hl=en",
        title: 'Funny GH Videos'
      }, {
        // Android only:
        dialogTitle: 'Share With Friends',
      })
  }
  
  

  checkExistence = async()=>{
    //alert(video.params.data.key);
    let existingData =await AsyncStorage.getItem('favorite');
    if(existingData!=null){
      const userVideos = JSON.parse(existingData);
      for(let i=0;i<=userVideos.length;i++){
        if(this.state.video.key == userVideos[i]){
          this.setState({isInFavorite:true});
        }

      }
    }
  }


  loadVideo = () =>{
    if(this.state.video ==null){
        return (
          <ActivityIndicator
            size={60}
            style={{marginLeft: 30}}
            animating={true} />
          )
    }else{
          return (
            <Card style={{elevation: 0}}>
            {/* <CardItem > */}
            <View style={styles.videoContainer}>
            <YouTube
                apiKey={'AIzaSyCkdalpA2Ypy3wn50GsJJJgWy0Gchh7u2E'}
                videoId={this.state.video.url}// The YouTube video ID
                play={true}     // control playback of video with true/false
                controls = {1}        
                fullscreen={false}       // control whether the video should play in fullscreen or inline
                loop={false}             // control whether the video should loop when ended
                onReady  = {this.handleReady}
                style    = {{ alignSelf: 'stretch', height: this.state.height }}
                resumePlayAndroid ={false}
                // modestbranding ={true}
              />
            </View>
            
            
            {/* </CardItem> */}

            <View style={{flexDirection:'row',marginLeft:10,marginRight:10, justifyContent:'space-between'}}>
            <Button small transparent onPress={()=>this.shareWithOthers()} style={{padding:2}}>
                <MaterialIcons size={20} name="share"/>
                <Text>Share</Text>
            </Button>


            <Button small transparent onPress={()=>this.shareWithOthers()} style={{padding:2}}>
                <MaterialIcons size={20} name="comment"/>
                <Text>Comment</Text>
            </Button>
           

            {this.isUserFavroite()}

            
            </View>


            <View style={{padding: 10}}>
            <Text>{this.state.video.title}</Text>
            </View>
          </Card>
          )
    }
  }


  isUserFavroite = () =>{
        if(this.state.isInFavorite){
          return (
            <Button transparent style={{padding:10}}>
                  <MaterialIcons size={20} color="green" name="favorite"/>  
                  <Text>{this.state.video.views} Likes </Text>
            </Button>
          )
        }else{
            return (
              <Button transparent style={{padding:10}}  onPress={()=>this.addToFavorite()} >
                  <MaterialIcons size={20} name="favorite-border"/>
                  <Text>{this.state.video.views} Likes </Text>
              </Button>
            )
        }
  }

  getAuthUser = ()=>{
    var user = firebase.auth().currentUser;
    if (user) {
     return user.uid
    } else {
        return null;
    }
}

updateUserFavs = (newData)=>{
  firebase.database().ref("users/user-"+this.getAuthUser()).update({
      favs: JSON.stringify(newData)
  })
}

addToStorage =async(favs)=>{
  await AsyncStorage.setItem('favorite',JSON.stringify(favs));  
  this.setState({isInFavorite:true});
}

getUserComment = () =>{
      //console.log(this.props.navigation.state.params.data.key);
        addComment(this.props.navigation.state.params.data.key,this.state.comment);
}

getAllComments =()=>{
          let data = this.props.navigation.state.params.data.key;
          let videoId= data.split(":");
          firebase.database().ref('videos/'+videoId[0]+'/'+videoId[1]+'/comments').limitToLast(10).on('value',snapshot => {
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
              console.log(tempData);
             this.setState({comments: tempData});
            })
}




// addToLikes(){
//   let keys = this.state.video.key.split(":");
//   firebase.database().ref('videos/'+keys[0]+'/'+keys[1]).update({ views: video.params.data.val.views+1 });
//  // console.log(keys);

// }



  addToFavorite = ()=>{
    console.log(this.state.video.key);
    // this.addToLikes();
     firebase.database().ref('/users/user-'+this.getAuthUser()).once('value',snapshot => {
       if(JSON.parse(snapshot.val().favs).length == 0){
            let myfav = [];
            myfav.push(this.state.video.key)              
            this.updateUserFavs(myfav);
            this.addToStorage(myfav);
            ToastAndroid.showWithGravityAndOffset(
              'Video Added to favorite',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              120
            );
       }else{
        let favs = JSON.parse(snapshot.val().favs);
     
          //let setUpFavs =[];
          favs.unshift(this.state.video.key);
          
          this.updateUserFavs(favs);
          this.addToStorage(favs);
          ToastAndroid.showWithGravityAndOffset(
            'Video Added to favorite',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            120
          );
      
       }
      
       
    })

}


displayComments = () =>{
  const comments = this.state.comments.map(com =>{
        commentKey  = com.key.split("-");
        //let mData =[];
        // await firebase.database().ref('users/user-'+commentKey[0]).once('value', snapshot=>{
        //     let image = snapshot.val().profile_picture;
        //     let name = snapshot.val().name;
        //     mData.push([image,name]);
        // })
        console.log(com);
         if(commentKey[0] === firebase.auth().currentUser.uid ){
            return (
              <View style={styles.allComment} key={com.key}>
                  <View style={styles.ownCom}>
                  <Text style={{fontSize:10,color:'white', alignSelf:"flex-end"}}>{com.val.username}</Text>
                  <Text style={{fontSize: 12, color:'white', marginLeft:10 }}>{com.val.comment}</Text>
                  </View>
                  <Image style={{width: 30, height:30, borderRadius: 30/2}} source={{uri: com.val.profile_picture}}/>
              </View>
            );
           
         }else{
           return (
              <View style={styles.allComment} key={com.key}>
                  <Image style={{width: 30, height:30, borderRadius: 30/2}} source={{uri : com.val.profile_picture}}/>
                  <View style={styles.comment}>
                  <Text style={{fontSize:10, alignSelf:"flex-start"}}>{com.username}</Text>
                  <Text style={{fontSize: 12,marginRight:10 }}>{com.val.comment}</Text>
                  </View>
              </View>
          );
          
           
         }
       
  })
  return comments;  
}

  // lovedVideo = () =>{
  //  let result =  userLoveVideo(video.params.data.val.url , video.params.data.val.loved);
  // }

  render() {
    return (
      <Container>
          <Header>
      <Left>
        <Button transparent onPress={()=> this.props.navigation.goBack()}>
          <MaterialIcons size={24}  color={'#fff'} name="chevron-left" />
        </Button>
      </Left>
      <Body>
        <Title>Watch Video</Title>
      </Body>
      <Right>
      <Button transparent onPress={()=> this.lovedVideo()}>
          <MaterialIcons size={20}  color={'#fff'} name="favorite-border" />
        </Button>
        
      </Right>
    </Header>
        <Content >
        <StatusBar backgroundColor="#000" barStyle="light-content" />
         
          {this.loadVideo()}


          <ScrollView style={styles.commentContainer}>
             
            {this.displayComments()}
              
          </ScrollView>


          
          
        </Content>
        <View>
        <Item rounded>
            <Input style={{height:40, width:Dimensions.get('window').width/2}} onChangeText={(value)=>this.setState({comment: value})} small placeholder='Icon Alignment in Textbox'/>
            <Icon onPress={()=>this.getUserComment()} style={{color:'gray'}} active name='send' />
          </Item>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
    width:'100%'
  },
  commentContainer: {
    flex: 1,
  },
  allComment:{
    padding:10,
    flexDirection: 'row',
    marginRight:10,
    width:'100%'
  },
  comment: {
    padding:5,
    backgroundColor:'#E8F3FF',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    width:'90%',
  },
  ownCom : {
    padding:5,
    backgroundColor:'#3588EB',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    width:'90%',
  }
})

export default VideoDetails;



