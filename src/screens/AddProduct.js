import React, {Component} from 'react';
import {Text, StyleSheet, View, AsyncStorage} from 'react-native';
import prompt from 'react-native-prompt-android';
import {
  List,
  Container,
  Content,
  ListItem,
  Body,
  Fab,
  Icon,
  Right,
} from 'native-base';

export default class AddProduct extends Component {
  static navigationOptions = {
    title: 'add a product',
  };
  state = {
    allProducts: [],
    productsList: [],
  };

  async componentWillMount() {
    const savedProducts = await AsyncStorage.getItem('@allProducts');
    if (savedProducts) {
      this.setState({
        allProducts: JSON.parse(savedProducts),
      });
    }

    this.setState({
      productsList: this.props.navigation.state.params.productsList,
    });
  }

  handleProductPress = product => {
    const productIndex = this.state.productsList.findIndex(
      p => p.id == product.id,
    );
    if (productIndex > 1) {
      this.setState(currentState => ({
        productsList: currentState.productsList.filter(
          p => p.id !== product.id,
        ),
      }));
      this.props.navigation.state.params.deleteProduct(product);
    } else {
      this.setState(currentState => ({
        productsList: currentState.productsList.concat(product),
      }));
      this.props.navigation.state.params.addProduct(product);
    }
  };

  handleRemovePress = async product => {
    this.setState(currentState => ({
      allProducts: currentState.allProducts.filter(p => p.id !== product.id),
    }));
    await AsyncStorage.setItem(
      '@allProducts',
      JSON.stringify(this.state.allProducts.filter(p => p.id !== product.id)),
    );
  };

  addNewProduct = async name => {
    const newProductList = this.state.allProducts.concat({
      name,
      id: Math.floor(Math.random() * 100000),
    });

    await AsyncStorage.setItem('@allProducts', JSON.stringify(newProductList));

    this.setState({allProducts: newProductList});
  };

  handleAddProductPress = () => {
    prompt(
      'Enter Product Name',
      '',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Ok', onPress: this.addNewProduct},
      ],
      {
        type: 'plain-text',
      },
    );
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.allProducts.map(product => {
              const productsList = this.state.productsList.find(
                p => p.id == product.id,
              );
              return (
                <ListItem
                  key={product.id}
                  onPress={() => this.handleProductPress(product)}>
                  <Body>
                    <Text style={{color: productsList ? '#bbb' : '#000'}}>
                      {product.name}
                    </Text>
                    {productsList && (
                      <Text note>{'Already in shopping lsit'}</Text>
                    )}
                  </Body>
                  <Right>
                    <Icon
                      name="remove"
                      style={{color: 'red'}}
                      onPress={() => this.handleRemovePress(product)}
                    />
                  </Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
        <Fab
          style={{backgroundColor: '#5067ff'}}
          position="bottomRight"
          onPress={this.handleAddProductPress}>
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
