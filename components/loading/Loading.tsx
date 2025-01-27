import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color="#1E90FF" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
