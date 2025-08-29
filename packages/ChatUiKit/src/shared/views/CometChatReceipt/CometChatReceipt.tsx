import React, { useMemo } from "react";
import { useTheme } from "../../../theme";
import { useCompTheme } from "../../../theme/hook";
import { deepMerge } from "../../helper/helperFunctions";
import { Icon } from "../../icons/Icon";
import { ReceiptStyles } from "./style";
import { MessageReceipt } from "../../constants/UIKitConstants";

/**
 * Props for the CometChatReceipt component.
 *
 * CometChatReceipt is a component used to display the status of a message using a custom symbol.
 * It returns an appropriate symbol depending on the message status and can be customized via style.
 *
 */
export interface CometChatReceiptInterface {
  /**
   * The message receipt object representing the status of the message.
   */
  receipt?: MessageReceipt;
  /**
   * Custom styles to override or extend the default receipt styles.
   */
  style?: Partial<ReceiptStyles>;
}

export const CometChatReceipt = (props: CometChatReceiptInterface) => {
  const theme = useTheme();
  const compTheme = useCompTheme();

  const { receipt, style = {} } = props;

  const receiptStyles = useMemo(() => {
    return deepMerge(theme.receiptStyles, compTheme.receiptStyles ?? {}, style);
  }, [theme.receiptStyles, style, compTheme.receiptStyles]);

  switch (receipt) {
    case "SENT":
      return (
        <Icon
          name='check-fill'
          icon={receiptStyles?.sentIcon}
          size={receiptStyles?.sentIconStyle?.width}
          height={receiptStyles?.sentIconStyle?.height}
          width={receiptStyles?.sentIconStyle?.width}
          color={receiptStyles?.sentIconStyle?.tintColor}
          imageStyle={[receiptStyles?.sentIconStyle]}
        />
      );
    case "DELIVERED":
      return (
        <Icon
          name='done-all-fill'
          icon={receiptStyles?.deliveredIcon}
          size={receiptStyles?.deliveredIconStyle?.width}
          height={receiptStyles?.deliveredIconStyle?.height}
          width={receiptStyles?.deliveredIconStyle?.width}
          color={receiptStyles?.deliveredIconStyle?.tintColor}
          imageStyle={[receiptStyles?.deliveredIconStyle]}
        />
      );
    case "READ":
      return (
        <Icon
          name='done-all-fill'
          icon={receiptStyles?.readIcon}
          size={receiptStyles?.readIconStyle?.width}
          height={receiptStyles?.readIconStyle?.height}
          width={receiptStyles?.readIconStyle?.width}
          color={receiptStyles?.readIconStyle?.tintColor}
          imageStyle={[receiptStyles?.readIconStyle]}
        />
      );
    case "ERROR":
      return (
        <Icon
          name='error-fill'
          icon={receiptStyles?.errorIcon}
          size={receiptStyles?.errorIconStyle?.width}
          height={receiptStyles?.errorIconStyle?.height}
          width={receiptStyles?.errorIconStyle?.width}
          color={receiptStyles?.errorIconStyle?.tintColor}
          imageStyle={[receiptStyles?.errorIconStyle]}
        />
      );
    case "WAIT":
      return (
        <Icon
          name='schedule'
          icon={receiptStyles?.waitIcon}
          size={receiptStyles?.waitIconStyle?.width}
          height={receiptStyles?.waitIconStyle?.height}
          width={receiptStyles?.waitIconStyle?.width}
          color={receiptStyles?.waitIconStyle?.tintColor}
          imageStyle={[receiptStyles?.waitIconStyle]}
        />
      );
  }
  return null;
};