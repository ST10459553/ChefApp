import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";


const AddtoCartBtn = (props:any) => {
    const {func,btnText}=props
  return (
      <TouchableOpacity style={styles.btn} onPress={func} >
        <Text>{btnText}</Text>
      </TouchableOpacity>
  );
};

export default AddtoCartBtn;

const styles = StyleSheet.create({

  btn:{
    backgroundColor:'yellow',
    height:60,
    width:270,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    margin:30,
  }
});
