import React, { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ChatConfigurator, localize } from "../shared";
import { listners } from "./listners";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import { GroupTypeConstants, UserStatusConstants } from "../shared/constants/UIKitConstants";
import { CometChatUIEventHandler } from "../shared/events/CometChatUIEventHandler/CometChatUIEventHandler";
import { deepMerge } from "../shared/helper/helperFunctions";
import { Icon } from "../shared/icons/Icon";
import { CometChatAvatar } from "../shared/views/CometChatAvatar";
import { CometChatStatusIndicator } from "../shared/views/CometChatStatusIndicator";
import { useTheme } from "../theme";
import { MessageHeaderStyle } from "./styles";
import { CommonUtils } from "../shared/utils/CommonUtils";
import { DeepPartial } from "../shared/helper/types";

export type CometChatMessageHeaderInterface = {
  /**
   * Custom item view. Receives { user, group }.
   */
  ItemView?: ({ user, group }: { user?: CometChat.User; group?: CometChat.Group }) => JSX.Element;
  /**
   * Custom leading view. Receives { user, group }.
   */
  LeadingView?: ({
    user,
    group,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
  }) => JSX.Element;
  /**
   * Custom title view. Receives { user, group }.
   */
  TitleView?: ({ user, group }: { user?: CometChat.User; group?: CometChat.Group }) => JSX.Element;
  /**
   * Custom subtitle view. Receives { user, group }.
   */
  SubtitleView?: ({
    user,
    group,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
  }) => JSX.Element;
  /**
   * Custom trailing view. Receives { user, group }.
   */
  TrailingView?: ({
    user,
    group,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
  }) => JSX.Element;
  /**
   * Custom auxiliary button view. Receives { user, group }.
   */
  AuxiliaryButtonView?: ({
    user,
    group,
  }: {
    user?: CometChat.User;
    group?: CometChat.Group;
  }) => JSX.Element;
  /**
   * User object.
   */
  user?: CometChat.User;
  /**
   * Group object.
   */
  group?: CometChat.Group;
  /**
   * Hide the back button.
   */
  showBackButton?: boolean;
  /**
   * Callback when back button is pressed.
   */
  onBack?: () => void;
  /**
   * Custom styles.
   */
  style?: DeepPartial<MessageHeaderStyle>;
  /**
   * Error callback.
   */
  onError?: (error: CometChat.CometChatException) => void;
  /**
   * toggle visibilty of voice call button.
   */
  hideVoiceCallButton?: boolean;
  /**
   * toggle visibilty of video call button.
   */
  hideVideoCallButton?: boolean;
  /**
   * toggle visibilty of user status.
   */
  usersStatusVisibility?: boolean;
};

interface Translations {
  lastSeen: string;
  minutesAgo: (minutes: number) => string;
  hoursAgo: (hours: number) => string;
}

