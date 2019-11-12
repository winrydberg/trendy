import React from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import firebase from 'react-native-firebase';


class AuthLoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,

    };
  
  }


  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      //salert(JSON.stringify(user))
      this.setState({
        loading: false,
        user,
      });
    });

    this._bootstrapAsync();
  }

  


// async componentDidMount() {
//     try {
//       const value = await AsyncStorage.getItem('@appStore:firstLoad');
//       if (value !== null){
//         this.props.navigation.navigate('App');
//       }else{
//           try {
//             await AsyncStorage.setItem('@appStore:firstLoad', 'Yes');
//             this.props.navigation.navigate('Auth');

//           } catch (error) {
//             alert("Error Setting Storage")
//           }
        
//       }
//     } catch (error) {
//       alert("Error Accessing Storage")
//     }
      
//   }


  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    //this.props.navigation.navigate('AppIntro');
 
            const userStatus = await AsyncStorage.getItem('loggedIn');
            if(userStatus != null){
              if (this.state.user) {
                this.props.navigation.navigate('App');
              }else{
                this.props.navigation.navigate('Auth');
              }
              
            }else{
              this.props.navigation.navigate('Auth');
            }
            
 

  }


  // Render any loading content that you like here
  render() {
    // if(this.state.loading)
    //     return(
    //       <LoadingDialog loading={false} />
    //     )
    // if(this.state.user)
    //     return (

    //     )

    

    return (
     
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        
        <ActivityIndicator size={50} style={{width: 100, height: 100}} color="#094b85" />
        <StatusBar barStyle="light-content" />
      </View>
 
    );
  }
}

const styles =StyleSheet.create({
   container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
   },
   logo:{
     width: 50,
     height: 50,
   },
   
   
  

})

export default AuthLoadingScreen;