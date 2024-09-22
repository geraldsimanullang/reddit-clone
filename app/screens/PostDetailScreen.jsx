import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useState } from "react";

const PostDetail = ({ route }) => {
  const postId = route?.params?.postId;

  return (
    <SafeAreaView style={styles.container}>
      <Text>{postId}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PostDetail;
