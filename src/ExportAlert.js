import { Alert } from 'react-native';

/**
 * 버튼에 이벤트가 있는 알림창은 해당 컴포넌트에서 직접 구현
 */
export const oneButtonAlert= (option)=>{
    // Alert.alert(
    //     'Alert Title',
    //     'My Alert Msg',
    //     [
    //       {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel',
    //       },
    //       {text: 'OK', onPress: () => console.log('OK Pressed')},
    //     ],
    //     {cancelable: false},
    //   );

    Alert.alert(
        option.title,
        option.msg,
        [
          {text: option.button},
        ],
        {cancelable: false},
      );
}