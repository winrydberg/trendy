import React from "react";
import { StatusBar, StyleSheet, View, ImageBackground ,Text, AsyncStorage} from "react-native";
import { Container, Header, Title, Left, Right, Button, Body, Content, Card, CardItem, Item,Input,Icon } from "native-base";
import firebase from 'react-native-firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


//import {db} from '../../config/db';
import LoadingDialog from '../../components/Loading/Loading';


class LoginScreen extends React.Component {
 state = {
     user:{
         email:null,
         password: null
     },
     loading:false,
 }

 setValue = (key, value) =>{
        let user = Object.assign({}, this.state.user);      
        switch(key){
            case 'email':
                user.email = value;                        //updating value
                this.setState({user});
            break;
            case 'password':
                user.password = value;                        //updating value
                this.setState({user});
            break;
        }
 }

 loginUser = ()=>{
    if(this.state.user.email == null || this.state.user.email.length =="" ){
        alert("Email Adress is required")
        return;
    }
    if(this.state.user.password == null || this.state.user.password.length ==""){
        alert("Password is required");
        return;
    }

    this.setState({loading:true});
    firebase.auth().signInWithEmailAndPassword(this.state.user.email, this.state.user.password)
      .then(async(user) => {
       // console.log(user.user.uid);
        //this.setState({loading:false});
          firebase.database().ref("users/user-"+user.user.uid).on('value',async(snapshot)=>{
                   console.log(snapshot.val());
                   let userdetails = {
                       userId: snapshot.val().userId,
                       name: snapshot.val().name,
                       email: snapshot.val().email,
                       phone: snapshot.val().phone,
                       profile_picture: snapshot.val().profile_picture
                   }

                   await AsyncStorage.setItem('loggedIn','1');
                   await AsyncStorage.setItem("userdetails",JSON.stringify(userdetails));
                   this.setState({loading:false});
                   this.props.navigation.navigate('App');
                  
               });
         
     
      })
      .catch((error) => {
        this.setState({loading:false});
        const { code, message } = error;
        alert(message);
      });
    
 }
  render() {
    return (
      <Container>
        <Content  contentContainerStyle={styles.container}>
        <StatusBar barStyle="light-content" />
            
        <LoadingDialog loading={this.state.loading}/>

            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.container}>
               <View style={{backgroundColor: 'rgba(52, 52, 52, 0.8)', flex:1,justifyContent: 'center',}}>
               <View style={styles.textInput}>
                    <Item>
                        <MaterialIcons size={22} active name='mail' />
                        <Input placeholder='Email Address' 
                               onChangeText={(value)=>this.setValue('email',value)}/>
                    </Item>
                </View>
                    
               <View style={styles.textInput}>
                    <Item>
                        <MaterialIcons size={22} name='lock' />
                        <Input placeholder='Password'
                                secureTextEntry={true}
                                onChangeText={(value)=>this.setValue('password',value)}/>
                    </Item>
               </View>

               <View style={{marginLeft:10, marginRight:10}}>
                   <Button block success onPress={this.loginUser}>
                       <Text style={{color:'#fff'}}>LOGIN</Text>
                   </Button>
               </View>

               <View style={{marginLeft:10, marginRight:10, flexDirection:'row', marginTop: 30, alignItems: 'center',}}>
                   <Text style={{color:'#fff'}} >Don't have an Account? </Text>
                   <Button small block rounded  style={{flex: 1,}} onPress={()=>this.props.navigation.navigate('Register')}>
                       <Text style={{color:'#fff'}}>SIGN UP</Text>
                   </Button>
               </View>
               </View>
               
                    

           </ImageBackground>

        </Content>
      </Container>
    );
  }
}

const styles =StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        //alignItems: 'center',
    },
    textInput: {
        marginBottom: 20,
        marginLeft: 10,
        marginRight:10,
        paddingLeft:10,
        paddingRight:10,
        borderRadius: 5,
        backgroundColor: '#fff',
    }
})




export default LoginScreen;
