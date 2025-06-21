import React, { memo, useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

type SearchBarProps = {
  query: string;
  setQuery: (keywords: string) => void;
  onClearPress: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  onClearPress,
}) => {
  const handleChange = useCallback(
    (text: string) => setQuery(text),
    [setQuery]
  );

  return (
    <View style={styles.container}>
      <IconSymbol
        size={20}
        color="#808080"
        name="magnifyingglass"
        style={styles.icon}
      />

      <TextInput
        style={styles.input}
        value={query}
        onChangeText={handleChange}
        placeholder="Search"
        placeholderTextColor="#666"
        returnKeyType="search"
        clearButtonMode="never"
      />

      {query.length > 0 && (
        <TouchableOpacity
          onPress={onClearPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <IconSymbol
            size={20}
            color="#808080"
            name="xmark.app"
            style={styles.icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(SearchBar);

const styles = StyleSheet.create<{
  container: ViewStyle;
  icon: ViewStyle;
  input: TextStyle;
}>({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 8,
  },
  icon: {
    paddingHorizontal: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});
