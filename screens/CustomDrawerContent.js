

import React,{useContext} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { fonts, colors } from '../theme'
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = (props) => {

  const {user, logout} = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex: 1}}>

      <Image
        source={require('../assets/b2b.png')}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />



      </DrawerContentScrollView>

      <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                        name="md-exit"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    labelStyle={{alignSelf:"center",fontFamily:fonts.base,fontSize:25}}
                    onPress={() => {  logout()}}
                />
            </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop:60,
    flexDirection:'row'
  },
  iconStyle: {

    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
});

export default CustomDrawerContent;
