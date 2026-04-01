import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import Transfer from "./Transfer";

const Home = () => {
  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        const response = await axios.get(
          `https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance`,
        );
        const { accountBalance } = response.data;
        const { currency } = response.data;

        setBalance(accountBalance);
        setCurrency(currency);
      } catch (error) {
        console.error("Error fetching Currency data:", error);
      }
    };

    fetchUserCurrency();
  }, []);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const response = await axios.get(
          `https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList`,
        );
        const { transfers } = response.data;
        setTransactions(transfers);
      } catch (error) {
        console.error("Error fetching Transactions data:", error);
      }
    };

    fetchUserTransactions();
  }, []);

  const HomeStack = createNativeStackNavigator();

  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");
  const [transactions, setTransactions] = useState([]);

  const Balance = ({ navigation }) => {
    return (
      <View>
        <Text>
          Balance: {balance}
          {currency}
        </Text>
        <Button
          title="Realizar Transferencia"
          onPress={() => navigation.navigate("Transfer")}
        />
        <Text> Historial de tranferencias </Text>
        {transactions.map((transaction, index) => (
          <Text key={index}>
            {transaction.date}: {transaction.value} {transaction.currency}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <HomeStack.Navigator id="home-stack">
      <HomeStack.Screen name="Balance" component={Balance} />
      <HomeStack.Screen name="Transfer" component={Transfer} />
    </HomeStack.Navigator>
  );
};

export default Home;
