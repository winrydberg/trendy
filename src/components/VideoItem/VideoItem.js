import React, { Component } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right } from 'native-base';
export default class VideoItem extends Component {
  componentDidMount(){
    //console.log(this.props.data.image);
  }
  render() {
    
    return (
      
          <Card style={{elevation:0, width:(Dimensions.get('window').width)/2-(10)}}>
            {/* <CardItem style={{borderBottomColor:'#fff'}}> */}
            <Image style={{height:100, width: "100%", borderRadius: 2}} source={{uri: this.props.data.image}} />
             
               {/* <View> */}
               {/* </View>
                
                <View style={{marginLeft:10,flexWrap: 'wrap'}}> */}
                    <Text style={{flexWrap: 'wrap', padding: 10}}>{this.props.data.title}</Text>
                   
                {/* </View> */}
                

            {/* </CardItem> */}
         
            {/* <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem> */}
          </Card>
   
    );
  }
}