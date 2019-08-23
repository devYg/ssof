import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Modal from "react-native-modal";
import { Icon, Container, Header, Left, Button, Body, Title, Right, Content, Footer, FooterTab, Tabs, ScrollableTab, Tab } from 'native-base';
import styles from '../Common/Styles';

//입고목록
export default class BuyIndex extends PureComponent {

    state = {
        visibleModal: false
    }

    renderModalContent = () => (
        <View style={styles.modal}>
            <Text style={styles.modalTitle}>Hi 👋!</Text>
            <Footer>
                <FooterTab style={styles.footer}>
                    <Button bordered light onPress={() => this.setState({ visibleModal: null })}>
                        <Text>닫기</Text>
                    </Button>
                    <Button bordered light onPress={() => this.setState({ visibleModal: null })}>
                        <Text>조회</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </View>
    );

    render() {
        return (

            <Container>
                <Header style={styles.header} androidStatusBarColor="#FF0214">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>입고</Title>
                    </Body>
                    <Right >
                        <Button transparent onPress={() => this.setState({ visibleModal: true })}>
                            <Icon ios="ios-search" android="md-search" />
                        </Button>
                    </Right>
                </Header>
                <Tabs renderTabBar={() => <ScrollableTab style={styles.header} />}>
                    <Tab heading="입고목록" tabStyle={{ backgroundColor: '#FF0214' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#FF0214' }} activeTextStyle={{ color: '#FAED7D', fontWeight: 'bold' }}>

                    </Tab>
                    <Tab heading="입고상세" tabStyle={{ backgroundColor: '#FF0214' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#FF0214' }} activeTextStyle={{ color: '#FAED7D', fontWeight: 'bold' }}>

                    </Tab>
                    <Tab heading="입고확정" tabStyle={{ backgroundColor: '#FF0214' }} textStyle={{ color: '#fff' }} activeTabStyle={{ backgroundColor: '#FF0214' }} activeTextStyle={{ color: '#FAED7D', fontWeight: 'bold' }}>

                    </Tab>
                </Tabs>
                <Modal
                    isVisible={this.state.visibleModal === true}
                    //slow
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={800}
                    backdropTransitionOutTiming={800}
                    //backdropColor="#B4B3DB"
                    //fancy
                    // backdropOpacity={0.8}
                    // animationIn="zoomInDown"
                    // animationOut="zoomOutUp"
                    // animationInTiming={600}
                    // animationOutTiming={600}
                    // backdropTransitionInTiming={600}
                    // backdropTransitionOutTiming={600}
                >
                    {this.renderModalContent()}
                </Modal>
                <Footer>
                    <FooterTab style={styles.footer}>
                        <Button onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon ios="ios-home" android="md-home" />
                            <Text style={styles.text}>Home</Text>
                        </Button>
                        <Button style={styles.active}>
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