import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const BalanceView = ({ balance, currency, transactions, onTransfer }) => {
  const renderItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.transactionName}>
          {item.payeer?.name || "Sin nombre"}
        </Text>

        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>

      <Text style={styles.transactionAmount}>
        {item.value} {item.currency}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceAmount}>
          {balance} {currency}
        </Text>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Historial</Text>

        <FlatList
          data={transactions}
          keyExtractor={(item, index) => `${item.date}-${item.value}-${index}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Pressable style={styles.button} onPress={onTransfer}>
        <Text style={styles.buttonText}>Realizar Transferencia</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  balanceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#222",
  },
  transactionsContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  transactionDate: {
    fontSize: 14,
    color: "#333",
  },
  transactionSubtitle: {
    fontSize: 12,
    color: "#999",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  button: {
    backgroundColor: "#6367FF",
    margin: 20,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default BalanceView;
