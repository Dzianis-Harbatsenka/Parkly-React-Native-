import Authentication from "./Authentication"
import HomePage from './HomePage'
import Details from './Details'

import {Animated} from 'react-native'
import { createAppContainer } from "react-navigation";
import { createStackNavigator  } from "react-navigation-stack";




const MainNavigator = createStackNavigator(
  {
  Authentication: { screen: Authentication },
  HomePage: {screen: HomePage},
  Details: { screen: Details }
  }
);

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [-width, 0],
        extrapolate: 'clamp'
      });

      return {
        transform: [{ translateX }]
      }
    }
  }
}

const App = createAppContainer(MainNavigator);

export default App

