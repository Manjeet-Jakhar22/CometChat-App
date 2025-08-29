import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Video from "react-native-video";
import { Icon } from "../../icons/Icon";

/**
 * Props for the CometChatVideoPlayer component.
 */
export interface CometChatVideoPlayerProps {
  /**
   * URI of the video to play.
   */
  videoUri: string;
  /**
   * Flag indicating whether the video player is visible.
   */
  isVisible: boolean;
  /**
   * Callback function invoked when the video player is closed.
   */
  onClose: () => void;
  /**
   * Callback function invoked when the video has loaded.
   */
  onLoad: () => void;
  /**
   * Optional color for the loading icon.
   */
  loadingIconColor?: string;
}

export const CometChatVideoPlayer = (props: CometChatVideoPlayerProps) => {
  const { videoUri, isVisible, onClose, onLoad, loadingIconColor } = props;

  const [isPaused, setPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Animated value for vertical position
  const pan = useRef(new Animated.ValueXY()).current;

  // Threshold for swipe-down to trigger close
  const SWIPE_THRESHOLD = 150;

  // PanResponder to handle swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to vertical gestures
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
      },
      onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_THRESHOLD) {
          // User swiped down enough to dismiss
          Animated.timing(pan, {
            toValue: { x: 0, y: Dimensions.get("window").height },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            handleClose();
            pan.setValue({ x: 0, y: 0 }); // Reset position
          });
        } else {
          // Not enough swipe, reset position
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleLoadStart = () => {
    setIsLoading(true);
    setPaused(false);
  };

  const handleBuffer = (bufferData: { isBuffering: boolean }) => {
    setIsLoading(bufferData.isBuffering);
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad();
  };

  /**
   * Closes the video (pauses it) and calls parent onClose.
   */
  const handleClose = () => {
    setPaused(true);
    onClose();
  };

  return (
    <Modal
      animationType='fade'
      presentationStyle='overFullScreen'
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalBackground}>
        <Animated.View
          style={[styles.overlay, { transform: [{ translateY: pan.y }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.smallPlayerContainer}>
            <Video
              source={{ uri: videoUri }}
              controls={true}
              resizeMode='contain'
              onLoadStart={handleLoadStart}
              onBuffer={handleBuffer}
              onLoad={handleLoad}
              onError={(e) => console.warn("Video Error: ", e?.error)}
              paused={isPaused}
              style={styles.smallVideo}
            />

            {isLoading && (
              <ActivityIndicator
                style={styles.loadingIndicator}
                size='large'
                color={loadingIconColor || "#fff"}
              />
            )}

            {/* Optional: Custom close button */}

            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={styles.closeButton}>
                <Icon name='close' size={18} color={"#fff"} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {},
  smallPlayerContainer: {
    width: width * 0.95, // Adjust the width of the player
    height: height * 0.6, // Adjust the height as needed
    backgroundColor: "black",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  smallVideo: {
    width: "100%",
    height: "100%",
  },
  loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
  },
  closeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 10,
    right: Platform.OS === "ios" ? 8 : 10,
    width: 30,
    height: 30,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});