import React from "react";
import { AppRegistry, Alert, View, Image ,Text,StyleSheet, TouchableOpacity,ActivityIndicator, AsyncStorage, StatusBar} from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button,  } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-crop-picker';
import LoadingDialog from '../../components/Loading/Loading';
//import {db} from '../../config/db';
// import { getAuthUser } from '../../services/UserService';
 import { updateUser } from '../../services/UserService';

// import { getUserFromDB } from '../../services/UserService';


export default class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state ={
      profileImage:null,
      name: null,
      email: null,
      phone:null,
      loading:false,
      isFetching: true,
      
    }
  }
 

  componentDidMount () {
         //this.getFromStorage();
     this.getUserFromDB();
  }

  getAuthUser = ()=>{
    var user = firebase.auth().currentUser;
    if (user) {
      //console.log(user);
     return user.uid
    } else {
        return null;
    }
  }

  getFromStorage = async() =>{
      let data = JSON.parse(await AsyncStorage.getItem('userdetails'));
      if(data != null){
        this.setState({email:data.email, phone:data.phone,profileImage:data.profile_picture,name:data.name})
      }else{

      }
  }

  getUserFromDB = async()=>{
    firebase.database().ref("users/user-"+getAuthUser()).on('value',async(snapshot)=>{
      console.log(snapshot.val());
            let userdetails = {
              userId: snapshot.val().userId,
              name: snapshot.val().name,
              email: snapshot.val().email,
              phone: snapshot.val().phone,
              profile_picture: snapshot.val().profile_picture
          }


          await AsyncStorage.setItem("userdetails",JSON.stringify(userdetails));
          this.getFromStorage();
          this.setState({isFetching: false});
    });
  }




  changeProfilePhoto = ()=>{
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    //   }).then(image => {
    //   console.log(image);
    //   })
    //   .catch(err => {
    //   //Error
    //   console.log(err)
    //   });
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({loading:true})
      let userId = this.getAuthUser();
      firebase.storage()
      .ref('/users/user_'+userId+'.jpg')
      .putFile(image.path)
      .then(uploadedFile => {
      
          updateUser(userId, uploadedFile.downloadURL);
          this.getUserFromDB();
          this.setState({loading:false})
          alert('Profile picture updated successfully');
      })
      .catch(err => {
          //Error
          alert(JSON.stringify(err))
      });     
    });
  }





  renderUserDetails = () =>{
         if(this.state.isFetching){
                    return (
                      <View 
                      style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <ActivityIndicator size={50} style={{width: 100, height: 100,  }} />
                        <Text>Loading.. Please wait..</Text>
                      </View>
                    )
         }else{
                    return (
                      <View>
                      <View style={{justifyContent:'center',alignItems:'center', padding:10}}>
                      <Image style={{width:100, height:100,borderRadius: 100/2}} source={this.state.profileImage==null?require('../../assets/user.jpg'):{uri:this.state.profileImage}}/>

                      
                        {/* <MaterialIcons style={{position:'absolute',backgroundColor:'rgba(23,45,115,0.8)',borderRadius:10,padding:5, color:'#fff', top: 70,justifyContent:'center',alignItems:'center', left:120}} size={25} name="border-color" />
                      */}
                      <TouchableOpacity onPress={()=>this.changeProfilePhoto()} style={{backgroundColor:'rgba(23,45,115,0.8)', padding:5, borderRadius:5, flexDirection:'row'}}>
                        <MaterialIcons color="#fff" name="insert-photo" size={20}/>
                        <Text style={{color:'#fff', marginLeft:10}}>Change Profile Photo</Text>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <View style={styles.profileData}>
                      <MaterialIcons size={20} name="person" style={{marginLeft:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                        <Text>FULL NAME</Text>
                        <Text>{this.state.name}</Text>
                        </View>
                      
                      </View>

                      <View style={styles.profileData}>
                      <MaterialIcons size={20} name="mail" style={{marginLeft:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                        <Text>FULL NAME</Text>
                        <Text>{this.state.email}</Text>
                        </View>
                      </View>

                      <View style={styles.profileData}>
                      <MaterialIcons size={20} name="phone" style={{marginLeft:10, marginRight:10}}/>
                        <View style={{marginLeft:10}}>
                        <Text>PHONE NUMBER</Text>
                        <Text>{this.state.phone}</Text>
                        </View>
                      
                      </View>
                    </View>
                    </View>
                    )
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
        <Title>Profile</Title>
      </Body>
      <Right>
      {/* <Button transparent onPress={()=> this.props.navigation.openDrawer()}>
          <MaterialIcons color="#fff" name="border-color" />
        </Button> */}
      </Right>
    </Header>
        <Content padder>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <LoadingDialog loading={this.state.loading}/>
          
          {this.renderUserDetails()}
         
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
   profileData:{
     paddingTop:10,
     paddingBottom:10,
    
     alignItems:'center',
     flexDirection:'row',
     borderBottomWidth: 0.5,
     borderBottomColor:'#888'
   }
})



