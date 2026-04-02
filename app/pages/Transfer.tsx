import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  ActivityIndicator,
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
import { doTransactions } from "../hooks/doTransactions";

const Transfer = ({ navigation }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [document, setDocument] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const { executeTransaction, loading, error, success } = doTransactions();

  const formatDate = (date) => date.toISOString().split("T")[0];

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const isFormValid =
    amount.trim() !== "" &&
    currency.trim() !== "" &&
    document.trim() !== "" &&
    date;

  const handleTransfer = async () => {
    if (!isFormValid) return;

    await executeTransaction({
      value: Number(amount),
      currency,
      payeerDocument: document,
      transferDate: formatDate(date),
    });

    if (!error) {
      setTimeout(() => navigation.goBack(), 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="always"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <Text style={styles.title}>Transferencia</Text>

            <TextInput
              placeholder="Monto"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor={COLORS.placeHolder}
              returnKeyType="done"
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currency}
                onValueChange={(itemValue) => setCurrency(itemValue)}
              >
                <Picker.Item label="Selecciona una moneda" value="" />
                <Picker.Item label="USD - Dólar" value="USD" />
                <Picker.Item label="COP - Peso Colombiano" value="COP" />
                <Picker.Item label="BRL - Real Brasileño" value="BRL" />
              </Picker>
            </View>

            <TextInput
              placeholder="Documento del receptor"
              value={document}
              onChangeText={setDocument}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor={COLORS.placeHolder}
            />

            <Pressable
              style={styles.input}
              onPress={() => setShowPicker(true)}
            >
              <Text style={{ color: COLORS.textPrimary }}>{formatDate(date)}</Text>
            </Pressable>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onValueChange={onChangeDate}
              />
            )}

            <Pressable
              style={[
                styles.button,
                (!isFormValid || loading) && styles.buttonDisabled,
              ]}
              onPress={handleTransfer}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.background} />
              ) : (
                <Text style={styles.buttonText}>Enviar</Text>
              )}
            </Pressable>

            {success && (
              <Text style={styles.success}>Transferencia exitosa</Text>
            )}
            {error && (
              <Text style={styles.error}>Error en la transferencia</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  form: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: COLORS.surface,
    overflow: "hidden",
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
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.7,
  },
  buttonText: {
    color: COLORS.background,
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