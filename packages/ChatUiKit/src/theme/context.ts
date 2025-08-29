import { createContext } from "react";
import { DeepPartial } from "../shared/helper/types";
import { defaultDarkTheme, defaultLightTheme } from "./default/default";
import { CometChatTheme } from "./type";

export interface ThemeProviderValue {
  dark: DeepPartial<CometChatTheme>;
  light: DeepPartial<CometChatTheme>;
  mode: "dark" | "light" | "auto";
}

export const themeProviderDefaultValue: ThemeProviderValue = {
  dark: defaultDarkTheme,
  light: defaultLightTheme,
  mode: "auto",
};

export const ThemeContext = createContext<ThemeProviderValue>(themeProviderDefaultValue);

export const CompThemeContext = createContext<DeepPartial<ThemeProviderValue["light"]>>({} as any);
