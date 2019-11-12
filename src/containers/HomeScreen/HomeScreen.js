import React from "react";
import { StatusBar,NetInfo, View, Text, Image ,TouchableOpacity,ActivityIndicator,ScrollView} from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem } from "native-base";
import firebase from 'react-native-firebase';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import LoginScreen from "../LoginScreen/LoginScreen";
import VideoItem from '../../components/VideoItem/VideoItem';
import Admob from "../../components/Admob/Admob";


const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foobar');

//024 355 4561

class HomeScreen extends React.Component {

    constructor() {
        super();
        this.unsubscriber = null;
        this.state = {
          user: null,
          items:[],
          isConnected:null,
          isloading:true,
          isFetching: true,
          isConnected: true,
        };
        this.isNetworkAvailable();
    }
    
  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
    if(this.state.isConnected){
          firebase.database().ref('/videos').on('value',snapshot => {
                  var newArra = [];
                  snapshot.forEach(function(child){
                  var key = child.key;
                  var value = child.val();
                  var theVal = Object.assign([], value).reverse();
                  var childSingle ={
                      key:key,
                      val:theVal
                  }
                  newArra.push(childSingle);
              
                  });
                  this.setState({items: newArra});
                  this.setState({isFetching: false});
          })
    }else{
      this.setState({isConnected:false})
    }
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }



  isNetworkAvailable(){
    NetInfo.isConnected.fetch().then(isConnected => {
       if(isConnected){
          this.setState({isConnected:isConnected});
       }else{
          this.setState({isConnected:false});
       }
    });
  }



   openDrawer = () =>{
    this.props.navigation.openDrawer();
   }
   navigateToVideo =(route)=>{
    const pushAction = StackActions.push({
      routeName: route,
      params: {
        myUserId: 9,
      },
    });
    this.props.navigation.dispatch(pushAction);
   }

   refresh = ()=>{
     this.isNetworkAvailable();
     if(this.state.isConnected ==true){
        this.setState({isFetching:true});
        this.loadingdata();
     }else{
       this.setState({isFetching: false});
     }
    
   }

   loadingdata = ()=>{

    if(this.state.isConnected ==true){
      if(this.state.isFetching==true){
        return (
 
         <ActivityIndicator
                  size={60}
                  style={{alignSelf:'center'}}
                  animating={true} />
        )
      }else{
       
            return(
              <ScrollView >
              {this.state.items.map(category=>{
                    return (
                      <View>
                     <Card style={{elevation:0,marginLeft:0, width:'100%'}} key={category.key}>
                     <Text style={{marginLeft:20,marginTop:10, fontSize: 16, color:'#0096ff'}}>{ category.key.charAt(0).toUpperCase() + category.key.slice(1) }</Text>
                      <CardItem>
                       <ScrollView horizontal={true}  >
                      
                           {this.renderVideoItems(category.val)}
       
                        </ScrollView>
                      </CardItem>
                      <Button warning small 
                               onPress = {()=>this.props.navigation.navigate("Categories",{data:{title: category.key.charAt(0).toUpperCase() + category.key.slice(1)+" Videos",value:category.key}})}
                               style={{marginLeft:20,marginBottom:10,elevation:0, padding:10}}>
                              <Text style={{color:'white'}}>MORE</Text></Button>
                    </Card>
                    {/* <Banner
                          size={"LARGE_BANNER"}
                          unitId={"ca-app-pub-7121651625096716/7226104745"}
                          request={request.build()}
                          onAdLoaded={() => {
                            console.log('Advert loaded');
                          }}
                          onAdFailedToLoad={()=>{
                            console.log("Failed to load add");
                          }}
                        /> */}

                        <Admob unitId="ca-app-pub-7121651625096716/7421149042"/>
                    </View>
                    )
              })}
              </ScrollView>
            )
      }
    }else{

      return (
      
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text style={{alignSelf:'center'}}>No Network Connection</Text>
              <Button iconRight bordered onPress = {()=>this.refresh()} style={{alignSelf:'center', width:'50%', justifyContent:"center", alignItems:'center'}}>
                <Text style={{paddingLeft:10, alignItems:'center'}}> Retry </Text>
                <Icon name='arrow-forward' />
              </Button>
            </View>
      
      )
    }

   }


  renderVideoItems = (videos)=>{
        var catVideos = Object.values(videos);
        const vids = catVideos.map(item=>{
          return(
                <TouchableOpacity key={item.key}  onPress={()=>this.props.navigation.navigate("VideoDetails",{data:item})}>
                    <VideoItem data={item}/> 
                </TouchableOpacity>
              )
        });

    return vids;    
  }





  render() {

    if (!this.state.user) {
        return <LoginScreen />;
    }
   
    return (


        
        
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.openDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Trendy</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }} >
          
        <StatusBar backgroundColor="#000" barStyle="light-content" /> 

        {/* <ScrollView > */}

            {this.loadingdata()}

        {/* </ScrollView> */}
      
        </Content>
       
      </Container>
    );
  }
}




export default HomeScreen;
