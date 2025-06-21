import React, { ReactElement } from "react";
import { View, StyleSheet, FlatListProps, ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "./SearchBar";

const HEADER_HEIGHT = 170;

type ParallaxFlatListProps<T> = {
  data: T[];
  renderItem: FlatListProps<T>["renderItem"];
  keyExtractor: FlatListProps<T>["keyExtractor"];
  headerImage: ReactElement;
  searchValue: string;
  onSearchChange: (text: string) => void;
  onClearPress: () => void;
  refreshing?: boolean;
  onRefresh?: () => void;
};

const ParallaxFlatList = <T,>({
  data,
  renderItem,
  keyExtractor,
  headerImage,
  searchValue,
  onSearchChange,
  onClearPress,
  refreshing,
  onRefresh,
}: ParallaxFlatListProps<T>): ReactElement => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
        ),
      },
      {
        scale: interpolate(
          scrollY.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [2, 1, 1]
        ),
      },
    ],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={data}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <View>
            <Animated.View
              style={[
                styles.header,
                { backgroundColor: "#D0D0D0" },
                headerStyle,
              ]}
            >
              {headerImage}
            </Animated.View>
            <View style={styles.searchContainer}>
              <SearchBar
                query={searchValue}
                setQuery={onSearchChange}
                onClearPress={onClearPress}
              />
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 32, backgroundColor: "white" }}
      />
    </SafeAreaView>
  );
};

export default ParallaxFlatList;

const styles = StyleSheet.create<{
  container: ViewStyle;
  contentContainer: ViewStyle;
  header: ViewStyle;
  searchContainer: ViewStyle;
}>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  header: {
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#D0D0D0",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "#fff",
    zIndex: 1,
  },
});
