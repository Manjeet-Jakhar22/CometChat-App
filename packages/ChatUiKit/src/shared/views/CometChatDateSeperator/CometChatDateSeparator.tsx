import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../../theme";
import { DateHelper, dateHelperInstance } from "../../helper/dateHelper";
import { ValueOf } from "../../helper/types";
import { CometChatTheme } from "../../../theme/type";

/**
 * Props for the CometChatDateSeparator component.
 */
export interface CometChatDateSeparatorInterface {
  /**
   * Unix epoch time used to display the date.
   */
  timeStamp: number;
  /**
   * Pattern for formatting the date.
   * One of the following values:
   * - timeFormat: "hh:mm a"
   * - dayDateFormat: Today, Yesterday, or "d MMM, yyyy"
   * - dayWeekDayDateTimeFormat: Today (time), weekday, Yesterday, or "dd/mm/yyyy"
   */
  pattern: ValueOf<typeof DateHelper.patterns>;
  /**
   * Custom string to be displayed instead of the formatted date.
   */
  customDateString?: string;
  /**
   * Custom styles for the date separator component.
   */
  style?: CometChatTheme["dateSeparatorStyles"];
}

/**
 * CometChatDateSeparator is a component that displays a formatted date/time separator
 * between messages. If a custom date string is provided, it will be displayed instead.
 *
 *  - Props for the component.
 *  The rendered date separator view.
 */
export const CometChatDateSeparator = (props: CometChatDateSeparatorInterface) => {
  const { timeStamp, pattern, customDateString, style } = props;
  const theme = useTheme();

  return (
    <View style={[theme.dateSeparatorStyles.containerStyle, style?.containerStyle]}>
      <Text style={[theme.dateSeparatorStyles.textStyle, style?.textStyle]}>
        {customDateString
          ? customDateString
          : dateHelperInstance.getFormattedDate(timeStamp, pattern)}
      </Text>
    </View>
  );
};