import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ToastAndroid, BackHandler, Platform } from 'react-native';
import { Icon, Container, Header, Left, Button, Body, Title, Right, Content, Footer, FooterTab } from 'native-base';
import styles from './Common/Styles';

export default class Index extends PureComponent {

    exitApp = false;
    timeout;
    // 이벤트 등록
    componentDidMount() {
         //BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    // 이벤트 해제
    componentWillUnmount() {
        this.exitApp = false;
         //BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    // 이벤트 동작
    handleBackButton = () => {
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if( Platform.OS === 'android'){
        if (this.exitApp == undefined || !this.exitApp) {
            ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
            this.exitApp = true;

            this.timeout = setTimeout(
                () => {
                    this.exitApp = false;
                },2000    // 2초
            );
        } else {
            clearTimeout(this.timeout);

            BackHandler.exitApp();  // 앱 종료
        }
        }else{
        BackHandler.exitApp();  // 앱 종료
        }
        
        return true;
    }

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
                        <Title>EveryN</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('scan')}>
                            <Icon ios="ios-barcode" android="md-barcode"/>
                        </Button>
                    </Right>
                </Header>
                
                <Content>
                    <View style={styles.container}>
                        <Text style={styles.text} >매인</Text>
                        <Button title="zzz"></Button>
                    </View>
                </Content>
                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button style={styles.active}>
                            <Icon ios="ios-home" android="md-home" />
                            <Text style={styles.text}>Home</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('입고')}>
                            <Icon ios="ios-cart" android="md-cart" />
                            <Text style={styles.text}>입고</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('출고')}>
                            <Icon ios="ios-basket" android="md-basket" />
                            <Text style={styles.text}>출고</Text>
                        </Button>
                        <Button onPress={() => this.props.navigation.navigate('재고')}>
                            <Icon ios="ios-paper" android="md-paper" />
                            <Text style={styles.text}>재고</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
            
        );
    }
};