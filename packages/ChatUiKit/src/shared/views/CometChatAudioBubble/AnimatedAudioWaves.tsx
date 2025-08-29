import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export const AnimatedAudioWaves = ({
  isAnimating = false,
  waveStyle = {},
  waveContainerStyle = {},
}: {
  isAnimating?: boolean;
  waveStyle?: StyleProp<ViewStyle>;
  waveContainerStyle?: StyleProp<ViewStyle>;
}) => {
  const animatedValues = useRef<Animated.Value[]>([]).current;
  const delayValues = useRef<number[]>([]);
  const [staticBarValues, setStaticBarValues] = useState<{ height: number; marginTop: number }[]>(
    []
  );
  const animationStartedOnce = useRef(false);

  useEffect(() => {
    if (isAnimating === false || animatedValues.length === 0 || staticBarValues.length === 0) {
      return () => {};
    }
    startAnimation();
    return () => {
      stopAnimation();
    };
  }, [isAnimating, animatedValues]);

  const onLayoutHandler = useCallback(
    (event: LayoutChangeEvent) => {
      if (animationStartedOnce.current) {
        return;
      }
      const containerWidth = event.nativeEvent.layout.width;
      const barWidth = 2;
      const barMargin = 2;
      const totalBarWidth = barWidth + barMargin;

      let numBars = Math.floor(containerWidth / totalBarWidth);
      if (staticBarValues.length > numBars) {
        numBars = staticBarValues.length;
      }
      animatedValues.splice(
        0,
        animatedValues.length,
        ...Array(numBars)
          .fill(0)
          .map(() => new Animated.Value(1))
      );

      if (staticBarValues.length === 0 || animatedValues.length !== staticBarValues.length) {
        const newStaticBarValues = Array(numBars)
          .fill(0)
          .map(() => ({
            height: Math.floor(Math.random() * (20 - 4 + 1)) + 4,
            marginTop: Math.floor(Math.random() * 5),
          }));
        setStaticBarValues(newStaticBarValues);
        delayValues.current = Array(numBars)
          .fill(0)
          .map(() => Math.random());
      }
    },
    [staticBarValues]
  );

  const startAnimation = () => {
    for (let i = 0; i < animatedValues.length; i++) {
      const delay = Math.floor(Math.random() * 500);
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValues[i], {
            toValue: delayValues.current[i],
            duration: 800,
            delay: delay,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValues[i], {
            toValue: 1,
            duration: 400,
            delay: delay,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
    animationStartedOnce.current = true;
  };

  const stopAnimation = () => {
    animatedValues.forEach((animatedValue) => {
      animatedValue.stopAnimation();
    });
  };

  return (
    <View style={[styles.waveStyleContainer, waveContainerStyle]} onLayout={onLayoutHandler}>
      {animatedValues.map((animatedValue, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              styles.waveStyle,
              waveStyle,
              {
                transform: [{ scaleY: animatedValue }],
                height: staticBarValues[index]?.height, // Use optional chaining to avoid undefined errors
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  waveStyleContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 30,
    overflow: "hidden",
  },
  waveStyle: {
    backgroundColor: "#FFFFFF",
    height: 18,
    marginHorizontal: 1,
    width: 2,
  },
});
