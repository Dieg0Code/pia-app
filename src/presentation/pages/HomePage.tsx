import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useRef,
} from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  Animated,
  Vibration,
  ScrollView,
} from "react-native";
import { Text, FAB, Snackbar } from "react-native-paper";
import { AnimatedFlashList, FlashList } from "@shopify/flash-list";
import { useDiaryStore } from "../store/DiaryStore";
import { DiaryDTO } from "@/src/data/models/DiaryDTO";
import { theme } from "@/src/core/constants/theme";
import DataCard from "../components/DataCard";
import EditRegistryModal from "../components/EditRegistryModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import SearchBar from "../components/SearchBar";

const SCROLL_THRESHOLD = 600;
const PAGE_SIZE = 100;

const HomePage = () => {
  const {
    response,
    loading,
    error,
    getEntries,
    updateEntry,
    updateSuccess,
    deleteEntry,
  } = useDiaryStore();

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [entries, setEntries] = useState<DiaryDTO[]>([]);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryDTO | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    color: "white",
  });

  const listRef = useRef<FlashList<DiaryDTO>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchEntries = useCallback(
    async (pageNum: number, refresh = false) => {
      await getEntries(pageNum, PAGE_SIZE);
      if (refresh) setRefreshing(false);
    },
    [getEntries]
  );

  useEffect(() => {
    fetchEntries(page);
  }, [fetchEntries, page]);

  useEffect(() => {
    if (response && Array.isArray(response)) {
      setEntries((prevEntries) => {
        if (page === 1) return response;
        const newEntries = response.filter(
          (newEntry) =>
            !prevEntries.some((prevEntry) => prevEntry.id === newEntry.id)
        );
        return [...prevEntries, ...newEntries];
      });
    }
  }, [response, page]);

  useEffect(() => {
    if (updateSuccess) {
      showSnackbar("Registro actualizado correctamente", theme.primary);
    } else if (error) {
      showSnackbar(error, theme.error);
    }
  }, [updateSuccess, error]);

  const showSnackbar = (message: string, color: string) => {
    setSnackbar({ visible: true, message, color });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchEntries(1, true);
  }, [fetchEntries]);

  const loadMoreEntries = () => {
    if (!loading) setPage((prevPage) => prevPage + 1);
  };

  const handleLongPress = useCallback((entry: DiaryDTO) => {
    Vibration.vibrate(100);
    setEditingEntry(entry);
    setEditModalVisible(true);
  }, []);

  const handleUpdateEntry = useCallback(async () => {
    if (editingEntry) {
      if (!editingEntry.title.trim() || !editingEntry.content.trim()) {
        showSnackbar(
          "El título y el contenido no pueden estar vacíos",
          theme.error
        );
      } else {
        await updateEntry(
          editingEntry.id,
          editingEntry.title,
          editingEntry.content
        );
        setEditModalVisible(false);
        onRefresh();
      }
    }
  }, [editingEntry, updateEntry, onRefresh]);

  const handleDeleteEntry = useCallback(async () => {
    if (!entryToDelete) return;
    Vibration.vibrate(100);
    try {
      await deleteEntry(entryToDelete);
      showSnackbar("Registro eliminado correctamente", theme.warning);
      onRefresh();
    } catch (error) {
      showSnackbar("Error al eliminar el registro", theme.error);
    } finally {
      setEntryToDelete(null);
      setIsDeleteModalVisible(false);
    }
  }, [entryToDelete, deleteEntry, onRefresh]);

  const filteredEntries = useMemo(() => {
    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [entries, searchQuery]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: (event: { nativeEvent: { contentOffset: { y: number } } }) => {
        setShowScrollTopButton(
          event.nativeEvent.contentOffset.y > SCROLL_THRESHOLD
        );
      },
    }
  );

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderItem = useCallback(
    ({ item }: { item: DiaryDTO }) => (
      <DataCard
        key={item.id}
        title={item.title}
        content={item.content}
        onLongPress={() => handleLongPress(item)}
        onDelete={() => {
          setEntryToDelete(item.id);
          setIsDeleteModalVisible(true);
        }}
      />
    ),
    [handleLongPress]
  );

  if (error && !updateSuccess) {
    return <Text style={styles.infoText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBar setSearchQuery={setSearchQuery} value={searchQuery} />
      {filteredEntries.length > 0 ? (
        <>
          <AnimatedFlashList
            contentContainerStyle={styles.listContainer}
            ref={listRef}
            data={filteredEntries}
            renderItem={renderItem}
            estimatedItemSize={100}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMoreEntries}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.black]}
                progressBackgroundColor={theme.primary}
              />
            }
            ListFooterComponent={
              loading ? (
                <Text style={styles.infoText}>Loading more...</Text>
              ) : null
            }
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
          {showScrollTopButton && (
            <FAB
              style={styles.fab}
              icon="arrow-up"
              onPress={scrollToTop}
              color={theme.primary}
            />
          )}
        </>
      ) : (
        <Text style={styles.infoText}>
          {searchQuery
            ? "No se encontraron resultados"
            : "No hay datos disponibles"}
        </Text>
      )}

      <EditRegistryModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        editingEntry={editingEntry}
        onUpdateEntry={handleUpdateEntry}
        onChangeTitle={(title) =>
          setEditingEntry((prev) =>
            prev ? { ...prev, title, toJson: prev.toJson } : null
          )
        }
        onChangeContent={(content) =>
          setEditingEntry((prev) =>
            prev ? { ...prev, content, toJson: prev.toJson } : null
          )
        }
      />
      <ConfirmDeleteModal
        visible={isDeleteModalVisible}
        onDismiss={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteEntry}
      />

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar((prev) => ({ ...prev, visible: false }))}
        duration={3000}
        action={{
          label: "Cerrar",
          onPress: () => setSnackbar((prev) => ({ ...prev, visible: false })),
          labelStyle: { color: "#0D0D0D" },
        }}
        style={[styles.snackbar, { backgroundColor: snackbar.color }]}
      >
        <Text style={{ color: "#0D0D0D" }}>{snackbar.message}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContainer: {
    paddingTop: 10,
    paddingBottom: 140,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 60,
    backgroundColor: "#0D0D0D",
  },
  snackbar: {
    position: "absolute",
    bottom: 60,
    marginHorizontal: 30,
  },
  infoText: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomePage;
