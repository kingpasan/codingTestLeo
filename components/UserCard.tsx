import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

type UserCardProps = {
  name: string;
  username: string;
  onPress?: () => void;
};

const UserCard: React.FC<UserCardProps> = ({ name, username, onPress }) => (
  <View style={styles.wrapper}>
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <IconSymbol size={60} color="#808080" name="person.crop.circle" />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default memo(UserCard);

const styles = StyleSheet.create<{
  wrapper: ViewStyle;
  card: ViewStyle;
  textContainer: ViewStyle;
  name: TextStyle;
  username: TextStyle;
}>({
  wrapper: {
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 6,
    gap: 12,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  username: {
    fontSize: 14,
    color: "#666",
  },
});
