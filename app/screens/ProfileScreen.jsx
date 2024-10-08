import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../queries";
import { FOLLOW_OR_UNFOLLOW_USER } from "../queries";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const ProfileScreen = ({ route }) => {
  const [storedUserId, setStoredUserId] = useState(null);
  const userId = route?.params?.userId;

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await SecureStore.getItemAsync("userId");
      setStoredUserId(id);
    };
    fetchUserId();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      input: {
        userId,
      },
    },
    skip: !userId,
  });

  const [
    followOrUnfollowMutation,
    { mutationLoading, mutationError, mutationData },
  ] = useMutation(FOLLOW_OR_UNFOLLOW_USER, {
    onCompleted: async (res) => {
      refetch();
    },
    onError: async (error) => {
      console.log(error);
    },
  });

  const onPressFollow = async () => {
    try {
      followOrUnfollowMutation({
        variables: {
          input: {
            followingId: userId,
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

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Error loading profile</Text>
      </SafeAreaView>
    );
  }

  if (data) {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/User_avatar.png")}
          style={styles.avatar}
        />

        {storedUserId !== userId && (
          <View style={styles.followContainer}>
            <Pressable style={styles.followButton} onPress={onPressFollow}>
              <Text style={styles.followButtonText}>Follow</Text>
            </Pressable>
          </View>
        )}
        <Text style={styles.name}>{data.getUserById.name}</Text>
        <Text style={styles.username}>u/{data.getUserById.username}</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            Following {data.getUserById.Followings.length}
          </Text>
          <Text style={styles.statsText}>
            Followers {data.getUserById.Followers.length}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  followContainer: {
    marginVertical: 16,
  },
  followButton: {
    backgroundColor: "#1DA1F2",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  username: {
    fontSize: 18,
    color: "gray",
    marginVertical: 4,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  statsText: {
    fontSize: 16,
    marginHorizontal: 16,
  },
});

export default ProfileScreen;
