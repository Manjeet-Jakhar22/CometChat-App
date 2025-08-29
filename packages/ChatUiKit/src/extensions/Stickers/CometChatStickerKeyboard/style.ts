import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("window");

export const Styles = StyleSheet.create({
  stickerWrapperStyle: {
    marginTop: 5,
    padding: 0,
    marginHorizontal:-10,
    height: height * 0.4,
  },
  stickerContainer: {
    justifyContent: "center",
    position: "relative",
  },
  stickerContentWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  stickerListStyle: {
    flexGrow: 1,
  },
  stickerItemStyle: {
    flex: 1,
    aspectRatio: 1,
    margin: 10,
    position: "relative",
  },
  stickerImageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  activityIndicatorWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -10,
    marginTop: -10,
    zIndex: 2,
    borderRadius: 10,
    padding: 2,
  },
  sectionListItemStyle: {
    paddingHorizontal: 10,
    flexShrink: 0,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeCategoryBackground: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  stickerMsgStyle: {
    top: 90,
  },
  stickerCategoryImageStyle: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  categorySelectorWrapper: {
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  emptyContainer: {
    top: 176,
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
