import { useState } from "react";
import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For icons
import FilterModal from "../features/products/components/FilterModal";
import { useProductFacade } from "@/data-domain/products/products-facade";
import ProductList from "../features/products/ProductsList";
import Loading from "@/components/loading/Loading";
import ErrorModal from "@/components/error/ErrorModal";

export default function App() {
  const { visibleProducts, loading, error, applyFilter, loadMoreProducts } =
    useProductFacade();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const onLoadMore = () => {
    const nextPage = page + 1;
    loadMoreProducts(nextPage);
    setPage(nextPage);
  };

  const handleApplyFilter = () => {
    setModalVisible(false);
    applyFilter(selectedCategory);
    setPage(1);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorModal error={error} />  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Zazoo store</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>
          Discover the best products tailored for you
        </Text>
      </View>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="filter-list" size={20} color="white" />
        <Text style={styles.filterButtonText}>Filters</Text>
      </TouchableOpacity>
      <ProductList
        products={visibleProducts}
        expandedId={expandedId}
        onToggle={(id: number) => setExpandedId(expandedId === id ? null : id)}
        loadMore={onLoadMore}
        isLoading={loading}
      />
      <FilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categories={[
          "",
          "electronics",
          "jewelery",
          "men's clothing",
          "women's clothing",
        ]}
        selectedCategory={selectedCategory}
        onSelectCategory={(category: string) => setSelectedCategory(category)}
        onApply={handleApplyFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
    marginTop: 60,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 5,
  },
 
});
