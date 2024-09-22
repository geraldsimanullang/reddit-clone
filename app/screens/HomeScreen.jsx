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
import { useFocusEffect } from "@react-navigation/native";
import { useContext, useCallback } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";

import Post from "../components/Post";

const HomeScreen = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const { setIsLoggedIn } = useContext(LoginContext);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const onPressLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center" }}>loading...</Text>
      </SafeAreaView>
    );
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
        <View style={styles.header}>
          <Image
            style={styles.textLogo}
            source={require("../assets/Reddit_text.png")}
            resizeMethod="contain"
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Pressable onPress={() => navigation.navigate("SearchUsers")}>
              <Image
                style={styles.searchIcon}
                source={require("../assets/Search_icon.png")}
              />
            </Pressable>
            <Pressable onPress={onPressLogout}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/Logout_icon.png")}
                resizeMethod="contain"
              />
            </Pressable>
          </View>
        </View>
        <FlatList
          data={data.getPosts}
          renderItem={({ item }) => (
            <Post post={item} navigation={navigation} refetch={refetch} />
          )}
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
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textLogo: {
    width: 80,
    objectFit: "contain",
  },
  searchIcon: {
    width: 35,
    height: 35,
  },
});

export default HomeScreen;
