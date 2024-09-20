import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";

const Post = ({ post }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  useEffect(() => {
    Image.getSize(
      post.imgUrl,
      (width, height) => {
        setImageAspectRatio(width / height);
      },
      (error) => {
        console.error("Failed to load image", error);
      }
    );
  }, [post]);
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
        <View style={styles.imageContainer}>
          <Image
            style={[styles.postImage, { aspectRatio: imageAspectRatio }]}
            source={{
              uri: post.imgUrl,
            }}
            resizeMode="contain"
          />
        </View>
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
    gap: 8,
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
  imageContainer: {
    width: "100%",
  },
  postImage: {
    width: "100%",
    borderRadius: 15,
  },
});

export default Post;
