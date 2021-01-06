import React, { Component } from 'react';
import {TouchableOpacity, View, Text, Linking, Button, StyleSheet, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends Component {
  //states to be used 
  state = {
    isQRScanning: false,
  }

  //function to contact the backend API
  saveData (data){
    console.log(data)
    fetch('https://jsonplaceholder.typicode.com/todos/1').then((res)=>{
      console.log(res)
    })
  }

  //this function is to display the QR code data
  onceScanned = e => {
    Alert.alert(`The QR Code returned this link / data : ${e.data}`)
    this.setState({isQRScanning: false})
    this.saveData(e.data)
  }

  render(){
    const { isQRScanning } = this.state
    return (
      <> 
            <View style={{padding: 30}}>            
            <Text style={styles.titleStyle}>Basic QR Scanner</Text>
            <Text style={{textAlign: 'center'}}>Scan any barcode and the results will be shown in an alert box!</Text>
            <TouchableOpacity style={{ height: 100, width: 100, marginLeft: 100, marginRight: 100, paddingTop: 10}}>
            {isQRScanning ? 
            <Button
              onPress={()=>{this.setState({
                isQRScanning: false
              })}}
              title="Stop!"
              color="#000"
            />
              : 
            <Button
              onPress={()=>{this.setState({
                isQRScanning: true
              })}}
              title="Start!"
              color="#000"
            />
          }
            </TouchableOpacity>
            {isQRScanning ? (
            <QRCodeScanner
            onRead={this.onceScanned}
            ></QRCodeScanner>):null}
            </View>
      </>
    );
  }
};

//some basic styling
const styles = StyleSheet.create({
  titleStyle:{
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },

})