import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";

import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import * as SecureStore from "expo-secure-store";

import { LoginContext } from "../contexts/LoginContext";

const LoginScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(LoginContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginMutation, { loading, error, data }] = useMutation(LOGIN, {
    onCompleted: async (res) => {
      let access_token = null;

      if (res && res.login && res.login.access_token) {
        access_token = res.login.access_token;
      }

      await SecureStore.setItemAsync("access_token", access_token);
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onPressContinue = async () => {
    if (!username || !password) {
      console.error("Email or password is required");
      return;
    }

    try {
      await loginMutation({
        variables: {
          input: {
            username,
            password,
          },
        },
      });
    } catch (err) {
      console.error("Error during login mutation:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 1 }} />
        <Image
          source={require("../assets/Reddit_icon.jpg")}
          style={styles.logo}
        />

        <Pressable
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: "gray", fontWeight: "bold", paddingRight: 5 }}>
            Sign Up
          </Text>
        </Pressable>
      </View>

      <View style={{ flex: 2, width: "100%", paddingTop: 80 }}>
        <Text style={styles.headerText}>Enter your login information</Text>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="#999"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text style={styles.textAgreement}>
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy
        </Text>

        <Pressable style={styles.button} onPress={onPressContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  logo: {
    flex: 1,
    height: 40,
    width: 40,
    objectFit: "contain",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#f6f7f8",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#333",
  },
  textAgreement: {
    fontSize: 13,
    textAlign: "center",
    color: "#636363",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#ed4635",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
