import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ToastAndroid, BackHandler, Platform } from 'react-native';
import { Icon, Container, Header, Left, Button, Body, Title, Right, Content, Footer, FooterTab } from 'native-base';
import styles from '../Common/Styles';

export default class StockIndex extends PureComponent {

    render(){
        return(
            <Container>
              <Header style={styles.header} androidStatusBarColor="#FF0214">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                  <Body>
                      <Title>재고</Title>
                  </Body>
                  <Right />
              </Header>
              <Content>
                    <View style={styles.container}>
                        <Text style={styles.text} >재고</Text>
                    </View>
              </Content>
              <Footer>
                  <FooterTab style={styles.footer}>
                        <Button onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon ios="ios-home" android="md-home" />
                            <Text style={styles.text}>Home</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('입고')}>
                            <Icon ios="ios-cart" android="md-cart" />
                            <Text style={styles.text}>입고</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('출고')} >
                            <Icon ios="ios-basket" android="md-basket" />
                            <Text style={styles.text}>출고</Text>
                        </Button>
                        <Button style={styles.active}>
                            <Icon ios="ios-paper" android="md-paper" />
                            <Text style={styles.text}>재고</Text>
                        </Button>
                    </FooterTab>
              </Footer>
          </Container>
        );
    }
};