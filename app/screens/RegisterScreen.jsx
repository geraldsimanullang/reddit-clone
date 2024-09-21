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
import { REGISTER } from "../queries";
import * as SecureStore from "expo-secure-store";

import { LoginContext } from "../contexts/LoginContext";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerMutation, { loading, error, data }] = useMutation(REGISTER, {
    onCompleted: async (res) => {
      navigation.navigate("Login");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onPressContinue = async () => {
    if (!name || !username || !email || !password) {
      console.error("Name, username, email or password is required");
      return;
    }

    try {
      await registerMutation({
        variables: {
          input: {
            name,
            username,
            email,
            password,
          },
        },
      });
    } catch (err) {
      console.error("Error during register:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/Reddit_icon.jpg")}
        style={styles.logo}
      />
      <View style={{ flex: 2, width: "100%", paddingTop: 80 }}>
        <Text style={styles.headerText}>Enter your login information</Text>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="#999"
          autoCapitalize="words"
        />

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
          value={email}
          onChangeText={setEmail}
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
    height: 40,
    width: 40,
    objectFit: "contain",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
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

export default RegisterScreen;
