/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { AllPatternsPage } from "../all-patterns-page/all-patterns-page";
import { PatternIdentifierPage } from "../pattern-identifier-page/pattern-identifier-page";
import { Icon } from "../icon";

const BottomTab = createBottomTabNavigator();

export const PAGES = {
  allCandlesPatterns: "All Candle Patterns",
  patternIdentifier: "Pattern Identifier",
};

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name={PAGES.allCandlesPatterns}
        component={AllPatternsPage}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="book" color={color} size={20} />
          ),
        }}
      />
      <BottomTab.Screen
        name={PAGES.patternIdentifier}
        component={PatternIdentifierPage}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="underlineEdit" color={color} size={20} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const TabBarIcon = ({ iconName, color }) => {
  return <Icon name={iconName} color={color} size={30} />;
};
