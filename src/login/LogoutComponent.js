import React, { PureComponent } from 'react';
import { StyleSheet, Platform, Alert  } from 'react-native';
import { Container, Header, Item, Input, Title, Label, Button, Text, Picker, Icon } from 'native-base';
import { SQLite } from 'expo-sqlite';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {SERVER_IP, STORE_PORT, GET_SITE_URL, GET_LOGIN_URL} from '../ExportValue';
import { oneButtonAlert } from '../ExportAlert';

const style = StyleSheet.create({
    loginLable: {
        color : 'white',
    },
    item:{
        marginLeft : '5%',
        marginRight : '5%',
        marginBottom : '3%'
    },
    
    piker: {
        color : 'white',
        marginLeft :  '5%',
        marginRight :  '5%',
    }
});

let alertOption={
    title   : '경고',
    msg     : '',
    button  : '확인'
};

const db = SQLite.openDatabase("ssof.db");

class LoginComponent extends PureComponent{
    state = {
        authCd : '', 
        authPwd : '',
        siteCd : '',
        piker : []
    }

    componentDidMount(){
        fetch(`${SERVER_IP}:${STORE_PORT}${GET_SITE_URL}`)
        .then((response) => response.json())
        .then((responseJson) => {
            // return JSON.stringify(responseJson.rows);
            this.setState({piker : responseJson.rows});
        })
        .catch((error) => {
            // console.error(error);
            alertOption.msg = '서버와 통신이 원활하지 않습니다.\n잠시후 다시 시도하세요.'
            oneButtonAlert(alertOption);
        });

        let row;
        db.transaction(
            tx => {
                tx.executeSql("select * from TM_USERM", [], (_, { rows }) =>
                    row = rows
                );
            }, 
            ()=>{console.log('error')},
            ()=>{ 
                    if( row.length > 0 ){
                        //onValueChange
                        this.setState({
                            authCd  : row._array[0].AUTH_CD,
                            authPwd : row._array[0].AUTH_PWD,
                            siteCd  : row._array[0].SITE_CD
                        });
                    } 
                }
        );
    }

    //사용자 인증
    getUserAuth = ()=>{
        const {authCd, authPwd, siteCd} = this.state;
        if( siteCd !== '' && authCd !== '' && authPwd ){
            let fetchOption = {
                method: 'POST',
                headers: {
                    'Accept'        : 'application/json',
                    'Content-Type'  : 'application/json',
                },
                body: JSON.stringify({
                    SITE_CD     : siteCd,
                    AUTH_CD     : authCd,
                    AUTH_PWD    : authPwd
                }),
            }
    
            fetch(`${SERVER_IP}:${STORE_PORT}${GET_LOGIN_URL}`,fetchOption)
            .then((response) => response.json())
            .then((responseJson) => {
                // return JSON.stringify(responseJson.rows);
                // console.log(responseJson);
                if( responseJson.ROW_CNT == 0 ){
                    alertOption.msg = '일치하는 정보가 없습니다.'
                    oneButtonAlert(alertOption);
                }else{
                    let parm = [
                                    responseJson.ROWS[0].SITE_CD+"", 
                                    authCd+"", 
                                    authPwd+"", 
                                    responseJson.ROWS[0].EMP_NO, 
                                    responseJson.ROWS[0].EMP_NM, 
                                    responseJson.ROWS[0].MENU_LEVEL+"", 
                                    responseJson.ROWS[0].POSI_CD
                                ];
                    //인증성공하면 사용자정보 SQLite 저장
                    db.transaction(
                        tx => {
                            tx.executeSql('delete from TM_USERM', []);  //로그인 정보는 한사람 것만 가지고 있으면 되니까 이전꺼 삭제
                            tx.executeSql('insert into TM_USERM (SITE_CD, AUTH_CD, AUTH_PWD, EMP_NO, EMP_NM, MENU_LV, POSI_CD) values (?, ?, ?, ?, ?, ? ,?)', parm);
                        }
                    );
                    //main page move
                    this.props.navigation.navigate('Home');

                }
            })
            .catch((error) => {
                console.log(error);
                alertOption.msg = '서버와 통신이 원활하지 않습니다.\n잠시후 다시 시도하세요.'
                oneButtonAlert(alertOption);
            });
        }else{
            alertOption.msg = '사용자 정보를 입력하세요.'
            oneButtonAlert(alertOption);
        }
    };

    //piker change event
    onValueChange = (value)=>{
        // console.log(`piker: ${value}`);
        this.setState({
            siteCd : value
        });
   }

   render(){
    const {authCd, authPwd, siteCd, piker} = this.state;
    let pikerItem
    if(Platform.OS === 'ios' ){
        let item = piker;
        //item.unshift(<Item label='소속을 선택하세요.' value='' />);
        pikerItem = item.map((values, index) => {
            return (<Item label={values.comboNameKr} value={values.comboVal} key={values.comboVal}/>);
        })
    }else{
        pikerItem = piker.map( (data, index) => { 
            return(
                <Item key={data.comboVal} label={data.comboNameKr} value={data.comboVal} />   
            );
        })
    }
       return(
        <Container>
            <Header style={{backgroundColor:'#313955'}} androidStatusBarColor="#FF0214">
                <Title>EveryN</Title>
            </Header>
                <Grid>
                    {/* <Row size={1} style={{ backgroundColor: "#313955" }} /> */}
                    <Row size={2} style={{ backgroundColor: "#313955" }} >
                        <Col size={10}>
                            <Picker 
                                mode="dropdown"
                                iosHeader="소속을 선택하세요."
                                iosIcon={<Icon name="arrow-down" />}
                                style={Platform.OS === 'ios' ? undefined : style.piker}
                                selectedValue={siteCd}
                                onValueChange={value => this.setState({siteCd : value})}
                                >
                                {pikerItem}
                            </Picker>
                        </Col>
                    </Row>
                    <Row size={5} style={{ backgroundColor: "#313955" }} >
                        <Col>
                            <Item floatingLabel style={style.item}>
                                <Label style={style.loginLable}>User ID</Label>
                                <Input  style={style.loginLable} 
                                        value={authCd} 
                                        onChangeText={id =>  this.setState({authCd : id}) } 
                                        //onSubmitEditing={() => authPwdRef.current.focus()}
                                        //blurOnSubmit={false}
                                />
                            </Item>
                            <Item floatingLabel style={style.item}>
                                <Label style={style.loginLable}>User PW</Label>
                                <Input style={style.loginLable} secureTextEntry={true} value={authPwd} onChangeText={pw => this.setState({authPwd : pw})}/>
                            </Item>
                        </Col>
                    </Row>
                    <Row size={3} style={{ backgroundColor: "#313955" }} >
                        <Col>
                            <Button block warning style={style.item} onPress={this.getUserAuth}>
                                <Text style={{fontWeight:'bold'}}>사용자 인증</Text>
                            </Button> 
                        </Col>
                    </Row> 
                </Grid>
        </Container>
       );
   }
}

export default LoginComponent;