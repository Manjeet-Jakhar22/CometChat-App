import { CometChat } from "@cometchat/chat-sdk-react-native";
import React, { useRef } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "../../../shared/icons/Icon";
import { localize } from "../../../shared/resources/CometChatLocalize";
import { ErrorEmptyView } from "../../../shared/views/ErrorEmptyView/ErrorEmptyView";
import { useTheme } from "../../../theme";
import { CometChatTheme } from "../../../theme/type";
import { ExtensionConstants } from "../../ExtensionConstants";
import { Hooks } from "./hooks";
import { Skeleton } from "./Skeleton";
import { Styles } from "./style";

/**
 * Interface defining the props for CometChatStickerKeyboard component
 */
export interface CometChatStickerKeyboardInterface {
  loadingText?: string;
  theme?: CometChatTheme;
  onPress?: (item: any) => void; // Callback when a sticker is pressed
  emptyText?: string; // Optional text when no stickers are available
  errorText?: string; // Optional error text
}

/**
 * Props for the StickerItem component
 */
interface StickerItemProps {
  stickerItem: any; // Sticker item data or null for placeholders
  onPress: (item: any) => void; // Callback when the sticker is pressed
  theme: CometChatTheme; // Theme object
}

/**
 * StickerItem Component
 * Renders individual sticker items within the sticker keyboard.
 * Handles loading state, error state, and placeholder rendering.
 */
const StickerItem = ({ stickerItem, onPress, theme }: StickerItemProps) => {
  // State to manage loading status of the sticker image
  const [isLoading, setIsLoading] = React.useState(true);
  // State to manage error status if the image fails to load
  const [hasError, setHasError] = React.useState(false);

  // If stickerItem is null, render an empty placeholder to maintain grid structure
  if (!stickerItem) {
    return <View style={Styles.stickerItemStyle} />;
  }

  return (
    <TouchableOpacity
      style={Styles.stickerItemStyle}
      onPress={() => onPress(stickerItem)}
      accessibilityRole='button'
    >
      {hasError ? (
        // If there was an error loading the sticker, display a default icon
        <Image
          source={require("../../../../src/theme/default/resources/icons/Base_Icon.png")}
          style={Styles.stickerImageStyle}
          resizeMode='contain'
        />
      ) : (
        // Otherwise, display the sticker image
        <Image
          source={{ uri: stickerItem?.stickerUrl }}
          style={Styles.stickerImageStyle}
          onLoad={() => setIsLoading(false)} // Update loading state when image loads
          onError={() => {
            setIsLoading(false);
            setHasError(true); // Update error state if image fails to load
          }}
          resizeMode='contain'
        />
      )}
      {isLoading && !hasError && (
        // Show a loading indicator while the image is loading
        <View style={Styles.activityIndicatorWrapper}>
          <ActivityIndicator size='small' color={theme.color.primary} />
        </View>
      )}
    </TouchableOpacity>
  );
};

/**
 * CometChatStickerKeyboard Component
 * Fetches stickers from the Stickers extension and displays them in a keyboard layout.
 */
