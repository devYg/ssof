import React, { memo, useRef, useState, useEffect } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';

const InputTextBox = memo((props)=>{

    const [defaultProps, setDefaultProps] = useState({
        placeholder : 'Input Data...',
        type : 'text',
        item : 'default'
    });

    useEffect( ()=>{
        defaultProps.placeholder    = props.placeholder === null ? 'Input Data...'  : props.placeholder;
        defaultProps.type           = props.type        === null ? 'text'           : props.type;
        defaultProps.item           = props.item        === null ? 'default'        : props.item;
    });

    const viewController = () =>{
        if( defaultProps.item === 'success' ){
            return (
                <Item success>
                    <Input placeholder={defaultProps.placeholder}/>
                    <Icon name='checkmark-circle' />
                </Item>
            );
        }else if( defaultProps.item === 'error' ){
            return (
                <Item error>
                    <Input placeholder={defaultProps.placeholder}/>
                    <Icon name='close-circle' />
                </Item>
            );
        }else{
            return (
                <Item>
                    <Input placeholder={defaultProps.placeholder} />
                </Item>
            );
        }
    }

    return(
        <>
            {viewController}
        </>
    );
});

export default InputTextBox;