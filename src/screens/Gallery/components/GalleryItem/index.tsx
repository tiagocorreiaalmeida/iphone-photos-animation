import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

interface GalleryItemProps {
  url: string;
  onPress: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ url, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
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
