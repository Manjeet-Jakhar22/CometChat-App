import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { useTheme } from "../theme";

const { width: screenWidth } = Dimensions.get("window");

const SkeletonItem = () => {
  const theme = useTheme();

  const width = useRef(Math.floor(screenWidth / 2.5 + Math.random() * (screenWidth / 2.5))).current;
  const alignSelf = useRef(
    Math.floor(Math.random() * 2) == 0 ? ("flex-end" as const) : ("flex-start" as const)
  ).current;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startShimmer = () => {
      animatedValue.setValue(0);
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: theme.conversationStyles.skeletonStyle.speed * 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };

    startShimmer();
  }, [animatedValue]);

  const shimmerTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth],
  });
  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: 8,
        width: width,
        marginVertical: 12,
        alignSelf: alignSelf,
      }}
    >
      <Svg width={width} height={53} viewBox={`0 0 ${width} 53`} fill='none'>
        <Path d={`M${width} 0H0v53h${width}V0z`} fill='url(#paint0)' />
        <Defs>
          <LinearGradient
            id='paint0'
            x1={0}
            y1={26.5}
            x2={width}
            y2={26.5}
            gradientUnits='userSpaceOnUse'
          >
            <Stop stopColor={theme.conversationStyles.skeletonStyle.linearGradientColors[0]} />
            <Stop
              offset={1}
              stopColor={theme.conversationStyles.skeletonStyle.linearGradientColors[1]}
            />
          </LinearGradient>
        </Defs>
      </Svg>
      <Animated.View
        style={[
          { transform: [{ translateX: shimmerTranslateX }] },
          styles.animatedView,
          {
            backgroundColor: theme.conversationStyles.skeletonStyle.shimmerBackgroundColor,
            opacity: theme.conversationStyles.skeletonStyle.shimmerOpacity,
          },
        ]}
      ></Animated.View>
    </View>
  );
};

export const MessageSkeleton = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
      {new Array(10).fill(0).map((_, i) => {
        return <SkeletonItem key={i} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    width: "40%",
    top: 0,
    bottom: 0,
    position: "absolute",
  },
});
