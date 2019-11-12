import React, { Component } from "react";
import {Easing , Animated} from 'react-native';
import { Root } from 'native-base';
import { DrawerNavigator,createDrawerNavigator,createSwitchNavigator, createStackNavigator,SwitchNavigator ,StackNavigator  } from "react-navigation";

import HomeScreen from "./containers/HomeScreen/HomeScreen";
import LoginScreen from './containers/LoginScreen/LoginScreen';
import SideBar from "./containers/Sidebar/Sidebar";
import RegisterScreen from "./containers/RegisterScreen/RegisterScreen";
import AuthLoadingScreen from './containers/AuthLoadingScreen/AuthLoadingScreen';
import ProfileScreen from './containers/ProfileScreen/ProfileScreen';
import VideoDetails from "./containers/VideoDetails/VideoDetails";
import FavoriteScreen from "./containers/FavoriteScreen/FavoriteScreen";
import Categories from './containers/CategoryScreen/CategoryScreen';



const HomeScreenRouter = createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: {screen: ProfileScreen},
    Favorite: {screen: FavoriteScreen},
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "green"
    },
    contentComponent: props => <SideBar {...props} />
  }
);


const AppStack = createStackNavigator(
        {
            Drawer: { screen: HomeScreenRouter },     
            VideoDetails: {screen: VideoDetails},
            Categories: {screen: Categories}
        },
        {
          initialRouteName: "Drawer",
          headerMode: "none"
        }
      );

const AuthStack = createStackNavigator(
            {
              Login : {screen: LoginScreen},
              Register: {screen: RegisterScreen}
              
          },
          {
            initialRouteName: "Login",
            headerMode: "none",
            mode:'modal'
          });



const AppNavigator = createSwitchNavigator(
          {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack,
          },

          {
            initialRouteName: 'AuthLoading',
          }
        );

export default () =>
  <Root>
    <AppNavigator />
  </Root>;

// export default HomeScreenRouter;
