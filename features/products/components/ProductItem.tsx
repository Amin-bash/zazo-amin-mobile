import * as React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import { MaterialIcons } from "@expo/vector-icons";
import { Product } from "@/data-domain/products/products.models";

interface IProductItem {
  product: Product;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}
export default function ProductItem({
  product,
  isExpanded,
  onToggle,
}: IProductItem) {
  return (
    <View
      style={{
        ...styles.cardContainer,
        borderColor: isExpanded ? "#1E90FF" : "#fff",
      }}
    >
      <TouchableOpacity
        onPress={() => onToggle(product.id)}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <Text style={styles.productTitle}>{product.title}</Text>
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={!isExpanded}>
        <View style={styles.cardDetails}>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
          <TouchableOpacity style={styles.addToCartButton}>
            <MaterialIcons name="shopping-cart" size={20} color="white" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderWidth: 2,
  },
  cardHeader: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    color: "#333",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E90FF",
    textAlign: "left",
  },
  cardDetails: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 15,
  },
  productDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    lineHeight: 20,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#1E90FF",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  addToCartText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
});
