import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import SpecialList from '@/components/SpecialList'
import TextBox from '@/components/TextBox'
import AddtoCartBtn from '@/components/AddtoCartBtn'
import Button from '@/components/Button'
import * as ImagePicker from 'expo-image-picker';

const special = () => {
  const {container}=styles
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  
  return (
   <SafeAreaView style={container}><Header pageHeader={'Add Menu items'}/>
    
    <TextBox placeholder={'Name'}/>
    <TextBox placeholder={'Description'}/>
    <TextBox placeholder={'Calories'}/>
    <Button btnText={'Pick Image'} func={pickImageAsync}/>
    <AddtoCartBtn btnText={'Add To Menu'}/>
    
    
   </SafeAreaView>
  )
}

export default special

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})