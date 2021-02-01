import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../Screens/home';
import BusinessList from '../Screens/businessList';
import BusinessDetails from '../Screens/businessDetails';

const screens = {
    Home: {
      screen: Home,
    },
    BusinessList: {
      screen: BusinessList,
    },
    BusinessDetails: {
      screen: BusinessDetails,
    },
  };
  const StackNavigator = createStackNavigator(screens);
  
  export default createAppContainer(StackNavigator);