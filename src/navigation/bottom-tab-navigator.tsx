import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import React from "react";
import HomeStackNavigator from "./home-stack-navigator";
import CompletedScreen from "screens/completed-screen";
import TodayScreen from "screens/today-screen";
import CategoriesStackNavigator from "./categories-stack-navigator";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
      <Tab.Screen name="Completed" component={CompletedScreen} />
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="CategoriesStack" component={CategoriesStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
