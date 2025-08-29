import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Circle, Rect, Stop } from "react-native-svg";
import { useTheme } from "../../../theme";

const CircleSkeleton = () => {
  const theme = useTheme();

  return (
    <View style={styles.circleContainer}>
      <Svg height={50} width={70}>
        <Defs>
          <LinearGradient
            id='circleGradient'
            x1={0}
            y1={0}
            x2={40}
            y2={1}
            gradientUnits='userSpaceOnUse'
          >
            <Stop stopColor={theme.mentionsListStyle.skeletonStyle.linearGradientColors[0]} />
            <Stop
              offset={1}
              stopColor={theme.mentionsListStyle.skeletonStyle.linearGradientColors[1]}
            />
          </LinearGradient>
        </Defs>
        <Circle cx={34.5} cy={25} r={20} fill='url(#circleGradient)' />
      </Svg>
    </View>
  );
};

const RectangleSkeleton = () => {
  const theme = useTheme();

  return (
    <View style={styles.rectangleContainer}>
      <Svg height={50} width={270}>
        <Defs>
          <LinearGradient
            id='rectangleGradient'
            x1={0}
            y1={24}
            x2={240}
            y2={24}
            gradientUnits='userSpaceOnUse'
          >
            <Stop stopColor={theme.mentionsListStyle.skeletonStyle.linearGradientColors[0]} />
            <Stop
              offset={1}
              stopColor={theme.mentionsListStyle.skeletonStyle.linearGradientColors[1]}
            />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={17} width={270} height={20} rx={10} fill='url(#rectangleGradient)' />
      </Svg>
    </View>
  );
};

export const Skeleton = () => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmer = () => {
      animatedValue.setValue(0);
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: theme.mentionsListStyle.skeletonStyle.speed * 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };

    startShimmer();
  }, [animatedValue]);

  const shimmerTranslateXCircle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  const shimmerTranslateXRectangle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 130],
  });

  return (
    <ScrollView>
      {new Array(20).fill(0).map((_, i) => (
        <View key={i} style={styles.skeletonContainer}>
          <View style={theme.mentionsListStyle.listItemStyle.containerStyle}>
            <View style={styles.circleWrapper}>
              <CircleSkeleton />
              <Animated.View
                style={[
                  styles.circleShimmer,
                  {
                    transform: [{ translateX: shimmerTranslateXCircle }],
                    backgroundColor: theme.mentionsListStyle.skeletonStyle.shimmerBackgroundColor,
                    opacity: theme.mentionsListStyle.skeletonStyle.shimmerOpacity,
                  },
                ]}
              />
            </View>
            <View style={styles.rectangleWrapper}>
              <RectangleSkeleton />
              <Animated.View
                style={[
                  styles.rectangleShimmer,
                  {
                    transform: [{ translateX: shimmerTranslateXRectangle }],
                    backgroundColor: theme.mentionsListStyle.skeletonStyle.shimmerBackgroundColor,
                    opacity: theme.mentionsListStyle.skeletonStyle.shimmerOpacity,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: "row", // Align skeleton items in a row
    alignItems: "center", // Center items vertically
  },
  skeletonRow: {
    flexDirection: "row", // Arrange circle and rectangle side by side
    alignItems: "center", // Center align vertically
  },
  circleWrapper: {
    position: "relative", // Allow absolute positioning for shimmer effect
    height: 50, // Reduced height
    width: 40, // Width to match the SVG
    overflow: "hidden",
    alignSelf: "center",
  },
  circleContainer: {
    height: 50, // Height matching the SVG
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally,
  },
  circleShimmerContainer: {
    position: "absolute",
    top: 5,
    left: 15, // Start shimmer from the left
    height: 40, // Match the SVG height
    width: 40, // Ensure shimmer is wide enough to cover the circle
    overflow: "hidden", // Hide anything that goes outside this container
    borderRadius: 50, // Fully round to match the circle
  },
  circleShimmer: {
    height: 40,
    width: 40, // This matches the shimmer width
    borderRadius: 20, // Make it circular
    position: "absolute",
    left: 0,
    top: 5,
  },
  rectangleWrapper: {
    flex: 1, // Allow the rectangle to take the remaining space
    position: "relative", // Allow absolute positioning for shimmer effect
    alignSelf: "center",
    justifyContent: "center",
  },
  rectangleContainer: {
    position: "relative",
  },
  rectangleShimmer: {
    position: "absolute",
    top: 17,
    left: 0, // Ensure it's aligned to the left of the rectangle
    height: 20, // Match the height of the rectangle
    width: 140, // Match the width of the rectangle
    borderRadius: 10, // Optional: Add rounded corners to the shimmer
  },
});
