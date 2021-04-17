import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity,TextInput,ScrollView, Image, StyleSheet,  Platform} from 'react-native';
import { fonts, colors } from '../theme'
import Input from '../components/Input'
import Button from '../components/Button'
import Firebase from "../firebaseConfig";
import { AuthContext } from '../navigation/AuthProvider';


const SignupScreen = ({navigation}) => {


const {register} = useContext(AuthContext);

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [companyName,setCompanyName] = useState();
  const [city,setCity] = useState();
  const [pincode,setPincode] = useState();
  const [area,setArea] = useState();
  const [contactPerson,setContactPerson] = useState();
  const [mobileNumber,setMobileNumber] = useState();
  const [category,setCategory] = useState();
  const [gstin,setGstin] = useState();

const handleSignUp = () => {

  const sp = {
    companyName : companyName,
    city : city,
    pincode : pincode,
    area : area,
    contactPerson : contactPerson,
    mobileNumber : mobileNumber,
    email : email,
    category : category,
    gstin : gstin,
    companyImageURI: "https://firebasestorage.googleapis.com/v0/b/b2b-app-df137.appspot.com/o/default-company-logo.jpg?alt=media&token=94389be7-0a39-4ba9-9658-b5e56765d2e7"
  };

  Firebase.database().ref(`/sellers/tempRef`).set(sp);

  register(email, password,sp);




}

  return (
<ScrollView keyboardShouldPersistTaps="handled" style={{marginHorizontal: 40}} showsVerticalScrollIndicator={false}>

<View style={{paddingTop:40}}>

<Image source={require('../assets/b2b.png')} style = {{width:60,height:60}}/>

</View>

            <Text style={styles.greeting}>
              Welcome,
            </Text>
            <Text style={styles.greeting2}>
              sign up to continue
            </Text>
            <View style={styles.inputContainer}>

            <Input
              value={companyName}
              placeholder="Company Name"
              type='username'
              onChangeText={(companyName) => setCompanyName(companyName)}
            />

            <Input
              value={city}
              placeholder="City"
              type='username'
              onChangeText={(city) => setCity(city)}
            />

            <Input
              placeholder="Pincode"
              type='phone_number'
              keyboardType='numeric'
              onChangeText={(pincode) => setPincode(pincode)}
              value={pincode}
            />

            <Input
              value={area}
              placeholder="Area"
              type='username'
              onChangeText={(area) => setArea(area)}
            />

            <Input
              value={contactPerson}
              placeholder="Contact Person"
              type='username'
              onChangeText={(contactPerson) => setContactPerson(contactPerson)}
            />

            <Input
              value={gstin}
              placeholder="GSTIN"
              type='username'
              onChangeText={(gstin) => setGstin(gstin)}
            />

            <Input
              value={category}
              placeholder="Category"
              type='username'
              onChangeText={(category) => setCategory(category)}
            />

            <Input
              placeholder="Mobile Number"
              type='phone_number'
              keyboardType='numeric'
              onChangeText={(mobileNumber) => setMobileNumber(mobileNumber)}
              value={mobileNumber}
            />

              <Input
                value={email}
                placeholder="Email"
                type='email'
                onChangeText={(userEmail) => setEmail(userEmail)}
              />
              <Input
                value={password}
                placeholder="Password"
                secureTextEntry
                type='password'
                onChangeText={(userPassword) => setPassword(userPassword)}
              />

            </View>
            <Button
              title='Sign Up'
              onPress={() => handleSignUp()}

            />
            <View style={{paddingTop:40}}></View>

        </ScrollView>


      );

};

export default SignupScreen;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontFamily: fonts.base,
    fontSize: 24
  },
  greeting2: {
    fontFamily: fonts.base,
    color: '#666',
    fontSize: 24,
    marginTop: 5
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 188,
    height: 188
  },
  errorMessage: {
    fontFamily: fonts.base,
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  }
});
