import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

const TextBox = (props:any) => {

  return (
    <View style={styles.container}>
   <TextInput style={styles.text}placeholder={props.placeholder}/>
    </View>
  )
}

export default TextBox

const styles = StyleSheet.create({
  container:{
    margin:10,
    flex:0.2,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    
    
  },
  text:{
    width:300,
    paddingHorizontal:20,
    paddingVertical:10,

    borderColor:'black',
    borderWidth:1,
  }
})