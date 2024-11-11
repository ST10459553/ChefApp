import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { appetizers } from '@/data/Appetizers';
import { meals } from '@/data/Meals';
import { desserts } from '@/data/Desserts';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoundedButton = () => {
  function CalcAverage(array) {
    let count = 0;
    let sum = 0;
    array.forEach((item) => {
      count++;
      sum += item.price;
    });
    const average = count > 0 ? sum / count : 0;
    return average;
  }

  function CalcTotal(array) {
    let count = 0;
    array.forEach(() => {
      count++;
    });
    return count;
  }

  const saveArray = async (array, localStorageName) => {
    try {
      const jsonValue = JSON.stringify(array);
      await AsyncStorage.setItem(localStorageName, jsonValue);
    } catch (error) {
      console.error('Error saving array:', error);
    }
  };

  const loadMeals = async (key) => {
    try {
      const savedItems = await AsyncStorage.getItem(key);
      if (savedItems !== null) {
        setArray(JSON.parse(savedItems));  // This will update the state
      }
    } catch (error) {
      console.error('Error loading meals:', error);
    }
  };

  useEffect(() => {
    // Save initial data to AsyncStorage
    saveArray(appetizers, 'Appetizers');
    saveArray(meals, 'Meals');
    saveArray(desserts, 'Desserts');
  }, []);

  const { container, button, textBtn, buttonActive, gridContainer, name, price, image, imgBtn, averagePriceStyle } = styles;
  const [active, setActive] = useState('Appetizers');
  const [array, setArray] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadMeals(active); // Load data whenever active category changes
  }, [active]);

  const averagePrice = CalcAverage(array);
  const totalItem = CalcTotal(array);

  const goToDescription = (item) => {
    router.push({
      pathname: '/description',
      params: {
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
        calories: item.calories,
        allergens: item.allergens,
      },
    });
  };

  // render function for FlatList
  const renderItem = ({ item }) => (
    <View style={gridContainer}>
      <TouchableOpacity style={imgBtn} onPress={() => goToDescription(item)}>
        <Image style={image} source={item.image} />
        <Text style={name}>{item.name}</Text>
        <Text style={price}>R{item.price.toFixed(2)}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={container}>
        <TouchableOpacity style={active === 'Appetizers' ? buttonActive : button} onPress={() => setActive('Appetizers')}>
          <Text style={textBtn}>Appetizers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={active === 'Meals' ? buttonActive : button} onPress={() => setActive('Meals')}>
          <Text style={textBtn}>Meals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={active === 'Desserts' ? buttonActive : button} onPress={() => setActive('Desserts')}>
          <Text style={textBtn}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <Text style={averagePriceStyle}>Average Price: R{averagePrice.toFixed(2)}       Total Items: {totalItem}</Text>

      <FlatList
        data={array}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'grey',
    padding: 13,
    borderRadius: 30,
  },
  buttonActive: {
    backgroundColor: '#1422FF',
    padding: 13,
    borderRadius: 30,
  },
  textBtn: {
    fontSize: 16,
    color: 'white',
  },
  gridContainer: {
    flex: 1,
    gap: 0,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    height: 220,
    width: 170,
    objectFit: 'cover',
    borderRadius: 5,
  },
  imgBtn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  averagePriceStyle: {
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
  },
});
