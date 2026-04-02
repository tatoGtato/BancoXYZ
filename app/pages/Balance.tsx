import BalanceView from "../components/BalanceView";
import { useBalanceData } from "../hooks/useBalanceData";

const BalanceScreen = ({ navigation }) => {
  const { balance, currency, transactions } = useBalanceData();

  return (
    <BalanceView
      balance={balance}
      currency={currency}
      transactions={transactions}
      onTransfer={() => navigation.navigate("Transfer")}
    />
  );
};

export default BalanceScreen;
