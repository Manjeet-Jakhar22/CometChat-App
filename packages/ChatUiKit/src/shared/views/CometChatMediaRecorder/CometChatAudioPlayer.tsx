import React, { useCallback, useEffect, useRef, useState } from "react";
import { NativeModules, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../theme";
import { Icon } from "../../icons/Icon";
import { AnimatedAudioWaves } from "../CometChatAudioBubble/AnimatedAudioWaves";

export interface CometChatAudioPlayerInterface {
  totalDuration: number;
}

export const CometChatAudioPlayer = ({ totalDuration }: CometChatAudioPlayerInterface) => {
  const [status, setStatus] = useState<"playing" | "paused" | "stopped">("stopped");
  const [currentTime, setCurrentTime] = useState(0);
  const audioBubbleStyles =
    useTheme().messageListStyles.outgoingMessageBubbleStyles?.audioBubbleStyles;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const displayDuration = useCallback(
    () => (
      <Text style={audioBubbleStyles?.playProgressTextStyle}>
        {`${String(Math.floor((currentTime || 0) / 60)).padStart(2, "0")}:${String(
          Math.floor((currentTime || 0) % 60)
        ).padStart(2, "0")}`}
        /
        {`${String(Math.floor((totalDuration || 0) / 60)).padStart(2, "0")}:${String(
          Math.floor((totalDuration || 0) % 60)
        ).padStart(2, "0")}`}
      </Text>
    ),
    [currentTime, totalDuration]
  );

  function clearTimeInterval() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const playAudio = (type: "play" | "resume") => {
    NativeModules.FileManager[type === "play" ? "playAudio" : "resumePlaying"]((filepath) => {
      console.log("Filepath _playRecorderAudio", filepath);
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setStatus("stopped");
            stopAudio();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    });
  };

  const pauseAudio = () => {
    NativeModules.FileManager.pausePlaying((filepath) => {
      clearTimeInterval();
      console.log("Filepath _pauseRecorderAudio", filepath);
    });
  };

  const stopAudio = () => {
    NativeModules.FileManager.releaseMediaResources((filepath) => {
      clearTimeInterval();
      setCurrentTime(0);
      console.log("Filepath _pauseRecorderAudio", filepath);
    });
  };

  useEffect(() => {
    return clearTimeInterval;
  }, []);

  return (
    <View style={audioBubbleStyles?.playViewContainerStyle}>
      <TouchableOpacity
        style={audioBubbleStyles?.playIconContainerStyle}
        onPress={() => {
          setStatus((prev) => {
            if (prev === "playing") {
              pauseAudio();
              return "paused";
            } else if (prev === "paused") {
              playAudio("resume");
              return "playing";
            } else {
              playAudio("play");
              return "playing";
            }
          });
        }}
      >
        <Icon
          name={status === "playing" ? "pause-fill" : "play-arrow-fill"}
          height={audioBubbleStyles?.playIconStyle?.height}
          width={audioBubbleStyles?.playIconStyle?.width}
          color={audioBubbleStyles?.playIconStyle?.tintColor}
          imageStyle={audioBubbleStyles?.playIconStyle}
          // icon={status === "playing" ? pauseIcon : playIcon}
        />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <AnimatedAudioWaves
          waveStyle={audioBubbleStyles?.waveStyle}
          waveContainerStyle={audioBubbleStyles?.waveContainerStyle}
          isAnimating={status === "playing"}
        />
        {displayDuration()}
      </View>
    </View>
  );
};
