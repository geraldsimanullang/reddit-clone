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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingRight: 240,
          gap: 10,
          paddingTop: 4,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderWidth: 1.5,
            borderRadius: 10,
            borderColor: "gray",
            padding: 2,
          }}
        >
          <Image
            source={require("../assets/Upvote_icon.png")}
            style={{ height: 15, width: 15 }}
          />
          <Text>|</Text>
          <Text style={{ fontWeight: "bold" }}>{post.likes.length}</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderWidth: 1.5,
            borderRadius: 10,
            borderColor: "gray",
          }}
        >
          <Image
            source={require("../assets/Comment_icon.png")}
            style={{ height: 13, width: 13 }}
          />
          <Text style={{ fontWeight: "bold" }}>{post.comments.length}</Text>
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
