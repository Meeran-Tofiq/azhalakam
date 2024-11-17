import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../types/types";

type BackButtonProps = {
  color?: string;
  size?: number;
};

const BackButton: React.FC<BackButtonProps> = ({ color = "#1F2937", size = 24 }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Icon name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 5,
    marginRight: 10,
  },
});

export default BackButton; 