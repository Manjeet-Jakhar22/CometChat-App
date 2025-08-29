import { JSX, useMemo } from "react";
import {
  ColorValue,
  Dimensions,
  ImageSourcePropType,
  ImageStyle,
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../../theme";
import { Icon } from "../../icons/Icon";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

/**
 * Interface for the menu items (tooltip actions).
 */
export interface MenuItemInterface {
  text: string;
  onPress: () => void;
  icon?: ImageSourcePropType | JSX.Element;
  textStyle?: TextStyle;
  iconStyle?: ImageStyle;
  iconContainerStyle?: ViewStyle;
  disabled?: boolean;
}

/**
 * Props for the CometChatTooltipMenu component.
 */
type CometChatTooltipMenuProps = {
  /**
   * Controls the visibility of the tooltip menu.
   */
  visible?: boolean;
  /**
   * Callback function invoked when the tooltip menu is dismissed.
   */
  onDismiss?: () => void;
  /**
   * Callback function invoked when the tooltip menu is closed.
   */
  onClose?: () => void;
  /**
   * The event object containing the coordinates where the tooltip menu should appear.
   */
  event: {
    nativeEvent: {
      /**
       * The X coordinate of the event.
       */
      pageX: number;
      /**
       * The Y coordinate of the event.
       */
      pageY: number;
    };
  };
  /**
   * An array of menu item objects that define the options in the tooltip menu.
   */
  menuItems: MenuItemInterface[];
};

export const CometChatTooltipMenu = (props: CometChatTooltipMenuProps) => {
  const { visible = false, onDismiss = () => null, onClose = () => null, event, menuItems } = props;
  const theme = useTheme();

  const position = useMemo(() => {
    let x = event.nativeEvent.pageX;
    let y = event.nativeEvent.pageY;
    const position: {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    } = {};
    if (x <= screenWidth / 3) {
      position.left = x + 10;
    } else {
      position.right = 12;
    }

    if (y <= screenHeight / 2) {
      position.top = y + 20;
    } else if (y >= screenHeight / 2) {
      position.bottom = Math.max(screenHeight - y + 10, 40);
    }
    return position;
  }, [event]);

  return (
    <Modal
      presentationStyle='overFullScreen'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      onDismiss={onDismiss}
      animationType='none'
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={tooltipStyles.overlay}>
          <View
            style={[
              tooltipStyles.menu,
              position,
              {
                backgroundColor: theme.color.background1,
                borderWidth: 1,
                borderColor: theme.color.borderLight,
                borderRadius: theme.spacing.radius.r2,
                shadowColor: theme.color.neutral900,
              },
            ]}
          >
            {menuItems.map((item, i) => {
              return (
                <TouchableOpacity
                  key={i} // Ensure each item has a unique key
                  onPress={() => {
                    item.onPress();
                    onClose();
                  }}
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      gap: 8,
                      backgroundColor: theme.color.background1,
                      minWidth: 160,
                    },
                    i === 0
                      ? {
                          borderTopLeftRadius: theme.spacing.radius.r2,
                          borderTopRightRadius: theme.spacing.radius.r2,
                        }
                      : {},
                    i === menuItems.length - 1
                      ? {
                          borderBottomLeftRadius: theme.spacing.radius.r2,
                          borderBottomRightRadius: theme.spacing.radius.r2,
                        }
                      : {},
                  ]}
                >
                  <Icon
                    color={item?.iconStyle?.tintColor ?? theme.color.textSecondary}
                    size={item?.iconStyle?.height ?? theme.spacing.spacing.s6}
                    height={item?.iconStyle?.height ?? theme.spacing.spacing.s6}
                    width={item?.iconStyle?.width ?? theme.spacing.spacing.s6}
                    icon={item.icon}
                    containerStyle={item?.iconContainerStyle}
                  />
                  <Text
                    style={{
                      color: theme.color.textPrimary,
                      ...theme.typography.heading4.regular,
                      ...item?.textStyle,
                    }}
                  >
                    {item.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const tooltipStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.025,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
