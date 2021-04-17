import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import AddProduct from "./AddProduct";
import Catalogue from "./Catalogue";
import Chat from "./Chat";
import Lead from "./Lead";
import Orders from "./Orders";
import Profile from "./Profile";
import Quotation from "./Quotation";
import { colors, fonts } from '../theme'


const screenOptionStyle = {
  headerStyle: {
    backgroundColor: colors.primary,  elevation: 0,
  },
  headerTintColor: "white",
  headerTitleStyle: {
          fontFamily: fonts.base,
          fontSize: 25,
          alignSelf:'center'
        },
};


const Stack = createStackNavigator();


const TemplateStackNavigator = ({navigation,screenName,component}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>

    <Stack.Screen name={screenName} component={component}
    options={{

             headerTitleAlign: 'center',
             headerLeft: () => (
               <View style={{marginLeft: 10}}>
                 <Icon.Button
                   name="ios-menu"
                   size={25}
                   color='#fff'
                   backgroundColor={colors.primary}
                   onPress={() => navigation.openDrawer()}
                 />
               </View>
             ),
             headerRight: () => (
               <View style={{flexDirection: 'row', marginRight: 10}}>
                 <Icon.Button
                   name="ios-notifications"
                   size={25}
                   color='#fff'
                   backgroundColor={colors.primary}

                 />

               </View>
             ),

         }}

    />
    </Stack.Navigator>
  );
}






const AddProductStackNavigator = ({navigation}) => {
  return (
      <TemplateStackNavigator navigation = {navigation} screenName = "AddProduct" component = {AddProduct} />
    )
}


const CatalogueStackNavigator = ({navigation}) => {
  return (
      <TemplateStackNavigator navigation = {navigation} screenName = "Catalogue" component = {Catalogue} />
    )
}


const ChatStackNavigator = ({navigation}) => {
  return (
      <TemplateStackNavigator navigation = {navigation} screenName = "Chat" component = {Chat} />
    )
}


const LeadStackNavigator = ({navigation}) => {
  return (
      <TemplateStackNavigator  navigation = {navigation} screenName = "Lead" component = {Lead} />
    )
}


const OrdersStackNavigator = ({navigation}) => {
  return (
      <TemplateStackNavigator navigation = {navigation} screenName = "Orders" component = {Orders} />
    )
}


const ProfileStackNavigator = ({navigation}) => {
  return (
      <TemplateStackNavigator navigation = {navigation} screenName = "Profile" component = {Profile} />
    )
}

const QuotationStackNavigator = ({navigation}) => {
  return (
      <TemplateStackNavigator navigation = {navigation} screenName = "Quotation" component = {Quotation} />
    )
}


export {AddProductStackNavigator,CatalogueStackNavigator,ChatStackNavigator,LeadStackNavigator,OrdersStackNavigator,ProfileStackNavigator,QuotationStackNavigator};
