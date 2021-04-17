// import React, { useContext,useEffect,useState } from 'react';
// import { View, Text, StyleSheet,Alert } from 'react-native';
// import FormButton from '../components/FormButton';
// import { AuthContext } from '../navigation/AuthProvider';
// import Firebase from "../firebaseConfig";
//
//
// const Profile = () => {
//   const {user, logout} = useContext(AuthContext);
//   const [seller,setSeller ] = useState();
//
//   useEffect (()=>{
//
//     const ref = Firebase.database().ref("/sellers/tempRef");
//
//     if(ref != null)
//     {
//
//       ref.once("value",(snapshot)=>{
//
//         if(snapshot!=null)
//         {
//               setSeller(snapshot.val());
//         }
//       }).then( () => {
//
//             if(seller!=null)
//             {
//                 Firebase.database().ref(`/${seller.city}/sellers/${user.uid}`).set(seller);
//                 ref.remove();
//             }
//           }
//       );
//     }
//
//
//
//   },[seller]);
//
//
//
//
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome {user.uid}</Text>
//       <FormButton buttonTitle='Logout' onPress={() => logout()} />
//     </View>
//   );
// }
//
// export default Profile;
//
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f9fafd',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 20,
//     color: '#333333'
//   }
// });

import React, { Component } from 'react'
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
   Linking,
   Alert
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import PropTypes from 'prop-types'
import * as ImagePicker from 'expo-image-picker';
import productData from './Profile-utils/product.json'
import { fonts, colors } from '../theme'

import ProductStyles from './Profile-utils/ProductStyle'
import Firebase from "../firebaseConfig";
import call from 'react-native-phone-call';
import qs from 'qs';
import Toast from 'react-native-simple-toast';

async function sendEmail(to, subject, body, options = {}) {
   const { cc, bcc } = options;

   let url = `mailto:${to}`;

   // Create email link query
   const query = qs.stringify({
       subject: subject,
       body: body,
       cc: cc,
       bcc: bcc
   });

   if (query.length) {
       url += `?${query}`;
   }

   // check if we can use this link
   const canOpen = await Linking.canOpenURL(url);

   if (!canOpen) {
       throw new Error('Provided URL can not be handled');
   }

   return Linking.openURL(url);
}

const styles = StyleSheet.create({ ...ProductStyles })

const textStyles = StyleSheet.create({
  greeting: {

  fontFamily: fonts.base,
  fontSize: 24
},
greeting2: {
  fontFamily: fonts.base,
  color: '#666',
  fontSize: 20,

},})


