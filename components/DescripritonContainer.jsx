import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddtoCartBtn from './AddtoCartBtn'
import { useLocalSearchParams } from 'expo-router'
import { MyMeals } from '@/data/MyMeals'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DescripritonContainer = (props) => {
    const {container,nameStyle,descriptionStyle,caloriesStyle,caloriesStyle2,allergenStyle,allergenStyle2,priceStyle,img,namePriceWrapper}= styles
    const {itemName,itemDescription,itemCalories,itemAllergen,itemPrice}= props
    const {name,price,description,image,calories,allergens,}=useLocalSearchParams()
    const [meals,setMeals]=useState(MyMeals)
    
    const loadMeals = async () => {
        try {
            const savedMeals = await AsyncStorage.getItem('meals');
            if (savedMeals !== null) {
                setMeals(JSON.parse(savedMeals));
            }
        } catch (error) {
            console.error('Error loading meals:', error);
        }
    };

    // Function to save meals only if they don't already exist
    const saveMeals = async () => {
        const newMeal = {
            name,
            image,
            price,
            description,
            calories,
            allergens,
        };

        // Check if the meal already exists
        const mealExists = meals.some(meal => meal.name === newMeal.name); 

        if (!mealExists) {
            const updatedMeals = [...meals, newMeal];
            setMeals(updatedMeals);

            // Save to AsyncStorage
            try {
                await AsyncStorage.setItem('meals', JSON.stringify(updatedMeals));
                console.log('Meal saved successfully');
            } catch (error) {
                console.error('Error saving meal:', error);
            }
        } else {
            console.log('Meal already exists in storage');
        }
    };

    useEffect(() => {
        loadMeals();  // Load meals when the component mounts
    }, []);

    // useEffect(() => {
    //     console.log(meals);
    // }, [meals]);
    

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
        <AddtoCartBtn func={saveMeals} btnText={'Add to Meals'}/>
        </View>
        
    </View>
  )
}

export default DescripritonContainer

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
        fontWeight:'bold',
        color:'#FFF114'
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