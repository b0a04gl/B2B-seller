import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import Firebase from '../firebaseConfig';
import AuthTab from './AuthStack';
import AppStack from './AppStack';
import HomeScreen from '../screens/HomeScreen';
import Drawer from '../screens/drawernav';

const Routes = () => {

  const {user, setUser} = useContext(AuthContext);

  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false);
  }



  useEffect(() => {
    const subscriber =   Firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null;

    return (
      <NavigationContainer>
          {user ? <Drawer/> : <AuthTab/>}
      </NavigationContainer>
    );
};

export default Routes;
