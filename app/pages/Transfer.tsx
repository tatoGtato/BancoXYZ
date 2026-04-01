import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const Transfer = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [document, setDocument] = useState("");
  const [date, setDate] = useState("");

  return (
    <View>
      <Text>Transfer</Text>
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} />
      <TextInput
        placeholder="Currency"
        value={currency}
        onChangeText={setCurrency}
      />
      <TextInput
        placeholder="Document"
        value={document}
        onChangeText={setDocument}
      />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} />
      <Button title="Realizar Transferencia" onPress={() => {}} />
    </View>
  );
};

export default Transfer;
