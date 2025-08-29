import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ICONS } from "./resources";

/**
 * HeaderInterface defines the props for the Header component.
 */
interface HeaderInterface {
  /** The header title text. */
  title: string;
  /** Custom style for the title text. */
  titleStyle: any;
  /** Tint color for the close icon. */
  closeIconTint: string;
  /** Tint color for the join/create icon. */
  createIconTint: string;
  /** Image source for the join icon. */
  joinIcon: ImageSourcePropType;
  /** Image source for the close icon. */
  closeIcon: ImageSourcePropType;
  /** Callback function executed when the cancel action is triggered. */
  onCancel: () => void;
  /** Callback function executed when the submit action is triggered. */
  onSubmit: () => void;
}

/**
 * Header component displays a header with a left-aligned close icon,
 * a centered title, and a right-aligned submit icon.
 *
 * @param {HeaderInterface} props - The props for the Header component.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = (props: HeaderInterface) => {
  const {
    title,
    titleStyle,
    closeIconTint,
    createIconTint,
    joinIcon,
    closeIcon,
    onCancel,
    onSubmit,
  } = props;

  return (
    <View style={styles.container}>
      {/* Left section with close icon and title */}
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={onCancel}>
          <Image
            source={closeIcon ?? ICONS.CLOSE}
            style={{
              tintColor: closeIconTint ?? "rgb(51, 153, 255)",
              height: 24,
              width: 24,
            }}
          />
        </TouchableOpacity>
        <Text style={[styles.headingText, titleStyle]}>{title}</Text>
      </View>
      {/* Right section with join/submit icon */}
      <TouchableOpacity style={styles.iconContainer} onPress={onSubmit}>
        <Image
          source={joinIcon ?? ICONS.TICK}
          style={{
            tintColor: createIconTint ?? "rgb(51, 153, 255)",
            height: 24,
            width: 24,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingRight: 15,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
});

export default Header;
