import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { DISMISS_TRIGGER_PERCENTAGE } from "./constants";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export const DetailScreen = ({ route, navigation }: Props) => {
  const { url, id } = route.params.item;

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  const showBackground = useSharedValue(0);
  const xPosition = useSharedValue(0);
  const yPosition = useSharedValue(0);

  const panGesture = Gesture.Pan()
    // .activateAfterLongPress(300)
    .onUpdate((e) => {
      showBackground.value = 1;
      xPosition.value = e.translationX;
      yPosition.value = e.translationY;
    })
    .onEnd((e) => {
      const shouldDismiss =
        e.translationY > windowWidth * DISMISS_TRIGGER_PERCENTAGE;

      if (shouldDismiss) {
        showBackground.value = 0;
        return runOnJS(navigation.goBack)();
      }

      xPosition.value = withTiming(0);
      yPosition.value = withTiming(0);
    });

  const backgroundAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: showBackground.value,
      backgroundColor: interpolateColor(
        yPosition.value,
        [0, windowHeight * 0.02, windowHeight * 0.5, windowHeight],
        ["rgba(0,0,0,1)", "rgba(0,0,0,1)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"]
      ),
    };
  }, [windowHeight]);

  const imageAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            yPosition.value,
            [0, windowHeight * 0.02, windowHeight * 0.5, windowHeight],
            [1, 1, 0.8, 0.4]
          ),
        },
        { translateX: xPosition.value },
        { translateY: yPosition.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{ flex: 1 }]}>
        <Animated.View
          style={[StyleSheet.absoluteFill, backgroundAnimatedStyles]}
        />
        <Animated.Image
          sharedTransitionTag={id}
          source={{ uri: url }}
          style={[
            {
              flex: 1,
            },
            imageAnimatedStyles,
          ]}
          resizeMode="cover"
        />
      </Animated.View>
    </GestureDetector>
  );
};
