import { StyleSheet, View, Text, Image } from "react-native";

const SearchResult = ({ user }) => {
  return (
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
