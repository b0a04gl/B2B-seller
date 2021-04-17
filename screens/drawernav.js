import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import {CatalogueStackNavigator,LeadStackNavigator,OrdersStackNavigator,QuotationStackNavigator} from "./stacknav";
import BottomTabNavigator from "./tabnav";
import CustomDrawerContent from "./CustomDrawerContent";
import { colors, fonts } from '../theme'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (

    <Drawer.Navigator

    drawerContentOptions={{
          activeTintColor: colors.primary,
          itemStyle: {marginVertical: 5},
          labelStyle : {alignSelf:"center",fontFamily:fonts.base,fontSize:25}
        }}

    drawerContent={(props) => <CustomDrawerContent {...props} />}

    >
      <Drawer.Screen name="Home" component={BottomTabNavigator}  options={{ drawerLabel: 'Home🏠' }}/>
      <Drawer.Screen name="Catalogue" component={CatalogueStackNavigator} options={{ drawerLabel: 'Catalogue📙' }}/>
      <Drawer.Screen name="Lead" component={LeadStackNavigator} options={{ drawerLabel: 'Lead🔍' }}/>
      <Drawer.Screen name="Orders" component={OrdersStackNavigator} options={{ drawerLabel: 'Orders📦' }}/>
      <Drawer.Screen name="Quotation" component={QuotationStackNavigator} options={{ drawerLabel: 'Quotation🧾' }}/>

    </Drawer.Navigator>

  );
}

export default DrawerNavigator;
