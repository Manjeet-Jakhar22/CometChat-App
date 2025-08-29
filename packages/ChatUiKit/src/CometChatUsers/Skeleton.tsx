import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { useTheme } from "../theme";
import type { ColorValue } from "react-native";
import { CometChatTheme } from "../theme/type";

/**
 * Animated skeleton placeholder mimicking a *user list* in CometChat UI‑Kit.
 *
 * The component respects the defaults provided by `theme.userStyles.skeletonStyle`,
 * but every visual property can be **overridden per instance** using the
 * `style` prop.
 *
 * @example
 * ```tsx
 * <Skeleton
 *   style={{
 *     linearGradientColors: ["#4c669f", "#3b5998"],
 *     shimmerOpacity: 0.4,
 *   }}
 * />
 * ```
 */
export interface SkeletonProps {
  /** Partial style overrides (theme fallback for omitted keys). */
  style?: Partial<SkeletonStyle>;
}

/** Alias for the skeleton style slice inside the theme. */
type SkeletonStyle = CometChatTheme["userStyles"]["skeletonStyle"];

// ──────────────────────────────────────────────────────────────────────────────
// Utility helpers
// ──────────────────────────────────────────────────────────────────────────────

function getStyleValue<K extends keyof SkeletonStyle>(
  key: K,
  overrides: Partial<SkeletonStyle> | undefined,
  theme: CometChatTheme
): NonNullable<SkeletonStyle[K]> {
  // Guaranteed fallback to theme defaults; cast is safe as UI‑Kit defines them.
  return ((overrides?.[key] as SkeletonStyle[K]) ??
    theme.userStyles.skeletonStyle[key]) as NonNullable<SkeletonStyle[K]>;
}

// ──────────────────────────────────────────────────────────────────────────────
// Layout constants – tweak here if the design changes
// ──────────────────────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PADDING = 20;
const AVATAR_RADIUS = 25;
const LIST_ITEM_HEIGHT = 25;
const LIST_ITEM_SPACING = 54; // gap between items (includes avatar & text)
const LIST_ITEM_COUNT = 14;

/** Total height required for the SVG canvas */
const TOTAL_HEIGHT = PADDING + LIST_ITEM_COUNT * (LIST_ITEM_HEIGHT + LIST_ITEM_SPACING);

// ──────────────────────────────────────────────────────────────────────────────
// SVG rows factory (memoized for perf)
// ──────────────────────────────────────────────────────────────────────────────

const useRows = (fill: ColorValue) =>
  useMemo(
    () =>
      Array.from({ length: LIST_ITEM_COUNT }).map((_, index) => {
        const y = PADDING + index * (LIST_ITEM_HEIGHT + LIST_ITEM_SPACING) - 20;
        return (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            <Circle
              cx={PADDING + AVATAR_RADIUS}
              cy={y + AVATAR_RADIUS}
              r={AVATAR_RADIUS}
              fill={fill as string}
            />
            <Rect
              x={PADDING + AVATAR_RADIUS * 2 + 12}
              y={y + 12}
              width={SCREEN_WIDTH - (PADDING + AVATAR_RADIUS * 2 + 12 + PADDING)}
              height={LIST_ITEM_HEIGHT}
              rx={LIST_ITEM_HEIGHT / 2}
              fill={fill as string}
            />
          </React.Fragment>
        );
      }),
    [fill]
  );

// ──────────────────────────────────────────────────────────────────────────────
// Component Implementation
// ──────────────────────────────────────────────────────────────────────────────

export const Skeleton: React.FC<SkeletonProps> = ({ style }) => {
  const theme = useTheme();
  const get = <K extends keyof SkeletonStyle>(key: K) => getStyleValue(key, style, theme);

  // Shimmer animation ------------------------------------------
  const translate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const speed = get("speed");
    const duration = 1000 / speed;
    const loop = Animated.loop(
      Animated.timing(translate, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: false, // SVG not yet compatible with native driver
      })
    );

    loop.start();
    return () => loop.stop();
  }, [get("speed"), translate]);

  const translateX = translate.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH * 2, SCREEN_WIDTH],
  });

  // Pre‑build row shapes (bottom gradient + top mask)
  const rowsGradient = useRows("url(#gradient)");
  const rowsSolid = useRows(String(get("backgroundColor")));

  return (
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: get("containerBackgroundColor") }}
    >
      {/* Bottom layer (gradient fill) */}
      <Svg
        height={TOTAL_HEIGHT}
        width={SCREEN_WIDTH}
        fill='none'
        preserveAspectRatio='xMidYMid meet'
      >
        <Defs>
          <LinearGradient
            id='gradient'
            x1='0'
            y1='0'
            x2={SCREEN_WIDTH}
            y2='0'
            gradientUnits='userSpaceOnUse'
          >
            {(() => {
              const colors = get("linearGradientColors");
              return [
                <Stop key={0} stopColor={colors[0]} />,
                <Stop key={1} offset='1' stopColor={colors[1]} />,
              ];
            })()}
          </LinearGradient>
        </Defs>
        {rowsGradient}
      </Svg>

      {/* Moving shimmer highlight (rendered twice for coverage) */}
      {[0, SCREEN_WIDTH / 2].map((offset) => (
        // eslint-disable-next-line react/no-array-index-key
        <Animated.View
          key={offset}
          style={[
            styles.shimmer,
            {
              transform: [
                { translateX: Animated.add(translateX, offset) },
                { translateY: -20 },
                { rotate: "15deg" },
              ],
              backgroundColor: get("shimmerBackgroundColor"),
              opacity: get("shimmerOpacity"),
            },
          ]}
        />
      ))}

      {/* Top mask – solid shapes clip the shimmer to list items */}
      <View style={StyleSheet.absoluteFill} pointerEvents='none'>
        <Svg
          height={TOTAL_HEIGHT}
          width={SCREEN_WIDTH}
          fill='none'
          preserveAspectRatio='xMidYMid meet'
        >
          {rowsSolid}
        </Svg>
      </View>
    </ScrollView>
  );
};

// ──────────────────────────────────────────────────────────────────────────────
// Styles
// ──────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  shimmer: {
    position: "absolute",
    width: "25%", // thin bar for highlight
    top: 0,
    bottom: 0,
  },
});
