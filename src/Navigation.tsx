import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailScreen } from "./screens/Detail";
import { GalleryScreen } from "./screens/Gallery";
import type { GalleryItem } from "./types";

export type RootStackParamList = {
  Gallery: undefined;
  Detail: { item: GalleryItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Gallery"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ presentation: "transparentModal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
