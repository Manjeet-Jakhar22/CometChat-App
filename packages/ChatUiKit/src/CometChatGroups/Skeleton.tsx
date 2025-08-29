import React, { useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { useTheme } from "../theme";
import { CometChatTheme } from "../theme/type";

/**
 * React‑Native skeleton list with animated shimmer.
 *
 * @remarks
 * The component respects the brand/theme defaults defined in
 * `theme.groupStyles.skeletonStyle` but allows **per‑instance overrides** via the
 * `style` prop.
 *
 * @example
 * ```tsx
 * <Skeleton
 *   style={{
 *     linearGradientColors: ["#eee", "#ddd"],
 *     backgroundColor: "#444",
 *   }}
 * />
 * ```
 */
export interface SkeletonProps {
  /**
   * Partial style overrides.  Any omitted property falls back to the theme
   * default.
   */
  style?: Partial<SkeletonStyle>;
}

// ──────────────────────────────────────────────────────────────────────────────
// Theme typing helpers
// ──────────────────────────────────────────────────────────────────────────────

/** Convenience alias for the skeleton style slice in the theme object. */
type SkeletonStyle = CometChatTheme["groupStyles"]["skeletonStyle"];

/**
 * Utility to resolve a style value with **theme‑fallback**.
 *
 * @param key – The style property being resolved.
 * @param overrides – Optional user overrides (`props.style`).
 * @param theme – Current theme object.
 * @returns The resolved style value.
 */
function resolveStyleValue<K extends keyof SkeletonStyle>(
  key: K,
  overrides: Partial<SkeletonStyle> | undefined,
  theme: CometChatTheme
): SkeletonStyle[K] {
  return (overrides?.[key] as SkeletonStyle[K]) ?? theme.groupStyles.skeletonStyle[key];
}

// ──────────────────────────────────────────────────────────────────────────────
// Layout constants – tweak here if the design changes
// ──────────────────────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PADDING = 20;
const AVATAR_RADIUS = 25;
const LIST_ITEM_HEIGHT = 25;
const LIST_ITEM_SUBTITLE_HEIGHT = 20;
const LIST_ITEM_SUBTITLE_SPACING = 10;
const LIST_ITEM_SPACING = 30;
const LIST_ITEM_COUNT = 14;

/** Total SVG height required to render all placeholder rows. */
const TOTAL_HEIGHT =
  PADDING +
  LIST_ITEM_COUNT *
    (LIST_ITEM_HEIGHT + LIST_ITEM_SUBTITLE_SPACING + LIST_ITEM_SUBTITLE_HEIGHT + LIST_ITEM_SPACING);

// ──────────────────────────────────────────────────────────────────────────────
// SVG building blocks
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Generates the repetitive row shapes used by both bottom and top layers.
 *
 * @param fill – The fill used for rectangles & circles in this layer.
 */
const useRowShapes = (fill: string) =>
  useMemo(
    () =>
      Array.from({ length: LIST_ITEM_COUNT }).map((_, index) => {
        const baseY =
          PADDING +
          index *
            (LIST_ITEM_HEIGHT + LIST_ITEM_SUBTITLE_SPACING + LIST_ITEM_SUBTITLE_HEIGHT + LIST_ITEM_SPACING) -
          10;

        return (
          <React.Fragment key={index}>
            <Circle
              cx={PADDING + AVATAR_RADIUS}
              cy={baseY + AVATAR_RADIUS}
              r={AVATAR_RADIUS}
              fill={fill}
            />
            <Rect
              x={PADDING + 2 * AVATAR_RADIUS + 12}
              y={baseY}
              width={SCREEN_WIDTH - (PADDING + 2 * AVATAR_RADIUS + 12 + PADDING)}
              height={LIST_ITEM_HEIGHT}
              rx={LIST_ITEM_HEIGHT / 2}
              fill={fill}
            />
            <Rect
              x={PADDING + 2 * AVATAR_RADIUS + 12}
              y={baseY + LIST_ITEM_HEIGHT + LIST_ITEM_SUBTITLE_SPACING}
              width={
                (SCREEN_WIDTH - (PADDING + 2 * AVATAR_RADIUS + 12 + PADDING)) * 0.6 /* 60% width */
              }
              height={LIST_ITEM_SUBTITLE_HEIGHT}
              rx={LIST_ITEM_SUBTITLE_HEIGHT / 2}
              fill={fill}
            />
          </React.Fragment>
        );
      }),
    [fill]
  );

// ──────────────────────────────────────────────────────────────────────────────
// Component implementation
// ──────────────────────────────────────────────────────────────────────────────

export const Skeleton: React.FC<SkeletonProps> = ({ style }) => {
  const theme = useTheme();

  /** Resolved style helpers (with theme‑fallback). */
  const get = <K extends keyof SkeletonStyle>(key: K) =>
    resolveStyleValue(key, style, theme);

  // Animated shimmer setup -----------------------------------------------------
  const shimmerTranslate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = 1000 / get("speed")!;
    const loop = Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: false, // SVG cannot use native driver
      })
    );

    loop.start();
    return () => loop.stop(); // <‑‑ Prevent memory leaks on unmount
  }, [get("speed"), shimmerTranslate]);

  // Interpolated translation across the screen width
  const translateX = shimmerTranslate.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH * 2, SCREEN_WIDTH],
  });

  // SVG layers ---------------------------------------------------------------
  const rowShapesBottom = useRowShapes("url(#gradient)" /* gradient fill */);
  const rowShapesTop = useRowShapes(get("backgroundColor") as string);

  // ──────────────────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────────────────

  // Note: Providing a backgroundColor override will be used for the top mask layer,
  // which may hide the gradient effect defined by linearGradientColors.
  return (
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: get("containerBackgroundColor") }}
    >
      {/* Bottom gradient layer */}
      <Svg height={TOTAL_HEIGHT} width={SCREEN_WIDTH} fill="none" preserveAspectRatio="xMidYMid meet">
        {/* Reusable linear gradient */}
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2={SCREEN_WIDTH} y2="0" gradientUnits="userSpaceOnUse">
            <Stop stopColor={get("linearGradientColors")![0]} />
            <Stop offset="1" stopColor={get("linearGradientColors")![1]} />
          </LinearGradient>
        </Defs>
        {rowShapesBottom}
      </Svg>

      {/* Shimmer highlight (runs twice for smoother effect) */}
      {[0, SCREEN_WIDTH / 2].map((offset) => (
        <Animated.View
          // eslint‑disable‑next‑line react/no-array-index-key
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

      {/* Top solid layer (masks shimmer to placeholder shapes) */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg height={TOTAL_HEIGHT} width={SCREEN_WIDTH} fill="none" preserveAspectRatio="xMidYMid meet">
          {rowShapesTop}
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
    width: "25%", // Narrow highlight bar
    top: 0,
    bottom: 0,
  },
});
