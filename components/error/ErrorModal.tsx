import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorModal = ({error} : {error: string}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default ErrorModal;


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
