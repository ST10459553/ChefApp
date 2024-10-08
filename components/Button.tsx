import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";


const Button = (props:any) => {
    const {func,btnText}=props
  return (
      <TouchableOpacity style={styles.btn} onPress={func} >
        <Text>{btnText}</Text>
      </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({

  btn:{
    backgroundColor:'lightgrey',
    borderColor:'yellow',
    borderWidth:1,
    height:60,
    width:250,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    margin:30,
  }
});
