import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";
import { theme } from "@/src/core/constants/theme";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery, value }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar"
        placeholderTextColor="#666"
        onChangeText={setSearchQuery}
        value={value}
        style={styles.searchBar}
        theme={{ colors: { primary: theme.primary } }}
        iconColor={theme.primary}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
  },
  searchBar: {
    margin: 10,
    backgroundColor: theme.card,
    alignSelf: "center",
    width: "90%",
  },
});
