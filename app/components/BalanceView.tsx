import DateTimePicker from "@react-native-community/datetimepicker";
import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";

const BalanceView = ({ balance, currency, transactions, onTransfer }) => {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const searchLower = search.toLowerCase();

      const matchesSearch =
        item.payeer?.name?.toLowerCase().includes(searchLower) ||
        item.value.toString().includes(searchLower);

      const matchesDate = dateFilter
        ? item.date === formatDate(dateFilter)
        : true;

      return matchesSearch && matchesDate;
    });
  }, [transactions, search, dateFilter]);

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
      {/* Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceAmount}>
          {balance} {currency}
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <TextInput
          placeholder="Buscar por nombre o monto"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        {/* Date Picker Trigger */}
        <Pressable
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateText}>
            {dateFilter ? formatDate(dateFilter) : "Filtrar por fecha"}
          </Text>
        </Pressable>

        {/* Clear date */}
        {dateFilter && (
          <Pressable onPress={() => setDateFilter(null)}>
            <Text style={styles.clearText}>Limpiar fecha</Text>
          </Pressable>
        )}

        {showPicker && (
          <DateTimePicker
            value={dateFilter || new Date()}
            mode="date"
            display="default"
            onValueChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDateFilter(selectedDate);
            }}
          />
        )}
      </View>

      {/* Transactions */}
      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Historial</Text>

        <FlatList
          data={filteredTransactions}
          keyExtractor={(item, index) =>
            `${item.date}-${item.value}-${index}`
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No hay transacciones que coincidan
            </Text>
          }
        />
      </View>

      {/* Button */}
      <Pressable style={styles.button} onPress={onTransfer}>
        <Text style={styles.buttonText}>Realizar Transferencia</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  filtersContainer: {
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },

  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
  },

  dateButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },

  dateText: {
    color: COLORS.background,
    fontWeight: "600",
  },

  clearText: {
    color: COLORS.primary,
    textAlign: "center",
    fontSize: 12,
  },

  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
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

  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  transactionDate: {
    fontSize: 14,
    color: "#333",
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