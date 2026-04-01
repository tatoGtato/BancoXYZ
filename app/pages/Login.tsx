import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    const result = await onLogin!(email, password);
    if (result.error) {
      setErrorMsg(result.msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: "https://example.com/logo.png" }} />

        <View style={styles.form}>
          <Text style={styles.errorMsg}>{errorMsg}</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#bbbbbb"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#bbbbbb"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMsg: {
    color: "red",
    marginBottom: 10,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between", // 🔥 key change
  },
  content: {
    marginTop: 100, // optional spacing from top
    alignItems: "center",
  },
  form: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 20,
  },
  footer: {
    padding: 24, // spacing from edges
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 16,
    borderColor: "#f3f3f3",
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#6367FF",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Login;
