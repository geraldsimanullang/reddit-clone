import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../queries";

const ProfileScreen = ({ route }) => {
  const userId = route?.params?.userId;

  const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      input: {
        userId,
      },
    },
    skip: !userId,
  });

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
        <View style={styles.followContainer}>
          <Pressable style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </Pressable>
        </View>
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
