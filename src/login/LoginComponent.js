import React, { memo, useRef, useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Title } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import InputTextBox from '../UserCustomComponent/InputTextBox';

const LoginComponent = memo(()=>{

    return(
        <>
            <Header>
                <Title>

                </Title>
            </Header>
            <Content>
                <Form>
                    <Item>
                        <Input placeholder='user ID' />
                    </Item>
                    <InputTextBox />
                </Form>
            </Content> 
        </>
    );
});

export default LoginComponent;