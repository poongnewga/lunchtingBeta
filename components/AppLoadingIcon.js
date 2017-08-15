import React from 'react';
import { View, Animated, Image } from 'react-native';
import AppIcon from '../assets/loading-icon.png';


class AppLoadingIcon extends React.Component {

  constructor (props) {
    super(props);
    this.iconOpacity = new Animated.Value(1.0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.iconOpacity, {
          toValue: 0,
          duration: 1000,
          delay: 100
        }),
        Animated.timing(this.iconOpacity, {
          toValue: 1,
          duration: 1000,
          delay: 25
        })
      ])).start();
  }

  render() {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{width: 150, height: 150}}>
          <Image style={{width: '100%', resizeMode: 'contain'}} source={AppIcon} />
        </View>
      </View>
    );
  }
}

export { AppLoadingIcon };
