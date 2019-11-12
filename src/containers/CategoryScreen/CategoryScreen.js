import React from "react";
import { AppRegistry, Alert,StyleSheet,BackHandler, View , Image, Text, TouchableOpacity,Share,ActivityIndicator,StatusBar} from "react-native";
import { Container, Header, Left, Body, Title, Card, CardItem, Content, Right, Icon, Button } from "native-base";
import { StackNavigator } from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firebase from 'react-native-firebase';


import Admob from '../../components/Admob/Admob';

export default class CategoryScreen extends React.Component {

  constructor(props){
       super(props)

       this.state = {
        navParam : null,
        items: [],
        isFetching:true,
        title:"Category Details"
    }
  }

  

  handleBackPress = () => {
    alert("Hello World");
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }



  async componentDidMount() {
    //BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  
  
    //console.log();
    //let cats = this.state.navParam.params.data.key.split(':');
    //console.log(this.props.navigation.state.params.data.value);
        firebase.database().ref('/videos/'+this.props.navigation.state.params.data.value).on('value',snapshot => {  
            let newArr =[];
            console.log(snapshot.val());
            snapshot.forEach(function(child){
              var key = snapshot.key+":"+child.key;
              var value = child.val();
              var childSingle ={
                key:key,
                val:value
              }
              newArr.push(childSingle);
          });
            this.setState({items:newArr, isFetching:false});
        })

        // console.log(this.state.items)

  }



  loadData = () =>{
    if(this.state.isFetching==true){
      return (
        <View 
        style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={50} style={{width: 100, height: 100,  }} />
          <Text>Loading.. Please wait..</Text>
        </View>
      )
    }else{
       
      return(
        this.state.items.map(category=>{
         // console.log(category.val.key);
          return (
            <View key={category.val.key}>
            <TouchableOpacity style={styles.categoryItem} key={category.key} onPress={()=>this.props.navigation.navigate("VideoDetails",{data:category.val})}>
                <Image style={{width:150,height:100,borderBottomWidth:3, borderColor:'green'}} source={{uri:category.val.image}}/>
                <View style={{flexDirection:'column', padding:10,flexWrap:'wrap'}}>
                    <Text style={{flex:1,flexWrap:'wrap'}}>{category.val.title}</Text>
                    <Button small transparent  onPress={()=>this.shareWithOthers()}>
                        <MaterialIcons color="green" name="share" size={20}/>
                        <Text style={{color:'green', marginLeft:5}}>Share</Text>
                    </Button>
                </View>

            </TouchableOpacity>
            <View style={styles.separator}>

            </View>
           
            </View>
        )
        })
        
      )
    }
  }

  shareWithOthers = ()=>{
    Share.share({
        message: 'https://play.google.com/store/search?q=fun%20V&hl=en',
        url: "https://play.google.com/store/search?q=fun%20V&hl=en",
        title: 'Trending GH Videos'
      }, {
        // Android only:
        dialogTitle: 'Share With Friends',
      })
  }
  render() {
    return (
      <Container>
          <Header>
      <Left>
        <Button transparent onPress={()=> this.props.navigation.goBack()}>
          <MaterialIcons color="#fff" size={24} name="chevron-left" />
        </Button>
      </Left>
      <Body>
        <Title> {this.props.navigation.state.params.data.title} </Title>
      </Body>
      <Right />
    </Header>
        <Content  >
        <StatusBar barStyle="light-content" />
            

            {this.loadData()}


        </Content>
      </Container>
    )
  }
}


const styles = StyleSheet.create({
    categoryItem:{
        flexDirection:'row',
        marginTop:5,
        marginBottom:5,
        marginLeft:10,
        
    },
    separator:{
        borderBottomWidth: 0.5,
        borderBottomColor:'#888'
    }
})



