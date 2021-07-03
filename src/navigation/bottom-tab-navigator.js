/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Icon } from "../custom-candles-page/icon";
import { AllCandlePatternsTab, CustomPatternTab } from "./tabs";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName="TabOne">
      <BottomTab.Screen
        name="Custom Pattern"
        component={CustomPatternTab}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="underlineEdit" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="All Candle Patterns"
        component={AllCandlePatternsTab}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="book" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const TabBarIcon = ({ iconName, color }) => {
  return <Icon name={iconName} color={color} size={30} />;
};
