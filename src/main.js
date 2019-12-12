import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import ShoppingList from './screens/ShoppingList';
import AddProduct from './screens/AddProduct.js';

const Navigator = createStackNavigator({
  ShoppingList: {
    screen: ShoppingList,
  },
  AddProduct: {
    screen: AddProduct,
  },
});

const AppContainer = createAppContainer(Navigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
