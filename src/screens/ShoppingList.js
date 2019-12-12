import React, {Component} from 'react';
import {Alert} from 'react-native';
import {
  Body,
  Container,
  Content,
  Right,
  Text,
  CheckBox,
  List,
  ListItem,
  Fab,
  Icon,
} from 'native-base';

export default class ShoppingList extends Component {
  state = {
    products: [],
  };
  static navigationOptions = {
    title: 'Groceries List',
  };

  handleProductPress = id => {
    const products = this.state.products.map(product => {
      if (product.id === id) {
        product.gotten = !product.gotten;
        return product;
      }
      return product;
    });
    this.setState({products});
  };

  handleAddPress = () => {
    this.props.navigation.navigate('AddProduct', {
      addProduct: product => {
        this.setState(currentState => ({
          products: currentState.products.concat(product),
        }));
      },
      deleteProduct: product => {
        this.setState(currentState => ({
          products: currentState.products.filter(p => p.id !== product.id),
        }));
      },
      productsList: this.state.products,
    });
  };

  handleDeletePress = () => {
    Alert.alert('Clear All Items ?', null, [
      {text: 'Cancel'},
      {text: 'Ok', onPress: () => this.setState({products: []})},
    ]);
  };

  render() {
    const {products} = this.state;
    return (
      <Container>
        <Content>
          <List>
            {products.map(product => (
              <ListItem
                key={product.id}
                onPress={() => this.handleProductPress(product.id)}>
                <Body>
                  <Text style={{color: product.gotten ? '#bbb' : '#000'}}>
                    {product.name}
                  </Text>
                </Body>
                <Right>
                  <CheckBox
                    checked={product.gotten}
                    onPress={() => this.handleProductPress(product.id)}
                  />
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
        <Fab
          style={{backgroundColor: '#5067ff'}}
          position="bottomRight"
          onPress={this.handleAddPress}>
          <Icon name="add" />
        </Fab>
        <Fab
          style={{backgroundColor: 'red'}}
          position="bottomLeft"
          onPress={this.handleDeletePress}>
          <Icon name="remove" />
        </Fab>
      </Container>
    );
  }
}
