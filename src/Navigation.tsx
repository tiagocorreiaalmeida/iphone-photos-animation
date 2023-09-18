import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailScreen } from "./screens/Detail";
import { GalleryScreen } from "./screens/Gallery";

export type RootStackParamList = {
  Gallery: undefined;
  Detail: { url: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ presentation: "transparentModal", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
