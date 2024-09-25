import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image } from 'react-native'
import React, { useState,useEffect, } from 'react'
import { appetizers } from '@/data/Appetizers'
import { meals } from '@/data/Meals'
import { desserts } from '@/data/Desserts'




const RoundedButton = () => {
    const {container,button,textBtn,buttonActive,gridContainer,name,price,image}=styles
    const [active,setActive]=useState('Appetizers')
    const [data, setData] = useState(appetizers);

    // useEffect based on when the active state changes will change arrays that will used for the flatlist depending on the active button
    useEffect(() => {
      switch (active) {
          case 'Meals':
              setData(meals);
              break;
          case 'Desserts':
              setData(desserts);
              break;
          case 'Appetizers':
          default:
              setData(appetizers);
              break;
      }
  }, [active]);
 
  // redner function how the items are gonna be rendered
  const renderItem = ({ item }) => (
    <View style={gridContainer}>
      <Image style={image} source={(item.image)}/>
        <Text style={name}>{item.name}</Text>
        {/* <Text style={}>{item.description}</Text> */}
        <Text style={price}>R{item.price.toFixed(2)}</Text>
    </View>
    )
 
  return (
    <View style={{flex:1}}>
    <View style={container}>
      {/* change button style depneidng on active state */}
      <TouchableOpacity style={active==='Appetizers' ? buttonActive:button} onPress={()=>setActive('Appetizers')}><Text style={textBtn}>Appetizers</Text></TouchableOpacity>
      <TouchableOpacity style={active==='Meals'? buttonActive:button}><Text style={textBtn} onPress={()=>{setActive('Meals')}}>Meals</Text></TouchableOpacity>
      <TouchableOpacity style={active==='Desserts'? buttonActive:button} onPress={()=>{setActive('Desserts')}}><Text style={textBtn}>Desserts</Text></TouchableOpacity>
    </View>
    <FlatList 
    data={data}
    renderItem={renderItem}
    keyExtractor={(item)=>item.name}
    numColumns={2}
    
    />
    </View>
  )
}

export default RoundedButton

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10
        
    },
    button:{
        backgroundColor:'grey',
        padding:13,
        borderRadius:30
    },
    buttonActive:{
      backgroundColor:'#1422FF',
      padding:13,
        borderRadius:30
    },
    textBtn:{
        fontSize:16,
        color:'white'
    },
    gridContainer:{
      flex:1,
      gap:9,
      justifyContent:'center',
      alignItems:'center',
      margin:5,
      
      

    },
    image:{
      height:250,
      width:'100%',
      objectFit:'cover',
      borderRadius:5,
    }
})