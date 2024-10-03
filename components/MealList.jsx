import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyMeals } from '@/data/MyMeals';
import { useRouter } from 'expo-router';

const MealList = () => {
    const [meals, setMeals] = useState([]);
    const router =useRouter()


    // Load meals from AsyncStorage
    const loadMeals = async () => {
        try {
            const savedMeals = await AsyncStorage.getItem('meals');
            if (savedMeals !== null) {
                setMeals(JSON.parse(savedMeals));
                // await AsyncStorage.removeItem('meals');
            }
        } catch (error) {
            console.error('Error loading meals:', error);
        }
        
    };


    useEffect(() => {
        loadMeals();  // Load meals when the component mounts
        
    }, [meals]);
    

    // Render each meal item
    const renderMealItem = ({ item }) => (
      <ScrollView>
        <TouchableOpacity style={styles.mealContainer} onPress={()=>{
            router.push({
                pathname:'/MyMealsDescription',
                params:{
                    name:item.name,
                    price: item.price,
                    description: item.description,
                    image: item.image,
                    calories:item.calories,
                    allergens:item.allergens,
                }
            })
        }}>
            <Image style={styles.mealImage} source={ item.image } />
            <Text style={styles.mealName}>{item.name}</Text>
            <Text style={styles.mealPrice}>R{item.price}</Text>
            <Text style={styles.mealDescription}>{item.description}</Text>
            <Text style={styles.mealCalories}>Calories: {item.calories}</Text>
            <Text style={styles.mealAllergens}>Allergens: {item.allergens}</Text>
        </TouchableOpacity></ScrollView>
    );

    return (
        <FlatList
            data={meals}
            renderItem={renderMealItem}
            keyExtractor={(item) => item.name} 
        />
    );
};

export default MealList;

const styles = StyleSheet.create({
    mealContainer: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    mealImage: {
        height: 200,
        width: '100%',
        borderRadius: 10,
    },
    mealName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    mealPrice: {
        fontSize: 18,
        color: 'green',
    },
    mealDescription: {
        fontSize: 16,
    },
    mealCalories: {
        fontSize: 14,
        color: 'gray',
    },
    mealAllergens: {
        fontSize: 14,
        color: 'red',
    },
});
