import React, { useContext,useEffect,useState } from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from "../firebaseConfig";


const Quotation = () => {
  const {user, logout} = useContext(AuthContext);
  const [seller,setSeller ] = useState();

  useEffect (()=>{

    const ref = Firebase.database().ref("/sellers/tempRef");

    if(ref != null)
    {

      ref.once("value",(snapshot)=>{

        if(snapshot!=null)
        {
              setSeller(snapshot.val());
        }
      }).then( () => {

            if(seller!=null)
            {
                Firebase.database().ref(`/${seller.city}/sellers/${user.uid}`).set(seller);
                ref.remove();
            }
          }
      );
    }



  },[seller]);




  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {user.uid}</Text>
      <FormButton buttonTitle='Logout' onPress={() => logout()} />
    </View>
  );
}

export default Quotation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});
