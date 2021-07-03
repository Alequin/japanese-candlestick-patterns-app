import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Text } from "react-native";
import { CustomCandlesPage } from "../custom-candles-page/custom-candles-page";

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();
export const CustomPatternTab = () => {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Custom Pattern"
        component={CustomCandlesPage}
        options={{ headerShown: false }}
      />
    </TabOneStack.Navigator>
  );
};

const TabTwoStack = createStackNavigator();
export const AllCandlePatternsTab = () => {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="All Candle Patterns"
        component={Foobar}
        options={{ headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
};

const Foobar = () => {
  return <Text>Hello</Text>;
};
