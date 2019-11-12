import React from "react";
import { AppRegistry, Alert ,View,Text, AsyncStorage, Image, Share, TouchableOpacity, StatusBar, ActivityIndicator} from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button } from "native-base";
import { StackNavigator } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';

import LoadingDialog from '../../components/Loading/Loading';

class FavoriteScreen extends React.Component {

 constructor(props){
     super(props);
     this.state = {
        favoriteVideos:[],
        theVideos :[],
        isFetching: true,
        loading: false,
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
  componentDidMount() {
    //Alert.alert("No Users Found", "Oops, Looks like you are not signed in");
    this.getFavoriteVideos(1);
    //this.getVideos();
   //console.log(this.state.theVideos);
  }

  shareWithOthers = ()=>{
    Share.share({
        message: 'Hello, this is a great payment platform. Try and use it for all your payment services',
        url: 'https://www.elcutopay.com',
        title: 'Elcuto Pay'
      }, {
        // Android only:
        dialogTitle: 'Share With Friends',
      })
  }
  deleteFromFav = (videoId)=>{
     // alert(videoId)
    Alert.alert(
        'Remove Video',
        'Are you sure? Action cannot be undone!',
        [
         
          {text: 'No Cancel',onPress: ()=>this.cancelAction(), style: 'cancel'},
          {text: 'Yes Remove', onPress: () => {
              this.setState({loading:true});
              firebase.database().ref('users/user-'+this.getAuthUser()).once('value', async(snapshot)=>{
                  let userFavs = JSON.parse(snapshot.val().favs);
                  var index = userFavs.indexOf(videoId);
                  if (index > -1) {
                    userFavs.splice(index, 1);
                    await AsyncStorage.setItem('favorite', JSON.stringify(userFavs));
                    firebase.database().ref("users/user-"+this.getAuthUser()).update({
                            favs:JSON.stringify(userFavs)

                    }, ()=>{

                        this.getFavoriteVideos(0);
                        this.setState({loading:false});
                    });
                  }

              })
          }},
        ],
        { cancelable: false }
      )
  }

  getFavoriteVideos = async(action) =>{

        //  const vids = await AsyncStorage.getItem('favorite');
        
        //  if(vids != null){
        //     // alert("No null")
        //      let favoriteVideos =JSON.parse(vids);
        //      //console.log(favoriteVideos)
        //         this.setState({favoriteVideos:favoriteVideos});
        //         let allFav = [];
        //         for(let i=0;i<favoriteVideos.length;i++){
        //             let keys = favoriteVideos[i].split(':');
        //             let key1 = keys[0];
        //             let key2 = keys[1];
        //             await firebase.database().ref('videos/'+key1+'/'+key2).on('value',snapshot=>{
        //                 console.log(snapshot.val());
        //                 let val = snapshot.val();
        //                 // let vals = {
        //                 //     key:key1+":"+key2,
        //                 //     val:value
        //                 // }
        //                 this.setState(prevState => ({
        //                     theVideos: [...prevState.theVideos, val]
        //                   }));
        //                 //allFav.push(value);
        //             });
        //         }
        //        // console.log(allFav[0])
        //         this.setState({isFetching:false});
                

        //  }else{
             firebase.database().ref('users/user-'+this.getAuthUser()).once('value',async(snapshot)=>{
                 let userFavs = JSON.parse(snapshot.val().favs);

              if(userFavs.length > 0){
                 for(let i=0;i<userFavs.length;i++){
                     let keys = userFavs[i].split(':');
                     let key1 = keys[0];
                     let key2 = keys[1];
                     await firebase.database().ref('videos/'+key1+'/'+key2).on('value',snapshot=>{
                         console.log(snapshot.val());
                         let val = snapshot.val();
                         // let vals = {
                         //     key:key1+":"+key2,
                         //     val:value
                         // }
                         if(action ==1){
                            this.setState(prevState => ({
                                theVideos: [...prevState.theVideos, val]
                              }))
                         }else{
                             this.setState({theVideos: val});
                         }
                         
                        
                     });
                 }

                 this.setState({isFetching: false})
                }else{
                    this.setState({isFetching: false, theVideos:[]})
                }
             })
            
         //}
  }

  clearFavorite=()=>{
    Alert.alert(
        'Clear Favorite Videos',
        'Are you sure you want to clear all your favorite videos',
        [
         
          {text: 'No Cancel',onPress: ()=>this.cancelAction(), style: 'cancel'},
          {text: 'OK', onPress: () => this.clearStore()},
        ],
        { cancelable: false }
      )
     
  }

  deleteUserFavs = ()=>{

    firebase.database().ref("users/user-"+this.getAuthUser()).update({
        favs: '[]'
    })
  }

  clearStore = async()=>{
        
        await AsyncStorage.removeItem("favorite").then(success=>{
            this.deleteUserFavs();
            this.setState({theVideos:[]});
           
        });
        
  }

  cancelAction = ()=>{
        alert("Action cancelled. Your data is safe.")
  }


  loadFavVideos = () =>{
    if(this.state.isFetching==true){
        return (
          <View 
          style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={50} style={{width: 100, height: 100,  }} />
            <Text>Loading.. Please wait..</Text>
          </View>
        )
      }else{
         //console.log(this.state.theVideos);
            if(this.state.theVideos.length == 0){
                    return (
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                                <Text>No Favorite Videos. Open a video and tap </Text>
                                <MaterialIcons size={20} name ="favorite"/>
                        </View>
                    )
            }else{
                const allMyFavorite = this.state.theVideos.map(item=>{
                    //console.log(item);
                    return(
                        <TouchableOpacity key={item.key} onPress={()=>this.props.navigation.navigate("VideoDetails",{data:item}
                        )}>
                            <Card style={{elevation:1}} >
                            <Image style={{width:'100%', height:200}} source={{uri:item.image}}/>
                            <View>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                <Button transparent style={{padding:10}} onPress={()=>this.shareWithOthers()} >
                                    <MaterialIcons name="share" size={20}/>
                                    <Text style={{marginLeft:10}}>Share</Text>
                                </Button>
            
                                <Button transparent  style={{padding:10}} onPress={()=>this.deleteFromFav(item.key)} >
                                    <MaterialIcons color="red" name="delete" size={20}/>
                                    <Text style={{marginLeft:10,color:"red"}}>Remove</Text>
                                </Button>
                                </View>
                                
                                <Text style={{margin:10}}>{item.title}</Text>
                            </View>
                           </Card>
                        </TouchableOpacity>
                        
                    )
                });

                return allMyFavorite;
            }
      }
  }




  render() {

    return (
      <Container>
          <Header>
      <Left>
        <Button transparent onPress={()=> this.props.navigation.openDrawer()}>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Favorite Videos</Title>
      </Body>
      <Right>
          <Button transparent onPress={this.clearFavorite}>
              <MaterialIcons name="delete" size={20} color="#fff"/>
          </Button>
      </Right>
    </Header>
        <Content>
        <StatusBar barStyle="light-content" />

         <LoadingDialog loading={this.state.loading}/>
      
                    {this.loadFavVideos()}
          
        </Content>

    
      </Container>
    );
  }
}


export default FavoriteScreen;



