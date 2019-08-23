import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SQLite } from 'expo-sqlite';
import { Spinner, Icon } from "native-base";
import {SERVER_IP, STORE_PORT, GET_SITE_URL, GET_LOGIN_URL} from '../ExportValue';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const db = SQLite.openDatabase("ssof.db");
const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleWrapper: {
        flex: 1,
        justifyContent: 'center',
      },
    title:{
        color: 'grey',
        fontSize: 32,
        fontWeight: 'bold',
    },
    subtitle:{
        color: 'grey',
        fontWeight: '200',
        paddingBottom: 20
    }
  });

export default class AutoLogin extends React.Component{

    row;
    async componentDidMount(){

        //폰트 불러오기
        await Font.loadAsync({
            Roboto: require('../../node_modules/native-base/Fonts/Roboto.ttf'), //native-base/Fonts/Roboto.ttf
            Roboto_medium: require('../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
          });

        //로컬DB setting
        db.transaction(tx => {
            tx.executeSql('create table if not exists TM_USERM (SITE_CD text, AUTH_CD text, AUTH_PWD text, EMP_NO text, EMP_NM text, MENU_LV text, POSI_CD text );'); //사용자정보
        }),
        ()=>{console.log('error')}, //error
        ()=>{};                     //success 

        // db.transaction(
        //     tx => {
        //         tx.executeSql('delete from TM_USERM', []);  //로그인 정보는 한사람 것만 가지고 있으면 되니까 이전꺼 삭제
                
        //     }
        // );
        
        db.transaction(
            tx => {
                tx.executeSql("select * from TM_USERM", [], (_, { rows }) =>
                    row = rows
                );
            }, 
            ()=>{this.props.navigation.navigate('Login');}, //실패
            ()=>{ 
                
                    //이전 로그인 이력이 있으면 자동 로그인 시도
                    if( row.length > 0 ){
                        fetchOption = {
                            method: 'POST',
                            headers: {
                                'Accept'        : 'application/json',
                                'Content-Type'  : 'application/json',
                            },
                            body: JSON.stringify({
                                SITE_CD     : row._array[0].SITE_CD,
                                AUTH_CD     : row._array[0].AUTH_CD,
                                AUTH_PWD    : row._array[0].AUTH_PWD
                            }),
                        }

                        fetch(`${SERVER_IP}:${STORE_PORT}${GET_LOGIN_URL}`,fetchOption)
                        .then((response) => response.json())
                        .then((responseJson) => {            
                            if( responseJson.ROW_CNT == 0 ){
                                this.props.navigation.navigate('Login');
                            }else{
                                this.props.navigation.navigate('Main');
                            }
                        });
                        
                    }else{
                        this.props.navigation.navigate('Login');
                    }
                }
        );
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                    <Spinner color="blue" />
                </View>
                <View>
                    <Text style={styles.subtitle}>프로그램 초기화중...</Text>
                </View>
            </View>
        );
      }
}