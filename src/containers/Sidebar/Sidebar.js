import React from "react";
import { AppRegistry, Image, StatusBar,ImageBackground, AsyncStorage , View} from "react-native";
import { Container, Content, List, ListItem ,Icon,Text} from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const routes = [
    {id: 1, name: "Home", icon: "home"},
    {id: 2, name: "Images", icon:"image"},
    {id: 3, name: "Profile", icon: "person"},
    {id: 4, name: "Favorite",  icon: 'favorite'},
    // {id: 5, name: "Settings", icon: "settings"},
    {id: 6, name: "Logout", icon: "reply"},
    
    ];


export default class SideBar extends React.Component {

  state ={
    email:"John@gmail.com",
    name:"John Doe",
    phone:"0204052513",
    profileImage:null

  }

  componentDidMount(){
    this.getFromStorage()
  }

  navigateDrawer = async(option) =>{
    switch(option){
        case "Home":
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate(option);
              break;
        case "Images":
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate(option);
              break;
        case "Profile":
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate(option);
              break;
        case "Favorite":
              this.props.navigation.closeDrawer();
              this.props.navigation.navigate(option);
              break;
        case "Logout":
              this.props.navigation.closeDrawer();
              await AsyncStorage.removeItem("loggedIn");
              await AsyncStorage.removeItem("userdetails");
              this.props.navigation.navigate('Auth');
              break;
      }
  }
//   getAuthUser = ()=>{
//     var user = firebase.auth().currentUser;
//     if (user) {
//       console.log(user);
//      return user.uid
//     } else {
//         return null;
//     }
//   }

  getFromStorage =async ()=>{
    let data = JSON.parse(await AsyncStorage.getItem('userdetails'));
    if(data != null){
      this.setState({email:data.email, phone:data.phone,profileImage:data.profile_picture,name:data.name})
    }
  }


  checkProfileImage = ()=>{
    if(this.state.profileImage==null || this.state.profileImage =="NULL"){
      return (
        <Image style={{width:70,marginTop:15, height:70,borderRadius: 70/2, marginLeft:15}} 
        source={require('../../assets/user.jpg')}/>
      )
    }else{

      return (
        <Image style={{width:70,marginTop:15,borderColor:'#fff',borderWidth:5, height:70,borderRadius: 70/2, marginLeft:15}} 
        source={{uri:this.state.profileImage}}/> 
      )

    }
  }

 
  
  render() {
    return (
       <Container>
        <Content>
          <StatusBar barStyle="light-content" />
          <ImageBackground
            source={require('../../assets/sidebar.jpg')}
    
            style={{
              height: 150,
              alignSelf: "stretch",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              
            }}>
            <View style={{width:'100%',flex:1,backgroundColor:'rgba(52, 52, 52, 0.8)'}}>
           
                              <View>
                                 {this.checkProfileImage()}
                               <Text style={{color:'#fff',fontSize:20,marginLeft:15}}>{this.state.name}</Text>  
                               <Text style={{color:'#fff',marginLeft:15}}>{this.state.email}</Text>  
                               </View>
                               
                                  
            
                         
            </View>
          </ImageBackground>

       
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  noBorder
                  key={data.id}
                  onPress={() => this.navigateDrawer(data.name)}>
                  <MaterialIcons name={data.icon} size={20}  />
                  <Text style={{marginLeft: 10}} >{data.name}</Text>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    );
  }
}
