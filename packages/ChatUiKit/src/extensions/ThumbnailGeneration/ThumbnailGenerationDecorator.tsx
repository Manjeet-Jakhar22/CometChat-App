import { DataSource, DataSourceDecorator } from "../../shared/framework";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { ExtensionConstants } from "../ExtensionConstants";
import { getExtensionData } from "../ExtensionModerator";
import {
  CometChatImageBubble,
  CometChatVideoBubble,
} from "../../shared/views";
import React, { JSX } from "react";
import { CometChatTheme } from "../../theme/type";
import { CometChatUIKit } from "../../shared";

/**
 *
 *
 * @description Decorator to generate thumbnails for media messages.
 */
export class ThumbnailGenerationExtensionDecorator extends DataSourceDecorator {
  /**
   *
   *
   * @param {DataSource} dataSource
   * @description Creates an instance of ThumbnailGenerationExtensionDecorator.
   */
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  /**
   *
   *
   * @returns {string}
   * @description Returns the unique ID for the thumbnail generation extension.
   */
  getId(): string {
    return "ThumbnailGeneration";
  }

  /**
   *
   *
   * @param {CometChat.MediaMessage} message
   * @returns {{ uri: string }}
   * @description Checks for a generated thumbnail for the message. If available, returns the thumbnail URI;
   * otherwise, returns the default image URI (for images) or an empty URI.
   */
  checkThumbnail(message: CometChat.MediaMessage) {
    let image: { uri: string } = { uri: "" };
    const thumbnailData = getExtensionData(message, ExtensionConstants.thumbnailGeneration);
    if (thumbnailData == undefined) {
      image = message.getType() === "image" ? { uri: (message?.getData() as any)?.url } : image;
    } else {
      const attachmentData = thumbnailData["attachments"];
      if (attachmentData.length) {
        const dataObj = attachmentData[0];
        if (!dataObj["error"]) {
          const imageLink = dataObj?.["data"]?.["thumbnails"]?.["url_small"];
          image = imageLink ? { uri: dataObj["data"]["thumbnails"]["url_small"] } : image;
        }
      }
    }
    return image;
  }

  /**
   *
   *
   * @param {string} videoUrl
   * @param {string} thumbnailUrl
   * @param {CometChat.MediaMessage} message
   * @param {CometChatTheme} theme
   * @returns {JSX.Element}
   * @description Returns the video message bubble element with thumbnail support.
   */
  getVideoMessageBubble(
    videoUrl: string,
    thumbnailUrl: string,
    message: CometChat.MediaMessage,
    theme: CometChatTheme
  ) {
    const image = this.checkThumbnail(message);
    const loggedInUser = CometChatUIKit.loggedInUser;
    const _style =
      message.getSender().getUid() === loggedInUser!.getUid()
        ? theme.messageListStyles.outgoingMessageBubbleStyles?.videoBubbleStyles
        : theme.messageListStyles.incomingMessageBubbleStyles?.videoBubbleStyles;
    return (
      <CometChatVideoBubble
        videoUrl={videoUrl}
        thumbnailUrl={image}
        imageStyle={_style?.imageStyle}
        playIcon={_style?.playIcon}
        playIconStyle={_style?.playIconStyle}
        playIconContainerStyle={_style?.playIconContainerStyle}
        placeholderImage={_style?.placeholderImage}
      />
    );
  }

  /**
   *
   *
   * @param {string} imageUrl
   * @param {string} caption
   * @param {CometChat.MediaMessage} message
   * @param {CometChatTheme} theme
   * @returns {JSX.Element}
   * @description Returns the image message bubble element with thumbnail support.
   */
  getImageMessageBubble(
    imageUrl: string,
    caption: string,
    message: CometChat.MediaMessage,
    theme: CometChatTheme
  ): JSX.Element {
    const image = this.checkThumbnail(message);
    const loggedInUser = CometChatUIKit.loggedInUser!;
    const _style =
      message.getSender().getUid() === loggedInUser.getUid()
        ? theme.messageListStyles.outgoingMessageBubbleStyles?.imageBubbleStyles
        : theme.messageListStyles.incomingMessageBubbleStyles?.imageBubbleStyles;
    return (
      <CometChatImageBubble
        imageUrl={imageUrl ? { uri: imageUrl } : image}
        thumbnailUrl={image}
        style={_style?.imageStyle}
      />
    );
  }
}
