import React from 'react';

import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {StyleProvider} from "native-base";
import App from '../App';
import getTheme from "../../native-base-theme/components";
import variables from "../../native-base-theme/variables/commonColor";
// import AuthScreen from './authscreen';

// import LoginScreen from '../containers/LoginScreen/LoginScreen';
// import RegisterScreen from '../containers/RegisterScreen/RegisterScreen';

// import {connect } from 'react-redux';
// import {registerUser, loginUser} from '../store/actions/index';
// import HomeScreen from '../containers/HomeScreen/HomeScreen';


class Setup extends React.Component {

  
    state = {
      isReady: false,
      isFirstLoad : null,
    };
  
  componentDidMount() {
        
         this.setState({isReady: true});
  }


  render() {
    if (!this.state.isReady) {
      return(
        <View>
          <Text>Loading</Text>
        </View>
      )
    }

      return (
        <StyleProvider style={getTheme(variables)}>
          <App />
        </StyleProvider>
      );
    
    
    
   
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// const mapStateToProps = (state)=>{
//   return{
//     isLoggedIn: state.users.isLoggedIn,
//   }
   
// }

// const mapDispatchToProps =dispatch =>{
//     return { 

//         onUserregister: (userDetails)=>dispatch(registerUser(userDetails)),
//         onUserLogin: (userDetails)=>dispatch(loginUser(userDetails)),
       
//     }
// }



export default Setup;