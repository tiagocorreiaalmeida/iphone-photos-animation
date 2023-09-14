import { FlatList, ListRenderItem } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback } from "react";

import { images } from "../../data";
import GalleryItem from "./components/GalleryItem";
import { RootStackParamList } from "../../Navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Gallery">;

export const GalleryScreen = ({ navigation }: Props) => {
  const onItemPress = useCallback(
    (itemUrl: string) => {
      navigation.navigate("Detail", { url: itemUrl });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<(typeof images)[0]> = useCallback(
    ({ item }) => <GalleryItem url={item} onPress={() => onItemPress(item)} />,
    [onItemPress]
  );

  return (
    <FlatList
      bounces={false}
      showsVerticalScrollIndicator={false}
      data={images}
      renderItem={renderItem}
      keyExtractor={(_, index) => String(index)}
      numColumns={3}
    />
  );
};
