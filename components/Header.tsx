import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Header = (props:any) => {
    const {container,title}=styles
    const {pageHeader}=props
  return (
    <View style={container} >
      <MaterialIcons name="sort" size={40} color="black"  />
      <Text style={title}>{pageHeader}</Text>
      <Text >round</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        textAlign:'center'
    } ,
    title:{
      textAlign:'center',
      fontSize:30
    }
})