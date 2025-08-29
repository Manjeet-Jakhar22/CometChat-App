import { ImageSourcePropType, ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { CallButtonStyle } from "../calls/CometChatCallButtons";
import { AvatarStyle } from "../shared/views/CometChatAvatar";
import { StatusIndicatorStyles } from "../shared/views/CometChatStatusIndicator";
import { CometChatTheme } from "../theme/type";
import { JSX } from "react";

export const styles = StyleSheet.create({
  container: { flexDirection: "row", width: "100%" },
  backButtonIconStyle: {
    height: 27,
    width: 27,
    resizeMode: "contain",
  },
});

export type MessageHeaderStyle = {
  containerStyle: ViewStyle;
  titleTextStyle: TextStyle;
  subtitleTextStyle: TextStyle;
  backButtonStyle: ViewStyle;
  backButtonIcon?: ImageSourcePropType | JSX.Element;
  backButtonIconStyle: ImageStyle;
  typingIndicatorTextStyle: TextStyle;
  callButtonStyle: Partial<CallButtonStyle>;
  avatarStyle: Partial<AvatarStyle>;
  statusIndicatorStyle: Partial<StatusIndicatorStyles>;
};

export const getMessageHeaderStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): MessageHeaderStyle => ({
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.background1,
    gap: 8,
    paddingHorizontal: spacing.padding.p4,
    paddingVertical: spacing.padding.p3,
  },
  backButtonStyle: {marginHorizontal: 2},
  titleTextStyle: {
    color: color.textPrimary,
    ...typography.heading4.medium,
  },
  subtitleTextStyle: {
    color: color.textSecondary,
    ...typography.caption1.regular,
  },
  backButtonIconStyle: {
    height: 27,
    width: 27,
    tintColor: color.iconPrimary,
  },
  typingIndicatorTextStyle: {
    color: color.textHighlight,
    ...typography.caption1.regular,
  },
  callButtonStyle: {},
  avatarStyle: {},
  statusIndicatorStyle: {},
});
