import { StyleSheet } from "react-native";

export const tooltipStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.025,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
});
