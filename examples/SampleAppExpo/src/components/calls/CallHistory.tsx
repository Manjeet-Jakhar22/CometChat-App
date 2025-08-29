import { CometChat } from "@cometchat/chat-sdk-react-native";
import {
  CallingPackage,
  CometChatListItem,
  useTheme,
} from "@cometchat/chat-uikit-react-native";
import React, {
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FlatList, Text, View } from "react-native";
import { CallDetailHelper } from "./CallDetailHelper";
import { Icon } from "@cometchat/chat-uikit-react-native";

const CometChatCalls = CallingPackage.CometChatCalls;

export const CallHistory = (props: { user?: any; group?: any }) => {
  const { user, group } = props;

  const theme = useTheme();

  const [list, setList] = useState<any[]>([]);

  const loggedInUser = useRef<CometChat.User | any>(null);
  const callRequestBuilderRef = useRef<any>(null);

  function setRequestBuilder() {
    callRequestBuilderRef.current;
    let builder = new CometChatCalls.CallLogRequestBuilder()
      .setLimit(30)
      .setAuthToken(loggedInUser.current?.getAuthToken() || "")
      .setCallCategory("call");
    if (user) {
      builder = builder.setUid(user?.getUid());
    } else if (group) {
      builder = builder.setGuid(group?.getGuid());
    }
    callRequestBuilderRef.current = builder.build();
  }

  const fetchCallLogHistory = () => {
    callRequestBuilderRef.current
      .fetchNext()
      .then((CallLogHistory: any) => {
        console.log(CallLogHistory.length);
        if (CallLogHistory.length > 0) {
          setList([...list, ...CallLogHistory]);
        }
      })
      .catch((err: any) => {
        console.log("Error fetching call log history:", err);
      });
  };

  useEffect(() => {
    CometChat.getLoggedinUser()
      .then((u: any) => {
        loggedInUser.current = u;
        setRequestBuilder();
        fetchCallLogHistory();
      })
      .catch((e: any) => {
        console.log("Error getting logged in user:", e);
      });
  }, []);

  const _style = useMemo(() => {
    return {
      headerContainerStyle: {
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",
        borderRadius: 0,
        paddingHorizontal: 0,
      },
      titleSeparatorStyle: {
        borderBottomWidth: 1,
        borderBottomColor: theme.color.borderLight,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      },
      containerStyle: {
        backgroundColor: theme.color.background1,
        flex: 1,
      },
      itemStyle: {
        containerStyle: {
          flexDirection: "row" as const,
          marginHorizontal: theme.spacing.margin.m4,
          paddingVertical: theme.spacing.padding.p2,
          gap: theme.spacing.spacing.s3,
          flex: 1,
        },
        titleStyle: {
          color: theme.color.textPrimary,
          flex: 1,
          ...theme.typography.heading4.bold,
        },
        subtitleStyle: {
          color: theme.color.textSecondary,
          ...theme.typography.caption1.regular,
        },
        tailViewTextStyle: {
          color: theme.color.textPrimary,
          ...theme.typography.caption1.bold,
        },
        avatarStyle: {
          containerStyle: {},
          textStyle: {},
          imageStyle: {
            height: 48,
            width: 48,
          },
        },
      },
    };
  }, [theme]);

  const getFormattedInitiatedAt = useCallback((call: any) => {
    return CallDetailHelper.getFormattedInitiatedAt(call);
  }, []);

  const getCallType = useCallback((call: any) => {
    return CallDetailHelper.getCallType(call);
  }, []);

  const getCallStatusIcon = useCallback((item: any): JSX.Element => {
    const CallStatusIcon = CallDetailHelper.getCallStatusDisplayIcon(
      getCallType(item).callStatus,
      theme
    );
    return CallStatusIcon || <View />;
  }, []);

  const convertMinutesToTime = useCallback((decimalMinutes: number) => {
    const totalSeconds = Math.round(decimalMinutes * 60); // Convert to seconds
    const minutes = Math.floor(totalSeconds / 60); // Get whole minutes
    const seconds = totalSeconds % 60; // Get remaining seconds

    return `${minutes} min  ${seconds} sec`;
  }, []);

  const _render = ({ item, index }: any) => {
    return (
      <React.Fragment key={index}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Icon
            icon={getCallStatusIcon(item)}
            containerStyle={{ marginLeft: theme.spacing.margin.m4 }}
          ></Icon>
          <CometChatListItem
            id={item.sessionId}
            containerStyle={_style.itemStyle.containerStyle}
            headViewContainerStyle={{ flexDirection: "row" }}
            trailingViewContainerStyle={{
              alignSelf: "center",
            }}
            titleStyle={_style.itemStyle.titleStyle}
            title={CallDetailHelper.getCallStatusDisplayText(
              getCallType(item).callStatus
            )}
            SubtitleView={
              <Text
                style={{
                  ...theme.typography.body.regular,
                  color: theme.color.textSecondary,
                }}
              >
                {getFormattedInitiatedAt(item)}
              </Text>
            }
            TrailingView={
              <Text style={_style.itemStyle.tailViewTextStyle}>
                {convertMinutesToTime(item.getTotalDurationInMinutes())}
              </Text>
            }
          />
        </View>
      </React.Fragment>
    );
  };

  return (
    <FlatList
      data={list}
      keyExtractor={(item, index) => item.sessionId + "_" + index}
      renderItem={_render}
      onEndReached={fetchCallLogHistory}
    />
  );
};
