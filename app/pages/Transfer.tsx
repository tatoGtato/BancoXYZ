import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { doTransactions } from "../hooks/doTransactions";

const Transfer = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [document, setDocument] = useState("");
  const [date, setDate] = useState("");

  const { executeTransaction, loading, error, success } = doTransactions();

  const handleTransfer = async () => {
    if (!amount || !currency || !document || !date) {
      return;
    }

    await executeTransaction({
      value: Number(amount),
      currency,
      date,
      payee: {
        document,
        name: "Recebedor", // you could also add input for this later
      },
    });

    // optional: go back after success
    if (!error) {
      setTimeout(() => navigation.goBack(), 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Transferencia</Text>

        <TextInput
          placeholder="Monto"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <TextInput
          placeholder="Moneda (USD, BRL...)"
          value={currency}
          onChangeText={setCurrency}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <TextInput
          placeholder="Documento del receptor"
          value={document}
          onChangeText={setDocument}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <TextInput
          placeholder="Fecha (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Pressable style={styles.button} onPress={handleTransfer}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enviar</Text>
          )}
        </Pressable>

        {success && <Text style={styles.success}>Transferencia exitosa</Text>}
        {error && <Text style={styles.error}>Error en la transferencia</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  form: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#6367FF",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  success: {
    marginTop: 16,
    color: "green",
    textAlign: "center",
  },
  error: {
    marginTop: 16,
    color: "red",
    textAlign: "center",
  },
});

export default Transfer;
