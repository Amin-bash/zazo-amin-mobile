import * as React from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IFilterModal {
  visible: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onApply: () => void;
}
export default function FilterModal({
  visible,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  onApply,
}: IFilterModal) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter by Category</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.categoryList}>
            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryOption,
                  selectedCategory === category && styles.selectedOption,
                ]}
                onPress={() => onSelectCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedText,
                  ]}
                >
                  {category || "All Categories"}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={onApply}
              activeOpacity={0.8}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryOption: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    marginBottom: 10,
    justifyContent: "center",
  },
  selectedOption: {
    backgroundColor: "#1E90FF",
  },
  categoryText: {
    fontSize: 16,
    color: "#555",
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  applyButton: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