export const CometChatStickerKeyboard = (props: CometChatStickerKeyboardInterface) => {
  const [stickerList, setStickerList] = React.useState<any[]>([]);
  const [stickerSet, setStickerSet] = React.useState<Record<string, any[]>>({});
  const [activeStickerList, setActiveStickerList] = React.useState<any[]>([]);
  const [activeStickerSetName, setActiveStickerSetName] = React.useState<string | undefined>(
    undefined
  );

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const theme = useTheme();
  const flatListRef = useRef<FlatList>(null);

  /**
   * Function to handle sending a sticker message
   * @param stickerItem - The selected sticker item
   */
  const sendStickerMessage = (stickerItem: any) => {
    if (props?.onPress) {
      // Invoke the onPress callback with the sticker message
      props.onPress({
        ...stickerItem,
        sticker_url: stickerItem?.stickerUrl,
        sticker_name: stickerItem?.stickerSetName,
      });
    }
  };

  /**
   * Function to handle the selection of a sticker set
   * @param sectionItem - The name of the selected sticker set
   */
  const onStickerSetClicked = (sectionItem: string) => {
    setActiveStickerList(stickerSet[sectionItem]);
    setActiveStickerSetName(sectionItem);
    // Scroll the sticker list to the top when a new set is selected
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
    }
  };

  /**
   * Function to render the list of stickers based on the current state
   */
  const getStickerList = () => {
    if (error) {
      return (
        <View style={[Styles.stickerContainer]}>
          <View style={Styles.stickerMsgStyle}>
            <Text
              style={[
                theme.typography.body.regular,
                { color: theme.color.textTertiary, textAlign: "center" },
              ]}
            >
              {localize("SOMETHING_WENT_WRONG")}
            </Text>
          </View>
        </View>
      );
    }

    // If data is still loading, display the skeleton loader
    if (loading) {
      return (
        <View style={Styles.skeletonContainer}>
          <Skeleton />
        </View>
      );
    }

    // If there are no stickers available, display an empty state view
    if (stickerList.length === 0) {
      return (
        <ErrorEmptyView
          title='No Stickers Available'
          subTitle='You don’t have any stickers yet.'
          Icon={
            <Icon
              containerStyle={{ marginBottom: 10 }}
              name='base-icon'
              width={theme.spacing.spacing.s15}
              height={theme.spacing.spacing.s15}
            />
          }
          containerStyle={[Styles.stickerContainer, Styles.emptyContainer]}
          titleStyle={[theme.typography.heading4.bold, { color: theme.color.textPrimary }]}
          subTitleStyle={[theme.typography.body.regular, { color: theme.color.textSecondary }]}
        />
      );
    }

    // If sticker sets are available, render them in a grid
    if (stickerSet && Object.keys(stickerSet).length) {
      const numberOfStickers = activeStickerList.length;
      const numberOfPlaceholders = numberOfStickers % 3 === 0 ? 0 : 3 - (numberOfStickers % 3);
      const paddedStickerList = [...activeStickerList];

      for (let i = 0; i < numberOfPlaceholders; i++) {
        paddedStickerList.push(null);
      }

      return (
        <FlatList
          ref={flatListRef}
          data={paddedStickerList}
          renderItem={({ item }) => (
            <StickerItem stickerItem={item} onPress={sendStickerMessage} theme={theme} />
          )}
          keyExtractor={(item, index) => (item ? `${item.id}-${index}` : `placeholder-${index}`)}
          numColumns={3}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.spacing.s5,
          }} // Adds horizontal padding
          showsVerticalScrollIndicator={false}
        />
      );
    }

    return null;
  };

  // Invoke custom hooks to fetch stickers and manage state
  Hooks(
    props,
    stickerList,
    stickerSet,
    activeStickerSetName,
    setStickerList,
    setStickerSet,
    setActiveStickerList,
    setActiveStickerSetName,
    setLoading,
    setError
  );

  return (
    <View style={[Styles.stickerWrapperStyle, { backgroundColor: theme.color.background1 }]}>
      {/* Header displaying the active sticker set name or a default label */}
      <View style={{ padding: 10 }}>
        <Text
          style={[
            theme?.typography?.body.regular,
            { color: theme.color.textTertiary, paddingLeft: 10 },
          ]}
        >
          {activeStickerSetName}
        </Text>
      </View>
      {/* Main content area for stickers and category selector */}
      <View style={Styles.stickerContentWrapper}>
        {/* Render the list of stickers based on current state */}
        {getStickerList()}
        {/* If there's no error, display the sticker set category selector */}
        {!error && (
          <View
            style={[Styles.categorySelectorWrapper, { borderTopColor: theme.color.borderLight }]}
          >
            <FlatList
              data={Object.keys(stickerSet)} // List of sticker set names
              renderItem={({ item }) => {
                // Retrieve the thumbnail for the sticker set (first sticker's URL)
                const stickerSetThumbnail = stickerSet[item][0][ExtensionConstants.stickerUrl];
                // Determine if this sticker set is currently active
                const isActive = item === activeStickerSetName;

                return (
                  <TouchableOpacity
                    style={Styles.sectionListItemStyle}
                    onPress={() => onStickerSetClicked(item)}
                    accessibilityLabel={`Sticker category ${item}`}
                    accessibilityRole='button'
                  >
                    {isActive && (
                      // Highlight the active sticker set
                      <View
                        style={[
                          Styles.activeCategoryBackground,
                          { backgroundColor: theme.color.primary },
                        ]}
                      />
                    )}
                    {/* Display the sticker set thumbnail */}
                    <Image
                      source={{ uri: stickerSetThumbnail }}
                      style={Styles.stickerCategoryImageStyle}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => `${item}-${index}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: theme.spacing.spacing.s3,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
