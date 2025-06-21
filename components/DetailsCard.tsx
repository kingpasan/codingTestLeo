import React, { useCallback } from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { User } from "@/types/user";
import { IconSymbol } from "@/components/ui/IconSymbol";

type DetailsCardProps = {
  user?: User;
};

const DetailsCard: React.FC<DetailsCardProps> = ({ user }) => {
  if (!user) return null;

  const renderRow = useCallback(
    (label: string, value?: string | React.ReactNode) => (
      <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <IconSymbol size={60} color="#808080" name="person.crop.circle" />
      </View>

      {renderRow("Name", user.name)}
      {renderRow("Email", user.email)}
      {renderRow("Phone", user.phone)}
      {renderRow("Website", user.website)}
      {renderRow(
        "Address",
        `${user.address.suite}, ${user.address.street}, ${user.address.city}`
      )}
      {renderRow("Company", user.company.name)}

      <Text style={styles.quote}>"{user.company.catchPhrase}"</Text>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create<{
  container: ViewStyle;
  iconWrapper: ViewStyle;
  row: ViewStyle;
  label: TextStyle;
  value: TextStyle;
  quote: TextStyle;
}>({
  container: {
    alignItems: "flex-start",
    gap: 8,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  iconWrapper: {
    alignSelf: "center",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  label: {
    fontWeight: "600",
    color: "#222",
    marginRight: 4,
  },
  value: {
    color: "#444",
    flexShrink: 1,
  },
  quote: {
    fontStyle: "italic",
    color: "#777",
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
