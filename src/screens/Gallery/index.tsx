import { FlatList, ListRenderItem } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback } from "react";

import { images } from "../../data";
import { GalleryItem } from "./components/GalleryItem";
import { RootStackParamList } from "../../Navigation";
import { GalleryItem as GalleryItemType } from "../../types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

const data: GalleryItemType[] = images.map((image, index) => ({
  id: String(index),
  url: image,
}));

type Props = NativeStackScreenProps<RootStackParamList, "Gallery">;

export const GalleryScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();

  const onItemPress = useCallback(
    (item: GalleryItemType) => {
      navigation.navigate("Detail", { item });
    },
    [navigation]
  );

  const renderItem: ListRenderItem<GalleryItemType> = useCallback(
    ({ item }) => <GalleryItem data={item} onPress={() => onItemPress(item)} />,
    [onItemPress]
  );

  return (
    <FlatList
      bounces={false}
      contentContainerStyle={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}
      showsVerticalScrollIndicator={false}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};
