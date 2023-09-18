import { useWindowDimensions } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation";
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const DISMISS_TRIGGER_PERCENTAGE = 0.1;

export const DetailScreen = ({ route, navigation }: Props) => {
  const { url } = route.params;

  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const xPosition = useSharedValue(0);
  const yPosition = useSharedValue(0);

  const panGesture = Gesture.Pan()
    // .activateAfterLongPress(300)
    .onUpdate((e) => {
      xPosition.value = e.translationX;
      yPosition.value = e.translationY;
    })
    .onEnd((e) => {
      const shouldDismiss =
        windowWidth * DISMISS_TRIGGER_PERCENTAGE < e.translationY;
      if (shouldDismiss) {
        return runOnJS(navigation.goBack)();
      }

      console.log("reset");
      xPosition.value = withTiming(0);
      yPosition.value = withTiming(0);
    });

  const containerAnimatedStyles = useAnimatedStyle(() => {
    return {
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
      <Animated.View style={[{ flex: 1 }, containerAnimatedStyles]}>
        <Animated.Image
          sharedTransitionTag={url}
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
