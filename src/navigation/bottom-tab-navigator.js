/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { AllPatternsPage } from "../all-patterns-page/all-patterns-page";
import { CustomCandlesPage } from "../custom-candles-page/custom-candles-page";
import { Icon } from "../icon";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="All Candle Patterns"
        component={AllPatternsPage}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="book" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Pattern Identifier"
        component={CustomCandlesPage}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="underlineEdit" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const TabBarIcon = ({ iconName, color }) => {
  return <Icon name={iconName} color={color} size={30} />;
};
