import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import DescripritonContainer from '@/components/DescripritonContainer'


const description = () => {
    const {name}=useLocalSearchParams()
  return (
    <View>
      <DescripritonContainer/>
    </View>
  )
}

export default description

const styles = StyleSheet.create({})