import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import { COMMENT_POST, GET_POST_BY_ID, LIKE_OR_UNLIKE_POST } from "../queries";
import { useMutation, useQuery } from "@apollo/client";
import { useFocusEffect } from "@react-navigation/native";
import Comment from "../components/Comment";

const PostDetail = ({ route }) => {
  const [content, setContent] = useState("");

  const postId = route?.params?.postId;

  const { loading, error, data, refetch } = useQuery(GET_POST_BY_ID, {
    variables: {
      input: {
        postId,
      },
    },
    skip: !postId,
  });

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

  const onPressLike = async () => {
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

  const [
    commentMutation,
    { loading: commentLoading, error: commentError, data: commentData },
  ] = useMutation(COMMENT_POST, {
    onCompleted: async (res) => {
      setContent("");
      refetch();
    },
    onError: async (error) => {
      console.log(error);
    },
  });

  const onPressComment = async () => {
    try {
      await commentMutation({
        variables: {
          input: {
            content,
            postId,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const tags = data?.getPostById?.tags?.map((tag) => `#${tag}`).join(" ");

  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  useEffect(() => {
    if (data?.getPostById?.imgUrl) {
      Image.getSize(
        data.getPostById.imgUrl,
        (width, height) => {
          setImageAspectRatio(width / height);
        },
        (error) => {
          console.error("Failed to load image", error);
        }
      );
    }
  }, [data?.getPostById?.imgUrl]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading post...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    console.error("Error loading post:", error);
    return <Text>Error loading post</Text>;
  }

  if (!data || !data.getPostById) {
    return <Text>No post data available</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Image
          style={styles.textLogo}
          source={require("../assets/Reddit_text.png")}
          resizeMode="contain"
        />
      </View>
      <FlatList
        data={data.getPostById.comments}
        renderItem={({ item }) => <Comment comment={item} />}
        keyExtractor={(item) => item.createdAt}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Image
                style={styles.avatar}
                source={require("../assets/User_avatar.png")}
                resizeMode="contain"
              />
              <Text style={styles.usernameText}>
                u/{data.getPostById.Author.username}
              </Text>
            </View>

            <View style={styles.body}>
              <Text style={styles.contentText}>{data.getPostById.content}</Text>
              <Text style={styles.tags}>
                tags: <Text style={styles.boldText}>{tags}</Text>
              </Text>
              {data.getPostById.imgUrl && (
                <View style={styles.imageContainer}>
                  <Image
                    style={[
                      styles.postImage,
                      { aspectRatio: imageAspectRatio },
                    ]}
                    source={{
                      uri: data.getPostById.imgUrl,
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
            </View>

            <View style={styles.footer}>
              <Pressable onPress={onPressLike}>
                <View style={styles.upvoteContainer}>
                  <Image
                    source={require("../assets/Upvote_icon.png")}
                    style={styles.icon}
                  />
                  <Text>|</Text>
                  <Text style={styles.boldText}>
                    {data.getPostById.likes.length}
                  </Text>
                </View>
              </Pressable>
              <View style={styles.commentContainer}>
                <Image
                  source={require("../assets/Comment_icon.png")}
                  style={styles.icon}
                />
                <Text style={styles.boldText}>
                  {data.getPostById.comments.length}
                </Text>
              </View>
            </View>

            <TextInput
              placeholder="Add a comment"
              style={styles.commentInput}
              value={content}
              onChangeText={setContent}
            />

            <Pressable onPress={onPressComment} style={styles.commentButton}>
              <Text style={styles.commentButtonText}>Comment</Text>
            </Pressable>
          </>
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  textLogo: {
    width: 80,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 20,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  body: {
    flexDirection: "column",
    marginBottom: 16,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  tags: {
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  imageContainer: {
    width: "100%",
    marginVertical: 16,
  },
  postImage: {
    width: "100%",
    borderRadius: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  upvoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 8,
    gap: 3,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 8,
    gap: 3,
  },
  icon: {
    height: 15,
    width: 15,
  },
  commentInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: "#ed4635",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  commentButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default PostDetail;
