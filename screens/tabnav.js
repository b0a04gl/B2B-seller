
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors, fonts } from '../theme'
import { AddProductStackNavigator,ChatStackNavigator,ProfileStackNavigator } from "./stacknav";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator

    tabBarOptions = {
      {
          showLabel: true,
          activeTintColor: colors.primary,
          inactiveTintColor: colors.secondary,
          indicatorStyle: { backgroundColor: colors.secondary },
          labelStyle: {
            fontFamily: fonts.base,
            fontSize: 15
          },


        }
    }

        style = {
          {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            paddingBottom: 3
          }
        }



    >
      <Tab.Screen name="AddProduct" component={AddProductStackNavigator}
      options={{
      tabBarLabel: 'Add Product',
      tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="layers-plus" color={colors.primary} size={size} />
      ),
    }}
       />

      <Tab.Screen name="Chat" component={ChatStackNavigator}
      options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="chat-processing" color={colors.primary} size={size} />
                ),
              }}

      />
      <Tab.Screen name="Profile" component={ProfileStackNavigator}
      options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={colors.primary} size={size} />
                ),
              }}
       />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
