import { Stack, Tabs } from "expo-router";
import Octicons from '@expo/vector-icons/Octicons';
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function RootLayout() {
  const {}=styles
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarInactiveTintColor:'grey',
      tabBarActiveTintColor:'#FFF114',
      tabBarLabelStyle:{display:"none"},
      

      
      }}>
    <Tabs.Screen name='index' options={{title:'Home',
      tabBarIcon:({color,focused})=>(
        <Octicons name="home" size={30} color={focused? '#FFF114':'grey' } />
      )
    }}/>
    <Tabs.Screen name='special' options={{title:'Special',tabBarIcon:({color,focused})=>(<MaterialCommunityIcons name="chef-hat" color={focused? '#FFF114':'grey'} size={30}/>)}}/>
    <Tabs.Screen name='meals' options={{title:'Meals',
      tabBarIcon:({color,focused})=>(<FontAwesome name="user" size={30} color={focused? '#FFF114':'grey'}/>)
    }}/>
   </Tabs>
  );
}

const styles=StyleSheet.create({
  iconPosition:{
    justifyContent:'center',
    verticalAlign:'middle'
  }
})