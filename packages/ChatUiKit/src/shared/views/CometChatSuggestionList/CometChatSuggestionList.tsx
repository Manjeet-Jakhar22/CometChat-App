import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, View } from "react-native";
import { CometChatListItem } from "../CometChatListItem";
import { SuggestionItem } from "./SuggestionItem";
import { SuggestionListStyle } from "../../../theme/type";
import { Skeleton } from "./Skeleton";

/**
 * Props for the CometChatSuggestionList component.
 */
export interface CometChatSuggestionListInterface {
  /**
   * Color for the separator between suggestion items.
   */
  separatorColor?: string;
  /**
   * Array of suggestion items to be displayed.
   */
  data: Array<SuggestionItem>;
  /**
   * Custom styles for the suggestion list.
   */
  listStyle: SuggestionListStyle;
  /**
   * Callback function invoked when a suggestion item is pressed.
   *
   * @param item - The suggestion item that was pressed.
   */
  onPress: (item: SuggestionItem) => void;
  /**
   * Optional callback function invoked when the end of the list is reached.
   */
  onEndReached?: () => void;
  /**
   * Indicates whether the suggestion list is currently loading.
   */
  loading?: boolean;
}

export const CometChatSuggestionList = (props: CometChatSuggestionListInterface) => {
  const { data, listStyle, onPress, onEndReached, loading } = props;

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoad(false);
    }, 800);
  }, []);

  const _render = ({ item, index }: ListRenderItemInfo<SuggestionItem>) => {
    let shouldLoadAvatarName = item.hideLeadingIcon ? {} : { avatarName: item.name };
    return (
      <CometChatListItem
        key={index}
        id={item.id}
        title={item.name}
        avatarURL={item.leadingIconUrl ? { uri: item.leadingIconUrl } : undefined}
        containerStyle={listStyle?.listItemStyle.containerStyle}
        titleStyle={listStyle?.listItemStyle.titleStyle}
        avatarStyle={listStyle?.listItemStyle.avatarStyle}
        titleSubtitleContainerStyle={{
          alignSelf: "center",
        }}
        onPress={() => onPress(item)}
        {...shouldLoadAvatarName}
      />
    );
  };

  return (
    <View>
      {initialLoad ? (
        <View>
          <Skeleton />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={_render}
          onMomentumScrollEnd={(event) => {
            const contentOffsetY = event.nativeEvent.contentOffset.y; // The current scroll position
            const contentHeight = event.nativeEvent.contentSize.height; // Total height of the content
            const layoutHeight = event.nativeEvent.layoutMeasurement.height; // Height of the visible area

            if (contentOffsetY + layoutHeight >= contentHeight - 10) {
              onEndReached && onEndReached();
            }
          }}
          onEndReachedThreshold={0.3}
          keyboardShouldPersistTaps={"always"}
        />
      )}
      {!initialLoad && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          {loading && <ActivityIndicator animating={loading} />}
        </View>
      )}
    </View>
  );
};
