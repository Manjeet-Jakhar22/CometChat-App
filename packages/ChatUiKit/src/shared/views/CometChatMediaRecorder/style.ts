import { StyleSheet } from "react-native";
import { CometChatTheme } from "../../../theme/type";
import { DeepPartial } from "../../helper/types";

export const Style = StyleSheet.create({
  imageStyle: {},
  buttonStyle: {},
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  soundBarContainer: {
    marginBottom: 20,
    flexDirection: "row",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  soundBar: {
    width: 5,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 1,
  },
});

const commonIconContainerStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
) => {
  return {
    padding: 8,
    backgroundColor: color.background1,
    borderWidth: 1,
    borderColor: color.borderLight,
    borderRadius: spacing.radius.max,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  };
};

export const getMediaRecorderStyle = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): DeepPartial<CometChatTheme["mediaRecorderStyle"]> => {
  return {
    recordIconStyle: {
      containerStyle: commonIconContainerStyle(color, spacing, typography),
    },
    playIconStyle: {
      containerStyle: commonIconContainerStyle(color, spacing, typography),
    },
    pauseIconStyle: {
      containerStyle: commonIconContainerStyle(color, spacing, typography),
    },
    deleteIconStyle: {
      containerStyle: commonIconContainerStyle(color, spacing, typography),
    },
    stopIconStyle: {
      containerStyle: commonIconContainerStyle(color, spacing, typography),
    },
    sendIconStyle: {
      containerStyle: commonIconContainerStyle(color, spacing, typography),
    },
  };
};
