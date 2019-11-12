import React from "react";
import { StatusBar, StyleSheet, View, ImageBackground ,Text,ScrollView,Alert} from "react-native";
import { Container, Header, Title, Left, Right,Label, Button, Body, Content, Card, CardItem, Item,Input,Icon } from "native-base";
import firebase from 'react-native-firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {addUser} from '../../services/UserService';
import {emailValidator,phoneNumberValidator} from '../../utility/generalValidations';
import LoadingDialog from '../../components/Loading/Loading';

class RegisterScreen extends React.Component {



    state={
        user:{
            name:null,
            phone: null,
            email:"null",
            password: null
        },
        loading:false
    }


    

    setValue =(key, value)=>{
        let user = Object.assign({}, this.state.user); 
        switch(key){
            case 'name':
                  //creating copy of object
                user.name = value;                        //updating value
                this.setState({user});
            break;
            case 'phone':
                //let user = Object.assign({}, this.state.user);    //creating copy of object
                user.phone = value;                        //updating value
                this.setState({user});
            break;
            case 'email':
                //let user = Object.assign({}, this.state.user);    //creating copy of object
                user.email = value;                        //updating value
                this.setState({user});
            break;
            case 'password':
                //let user = Object.assign({}, this.state.user);    //creating copy of object
                user.password = value;                        //updating value
                this.setState({user});
            break;
        }
    }
    validateName= ()=>{
        //const isValid = false;
        if(this.state.user.name == null){
           return false;
        }else{
            return true;
        }

    }

    validateEmail = () =>{
        if(emailValidator(this.state.user.email).isEmpty){
            //alert("Email is required")
            return false;
        }else if(emailValidator(this.state.user.email).isValid==false){
            //alert("Please enter a valid email address")
            return false
        }else{
            return true;
        }
    }

    validatePhone = ()=>{
        if(phoneNumberValidator(this.state.user.phone).isEmpty){
            alert("Phone Number is required");
            return false
        }else if(phoneNumberValidator(this.state.user.phone).isValid == false){
            alert("Invalid Phone Number")
            return false
        }else{
            return true
        }
    }

    registerUser = () =>{

        let isNameValid = this.validateName();
        let isEmailValid = this.validateEmail();
        let isPhoneValid = this.validatePhone();
        //let isPasswordEmpty = this.validatePassword();

        if(isNameValid ==false){
                alert("Name is required");
        }else if(isEmailValid ==false){
                alert('Invalid Email Address');
        }else if(isPhoneValid ==false){
                // alert("Phone number is required");
        }else if(this.state.user.password==null){
            alert("Please enter password")
        }else{
            this.setState({loading:true});
            let userdetails = JSON.stringify(this.state.user);
            firebase.auth().createUserWithEmailAndPassword(this.state.user.email, this.state.user.password)
            .then((user) => {
                  
                    const details = {
                        auth: user.user,
                        data: this.state.user
                    }
                    let theresult = addUser(details);
                    //console.log(user.user.uid);
                    if(theresult =='OK'){
                        this.setState({loading:false});
                        Alert.alert(
                            'Registration Successful',
                            'Kindly SignIn into your account for amazing experience',
                            [
                              {text: 'Cancel', onPress: () => this.props.navigation.goBack()},
                              {text: 'OK', onPress: () => this.props.navigation.goBack()},
                            ],
                            { cancelable: false }
                          )
                    }else{
                        this.setState({loading:false});
                    }
                  
                   
                 
                //alert(JSON.stringify(user));

                
            })
            .catch((error) => {
            const { code, message } = error;
            // For details of error codes, see the docs
            // The message contains the default Firebase string
            // representation of the error
            alert(code);
            alert(message);
            });
        }

        
    }

    
  render() {
    return (
      <Container>
    

        <Content  contentContainerStyle={styles.container}>
        <LoadingDialog loading={this.state.loading}/>
        <StatusBar barStyle="light-content" />
            <ImageBackground source={require('../../assets/bg.jpg')} style={styles.container}>
             
               <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{justifyContent: 'center',backgroundColor: 'rgba(52, 52, 52, 0.8)', flex:1,}}>
                <View style={styles.introText}>
                    <Text style={{color:'#fff', fontSize: 30,fontFamily:'sans-serif'}}>Trending</Text>
                    <Text style={{color: '#fff'}}>With you account, you have access to funny videos across Ghana and beyound</Text>
                </View>

                <View style={styles.textInput}>
                    <Item>
                        <MaterialIcons active size={22} name='person' />
                        <Input placeholder='Full Name'  
                               onChangeText={(value)=>this.setValue('name',value)}/>
                    </Item>
                </View>

                <View style={styles.textInput}>
                    <Item>
                        <MaterialIcons active size={22} name='phone' />
                        <Input placeholder='Phone Number' 
                               keyboardType="numeric"
                               onChangeText={(value)=>this.setValue('phone',value)}/>
                    </Item>
                </View>

                <View style={styles.textInput}>
                    <Item>
                        <MaterialIcons active size={22} name='email' />
                        <Input placeholder='Email Address'
                               keyboardType="email-address"
                               onChangeText={(value)=>this.setValue('email',value)} />
                    </Item>
                </View>
                    
               <View style={styles.textInput}>
                    <Item>
                        <MaterialIcons  size={22} name='lock' />
                        <Input placeholder='Password'
                               keyboardType="default"
                               secureTextEntry={true}
                               onChangeText={(value)=>this.setValue('password',value)}/>
                    </Item>
               </View>

               <View style={{marginLeft:10, marginRight:10}}>
                   <Button block success onPress={()=>this.registerUser()}>
                       <Text style={{color:'#fff'}}>REGISTER</Text>
                   </Button>
               </View>

               <View style={{marginLeft:10, marginRight:10, flexDirection:'row', marginTop: 30, alignItems: 'center',}}>
                   <Text style={{color:'#fff'}} >Already have an Account? </Text>
                   <Button small block rounded  style={{flex: 1,}} onPress={()=>this.props.navigation.goBack()}>
                       <Text style={{color:'#fff'}}>LOGIN</Text>
                   </Button>
               </View>
               {/* </View> */}
               
               </ScrollView>  

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
    },
    introText:{
        alignItems:'center',
        justifyContent: 'center',
        padding:10,
        marginBottom: 30,
    }
})




export default RegisterScreen;
