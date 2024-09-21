import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPostScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Text>Post</Text>
        </Pressable>
      </View>
      <View style={{ flex: 15, flexDirection: "column", gap: 5 }}>
        <TextInput style={styles.contentInput} placeholder="Content" />
        <TextInput style={styles.imageInput} placeholder="Image URL" />
        <TextInput
          style={styles.imageInput}
          placeholder="Tags (separate with comma to add multiple tags)"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
    gap: 5,
    justifyContent: "flex-start",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 310,
  },
  contentInput: {
    width: "100%",
    fontSize: 25,
    fontWeight: "bold",
  },
  imageInput: {
    width: "100%",
  },
});

export default AddPostScreen;
