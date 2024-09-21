import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMutation } from "@apollo/client";
import { ADD_POST } from "../queries";

const AddPostScreen = ({ navigation }) => {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tagsString, setTagsString] = useState("");

  const [addPostMutation, { loading, error, data }] = useMutation(ADD_POST, {
    onCompleted: async (res) => {
      navigation.navigate("Home");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onPressPost = async () => {
    if (!content || !imgUrl) {
      console.log("Content or image URL is required");
      return;
    }

    let tags;

    if (tagsString.length > 0) {
      tags = tagsString.replace(/\s/g, "");
      tags = tagsString.split(",");
    }

    try {
      await addPostMutation({
        variables: {
          input: {
            content,
            imgUrl,
            tags,
          },
        },
      });
    } catch (err) {
      console.error("Error during adding post:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.postButton} onPress={onPressPost}>
          <Text style={{ fontWeight: "", color: "#fff" }}>Post</Text>
        </Pressable>
      </View>
      <View style={{ flex: 15, flexDirection: "column", gap: 5 }}>
        <TextInput
          style={styles.contentInput}
          placeholder="Content"
          autoCapitalize="sentences"
          value={content}
          onChangeText={setContent}
        />
        <TextInput
          style={styles.imageInput}
          placeholder="Image URL"
          autoCapitalize="none"
          value={imgUrl}
          onChangeText={setImgUrl}
        />
        <TextInput
          style={styles.imageInput}
          placeholder="Tags (separate with comma to add multiple tags)"
          autoCapitalize="none"
          value={tagsString}
          onChangeText={setTagsString}
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
  tagsInput: {
    width: "100%",
  },
  postButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ed4635",
    paddingHorizontal: 10,
    height: 33,
    flexWrap: "nowrap",
    borderRadius: 15,
  },
});

export default AddPostScreen;
