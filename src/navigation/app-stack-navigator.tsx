import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AppStackParamList, AuthStackParamList } from "./types";
import BottomTabNavigator from "./bottom-tab-navigator";

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
