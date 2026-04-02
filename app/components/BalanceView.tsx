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
import i18n from "../../i18n/index";
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
          {item.payeer?.name || i18n.t("sinNombre")}
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
        <Text style={styles.balanceLabel}>{i18n.t("balance")}</Text>
        <Text style={styles.balanceAmount}>
          {balance} {currency}
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <TextInput
          placeholder={i18n.t("search")}
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholderTextColor={COLORS.placeHolder}
        />

        {/* Date Picker Trigger */}
        <Pressable
          style={[
            styles.dateButton,
            showPicker && styles.dateButtonDisabled,
          ]}
          onPress={() => {
            if (!showPicker) setShowPicker(true);
          }}
          disabled={showPicker}
        >
          <Text style={styles.dateText}>
            {showPicker
              ? i18n.t("filterDate") + "..."
              : dateFilter
              ? formatDate(dateFilter)
              : i18n.t("filterDate")}
          </Text>
        </Pressable>

        {/* Clear date */}
        {dateFilter && !showPicker && (
          <Pressable onPress={() => setDateFilter(null)}>
            <Text style={styles.clearText}>{i18n.t("clearDate")}</Text>
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
        <Text style={styles.sectionTitle}>{i18n.t("history")}</Text>

        <FlatList
          data={filteredTransactions}
          keyExtractor={(item, index) =>
            `${item.date}-${item.value}-${index}`
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {i18n.t("noResults")}
            </Text>
          }
        />
      </View>

      {/* Button */}
      <Pressable style={styles.button} onPress={onTransfer}>
        <Text style={styles.buttonText}>{i18n.t("transfer")}</Text>
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

  dateButtonDisabled: {
    backgroundColor: COLORS.primaryLight,
    opacity: 0.7,
  },

  dateText: {
    color: COLORS.background,
    fontWeight: "600",
  },

  clearText: {
    color: COLORS.textPrimary,
    textAlign: "center",
    fontSize: 12,
  },

  emptyText: {
    textAlign: "center",
    color: COLORS.placeHolder,
    marginTop: 20,
  },

  balanceContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  balanceLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },

  balanceAmount: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.textPrimary,
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
    borderBottomColor: COLORS.border,
  },

  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  transactionDate: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },

  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },

  button: {
    backgroundColor: COLORS.primary,
    margin: 20,
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BalanceView;