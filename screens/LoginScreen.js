import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput,Alert,ActivityIndicator,Platform,Image,
  Modal} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';


import { fonts, colors } from '../theme'

import Input from '../components/Input'
import Button from '../components/Button'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();
  const {login} = useContext(AuthContext);


  return (

    <View style={styles.container}>
            <View style={styles.heading}>
              <Image
                source={require('../assets/b2b.png')}
                style={styles.headingImage}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.greeting]}>
              Welcome back,
            </Text>
            <Text style={[styles.greeting2]}>
              sign in to continue
            </Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Email"
                onChangeText={(userEmail) => setEmail(userEmail)}
                value={email}
              />
              <Input
                placeholder="Password"
                type='password'
                onChangeText={(userPassword) => setPassword(userPassword)}
                value={password}
                secureTextEntry
              />
            </View>

            <Button
              title='Sign In'
              onPress={() => {login(email, password,userType)}}
            />

          </View>



      );


};

export default LoginScreen;



const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 98,
    height:98
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: fonts.base
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: fonts.base
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    fontFamily: fonts.base
  }
});
