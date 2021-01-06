import React, { Component, useState } from 'react';
import {TouchableOpacity, View, Text, Button, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class App extends Component {

  //init states
  constructor(props) {
    super(props);
    this.state = {
      isQRScanning: false,
      firstName: "",
      lastName: "",
      email: ""
    };
  }

  //function to contact the backend API
  saveData (data){
    fetch('http://192.168.1.10:3000/saveData', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      QRURL: data
    })
  }).then((res)=>{
    console.log(res)
  }).catch(function(error) {
    console.log(error.message);
    });
  }

  //this function is to display the QR code data
  onceScanned = e => {
    let url = decodeURIComponent(e.data)
    url = JSON.parse(url.substring(url.indexOf("=") + 1))
    this.setState({
      isQRScanning: false,
      firstName:url['firstName'],
      lastName:url['lastName'],
      email:url['email']
    })
    this.saveData(e.data)
  }

  render(){
    return (
      <> 
            <View style={{padding: 30}}>            
            <Text style={styles.titleStyle}>Basic QR Scanner</Text>
            <Text style={{textAlign: 'center'}}>Scan any barcode and the results will be shown below!</Text>
            <TouchableOpacity style={{ height: 100, width: 100, marginLeft: 100, marginRight: 100, paddingTop: 10}}>

            {this.state.isQRScanning ? //change button state depending on action
            <Button
              onPress={()=>{this.setState({
                isQRScanning: false,
              })}}
              title="Stop!"
              color="#000"
            />
              : 
            <Button
              onPress={()=>{this.setState({
                isQRScanning: true,
                firstName: "",
                lastName: "",
                email: ""
              })}}
              title="Start!"
              color="#000"
            />
          }
            </TouchableOpacity>
              { //onRead is the action taken once QR is scanned
              this.state.isQRScanning ? 
              (<QRCodeScanner onRead={this.onceScanned}></QRCodeScanner>)
              : null 
              } 
            
                {
                  //start displaying details once QR is scanned
                  this.state.firstName && this.state.lastName && this.state.email ? (
                   <View>
                      <Text>First name: {this.state.firstName}</Text>
                      <Text>Last name: {this.state.lastName}</Text>
                      <Text>Email: {this.state.email}</Text>
                   </View>
                  ):null
                }

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