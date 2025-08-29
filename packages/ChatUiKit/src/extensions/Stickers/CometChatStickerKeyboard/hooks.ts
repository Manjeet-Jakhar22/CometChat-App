import { CometChat } from "@cometchat/chat-sdk-react-native";
import React from "react";
import { MessageEvents } from "../../../shared/events";
import { CometChatUIEventHandler } from "../../../shared/events/CometChatUIEventHandler/CometChatUIEventHandler";
import { localize } from "../../../shared/resources/CometChatLocalize";
import { ExtensionConstants, ExtensionURLs } from "../../ExtensionConstants";
import { CometChatStickerKeyboardInterface } from "./CometChatStickerKeyboard";

export const Hooks = (
  props: CometChatStickerKeyboardInterface, // Adjust type based on actual usage
  stickerList: CometChat.CustomMessage[],
  stickerSet: Record<string, CometChat.CustomMessage[]>,
  activeStickerSetName: string | undefined,
  setStickerList: React.Dispatch<React.SetStateAction<CometChat.CustomMessage[]>>,
  setStickerSet: React.Dispatch<React.SetStateAction<Record<string, CometChat.CustomMessage[]>>>,
  setActiveStickerList: React.Dispatch<React.SetStateAction<CometChat.CustomMessage[]>>,
  setActiveStickerSetName: React.Dispatch<React.SetStateAction<string | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  React.useEffect(() => {
    setLoading(true); // Start loading
    CometChat.callExtension(ExtensionConstants.stickers, "GET", ExtensionURLs.stickers, {})
      .then((stickers : any) => {
        // Stickers received
        const customStickers = stickers.hasOwnProperty(ExtensionConstants.customStickers)
          ? stickers[ExtensionConstants.customStickers]
          : [];
        const defaultStickers = stickers.hasOwnProperty(ExtensionConstants.defaultStickers)
          ? stickers[ExtensionConstants.defaultStickers]
          : [];

        defaultStickers.sort((a: any, b: any) => a.stickerSetOrder - b.stickerSetOrder);
        customStickers.sort((a: any, b: any) => a.stickerSetOrder - b.stickerSetOrder);

        const combinedStickers = [...defaultStickers, ...customStickers];
        setStickerList(combinedStickers);

        if (combinedStickers.length === 0) {
          // Handle empty sticker list if necessary
        }

        setLoading(false); // End loading
      })
      .catch((error) => {
        console.log(error);
        setError(props?.errorText || localize("SOMETHING_WENT_WRONG"));
        setLoading(false); // End loading even if there's an error
        CometChatUIEventHandler.emitMessageEvent(MessageEvents.ccMessageError, error);
      });
  }, []);

  React.useEffect(() => {
    if (stickerList.length > 0) {
      const groupedStickers = stickerList.reduce((acc: any, sticker: any) => {
        const { stickerSetName } = sticker;

        if (!acc[stickerSetName]) {
          acc[stickerSetName] = [];
        }
        acc[stickerSetName].push(sticker);

        return acc;
      }, {});

      setStickerSet(groupedStickers);

      // Set the first sticker set as active if not already set
      if (!activeStickerSetName) {
        const firstSetName = Object.keys(groupedStickers)[0];
        setActiveStickerSetName(firstSetName);
        setActiveStickerList(groupedStickers[firstSetName]);
      }
    } else {
      setStickerSet({});
      setActiveStickerList([]);
      setActiveStickerSetName(undefined);
    }
  }, [stickerList]);

  React.useEffect(() => {
    if (stickerSet && Object.keys(stickerSet).length && activeStickerSetName) {
      const sortedStickerSet = stickerSet[activeStickerSetName].sort(
        (a: any, b: any) => a.stickerOrder - b.stickerOrder
      );
      setActiveStickerList(sortedStickerSet);
    }
  }, [stickerSet, activeStickerSetName]);
};
