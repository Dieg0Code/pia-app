import React, { useEffect, useCallback, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDiaryStore } from "../store/DiaryStore";
import DataCard from "../components/DataCard";
import { DiaryDTO } from "@/src/data/models/DiaryDTO";
import { theme } from "@/src/core/constants/theme";

const HomePage = () => {
  const { response, loading, error, getEntries } = useDiaryStore();
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState<DiaryDTO[]>([]);

  const pageSize = 10;

  const fetchEntries = useCallback(async () => {
    await getEntries(page, pageSize);
  }, [getEntries, page]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  // Escuchar actualizaciones en response y forzar actualización inmutable del estado
  useEffect(() => {
    if (response && Array.isArray(response)) {
      setEntries((prevEntries) => [...prevEntries, ...response]);
    }
  }, [response]);

  const loadMoreEntries = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderItem = useCallback(
    ({ item }: { item: DiaryDTO }) => (
      <DataCard title={item.title} content={item.content} />
    ),
    []
  );

  if (loading && page === 1) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {entries.length > 0 ? (
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
          onEndReached={loadMoreEntries}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <Text>Loading more...</Text> : null}
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.background,
  },
});

export default HomePage;
