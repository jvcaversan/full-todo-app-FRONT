import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootBottomTabParamList } from "./types";
import React from "react";
import HomeStackNavigator from "./home-stack-navigator";
import CompletedScreen from "screens/completed-screen";
import TodayScreen from "screens/today-screen";
import CategoriesStackNavigator from "./categories-stack-navigator";
import Icons from "components/shared/icons";
import theme from "utils/theme";
import { useTheme } from "@shopify/restyle";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: theme.colors.gray550,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          title: "Início",
          tabBarIcon: ({ color }) => <Icons name="home" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Today"
        component={TodayScreen}
        options={() => ({
          title: "Hoje",
          tabBarIcon: ({ color }) => <Icons name="calendar" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({
          title: "Completadas",
          tabBarIcon: ({ color }) => <Icons name="completed" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={() => ({
          title: "Categoria",
          tabBarIcon: ({ color }) => <Icons name="categories" color={color} />,
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
