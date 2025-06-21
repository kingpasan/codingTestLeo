import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";

import {
  UserCard,
  DialogModal,
  DetailsCard,
  ParallaxFlatList,
} from "@/components";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { User } from "@/types/user";
import { fetchUsers } from "@/api/users";

const TabTwoScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError("Failed to refresh users.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: any) {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      ),
    [users, query]
  );

  const openDialog = useCallback(
    (id: number) => {
      const user = users.find((u) => u.id === id) || null;
      setSelectedUser(user);
      setShowDialog(true);
    },
    [users]
  );

  const closeDialog = useCallback(() => {
    setShowDialog(false);
    setSelectedUser(null);
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#808080" />
        <Text style={styles.statusText}>Loading users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.statusText}>{error}</Text>
        <Button title="Retry" onPress={loadUsers} />
      </View>
    );
  }

  return (
    <>
      <ParallaxFlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <UserCard
            name={item.name}
            username={item.username}
            onPress={() => openDialog(item.id)}
          />
        )}
        searchValue={query}
        onSearchChange={setQuery}
        onClearPress={() => setQuery("")}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="brain.head.profile.fill"
            style={styles.headerImage}
          />
        }
      />
      <View>
        <DialogModal
          key={selectedUser?.id}
          title="User Details"
          visible={showDialog}
          onClose={closeDialog}
        >
          {selectedUser && <DetailsCard user={selectedUser} />}
        </DialogModal>
      </View>
    </>
  );
};

export default TabTwoScreen;

const styles = StyleSheet.create({
  headerImage: {
    position: "absolute",
    bottom: -90,
    left: -35,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  statusText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: "center",
    color: "#444",
  },
});
