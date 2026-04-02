import { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { onLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const passwordRef = useRef(null);

  const logo = require("../../assets/images/xyzLogo.png");

  const handleLogin = async () => {
    const result = await onLogin!(email, password);
    if (result.error) {
      setErrorMsg(result.msg);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.content}>
              <Image source={logo} style={styles.logo} />

              <View style={styles.form}>
                <Text style={styles.title}>Log In</Text>

                {!!errorMsg && (
                  <Text style={styles.errorMsg}>{errorMsg}</Text>
                )}

                {/* 📧 Email */}
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                  placeholderTextColor={COLORS.placeHolder}
                  autoFocus
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  blurOnSubmit={false}
                />

                {/* 🔒 Password */}
                <TextInput
                  ref={passwordRef}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={styles.input}
                  placeholderTextColor={COLORS.placeHolder}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
              </View>
            </View>

            {/* 🔘 Button */}
            <View style={styles.footer}>
              <Pressable
                style={[
                  styles.button,
                  (!email || !password) && styles.buttonDisabled,
                ]}
                onPress={handleLogin}
                disabled={!email || !password}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "space-between",
  },

  content: {
    marginTop: 80,
    alignItems: "center",
  },

  logo: {
    height: 200,
    width: 300,
  },

  form: {
    width: "100%",
    paddingHorizontal: 24,
    marginTop: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    textAlign: "center",
    marginBottom: 12,
  },

  errorMsg: {
    color: COLORS.error,
    textAlign: "center",
    marginBottom: 12,
    fontSize: 14,
  },

  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  footer: {
    padding: 24,
  },

  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Login;