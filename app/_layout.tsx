import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
      <Stack.Screen name="description" options={{headerShown:true}}/>
      <Stack.Screen name="MyMealsDescription" options={{headerShown:true}}/>
    </Stack>
  );
}