class Profile extends Component {
  static propTypes = {
    img: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  static defaultProps = {
    containerStyle: {},
  }

  constructor(props){
    super(props);

    this.state = {
      isLoading:true,
      seller: null,
companyImageURI:null
    };

  }


  componentDidMount() {

     this.getData()

  }


  getData = () => {


      const user = Firebase.auth().currentUser;
      this.setState({isLoading:true});

      let profileRef = Firebase.database().ref(`/${user.displayName}/sellers/${user.uid}`);

            if (profileRef) {
              profileRef.on('value', (data) => {

                if (data.val()) {

                    this.setState({seller:data.val(),companyImageURI:data.val()['companyImageURI'],isLoading:false});

                }


              });
          }

    }



        AddImageHandler = async (key) => {
            const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync();
            if (pickerResult.cancelled === true) {
                return;
            }
            let URI = pickerResult.uri;
            const imageName = URI.substring(URI.lastIndexOf('/') + 1);
            const response = await fetch(URI);
            const blob = await response.blob();

            if(blob != null)
            {
              Toast.show('Wait for some seconds for uploading image 👋', Toast.SHORT, [
            'UIAlertController',
            ]);
            }

            Firebase
                .storage()
                .ref(imageName)
                .put(blob)
                .then((snapshot) => {
                  Toast.show('Image uploaded successfully 👋', Toast.SHORT, [
            'UIAlertController',
            ]);
                    snapshot.ref.getDownloadURL().then((url) => {

                            this.setState({
                                companyImageURI : url
                            });

const user = Firebase.auth().currentUser;

                            var db = Firebase.database();
db.ref(`/${user.displayName}/sellers/${user.uid}/companyImageURI`).set(url);

          //Chennai/sellers/miNiquT1ZrZf9uDwm7DGJEXzhGd2/companyImageURI
                    });
                })
                .catch((e) => console.log('uploading image error => ', e));
            // console.log(this.state.imagesDeck);
        };


         initiateCall = () => {
            // Check for perfect 10 digit length

        var mobileNumber = this.state.seller.mobileNumber;

            if (mobileNumber.length != 10) {
              alert('Please insert correct contact number');
              return;
            }

            const args = {
              number: mobileNumber,
              prompt: true,
            };
            // Make a call
            call(args).catch(console.error);
          };

           initiateMail = () => {

          var mailto = this.state.seller.email;

          sendEmail(
            mailto,
            'Request for proposal!',
            "Hey there! I'm interested in the products of your esteemed company"
        ).then(() => {
            console.log('Our email successful provided to device mail ');
        });

}


  renderDetail = () => {
    return (
      <View>
        <Text style={textStyles.greeting}>For further details contact</Text>
        <Text style={textStyles.greeting2}>{this.state.seller.contactPerson}</Text>
      </View>
    )
  }

  renderDescription = () => {
    return (
      <View>
        <Text style={textStyles.greeting}>{this.state.seller.companyName}</Text>
        <Text style={textStyles.greeting2}>{this.state.seller.area} , {this.state.seller.city}.</Text>


      </View>
    )
  }

  renderNavigator = () => {
    return (

      <View styles={{flexDirection: 'row'}}>
      <Text style={textStyles.greeting}>
        Shop Timings
      </Text>
      <Text style={textStyles.greeting2}>
        Opens at 8 AM

      </Text>
      <Text style={textStyles.greeting2}>
        Closes at 5 PM

      </Text>
      </View>

    )
  }

  renderContactHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>


          <ImageBackground
            source={{uri:this.state.companyImageURI}}
            style={styles.coverImage}
          >
          <View style={{
            alignItems: 'flex-end',
            flex: 1,
            justifyContent: 'flex-end',
          }}>
            <Button
              color="white"
              title="Edit 📷"
              onPress={this.AddImageHandler}
              textStyle={{
                fontSize: 16,
                fontWeight: '400',
              }}
              buttonStyle={{
                backgroundColor: 'rgba(128,128,128, 0.7)',
                borderRadius: 5,
                borderWidth: 0,
                elevation: 0,
                paddingLeft: 10,
              }}
              containerStyle={{
                marginBottom: 15,
                marginRight: 15,
                padding: 0,
              }}
            />



          </View>
          </ImageBackground>


        </View>
      </View>
    )
  }

  render() {
    
    if (this.state.loading || this.state.seller == null) {
   return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <ActivityIndicator size="large" />
     </View>
   );
 }

    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderNavigator()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter} onPress={this.initiateCall}>
            <Text style={styles.textFooter}>📞 CALL</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter} onPress = {this.initiateMail}>
            <Text style={styles.textFooter}>✉️ EMAIL</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Profile


//
// <View style={{ flexDirection: 'row' }} >
//   <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
//     <Text style={styles.navigatorText}>Props: owner</Text>
//   </TouchableOpacity>
//   <TouchableOpacity style={[styles.navigatorButton, { flex: 2 }]}>
//     <Text style={styles.navigatorText}>STREET VIEW</Text>
//   </TouchableOpacity>
//   <TouchableOpacity style={[styles.navigatorButton, { flex: 1 }]}>
//     <Text style={styles.navigatorText}>MAP</Text>
//   </TouchableOpacity>
// </View>
