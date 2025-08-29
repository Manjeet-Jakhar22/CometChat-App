import React from "react";
import { ActionItemInterface } from "./ActionItem";
import { CometChatActionSheetInterface } from "./CometChatActionSheet";

export const Hooks = (
  props: CometChatActionSheetInterface,
  setActionList: React.Dispatch<React.SetStateAction<ActionItemInterface[]>>
) => {
  React.useEffect(() => {
    setActionList(props.actions);
  }, [props.actions]);
};
