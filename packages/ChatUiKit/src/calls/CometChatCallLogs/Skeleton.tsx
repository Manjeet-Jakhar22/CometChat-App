/**
 * @file Skeleton.tsx
 * @description
 * Shimmer / skeleton loading component for the **Call Logs** list in CometChat UIKit.
 * It renders a column of 20 placeholder rows that mimic an avatar, name, subtitle and a
 * trailing action icon. A diagonal animated gradient (“shimmer”) sweeps across the rows
 * to hint that data is loading.
 *
 * The component is completely theme-aware and can be customised via the `style` prop
 * or by tweaking the UIKit theme’s `callLogsStyles.skeletonStyle` object.
 *
 */

import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from "react-native-svg";
import { useTheme } from "../../theme";
import { CometChatTheme } from "../../theme/type";

const { width: screenWidth } = Dimensions.get("window");

/**
 * Shape of the style object accepted by this component.
 * It is taken straight from the UIKit theme definition so that consumers
 * may override only the bits they need.
 */
type SkeletonStyle = CometChatTheme["callLogsStyles"]["skeletonStyle"];

interface SkeletonProps {
  /**
   * Per-instance style overrides.  **All keys are optional**; any missing keys
   * fall back to the values provided by the current CometChat theme.
   */
  style?: Partial<SkeletonStyle>;
}

/* -------------------------------------------------------------------------- */
/*                                Row layouts                                 */
/* -------------------------------------------------------------------------- */

/**
 * Bottom SVG layer – a set of simple `Rect`s that will receive the animated
 * gradient fill.  Placed below the solid colour mask from `SkeletonItemTop`.
 */
const SkeletonItemBottom: React.FC<SkeletonProps> = ({ style = {} }) => {
  const theme = useTheme();
  const defaults = theme.callLogsStyles.skeletonStyle;

  /*   always-defined fallback */
  const gradientColors =
    style.linearGradientColors ??
    defaults.linearGradientColors ??
    ["#E8E8E8", "#F5F5F5"];

  return (
    <Svg
      height={screenWidth / 5}
      viewBox="0 0 360 72"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Avatar circle replacement */}
      <Rect x="16" y="12" width="48" height="48" fill="url(#shimmerGradient)" />
      {/* Primary text placeholder */}
      <Rect x="76" y="15" width="160" height="22" fill="url(#shimmerGradient)" />
      {/* Secondary text placeholder */}
      <Rect x="76" y="45" width="80" height="12" fill="url(#shimmerGradient)" />
      {/* Trailing icon placeholder */}
      <Rect x="312" y="20" width="32" height="32" fill="url(#shimmerGradient)" />

      <Defs>
        <LinearGradient
          id="shimmerGradient"
          x1={16}
          y1={36}
          x2={64}
          y2={36}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={gradientColors[0]} />
          <Stop offset={1} stopColor={gradientColors[1]} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

/**
 * Top SVG layer – a solid colour mask with transparent “holes” cut out
 * where the animated gradient from `SkeletonItemBottom` should be visible.
 */
const SkeletonItemTop: React.FC<SkeletonProps> = ({ style = {} }) => {
  const theme = useTheme();
  const defaults = theme.callLogsStyles.skeletonStyle;

  return (
    <Svg height={screenWidth / 5} viewBox="0 0 360 72" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H360V72H0V0ZM16 36C16 22.7452 26.7452 12 40 12C53.2548 12 64 22.7452 64 36C64 49.2548 53.2548 60 40 60C26.7452 60 16 49.2548 16 36ZM87 15C80.9249 15 76 19.9249 76 26C76 32.0751 80.9249 37 87 37H225C231.075 37 236 32.0751 236 26C236 19.9249 231.075 15 225 15H87ZM76 51C76 47.6863 78.6863 45 82 45H150C153.314 45 156 47.6863 156 51C156 54.3137 153.314 57 150 57H82C78.6863 57 76 54.3137 76 51ZM322 20C316.477 20 312 24.4772 312 30V42C312 47.5228 316.477 52 322 52H334C339.523 52 344 47.5228 344 42V30C344 24.4772 339.523 20 334 20H322Z"
        fill={
          style.containerBackgroundColor ??
          defaults.containerBackgroundColor
        }
      />
    </Svg>
  );
};

/* -------------------------------------------------------------------------- */
/*                           Main Skeleton component                          */
/* -------------------------------------------------------------------------- */

/**
 * Animated shimmer skeleton for the Call Logs list.
 *
 * @param props.style – Partial style overrides.
 *
 * @example
 * ```tsx
 * <Skeleton
 *   style={{
 *     linearGradientColors: ["#E8E8E8", "#F5F5F5"],
 *     shimmerBackgroundColor: "#FFFFFF",
 *     shimmerOpacity: 0.12,
 *     speed: 2,
 *   }}
 * />
 * ```
 */
export const Skeleton: React.FC<SkeletonProps> = ({ style = {} }) => {
  const theme = useTheme();
  const defaults = theme.callLogsStyles.skeletonStyle;

  /*   guaranteed speed */
  const speed = style.speed ?? defaults.speed ?? 1;

  const shimmerAnim = useRef(new Animated.Value(0)).current;

  /* ------------------------------------------------------------------ */
  /*                            Lifecycle                               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    shimmerAnim.setValue(0);
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: (1 / speed) * 1000, // safe
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [shimmerAnim, speed]);

  /* Animated translation for the first and second diagonal bars */
  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth * 2, screenWidth],
  });

  /* ------------------------------------------------------------------ */
  /*                              Render                                */
  /* ------------------------------------------------------------------ */
  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
      {/* Bottom layer – gradient-filled rows */}
      {Array.from({ length: 20 }).map((_, i) => (
        <SkeletonItemBottom key={`bottom-${i}`} style={style} />
      ))}

      {/* Diagonal shimmer bars (two for seamless wrap-around) */}
      {[0, screenWidth / 2].map((offset, idx) => (
        <Animated.View
          // eslint-disable-next-line react/no-array-index-key
          key={`shimmer-${idx}`}
          style={[
            localStyles.animatedBar,
            {
              transform: [
                { translateX: Animated.add(translateX, offset) },
                { translateY: -20 },
                { rotate: "15deg" },
              ],
              backgroundColor:
                style.shimmerBackgroundColor ??
                defaults.shimmerBackgroundColor,
              opacity: style.shimmerOpacity ?? defaults.shimmerOpacity,
            },
          ]}
        />
      ))}

      <View style={StyleSheet.absoluteFill}>
        {Array.from({ length: 20 }).map((_, i) => (
          <SkeletonItemTop key={`top-${i}`} style={style} />
        ))}
      </View>
    </ScrollView>
  );
};

/* ----------------------------- local styles ------------------------------ */

const localStyles = StyleSheet.create({
  /** Base style for each diagonal shimmer bar */
  animatedBar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "25%",
  },
});
