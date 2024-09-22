import { StyleSheet, View, Text, Image, Pressable } from "react-native";

const SearchResult = ({ user, navigation }) => {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ProfileScreen", { userId: user["_id"] })
      }
    >
      <View style={styles.container}>
        <View>
          <Image
            source={require("../assets/User_avatar.png")}
            style={{ width: 40, height: 40 }}
            resizeMethod="contain"
          />
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
          <Text style={{ color: "gray" }}>u/{user.username}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 5,
    gap: 10,
  },
});

export default SearchResult;
