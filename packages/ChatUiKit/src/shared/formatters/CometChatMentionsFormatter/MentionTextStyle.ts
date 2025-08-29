import { StyleProp, TextStyle } from "react-native";
/**
 * MentionTextStyle
 * Stores the styles for user mention.
 * @param textStyle: TextStyle
 * @param loggedInUserTextStyle: TextStyle
 */
export class MentionTextStyle {
  textStyle?: StyleProp<TextStyle>;
  loggedInUserTextStyle?: StyleProp<TextStyle>;
  constructor(props: MentionTextStyle) {
    Object.assign(this, props);
  }
}
