import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
// import {
//     AdMobBanner,
//     AdMobInterstitial,
//     PublisherBanner,
//     AdMobRewarded,
//   } from 'react-native-admob';
  

export default class Admob extends Component {
 constructor(props){
     super(props);
 }
  render() {
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    return (
      <View>
          <Banner
          unitId={this.props.unitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />
      </View>
    )
  }
}
