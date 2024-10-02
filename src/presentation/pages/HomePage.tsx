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
} from "react-native";
import { Text, FAB, Snackbar } from "react-native-paper";
import { useDiaryStore } from "../store/DiaryStore";
import DataCard from "../components/DataCard";
import { DiaryDTO } from "@/src/data/models/DiaryDTO";
import { theme } from "@/src/core/constants/theme";
import { FlashList } from "@shopify/flash-list";
import EditRegistryModal from "../components/EditRegistryModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const SCROLL_THRESHOLD = 1300;

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

  // Delete modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  // Snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("white");

  const listRef = useRef<FlashList<DiaryDTO>>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const pageSize = 10;

  const fetchEntries = useCallback(
    async (pageNum: number, refresh: boolean = false) => {
      await getEntries(pageNum, pageSize);
      if (refresh) {
        setRefreshing(false);
      }
    },
    [getEntries]
  );

  useEffect(() => {
    fetchEntries(page);
  }, [fetchEntries, page]);

  // Effect to handle response of getEntries
  useEffect(() => {
    if (response && Array.isArray(response)) {
      setEntries((prevEntries) => {
        if (page === 1) {
          return response;
        } else {
          const newEntries = response.filter(
            (newEntry) =>
              !prevEntries.some((prevEntry) => prevEntry.id === newEntry.id)
          );
          return [...prevEntries, ...newEntries];
        }
      });
    }
  }, [response, page]);

  // Effect to handle Snackbar visibility
  useEffect(() => {
    if (updateSuccess) {
      setSnackbarMessage("Registro actualizado correctamente");
      setSnackbarColor(theme.primary);
      setSnackbarVisible(true);
    } else if (error) {
      setSnackbarMessage(error);
      setSnackbarColor(theme.error);
      setSnackbarVisible(true);
    }
  }, [updateSuccess, error]);

  // Handle refresh list
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchEntries(1, true);
  }, [fetchEntries]);

  const loadMoreEntries = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleLongPress = useCallback((entry: DiaryDTO) => {
    Vibration.vibrate(100);
    setEditingEntry(entry);
    setEditModalVisible(true);
  }, []);

  const handleUpdateEntry = useCallback(async () => {
    if (editingEntry) {
      if (!editingEntry.title.trim() || !editingEntry.content.trim()) {
        setSnackbarMessage("El título y el contenido no pueden estar vacíos");
        setSnackbarColor(theme.error);
        setSnackbarVisible(true);
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
      setSnackbarMessage("Registro eliminado correctamente");
      setSnackbarColor(theme.warning);
      setSnackbarVisible(true);
      onRefresh();
    } catch (error) {
      setSnackbarMessage("Error al eliminar el registro");
      setSnackbarColor(theme.error);
      setSnackbarVisible(true);
    } finally {
      setEntryToDelete(null);
      setIsModalVisible(false);
    }
  }, [entryToDelete, deleteEntry, onRefresh]);

  const handleOpenModal = (id: string) => {
    setEntryToDelete(id);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEntryToDelete(null);
  };

  const renderItem = useCallback(
    ({ item }: { item: DiaryDTO }) => (
      <DataCard
        key={item.id}
        title={item.title}
        content={item.content}
        onLongPress={() => handleLongPress(item)}
        onDelete={() => handleOpenModal(item.id)}
      />
    ),
    [handleLongPress, handleOpenModal]
  );

  const memoizedEntries = useMemo(() => entries, [entries]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: { nativeEvent: { contentOffset: { y: number } } }) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollTopButton(offsetY > SCROLL_THRESHOLD);
      },
    }
  );

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  if (error && !updateSuccess) {
    return <Text style={styles.infoText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {memoizedEntries.length > 0 ? (
        <>
          <FlashList
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: 140,
            }}
            ref={listRef}
            data={memoizedEntries}
            renderItem={renderItem}
            estimatedItemSize={100}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadMoreEntries}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.background]}
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
        <Text style={styles.infoText}>No data available</Text>
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
        visible={isModalVisible}
        onDismiss={handleCloseModal}
        onConfirm={handleDeleteEntry}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: "Cerrar",
          onPress: () => setSnackbarVisible(false),
          labelStyle: { color: "#0D0D0D" },
        }}
        style={[styles.snackbar, { backgroundColor: snackbarColor }]}
      >
        <Text style={{ color: "#0D0D0D" }}>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
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
