import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../../theme";
import { useCompTheme } from "../../../theme/hook";
import { DateHelper, dateHelperInstance } from "../../helper/dateHelper";
import { deepMerge } from "../../helper/helperFunctions";
import { ValueOf } from "../../helper/types";
import { DateStyle } from "./styles";

/**
 * Props for the CometChatDate component.
 */
export interface CometChatDateInterface {
  /**
   * Unix epoch time to be formatted and displayed.
   */
  timeStamp?: number;
  /**
   * Pattern for formatting the date.
   * One of the following values:
   * - timeFormat: "hh:mm a".
   * - dayDateFormat: Today, Yesterday, week-day or "d MMM, yyyy".
   * - dayWeekDayDateTimeFormat: Today, Yesterday, week-day or "dd/mm/yyyy".
   */
  pattern?: ValueOf<typeof DateHelper.patterns>;
  /**
   * A custom date string to override the formatted date.
   */
  customDateString?: string;
  /**
   * Custom styles for the date component.
   */
  style?: DateStyle;
}

/**
 * CometChatDate is a component for displaying a formatted date/time.
 *
 * If a customDateString is provided, it will be displayed instead of the formatted date.
 * Otherwise, the component formats the provided timeStamp using the given pattern.
 *
 *  - Props for the component.
 *  The rendered date view.
 */
export const CometChatDate = (props: CometChatDateInterface) => {
  const { timeStamp, pattern, customDateString, style = {} } = props;
  const theme = useTheme();
  const compTheme = useCompTheme();

  // Merge theme date styles with component date styles and any custom style overrides.
  const dateStyles = useMemo(() => {
    return deepMerge(theme.dateStyles, compTheme.dateStyles ?? {}, style);
  }, [theme.dateStyles, style, compTheme.dateStyles]);

  return (
    <View style={[dateStyles.containerStyle]}>
      <Text style={[dateStyles.textStyle]} numberOfLines={1}>
        {timeStamp
          ? customDateString
            ? customDateString
            : pattern && dateHelperInstance.getFormattedDate(timeStamp, pattern)
          : ""}
      </Text>
    </View>
  );
};
