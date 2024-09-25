import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';

const SearchBar = (props:any) => {
    
    const {input,container,searchIcon}=styles 
    const {changeText, placeholder}=props
  return (
    <View style={container}>
     <TextInput style={input} onChangeText={changeText} placeholder={placeholder}   />
     <Feather style={searchIcon} name='search' size={30} />
    </View>
    
  )
}

export default SearchBar

const styles = StyleSheet.create({
    input:{
        height:50,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius:8,
        fontSize:15,
        flex:1,
    },
    container:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        // marginVertical:10,
        marginTop:0,


    },
    searchIcon:{
        position:'absolute',
        left:'90%'
    }
})