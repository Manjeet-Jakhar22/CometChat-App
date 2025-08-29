import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, View } from "react-native";
import Svg, { Defs, G, LinearGradient, Path, Stop } from "react-native-svg";
import { useTheme } from "../../../theme";

const { width: screenWidth } = Dimensions.get("window");

const SkeletonItemBottom = () => {
  const theme = useTheme();
  return (
    <Svg
      height={screenWidth / 5}
      viewBox='0 0 360 72'
      fill='none'
      preserveAspectRatio='xMidYMid meet'
    >
      <G>
        <Path d='M64 12H16V60H64V12Z' fill='url(#paint0_linear_4_115)' />
      </G>
      <Path d='M236 16.5H76V35.5H236V16.5Z' fill='url(#paint0_linear_4_115)' />
      <Path d='M344 16.5H284V35.5H344V16.5Z' fill='url(#paint0_linear_4_115)' />
      <Path d='M344 43.5H76V55.5H344V43.5Z' fill='url(#paint0_linear_4_115)' />
      <Defs>
        <LinearGradient
          id='paint0_linear_4_115'
          x1={16}
          y1={36}
          x2={64}
          y2={36}
          gradientUnits='userSpaceOnUse'
        >
          <Stop stopColor={theme.messageInformationStyles.skeletonStyle.linearGradientColors[0]} />
          <Stop
            offset={1}
            stopColor={theme.messageInformationStyles.skeletonStyle.linearGradientColors[1]}
          />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

const SkeletonItemTop = () => {
  const theme = useTheme();
  return (
    <Svg height={screenWidth / 5} viewBox='0 0 360 72' fill='none'>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 0H360V72H0V0ZM16 36C16 22.7452 26.7452 12 40 12C53.2548 12 64 22.7452 64 36C64 49.2548 53.2548 60 40 60C26.7452 60 16 49.2548 16 36ZM84 16.5C79.5817 16.5 76 20.0817 76 24.5V27.5C76 31.9183 79.5817 35.5 84 35.5H228C232.418 35.5 236 31.9183 236 27.5V24.5C236 20.0817 232.418 16.5 228 16.5H84ZM284 24.5C284 20.0817 287.582 16.5 292 16.5H336C340.418 16.5 344 20.0817 344 24.5V27.5C344 31.9183 340.418 35.5 336 35.5H292C287.582 35.5 284 31.9183 284 27.5V24.5ZM82 43.5C78.6863 43.5 76 46.1863 76 49.5C76 52.8137 78.6863 55.5 82 55.5H338C341.314 55.5 344 52.8137 344 49.5C344 46.1863 341.314 43.5 338 43.5H82Z'
        fill={theme.color.background2}
      />
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
          duration: (1 / theme.messageInformationStyles.skeletonStyle.speed) * 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    };

    startShimmer();
  }, [animatedValue]);

  const shimmerTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth * 2, screenWidth],
  });

  return (
    <ScrollView>
      {new Array(20).fill(0).map((_, i) => {
        return <SkeletonItemBottom key={i} />;
      })}
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
            backgroundColor: theme.messageInformationStyles.skeletonStyle.shimmerBackgroundColor,
            opacity: theme.messageInformationStyles.skeletonStyle.shimmerOpacity,
          },
        ]}
      ></Animated.View>
      <Animated.View
        style={[
          {
            transform: [
              { translateX: Animated.add(shimmerTranslateX, screenWidth / 2) },
              { translateY: -20 },
              { rotate: "15deg" },
            ],
          },
          styles.animatedView,
          {
            backgroundColor: theme.messageInformationStyles.skeletonStyle.shimmerBackgroundColor,
            opacity: theme.messageInformationStyles.skeletonStyle.shimmerOpacity,
          },
        ]}
      ></Animated.View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {new Array(20).fill(0).map((_, i) => {
          return <SkeletonItemTop key={i} />;
        })}
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
