import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

interface GalleryItemProps {
  url: string;
  onPress: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ url, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Animated.Image
        sharedTransitionTag={url}
        source={{ uri: url }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default GalleryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    aspectRatio: 1,
  },
});
