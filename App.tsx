import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { JournalProvider } from "./src/context/JournalContext";

import HomeScreen from "./src/screens/HomeScreen";
import ListScreen from "./src/screens/ListScreen";
import AddEntryScreen from "./src/screens/AddEntryScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DetailsScreen from "./src/screens/DetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
  return (
    <JournalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Details"
            component={DetailsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </JournalProvider>
  );
}