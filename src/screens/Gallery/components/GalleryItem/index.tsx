import { TouchableOpacity } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";
import { GalleryItem as GalleryItemType } from "../../../../types";
import { styles } from "./styles";

interface GalleryItemProps {
  data: GalleryItemType;
  onPress: () => void;
}

export const GalleryItem: React.FC<GalleryItemProps> = ({ data, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Animated.Image
        sharedTransitionTag={data.id}
        source={{ uri: data.url }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};
