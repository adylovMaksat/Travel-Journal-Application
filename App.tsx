import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

import { JournalProvider } from "./src/context/JournalContext";

import HomeScreen from "./src/screens/HomeScreen";
import ListScreen from "./src/screens/ListScreen";
import AddEntryScreen from "./src/screens/AddEntryScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import EditEntryScreen from "./src/screens/EditEntryScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 75,
          paddingTop: 10,
          paddingBottom: 10,
        },

        tabBarLabelStyle: {
          fontFamily: "Montserrat_700Bold",
          fontSize: 12,
          marginBottom: 2,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="My List"
        component={ListScreen}
      />

      <Tab.Screen
        name="Add"
        component={AddEntryScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <JournalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: "Trip Details",
              headerTitleStyle: {
                fontFamily: "Montserrat_700Bold",
              },
            }}
          />
          <Stack.Screen
  name="EditEntry"
  component={EditEntryScreen}
  options={{
    title: "Edit Trip",
  }}
/>
        </Stack.Navigator>
      </NavigationContainer>
    </JournalProvider>
  );
}