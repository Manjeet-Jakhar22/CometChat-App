import { useContext } from "react";
import { DeepPartial } from "../shared/helper/types";
import { CompThemeContext, ThemeContext } from "./context";
import { CometChatTheme } from "./type";

export const useTheme = (): CometChatTheme => {
  const theme = useContext(ThemeContext);
  return theme.mode === "dark" ? theme.dark as CometChatTheme: theme.light as CometChatTheme;
};

export const useThemeInternal = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export const useCompTheme = (): DeepPartial<CometChatTheme> => {
  const theme = useContext(CompThemeContext);
  return theme;
};
