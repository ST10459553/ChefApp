import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import { useState } from 'react'
import RoundedButton from '@/components/RoundedButton'

const index = () => {
  const {container}=styles
  const [text,setText]=useState('')
  return (
  <SafeAreaView style={container}>
    <Header pageHeader='Main Menu'/>
    <SearchBar changeText={setText} placeholder={'Search'}/>
    <RoundedButton/>
  </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
