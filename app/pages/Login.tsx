import { useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
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
      <Image source={{ uri: "https://example.com/logo.png" }} />
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "200",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 12,
  },
});

export default Login;
