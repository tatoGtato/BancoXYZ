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
import i18n from "../../i18n/index";
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
      style={{ flex: 1, backgroundColor: COLORS.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Scrollable content */}
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>
              <Image source={logo} style={styles.logo} />

              <Text style={styles.title}>{i18n.t("logIn")}</Text>

              {!!errorMsg && (
                <Text style={styles.errorMsg}>{errorMsg}</Text>
              )}

              <TextInput
                placeholder={i18n.t("email")}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholderTextColor={COLORS.placeHolder}
                autoFocus
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
                blurOnSubmit={false}
                testID="emailInput"
              />

              <TextInput
                ref={passwordRef}
                placeholder={i18n.t("password")}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor={COLORS.placeHolder}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                testID="passwordInput"
              />
            </View>
          </ScrollView>

          {/* Fixed bottom button */}
          <View style={styles.footer}>
            <Pressable
              style={[
                styles.button,
                (!email || !password) && styles.buttonDisabled,
              ]}
              onPress={() => {
                Keyboard.dismiss();
                handleLogin();
              }}
              disabled={!email || !password}
            >
              <Text style={styles.buttonText}>{i18n.t("logIn")}</Text>
            </Pressable>
          </View>
        </View>
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

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  form: {
    width: "100%",
    alignItems: "center",
  },

  footer: {
    padding: 20,
    backgroundColor: COLORS.background,
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