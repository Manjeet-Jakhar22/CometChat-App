import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CometChatTheme } from "../../theme/type";
import { useTheme } from "../../theme";
import { localize } from "../../shared";
import { deepMerge } from "../../shared/helper/helperFunctions";
import { DeepPartial } from "../../shared/helper/types";
import { JSX } from "react";

/**
 * Props for the CometChatMeetCallBubble component.
 *
 * @interface CometChatMeetCallBubbleInterface
 */
export interface CometChatMeetCallBubbleInterface {
  /** Title text to be displayed in the bubble */
  titleText: string;
  /** Subtitle text to be displayed under the title */
  subTitleText: string;
  /** Text to be displayed on the button */
  buttonText: string;
  /** JSX element to display as an icon */
  icon: JSX.Element;
  /** Callback function to be executed on button press */
  onClick: () => void;
  /** Custom style overrides for the meet call bubble */
  style: DeepPartial<CometChatTheme["meetCallBubbleStyles"]>;
}

/**
 * Component representing a meet call bubble.
 *
 * @param {CometChatMeetCallBubbleInterface} props - Component properties.
 * @returns {JSX.Element} The rendered component.
 */
export const CometChatMeetCallBubble = (props: CometChatMeetCallBubbleInterface) => {
  const { icon, titleText, subTitleText, buttonText, onClick, style } = props;

  return (
    <View style={style?.containerStyle}>
      {/* Row container for icon and texts */}
      <View style={styles.row}>
        <View style={style?.iconContainerStyle}>{icon}</View>
        <View style={styles.textContainer}>
          <Text style={style?.titleStyle}>{titleText}</Text>
          <Text style={style?.subtitleStyle}>{subTitleText}</Text>
        </View>
      </View>
      {/* Divider */}
      <View style={style?.dividerStyle} />
      {/* Action button */}
      <TouchableOpacity style={style?.buttonStyle} onPress={onClick}>
        <Text style={style?.buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * Props for the CometChatCallActionBubble component.
 *
 * @interface CometChatUserCallBubbleInterface
 */
export interface CometChatUserCallBubbleInterface {
  /** Title text to be displayed (e.g., call status) */
  titleText: string;
  /** JSX element to display as an icon */
  icon: JSX.Element;
  /** Optional custom style overrides for the call action bubble */
  style?: DeepPartial<CometChatTheme["messageListStyles"]["callActionBubbleStyles"]>;
}

/**
 * Component representing a call action bubble.
 *
 * This component displays a call action with an icon and text.
 * It differentiates styles if the call is missed.
 *
 * @param {CometChatUserCallBubbleInterface} props - Component properties.
 * @returns {JSX.Element} The rendered component.
 */
export const CometChatCallActionBubble = (props: CometChatUserCallBubbleInterface) => {
  const { titleText, icon, style } = props;
  const theme = useTheme();

  // Merge default theme styles with optional style overrides
  const callActionBubbleStyles = useMemo(() => {
    return deepMerge(theme.messageListStyles.callActionBubbleStyles, style ?? {});
  }, [theme.messageListStyles.callActionBubbleStyles, style]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={
          titleText === localize("MISSED_CALL")
            ? callActionBubbleStyles.missedCallContainerStyle
            : callActionBubbleStyles.containerStyle
        }
      >
        {icon}
        <Text
          style={
            titleText === localize("MISSED_CALL")
              ? callActionBubbleStyles.missedCallTextStyle
              : callActionBubbleStyles.textStyle
          }
        >
          {titleText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  textContainer: {
    gap: 4,
  },
});
