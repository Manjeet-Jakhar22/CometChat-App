import { CometChatTheme } from "../../theme/type";
import { deepMerge } from "../../shared/helper/helperFunctions";
import { StyleSheet } from 'react-native';

//remove after create poll
export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15 },
  textInput: {
    marginTop: 32,
    padding: 8,
    borderBottomWidth: 1,
  },
  textInputAnswers: {
    marginTop: 32,
    padding: 8,
    borderBottomWidth: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 5,
  },
  errorImageContainer: {
    padding: 8,
    borderRadius: 100,
  },
  errorImage: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  errorTextTitle: {
    marginStart: 8,
  },
  errorTextContainer: { flex: 1 },
  errorText: {
    marginStart: 8,
  },
  addAnswerButtonContainer: { marginTop: 30, marginBottom: 10 },
});


export const getPollBubbleStyleLight = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingBubbleStyle: CometChatTheme["pollBubbleStyles"];
  outgoingBubbleStyle: CometChatTheme["pollBubbleStyles"];
} => {
  return {
    incomingBubbleStyle: {
      containerStyle: {
        width: 240,
        paddingHorizontal: spacing.padding.p3,
        paddingTop: spacing.padding.p2,
      },
      titleStyle: {
        ...typography.heading4.bold,
        color: color.receiveBubbleText,
        marginBottom: spacing.margin.m4,
      },
      optionTextStyle: {
        ...typography.body.regular,
        color: color.receiveBubbleText,
        flex: 1,
        maxWidth: "80%",
        marginRight: 10,
        //alignSelf: 'flex-end'
      },
      voteCountTextStyle: {
        ...typography.body.regular,
        color: color.receiveBubbleText,
      },
      selectedIconStyle: {
        tintColor: color.staticWhite,
        height: 18,
        width: 18,
      },
      radioButtonStyle: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: color.iconSecondary,
        height: 20,
        width: 20,
        margin: spacing.margin.m0_5,
        marginBottom: spacing.margin.m0,
      },
      progressBarStyle: {
        height: 8,
        width: "100%",
        borderRadius: 10,
        backgroundColor: color.iconTertiary,
      },
      activeProgressBarTint: color.iconHighlight,
      dateReceiptContainerStyle: {
        paddingRight: spacing.padding.p0,
      },
      voteravatarStyle: {
        containerStyle: {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color.extendedPrimary500,
          height: spacing.spacing.s5,
          width: spacing.spacing.s5,
          borderRadius: spacing.radius.max,
          borderWidth: 1,
          borderColor: color.receiveBubbleBackground,
        },
        imageStyle: {
          height: "100%",
          width: "100%",
          borderRadius: spacing.radius.max,
        },
        textStyle: {
          textAlign: "center",
          textAlignVertical: "center",
          color: color.primaryButtonIcon,
          fontFamily: typography.fontFamily,
          ...typography.caption1.bold,
        },
      },
    },
    outgoingBubbleStyle: {
      containerStyle: {
        width: 240,
        paddingHorizontal: spacing.padding.p3,
        paddingTop: spacing.padding.p2,
      },
      titleStyle: {
        ...typography.heading4.bold,
        color: color.sendBubbleText,
        marginBottom: spacing.margin.m4,
      },
      optionTextStyle: {
        ...typography.body.regular,
        color: color.sendBubbleText,
        flex: 1,
        maxWidth: "80%",
        marginRight: 10
      },
      voteCountTextStyle: {
        ...typography.body.regular,
        color: color.sendBubbleText,
      },
      selectedIconStyle: {
        tintColor: color.iconHighlight,
        height: 18,
        width: 18,
      },
      progressBarStyle: {
        height: 8,
        width: "100%",
        borderRadius: 10,
        backgroundColor: color.extendedPrimary700,
      },
      activeProgressBarTint: color.sendBubbleIcon,
      radioButtonStyle: {
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: color.sendBubbleIcon,
        height: 20,
        width: 20,
        margin: spacing.margin.m0_5,
        marginBottom: spacing.margin.m0,
      },
      dateReceiptContainerStyle: {
        paddingRight: spacing.padding.p0,
      },
      voteravatarStyle: {
        containerStyle: {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color.extendedPrimary500,
          height: spacing.spacing.s5,
          width: spacing.spacing.s5,
          borderRadius: spacing.radius.max,
          borderWidth: 1,
          borderColor: color.primary,
        },
        imageStyle: {
          height: "100%",
          width: "100%",
          borderRadius: spacing.radius.max,
        },
        textStyle: {
          textAlign: "center",
          textAlignVertical: "center",
          color: color.primaryButtonIcon,
          fontFamily: typography.fontFamily,
          ...typography.caption1.bold,
        },
      },
    },
  };
};

export const getPollBubbleStyleDark = (
  color: CometChatTheme["color"],
  spacing: CometChatTheme["spacing"],
  typography: CometChatTheme["typography"]
): {
  incomingBubbleStyle: CometChatTheme["pollBubbleStyles"];
  outgoingBubbleStyle: CometChatTheme["pollBubbleStyles"];
} => {
  return deepMerge(getPollBubbleStyleLight(color, spacing, typography)!, {
    incomingBubbleStyle: {
      titleStyle: {
        color: color.sendBubbleText,
      },
      voteCountTextStyle: {
        color: color.sendBubbleText
      },
      radioButtonStyle: {
        borderColor: color.iconSecondary
      },
      selectedIconStyle: {
        tintColor: color.staticWhite
      }
    }
  });
};
