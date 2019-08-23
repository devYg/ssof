import React, {PureComponent} from 'react';
import { Container, Header, Left, Button, Icon, Body, Title } from 'native-base';
import Scan from './Scan';
import styles from '../Common/Styles';

export default class BarcodeIndex extends PureComponent {
    render(){
        return(
            <Container>
                <Header style={styles.header} androidStatusBarColor="#FF0214">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Barcode Scan</Title>
                    </Body>
                </Header>
                <Scan />
            </Container>
        );
    }
}
