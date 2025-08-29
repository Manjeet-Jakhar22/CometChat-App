import { useTheme } from "@cometchat/chat-uikit-react-native";
import { StyleSheet } from "react-native";

const theme = useTheme();
export const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 15,
    paddingLeft: 10,
    flexDirection: "row",
  },
  ellipseTail: { paddingHorizontal: 10, width: "80%" },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pL5: {
    paddingLeft: 5,
  },
  groupInfoSection: {
    marginTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  infoTitleContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
  },
  avatarContainer: {
    height: 120,
    width: 120,
  },
  avatarText: {
    fontSize: 28,
    lineHeight: 55,
  },
  avatarImage: {
    height: "100%",
    width: "100%",
  },
  titleName: {
    marginTop: 10,
    alignSelf: "center",
  },
  boxLabel: {
    marginTop: 5,
    textAlign: "center",
    alignSelf: "center",
  },
  boxContainerRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonIcon: {
    marginBottom: 5,
  },
  actionContainer: {
    paddingTop: 10,
    gap: 4,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingLeft: 20,
    width: "100%",
  },
  mL5: {
    marginLeft: 5,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cancelButton: {
    marginRight: 15,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: theme.color.textPrimary,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: theme.color.textPrimary,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
