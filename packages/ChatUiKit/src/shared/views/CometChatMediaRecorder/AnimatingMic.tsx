import React, { JSX, useEffect, useMemo, useRef } from "react";
import {
  Animated,
  Easing,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../../theme";
import { defaultSpacing } from "../../../theme/default";
import { Icon } from "../../icons/Icon";
import { CometChatTheme } from "../../../theme/type";
import { deepMerge } from "../../helper/helperFunctions";

type MediarecorderAnimationStyle = {
  innerAnimationContainerStyle: ViewStyle;
  outerAnimationContainerStyle: ViewStyle;
  animatedIconStyle?: {
    icon?: JSX.Element | ImageSourcePropType;
    iconStyle?: ImageStyle;
    containerStyle?: ViewStyle;
  };
};

export const AnimatingMic = ({
  isAnimating = false,
  style,
}: {
  isAnimating?: boolean;
  style?: MediarecorderAnimationStyle;
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const animationStyle: MediarecorderAnimationStyle = useMemo(() => {
    return deepMerge(
      theme.mediaRecorderStyle?.animationStyle ?? ({} as MediarecorderAnimationStyle),
      style ?? ({} as MediarecorderAnimationStyle)
    );
  }, [theme, style]);

  useEffect(() => {
    if (isAnimating === false) return () => {};
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    return () => scaleAnim.resetAnimation();
  }, [scaleAnim, isAnimating]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pulseCircleOuter,
          true ? { backgroundColor: theme.color.extendedPrimary50 } : {},
          { transform: [{ scale: scaleAnim }] },
          animationStyle.outerAnimationContainerStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.pulseCircle,
          true
            ? {
                backgroundColor: theme.color.extendedPrimary100,
              }
            : {},
          { transform: [{ scale: scaleAnim }] },
          animationStyle.innerAnimationContainerStyle,
        ]}
      />
      <Icon
        name='mic-fill'
        size={48}
        color={animationStyle.animatedIconStyle?.iconStyle?.tintColor ?? theme.color.staticWhite}
        icon={animationStyle.animatedIconStyle?.icon}
        containerStyle={[
          styles.micContainer,
          {
            backgroundColor: theme.color.primary,
          },
          animationStyle.animatedIconStyle?.containerStyle,
        ]}
        imageStyle={[animationStyle.animatedIconStyle?.iconStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  pulseCircle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: defaultSpacing.radius.max,
  },
  pulseCircleOuter: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: defaultSpacing.radius.max,
  },
  micContainer: {
    width: 80,
    height: 80,
    borderRadius: defaultSpacing.radius.max,
    justifyContent: "center",
    alignItems: "center",
  },
});
