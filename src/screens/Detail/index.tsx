import { Image, Text, View } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export const DetailScreen = ({ route }: Props) => {
  const { url } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: url }} style={{ flex: 1 }} resizeMode="cover" />
    </View>
  );
};
