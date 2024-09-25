import { SectionList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {weeklySpecials} from '../data/SpecialItem.js'

const SpecialList = () => {
    const {listContainer,itemName,itemPrice,sectionHeader}=styles
    const renderItem=({item})=>(
      <View style={listContainer}>
        <Text style={itemName}>{item.name}</Text>
        <Text style={itemPrice}>{item.price}</Text>
      </View>

    )
    const renderHeader=({section})=>(
      <Text style={sectionHeader}>{section.title}</Text>
    )
  return (
    <SectionList
    sections={weeklySpecials}
    renderItem={renderItem}
    renderSectionHeader={renderHeader}
    keyExtractor={(item)=>item.data}
    
    />
  )
}

export default SpecialList

const styles = StyleSheet.create({
  listContainer:{flex:1,
    justifyContent:'center',
    borderWidth:1,
    height:170,
    margin:10,
    borderRadius:10,
  },
  itemName:{},
  itemPrice:{},
  sectionHeader:{
    fontSize:25,
    marginLeft:10,
    
  }

})