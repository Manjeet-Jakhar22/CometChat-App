import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { useTheme } from "../theme";

const { width: screenWidth } = Dimensions.get("window");

// Constants for dimensions
const padding = 20;
const listItemHeight = 25; // Increased from 15 to 25
const listItemSpacing = 54; // Adjust if necessary
const avatarRadius = 25; // Increased from 12 to 20
const listItemCount = 14;

const SkeletonItemBottom = () => {
  const theme = useTheme();

  // Calculate the total height needed for the SVG
  const totalHeight = padding + listItemCount * (listItemHeight + listItemSpacing);

  return (
    <Svg height={totalHeight} width={screenWidth} fill='none' preserveAspectRatio='xMidYMid meet'>
      {/* List Items */}
      {Array.from({ length: listItemCount }).map((_, index) => {
        const itemY = padding + index * (listItemHeight + listItemSpacing) - 20;

        return (
          <React.Fragment key={index}>
            {/* Avatar Circle */}
            <Circle
              cx={padding + avatarRadius}
              cy={itemY + avatarRadius}
              r={avatarRadius}
              fill='url(#paint0_linear)'
            />

            {/* Username Rectangle */}
            <Rect
              x={padding + 2 * avatarRadius + 12} // 12 units spacing after avatar
              y={itemY + 12}
              width={screenWidth - (padding + 2 * avatarRadius + 12 + padding)}
              height={listItemHeight}
              rx={listItemHeight / 2} // Rounded corners matching height
              fill='url(#paint0_linear)'
            />
          </React.Fragment>
        );
      })}

      {/* Gradient Definition */}
      <Defs>
        <LinearGradient
          id='paint0_linear'
          x1='0'
          y1='0'
          x2={screenWidth}
          y2='0'
          gradientUnits='userSpaceOnUse'
        >
          <Stop stopColor={theme.groupMemberStyle.skeletonStyle.linearGradientColors[0]} />
          <Stop
            offset='1'
            stopColor={theme.groupMemberStyle.skeletonStyle.linearGradientColors[1]}
          />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

const SkeletonItemTop = () => {
  const theme = useTheme();

  // Calculate the total height needed for the SVG
  const totalHeight = padding + listItemCount * (listItemHeight + listItemSpacing);

  return (
    <Svg height={totalHeight} width={screenWidth} fill='none' preserveAspectRatio='xMidYMid meet'>
      {/* List Items */}
      {Array.from({ length: listItemCount }).map((_, index) => {
        const itemY = padding + index * (listItemHeight + listItemSpacing) - 20;

        return (
          <React.Fragment key={index}>
            {/* Avatar Circle */}
            <Circle
              cx={padding + avatarRadius}
              cy={itemY + avatarRadius}
              r={avatarRadius}
              fill={theme.groupMemberStyle.skeletonStyle.backgroundColor}
            />

            {/* Username Rectangle */}
            <Rect
              x={padding + 2 * avatarRadius + 12} // 12 units spacing after avatar
              y={itemY + 12}
              width={screenWidth - (padding + 2 * avatarRadius + 12 + padding)}
              height={listItemHeight}
              rx={listItemHeight / 2} // Rounded corners matching height
              fill={theme.groupMemberStyle.skeletonStyle.backgroundColor}
            />
          </React.Fragment>
        );
      })}
    </Svg>
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
          duration: (1 / theme.groupMemberStyle.skeletonStyle.speed) * 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };

    startShimmer();
  }, [animatedValue, theme.groupMemberStyle.skeletonStyle.speed]);

  const shimmerTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth * 2, screenWidth],
  });

  return (
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: theme.groupMemberStyle?.containerStyle?.backgroundColor }}
    >
      <SkeletonItemBottom />
      <Animated.View
        style={[
          {
            transform: [
              { translateX: shimmerTranslateX },
              { translateY: -20 },
              { rotate: "15deg" },
            ],
          },
          styles.animatedView,
          {
            backgroundColor: theme.groupMemberStyle.skeletonStyle.shimmerBackgroundColor,
            opacity: theme.groupMemberStyle.skeletonStyle.shimmerOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          {
            transform: [
              {
                translateX: Animated.add(shimmerTranslateX, screenWidth / 2),
              },
              { translateY: -20 },
              { rotate: "15deg" },
            ],
          },
          styles.animatedView,
          {
            backgroundColor: theme.groupMemberStyle.skeletonStyle.shimmerBackgroundColor,
            opacity: theme.groupMemberStyle.skeletonStyle.shimmerOpacity,
          },
        ]}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <SkeletonItemTop />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    width: "25%",
    top: 0,
    bottom: 0,
    position: "absolute",
  },
});
