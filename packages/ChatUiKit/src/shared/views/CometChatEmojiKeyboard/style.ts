import { Dimensions, Platform, StyleSheet } from "react-native";
import { CometChatTheme } from "../../../theme/type";

/**
 * Styles for the CometChatEmojiKeyboard component.
 * Adjust spacing, colors, and layout as needed.
 */
const Styles = (theme: CometChatTheme) => {
  const screenWidth = Dimensions.get("window").width;
  const numColumns = 8; // Ensure this matches the main component's NUM_COLUMNS

  return StyleSheet.create({
    fixedHeader: {
      paddingBottom: 8,
      paddingLeft: 12,
      alignSelf: "flex-start",
      top: 0,
      left: 0,
      zIndex: 1,
    },
    flatListContent: {
      paddingBottom: 10,
      gap: 8,
    },
    categoryContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: "#e0e0e0",
    },
    categoryListContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    emojiItem: {
      width: (screenWidth - 24) / numColumns,
      justifyContent: "center",
      alignItems: "center",
    },
    emojiText: {
      fontSize: Platform.OS === "ios" ? 28 : 24,
      paddingHorizontal: 6,
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRadius: theme.spacing.spacing.s8,
    },
    activeIcon: {
      backgroundColor: theme.color.extendedPrimary100,
      borderRadius: theme.spacing.spacing.s8,
    },
    emojiKeyboardContainer: {
      width: "100%",
      flex: 1,
      borderRadius: 12,
      backgroundColor: theme.color.background1,
      flexDirection: "column",
    },
    emojiGridContainer: {
      flex: 1,
      padding: 8,
    },
    flatList: {
      flex: 1,
    },
  });
};

export default Styles;
