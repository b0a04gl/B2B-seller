import React from 'react';
import Providers from './navigation';
import * as Font from 'expo-font'
import Expo from "expo";
import { View,ActivityIndicator} from 'react-native';
const Light = require('./assets/fonts/Lato-Light.ttf');
const Base = require('./assets/fonts/Lato-Regular.ttf');
const Hairline = require('./assets/fonts/Lato-Hairline.ttf');
const Bold = require('./assets/fonts/Lato-Bold.ttf');


class App extends React.Component{

  constructor(props)
  {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount()
  {
    await Font.loadAsync({
    'Lato-Light': Light,
    'Lato-Regular' : Base,
    'Lato-Hairline' : Hairline,
    'Lato-Bold' : Bold
    });

    this.setState({ loading: false });
  }

  render()
  {

    if (this.state.loading) {
   return (
     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <ActivityIndicator size="large" />
     </View>
   );
 }
   else {
    return (<Providers />);
   }

  }
}


export default App;
