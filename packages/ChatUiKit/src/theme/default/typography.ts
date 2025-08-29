import { TextStyle } from "react-native";

interface TypographyVariant {
  bold: TextStyle;
  medium: TextStyle;
  regular: TextStyle;
}

export interface Typography {
  fontFamily: TextStyle["fontFamily"];
  title: TypographyVariant;
  heading1: TypographyVariant;
  heading2: TypographyVariant;
  heading3: TypographyVariant;
  heading4: TypographyVariant;
  body: TypographyVariant;
  caption1: TypographyVariant;
  caption2: TypographyVariant;
  button: TypographyVariant;
  link: TextStyle;
}

export const defaultTypography = {
  //ToDoM ad other fonts
  fontFamily: "Inter",
  title: {
    bold: {
      fontWeight: "700",
      fontSize: 32,
      lineHeight: 38.4,
    },
    medium: {
      fontWeight: "500",
      fontSize: 32,
      lineHeight: 38.4,
    },
    regular: {
      fontWeight: "400",
      fontSize: 32,
      lineHeight: 38.4,
    },
  },
  heading1: {
    bold: {
      fontWeight: "700",
      fontSize: 24,
      lineHeight: 28.8,
    },
    medium: {
      fontWeight: "500",
      fontSize: 24,
      lineHeight: 28.8,
    },
    regular: {
      fontWeight: "400",
      fontSize: 24,
      lineHeight: 28.8,
    },
  },
  heading2: {
    bold: {
      fontWeight: "700",
      fontSize: 20,
      lineHeight: 24,
    },
    medium: {
      fontWeight: "500",
      fontSize: 20,
      lineHeight: 24,
    },
    regular: {
      fontWeight: "400",
      fontSize: 20,
      lineHeight: 24,
    },
  },
  heading3: {
    bold: {
      fontWeight: "700",
      fontSize: 18,
      lineHeight: 21.6,
    },
    medium: {
      fontWeight: "500",
      fontSize: 18,
      lineHeight: 21.6,
    },
    regular: {
      fontWeight: "400",
      fontSize: 18,
      lineHeight: 21.6,
    },
  },
  heading4: {
    bold: {
      fontWeight: "700",
      fontSize: 16,
      lineHeight: 20.8,
    },
    medium: {
      fontWeight: "500",
      fontSize: 16,
      lineHeight: 20.8,
    },
    regular: {
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 20.8,
    },
  },
  body: {
    bold: {
      fontWeight: "700",
      fontSize: 14,
      lineHeight: 19.6,
    },
    medium: {
      fontWeight: "500",
      fontSize: 14,
      lineHeight: 19.6,
    },
    regular: {
      fontWeight: "400",
      fontSize: 14,
      lineHeight: 19.6,
    },
  },
  caption1: {
    bold: {
      fontWeight: "700",
      fontSize: 12,
      lineHeight: 16.8,
    },
    medium: {
      fontWeight: "500",
      fontSize: 12,
      lineHeight: 16.8,
    },
    regular: {
      fontWeight: "400",
      fontSize: 12,
      lineHeight: 16.8,
    },
  },
  caption2: {
    bold: {
      fontWeight: "700",
      fontSize: 10,
      lineHeight: 14,
    },
    medium: {
      fontWeight: "500",
      fontSize: 10,
      lineHeight: 14,
    },
    regular: {
      fontWeight: "400",
      fontSize: 10,
      lineHeight: 14,
    },
  },
  button: {
    bold: {
      fontWeight: "700",
      fontSize: 14,
      lineHeight: 16.8,
    },
    medium: {
      fontWeight: "500",
      fontSize: 14,
      lineHeight: 16.8,
    },
    regular: {
      fontWeight: "400",
      fontSize: 14,
      lineHeight: 16.8,
    },
  },
  link: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16.8,
  },
} as const satisfies Typography;
