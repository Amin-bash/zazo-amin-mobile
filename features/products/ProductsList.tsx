import * as React from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import ProductItem from "./components/ProductItem";
import Loading from "@/components/loading/Loading";
import { Product } from "@/data-domain/products/products.models";

interface IProductList {
  products: Product[];
  expandedId: number | null;
  onToggle: (id: number) => void;
  loadMore: () => void;
  isLoading: boolean;
}
export default function ProductList({
  products,
  expandedId,
  onToggle,
  loadMore,
  isLoading,
}: IProductList) {
  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.footer}>
        <Loading />
      </View>
    ) : null;
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          isExpanded={expandedId === item.id}
          onToggle={onToggle}
        />
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
