import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import TextBox from "./TextBox";
import Button from "./Button";
import AddtoCartBtn from "./AddtoCartBtn";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import { appetizers } from "@/data/Appetizers";
import { desserts } from "@/data/Desserts";
import { meals } from "@/data/Meals";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Header = (props: any) => {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.');
    }
  };
  const { container } = styles;
  const { pageHeader } = props;
  const [name,setName]=useState('')
  const [description,setDescription]=useState('')
  const [calories,setCalories]=useState('')
  const [price,setPrice]=useState('')
  const [allergens,setAllergens]=useState('')
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Appetizer");
  const [image, setImage] = useState('');
  const id=Math.random()*1000
  const [meal,setMeal]=useState()
  const [key,setKey]=useState('Appetizers')
  const [mealData, setMealData] = useState([]);

const createMenuItem = async () => {
  const newItem = {
    id,
    name,
    image,
    price: parseFloat(price),
    description,
    calories: parseInt(calories, 10),
    allergens,
  };

  let updatedItem: any[] = [];
  
  try {
    // Load the existing list from AsyncStorage
    const storedItems = await AsyncStorage.getItem(key);
    if (storedItems !== null) {
      updatedItem = JSON.parse(storedItems);  // If items exist, parse them
    }
  } catch (error) {
    console.error('Error loading existing items:', error);
  }

  // Add the new item to the list
  updatedItem.push(newItem);

  // Switch case to determine which category we're working with
  switch (category) {
    case 'Appetizer':
      setKey('Appetizers');
      break;
    case 'Dessert':
      setKey('Desserts');
      break;
    case 'Meal':
      setKey('Meals');
      break;
  }

  // Save the updated list back to AsyncStorage
  try {
    await AsyncStorage.setItem(key, JSON.stringify(updatedItem));
    console.log(`${key} updated successfully with ${name}`);
    
    // Reset form fields
    setName('');
    setDescription('');
    setCalories('');
    setPrice('');
    setAllergens('');
    setImage('');
    
    // Close the modal
    setOpen(false);
  } catch (error) {
    console.error('Error saving updated item list:', error);
  }

  // Log the updated list
  console.log(await AsyncStorage.getItem(key));
};

useEffect(() => {
  const loadMenuItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem(key);
      if (storedItems !== null) {
        setMealData(JSON.parse(storedItems));  // Update the state with the stored items
      }
    } catch (error) {
      console.error("Error loading menu items:", error);
    }
  };

  if (key) {
    loadMenuItems();
  }
}, [category])

// useEffect(()=>{
//   setKey(category)
// },[category])
  return (
    <View style={container}>
      <MaterialIcons name="sort" size={40} color="black" />
      <Text style={{ fontSize: 30, textAlign: "center" }}>{pageHeader}</Text>
      {pageHeader === "Main Menu" ? (
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Entypo name="add-to-list" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}


      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text>Add Item</Text>
            <TextBox placeholder={"Name"} onChangeText={(text:String)=>setName(text.toString())} />
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Appetizer" value="Appetizer" />
              <Picker.Item label="Meal" value="Meal" />
              <Picker.Item label="Dessert" value="Dessert" />
            </Picker>
            <TextBox placeholder={"Description"} onChangeText={(text:String)=>setDescription(text.toString())}/>
            <TextBox placeholder={"Price"} onChangeText={(text:number)=>setPrice(text.toString())}/>
            <TextBox placeholder={"Allergens"} onChangeText={(text:String)=>setAllergens(text.toString())}/>
            <TextBox placeholder={"calories"} onChangeText={(text:number)=>setCalories(text.toString())}/>
            <Button btnText={"Pick Image"}func={pickImageAsync} />
            <AddtoCartBtn btnText={"Add To Menu"} func={createMenuItem}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    height: "80%",
    justifyContent: "flex-start", 
    alignItems: "center",
    position: "absolute",
    top: "25%",
    left: 0,
    right: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  picker: {
    height: 50,
    width: 200,
  },
});