/** CometChatMessageHeader renders the header for a conversation. */
export const CometChatMessageHeader = (props: CometChatMessageHeaderInterface) => {
  const userStatusListenerId = "user_status_" + new Date().getTime();
  const msgTypingListenerId = "message_typing_" + new Date().getTime();
  const groupListenerId = "head_group_" + new Date().getTime();
  const theme = useTheme();

  const {
    TitleView,
    SubtitleView = null,
    AuxiliaryButtonView,
    user,
    group,
    showBackButton = false,
    onBack,
    style = {},
    ItemView,
    LeadingView,
    TrailingView,
    onError,
    hideVoiceCallButton = false,
    hideVideoCallButton = false,
    usersStatusVisibility = true,
  } = props;

  const [groupObj, setGroupObj] = useState(group);
  const [userObj, setUserObj] = useState<CometChat.User | undefined>(user);
  const [userStatus, setUserStatus] = useState(user && user.getStatus ? user.getStatus() : "");
  const [typingText, setTypingText] = useState("");
  const receiverTypeRef = useRef(
    user ? CometChat.RECEIVER_TYPE.USER : group ? CometChat.RECEIVER_TYPE.GROUP : null
  );

  useEffect(() => {
    setGroupObj(group);
  }, [group]);

  useEffect(() => {
    setUserStatus(userObj ? userObj.getStatus() : "");
  }, [userObj]);

  const messageHeaderStyles = useMemo(() => {
    return deepMerge(theme.messageHeaderStyles, style);
  }, [theme.messageHeaderStyles, style]);

  const translations: Translations = {
    lastSeen: "Last seen",
    minutesAgo: (minutes: number) => `${minutes} minute${minutes === 1 ? "" : "s"} ago`,
    hoursAgo: (hours: number) => `${hours} hour${hours === 1 ? "" : "s"} ago`,
  };

  /**
   * Returns a formatted last seen string.
   */
  function getLastSeenTime(timestamp: number, translations: Translations): string {
    try {
      if (timestamp === null) return `${translations.lastSeen} Unknown`;

      if (String(timestamp).length === 10) timestamp *= 1000;

      const now = new Date();
      const lastSeen = new Date(timestamp);
      const diffInMillis = now.getTime() - lastSeen.getTime();
      const diffInMinutes = Math.floor(diffInMillis / (1000 * 60));
      const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));

      if (diffInMinutes === 0) return `${translations.lastSeen} ${translations.minutesAgo(1)}`;
      if (diffInMinutes < 60)
        return `${translations.lastSeen} ${translations.minutesAgo(diffInMinutes)}`;
      if (diffInHours < 24) return `${translations.lastSeen} ${translations.hoursAgo(diffInHours)}`;

      const isSameYear = lastSeen.getFullYear() === now.getFullYear();
      const dateOptions: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        ...(isSameYear ? {} : { year: "numeric" }),
      };
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const formattedDate = lastSeen.toLocaleDateString(undefined, dateOptions);
      const formattedTime = lastSeen.toLocaleTimeString(undefined, timeOptions);

      if (formattedDate === "Invalid Date" || formattedTime === "Invalid Date") return "Offline";
      return `${translations.lastSeen} ${formattedDate} at ${formattedTime}`;
    } catch (e) {
      errorHandler(e);
      return "";
    }
  }

  /**
   * Renders the back button.
   */
  const BackButton = useCallback(
    () => (
      <TouchableOpacity style={[messageHeaderStyles.backButtonStyle]} onPress={onBack}>
        <Icon
          name='arrow-back-fill'
          size={messageHeaderStyles.backButtonIconStyle.width}
          height={messageHeaderStyles.backButtonIconStyle.height}
          width={messageHeaderStyles.backButtonIconStyle.width}
          color={messageHeaderStyles.backButtonIconStyle.tintColor}
          icon={messageHeaderStyles.backButtonIcon}
          imageStyle={messageHeaderStyles.backButtonIconStyle}
        />
      </TouchableOpacity>
    ),
    [onBack, messageHeaderStyles]
  );

  const statusIndicatorType = useMemo(() => {
    if (groupObj?.getType() === GroupTypeConstants.password) return "password";
    if (groupObj?.getType() === GroupTypeConstants.private) return "private";
    if (userStatus === "online") return "online";
    return "offline";
  }, [userStatus, groupObj]);

  /**
   * Renders the avatar with a status indicator.
   */
  const AvatarWithStatusView = useCallback(() => {
    try {
      return (
        <View>
          <CometChatAvatar
            style={messageHeaderStyles.avatarStyle}
            image={
              userObj
                ? userObj.getAvatar()
                  ? { uri: userObj.getAvatar() }
                  : undefined
                : groupObj
                ? groupObj.getIcon()
                  ? { uri: groupObj.getIcon() }
                  : undefined
                : undefined
            }
            name={(userObj?.getName() ?? groupObj?.getName())!}
          />
          {groupObj ? (
            <CometChatStatusIndicator type={statusIndicatorType} />
          ) : (
            usersStatusVisibility &&
            !(userObj?.getBlockedByMe() || userObj?.getHasBlockedMe()) && (
              <CometChatStatusIndicator type={statusIndicatorType} />
            )
          )}
        </View>
      );
    } catch (e) {
      errorHandler(e);
      return <></>;
    }
  }, [userObj, groupObj, statusIndicatorType, messageHeaderStyles]);

  /**
   * Renders subtitle view content.
   */
  const SubtitleViewFnc = useCallback(() => {
    try {
      if (typingText !== "")
        return <Text style={[messageHeaderStyles.typingIndicatorTextStyle]}>{typingText}</Text>;

      let subtitle = "";

      if (groupObj) {
        const count = groupObj?.["membersCount"];
        if (count || count === 0) {
          subtitle = `${count} ${localize(count === 1 ? "MEMBER" : "MEMBERS")}`;
        }
      }

      if (
        userObj &&
        !(userObj.getBlockedByMe() || userObj.getHasBlockedMe()) &&
        usersStatusVisibility &&
        userStatus
      ) {
        subtitle =
          userStatus === UserStatusConstants.online
            ? localize("ONLINE")
            : getLastSeenTime(userObj.getLastActiveAt(), translations);
      }

      if (subtitle) {
        return <Text style={[messageHeaderStyles.subtitleTextStyle]}>{subtitle}</Text>;
      }

      return <></>;
    } catch (error) {
      errorHandler(error);
      return <></>;
    }
  }, [userObj, groupObj, messageHeaderStyles, usersStatusVisibility, userStatus]);

  /**
   * Error handler to call onError with a proper CometChatException.
   */
  const errorHandler = (error: any) => {
    if (error instanceof CometChat.CometChatException) {
      onError && onError(error);
    } else if (error instanceof Error) {
      onError &&
        onError(
          new CometChat.CometChatException({
            code: "ERR_SYSTEM",
            details: error.stack,
            message: error.message,
          })
        );
    }
  };

  const handleUserStatus = (userDetails: CometChat.User) => {
    if (userDetails.getUid() === userObj?.getUid()) setUserStatus(userDetails.getStatus());
  };

  const msgTypingIndicator = (typist: CometChat.TypingIndicator, status: string) => {
    if (
      receiverTypeRef.current === CometChat.RECEIVER_TYPE.GROUP &&
      receiverTypeRef.current === typist.getReceiverType() &&
      groupObj?.getGuid() === typist.getReceiverId()
    ) {
      setTypingText(
        status === "typing" ? `${typist.getSender().getName()}: ${localize("IS_TYPING")}` : ""
      );
    } else if (
      receiverTypeRef.current === CometChat.RECEIVER_TYPE.USER &&
      receiverTypeRef.current === typist.getReceiverType() &&
      userObj?.getUid() === typist.getSender().getUid()
      && !(userObj.getBlockedByMe() || userObj.getHasBlockedMe())
    ) {
      setTypingText(status === "typing" ? localize("TYPING") : "");
    }
  };

  const handleGroupListener = (groupDetails: CometChat.Group) => {
    if (groupDetails?.getGuid() === groupObj?.getGuid() && groupDetails.getMembersCount()) {
      setGroupObj(CommonUtils.clone(groupDetails));
    }
  };

  useEffect(() => {
    try {
      if (userObj) {
        listners.addListener.userListener({ userStatusListenerId, handleUserStatus });
        receiverTypeRef.current = CometChat.RECEIVER_TYPE.USER;

        CometChatUIEventHandler.addUserListener(userStatusListenerId, {
          ccUserBlocked: (item: { user: CometChat.User }) => handleccUserBlocked(item),
          ccUserUnBlocked: (item: { user: CometChat.User }) => handleccUserUnBlocked(item),
        });
      }
      if (groupObj) {
        listners.addListener.groupListener({ groupListenerId, handleGroupListener });
        receiverTypeRef.current = CometChat.RECEIVER_TYPE.GROUP;
      }
      listners.addListener.messageListener({ msgTypingListenerId, msgTypingIndicator });
    } catch (error) {
      errorHandler(error);
    }
    return () => {
      try {
        if (groupObj) listners.removeListner.removeGroupListener({ groupListenerId });
        if (userObj) {
          listners.removeListner.removeUserListener({ userStatusListenerId });
          CometChatUIEventHandler.removeUserListener(userStatusListenerId);
        }
        listners.removeListner.removeMessageListener({ msgTypingListenerId });
      } catch (cleanupError) {
        errorHandler(cleanupError);
      }
    };
  }, [userObj]);

  const handleccUserBlocked = ({ user: blockedUser }: { user: CometChat.User }) => {
    if (userObj && userObj.getUid() === blockedUser.getUid()) {
      const tempUser = CommonUtils.clone(userObj);
      tempUser.setBlockedByMe(true);
      setUserObj(tempUser);
    }
  };

  const handleccUserUnBlocked = ({ user: unBlockedUser }: { user: CometChat.User }) => {
    if (userObj && userObj.getUid() === unBlockedUser.getUid()) {
      setUserObj(unBlockedUser);
    }
  };

  const handleGroupMemberKicked = ({ kickedFrom }: { kickedFrom: CometChat.Group }) => {
    setGroupObj(CommonUtils.clone(kickedFrom));
  };
  const handleGroupMemberBanned = ({ kickedFrom }: { kickedFrom: CometChat.Group }) => {
    setGroupObj(CommonUtils.clone(kickedFrom));
  };
  const handleGroupMemberAdded = ({ userAddedIn }: { userAddedIn: CometChat.Group }) => {
    setGroupObj(CommonUtils.clone(userAddedIn));
  };
  const handleOwnershipChanged = ({ group }: { group: CometChat.Group }) => {
    setGroupObj(CommonUtils.clone(group));
  };

  useEffect(() => {
    try {
      CometChatUIEventHandler.addGroupListener(groupListenerId, {
        ccGroupMemberKicked: (item: any) => handleGroupMemberKicked(item),
        ccGroupMemberBanned: (item: any) => handleGroupMemberBanned(item),
        ccGroupMemberAdded: (item: any) => handleGroupMemberAdded(item),
        ccOwnershipChanged: (item: any) => handleOwnershipChanged(item),
      });
    } catch (e) {
      errorHandler(e);
    }
    return () => {
      try {
        CometChatUIEventHandler.removeGroupListener(groupListenerId);
      } catch (e) {
        errorHandler(e);
      }
    };
  }, []);

  return (
    <>
      {ItemView ? (
        ItemView({ user: userObj, group })
      ) : (
        <View style={[messageHeaderStyles.containerStyle]}>
          {showBackButton === true && <BackButton />}
          {LeadingView ? LeadingView({ user: userObj, group }) : <AvatarWithStatusView />}
          <View style={{ flex: 1, justifyContent: "center" }}>
            {TitleView ? (
              TitleView({ user: userObj, group })
            ) : (
              <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={[messageHeaderStyles.titleTextStyle]}
              >
                {userObj ? userObj.getName() : groupObj ? groupObj.getName() : ""}
              </Text>
            )}
            {SubtitleView ? SubtitleView({ user: userObj, group }) : <SubtitleViewFnc />}
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ marginLeft: "auto", flexDirection: "row" }}>
              {AuxiliaryButtonView
                ? AuxiliaryButtonView({ user: userObj, group })
                : ChatConfigurator.getDataSource().getAuxiliaryHeaderAppbarOptions(userObj, group, {
                    callButtonStyle: messageHeaderStyles.callButtonStyle,
                    hideVideoCallButton,
                    hideVoiceCallButton,
                  })}
              {TrailingView && <>{TrailingView({ user: userObj, group })}</>}
            </View>
          </View>
        </View>
      )}
    </>
  );
};
