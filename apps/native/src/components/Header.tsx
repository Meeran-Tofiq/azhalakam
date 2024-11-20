import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackButton from "./BackButton";
import GenericButton from "./GenericButton";
import Icon from "react-native-vector-icons/Ionicons";

interface HeaderProps {
  title: string;
  actionButton?: {
    label: string;
    iconName: string;
    onPress: () => void;
    style?: object;
  };
}

const Header: React.FC<HeaderProps> = ({ title, actionButton }) => {
  return (
    <View style={styles.header}>
      <BackButton />
      <Text style={styles.headerTitle}>{title}</Text>
      {actionButton && (
        <GenericButton
          style={actionButton.style}
          onPress={actionButton.onPress}
          label={actionButton.label}
        >
          <Icon name={actionButton.iconName} size={24} color="#fff" />
        </GenericButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    flex: 1,
    marginLeft: 15,
  },
});

export default Header; 