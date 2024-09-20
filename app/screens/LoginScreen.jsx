import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hai dari login</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default LoginScreen