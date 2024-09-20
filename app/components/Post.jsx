import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Post = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require("../assets/User_avatar.png")}
          resizeMode="contain"
        />
        <Text style={styles.usernameText}>u/{post.Author.username}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.contentText}>{post.content}</Text>
        <Image
          style={styles.postImage}
          source={{
            uri: post.imgUrl,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "start",
    gap: 8,
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
    paddingBottom: 10,
  },
  header: {
    flex: 1,
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 0,
  },
  avatar: {
    height: 30,
    width: 30,
    margin: 0,
  },
  usernameText: {
    fontWeight: "bold",
    margin: 0,
  },
  body: {
    flex: 1,
    flexDirection: "column",
    gap: 3,
  },
  contentText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
});

export default Post;
