import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import MealList from '../../components/MealList'

const meals = () => {
  return (
    <SafeAreaView>
        <Header pageHeader={'My Meals'}/>
        <MealList/>
    </SafeAreaView>
  )
}

export default meals

const styles = StyleSheet.create({})