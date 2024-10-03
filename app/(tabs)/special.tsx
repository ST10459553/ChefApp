import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import SpecialList from '@/components/SpecialList'

const special = () => {
  const {container}=styles
  const[text,setText]=useState('')
  return (
   <SafeAreaView style={container}><Header pageHeader={'My Meals'}/>
    <SearchBar placeholder={'Search Meals'}/>
    
    
    <SpecialList/>
   </SafeAreaView>
  )
}

export default special

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})