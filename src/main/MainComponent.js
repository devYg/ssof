import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Root } from 'native-base';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Index from '../Index';

import BuyIndex from '../Buy/BuyIndex';

import SaleIndex from '../Sale/SaleIndex';

import StockIndex from '../Stock/StockIndex';

import BarcodeIndex from '../BarcodeComponent/BarcodeIndex';
import LogoutComponent from '../login/LogoutComponent';

//서랍
const Drawer = createDrawerNavigator(
    {
      Home: { screen: Index },
      입고: { screen: BuyIndex },
      출고: { screen: SaleIndex },
      재고: { screen: StockIndex },
      Logout: { screen: LogoutComponent }
      
    },
    {
      intialRouteName: 'Home',
      contentOptions: {
        // activeTintColor: "#e91e63",
        activeTintColor :'#ffffff',
        inactiveTintColor :'#1999CE',
        activeBackgroundColor :'#1999CE',
        inactiveBackgroundColor :'#ffffff',
      },
    }
);

const AppNavigator = createStackNavigator(
  {
    Drawer    : {screen:Drawer},

    Home      : { screen: Index },
    입고      : { screen: BuyIndex },
    출고      : { screen: SaleIndex },
    재고      : { screen: StockIndex },
    scan      : {screen: BarcodeIndex},
    Logout    : { screen: LogoutComponent },
  },
  {
    initialRouteName: "Drawer",
    headerMode:"none"
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;


