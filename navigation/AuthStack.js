import React, {useState, useEffect} from 'react';
import {View,Image,StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts } from '../theme'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36
  }
})


const SignInStack = () => {

  return (
    <Stack.Navigator >

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />

    </Stack.Navigator>
  );


};


const SignUpStack = () => {

  return (
    <Stack.Navigator >

    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{header: () => null}}
    />

    </Stack.Navigator>
  );


};


const AuthTab = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  }, []);

  if (isFirstLaunch === null) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch == true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (

    <Tab.Navigator

    tabBarOptions = {
      {
          showLabel: true,
          activeTintColor: colors.auth,
          inactiveTintColor: colors.secondary,
          indicatorStyle: { backgroundColor: colors.secondary },
          labelStyle: {
            fontFamily: fonts.base,
            fontSize: 12
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
      <Tab.Screen name="SignIn" component={SignInStack}
      options={{
      tabBarLabel: 'SignIn',
      tabBarIcon: ({ tintColor }) => (
              <Image
                source={require('../assets/signInButton.png')}
                style={[styles.icon, { tintColor }]}
              />
      ),
    }}
       />

      <Tab.Screen name="SignUp" component={SignUpStack}
      options={{
                tabBarLabel: 'SignUp',
                tabBarIcon: ({ tintColor }) => (
                        <Image
                          source={require('../assets/signUpButton.png')}
                          style={[styles.icon, { tintColor }]}
                        />
                      ),
              }}

      />

    </Tab.Navigator>

  );
};








export default AuthTab;
