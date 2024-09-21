import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";

import Post from "../components/Post";

const HomeScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const { setIsLoggedIn } = useContext(LoginContext);

  if (loading) {
    return <Text>loading...</Text>;
  }

  if (!loading && error) {
    console.log(error);
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error.message}</Text>
      </SafeAreaView>
    );
  }

  if (!loading && data) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.textLogo}
          source={require("../assets/Reddit_text.png")}
        />
        <FlatList
          data={data.getPosts}
          renderItem={({ item }) => <Post post={item} />}
          keyExtractor={(item) => item._id}
          style={{ paddingTop: 20 }}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  textLogo: {
    width: 80,
    objectFit: "contain",
  },
});

export default HomeScreen;
