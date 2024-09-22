import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

import { LIKE_OR_UNLIKE_POST } from "../queries";
import { useMutation } from "@apollo/client";

const Post = ({ post, navigation, refetch }) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  const tags = post?.tags?.map((tag) => `#${tag}`).join(" ");

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
  }, [post.imgUrl]);

  const [
    likeOrUnlikeMutation,
    {
      loading: likeOrUnlikeLoading,
      error: likeOrUnlikeError,
      data: likeOrUnlikeData,
    },
  ] = useMutation(LIKE_OR_UNLIKE_POST, {
    onCompleted: (res) => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onPressLike = async (postId) => {
    try {
      if (postId) {
        await likeOrUnlikeMutation({
          variables: {
            input: {
              postId,
            },
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("PostDetail", { postId: post["_id"] })}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() =>
              navigation.navigate("ProfileScreen", {
                userId: post.Author["_id"],
              })
            }
            style={styles.header}
          >
            <Image
              style={styles.avatar}
              source={require("../assets/User_avatar.png")}
              resizeMode="contain"
            />
            <Text style={styles.usernameText}>u/{post.Author.username}</Text>
          </Pressable>
        </View>
        <View style={styles.body}>
          <Text style={styles.contentText}>{post.content}</Text>
          <Text style={{}}>
            tags: <Text style={{ fontWeight: "bold" }}>{tags}</Text>
          </Text>
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
          <Pressable
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              borderWidth: 1.5,
              borderRadius: 10,
              height: 30,
              borderColor: "gray",
              padding: 2,
            }}
            onPress={() => onPressLike(post._id)}
          >
            <Image
              source={require("../assets/Upvote_icon.png")}
              style={{ height: 15, width: 15 }}
            />
            <Text>|</Text>
            <Text style={{ fontWeight: "bold" }}>{post.likes.length}</Text>
          </Pressable>
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "start",
    gap: 8,
    marginBottom: 20,
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
    borderRadius: 15,
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
