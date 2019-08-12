import React, { memo, useState, useRef } from "react";
import { View } from "react-native";
import { Container, Content, Button, Text, Body, Title } from "native-base";
import Expo from "expo";

const FooterComponent = memo( ()=>{

    return(
        <Header>
            <Body>
                <Title> SSOF </Title>
            </Body>
        </Header>    
    );

});

export default FooterComponent;