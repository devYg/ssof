import * as React from 'react';
import { Dimensions, StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

const { width } = Dimensions.get('window');

export default class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  //바코드 스켄 권한 획득
  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  //바코드 스켄 화면 렌더링
  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    const opacity = 'rgba(0, 0, 0, .6)';
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column'
      },
      layerTop: {
        flex: 2,
        backgroundColor: opacity
      },
      layerCenter: {
        flex: 1.5,
        flexDirection: 'row'
      },
      layerLeft: {
        flex: 1,
        backgroundColor: opacity
      },
      focused: {
        flex: 15
      },
      layerRight: {
        flex: 1,
        backgroundColor: opacity
      },
      layerBottom: {
        flex: 2,
        backgroundColor: opacity
      },
  });
  return(
    
      // <>
      //   <BarCodeScanner onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}>
      //     <View style={styles.layerTop} />
      //     <View style={styles.layerCenter}>
      //       <View style={styles.layerLeft} />
      //       <View style={styles.focused} />
      //       <View style={styles.layerRight} />
      //     </View>
      //     <Button title="Tap to Scan Again"></Button>
      //     <View style={styles.layerBottom} />
      //   </BarCodeScanner>
      // </>
      
   <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />

    {scanned && (
      <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
    )}
  </View>
    );
  }

   // //스켄 결과 처리 핸들러
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true }); //바코드 스캔 완료 구분 true
    alert(`Bar code with type :  ${type} \nBar code :  ${data} `);
  };

}