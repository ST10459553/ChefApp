import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddtoCartBtn from '../components/AddtoCartBtn'
import { useLocalSearchParams } from 'expo-router'
import { MyMeals } from '@/data/MyMeals'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyMealsDescription = () => {
    const {name,price,description,image,calories,allergens,}=useLocalSearchParams()
    const {container,nameStyle,descriptionStyle,caloriesStyle,caloriesStyle2,allergenStyle,allergenStyle2,priceStyle,img,namePriceWrapper}= styles
    const [meals,setMeals]=useState(MyMeals)

    const removeMeal=async()=>{
        try{
            const savedMeals=await AsyncStorage.getItem('meals')
            if (savedMeals!==null){
                const parsedMeals=JSON.parse(savedMeals);
                const updatedMeals=parsedMeals.filter(meal=>meal.name!==name)

                await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
                console.log('Meal removed successfully');
                setMeals(updatedMeals);
            } 
        }
        catch(e){
            console.log('error removing meal',e)
        }
    }
    useEffect(()=>{

    },[meals])
    return (
        <View style={container}>
            <Image style={styles.img} source={image}/>
            <View style={styles.textWrapper}>
            <View style={namePriceWrapper}>
            <Text style={nameStyle}>{name}</Text>
            <Text style={priceStyle}>R{price}</Text>
            </View>
            <Text style={descriptionStyle}>{description}</Text>
            <Text style={caloriesStyle}>Calories</Text>
            <Text style={caloriesStyle2}>{calories}</Text>
            <Text style={allergenStyle}>Allergen</Text>
            <Text style={allergenStyle2}>{allergens}</Text>
            <AddtoCartBtn func={removeMeal} btnText={'Delete'}/>
            </View>
            
        </View>
      )
}

export default MyMealsDescription

const styles = StyleSheet.create({
    container:{
        
        flexDirection:'column',
        justifyContent:'space-evenly',
        // overflow:'hidden',
        // borderRadius:50,

    },
    imgContainer:{
        // // flex:0.2,
        // height:500,
        
    },
    img:{
        height:330,
        width:500,
        objectFit:'cover',
        overflow:'hidden'
    },
    textWrapper:{
        height:'75%',
        borderTopLeftRadius: 30,  
        borderTopRightRadius: 30,
        flexDirection:'column',
        // justifyContent:'space-evenly',
        backgroundColor:'white',
        overflow:'hidden',
        padding:10
    },
    namePriceWrapper:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginLeft:10
        
    },
    nameStyle:{
        fontSize:25,
        width:'70%'


    },

    priceStyle:{
        fontSize:30,
        fontWeight:'bold'
    },
    descriptionStyle:{
        marginLeft:10,
        margin:10,
        fontSize:20
        
    },
    caloriesStyle:{
        margin:10,
        marginLeft:10,
        fontSize:30,
        fontWeight:'bold',
    },
    caloriesStyle2:{
        margin:10,
        marginLeft:10,
        fontSize:25
        
    },
    allergenStyle:{
         margin:10,
         marginLeft:10,
         fontSize:30,
         fontWeight:'bold',
         
        
    },
    allergenStyle2:{
         margin:10,
         marginLeft:10,
         fontSize:25,
         color:'red'
        
    },



})