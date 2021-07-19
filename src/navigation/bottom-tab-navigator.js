/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { AllPatternsPage } from "../all-patterns-page/all-patterns-page";
import { PatternIdentifierPage } from "../pattern-identifier-page/pattern-identifier-page";
import { Icon } from "../components/icon";
import { PAGES } from "./pages";
import { darkGray } from "../colours";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name={PAGES.allCandlesPatterns}
        component={AllPatternsPage}
        options={{
          tabBarIcon: () => <Icon name="book" color={darkGray} size={30} />,
        }}
      />
      <BottomTab.Screen
        name={PAGES.patternIdentifier}
        component={PatternIdentifierPage}
        options={{
          tabBarIcon: () => (
            <Icon name="underlineEdit" color={darkGray} size={30} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
