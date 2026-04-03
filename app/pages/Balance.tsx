import BalanceView from "../components/BalanceView";
import { useBalanceData } from "../hooks/useBalanceData";

//Balance screen. Takes the data from the useBalanceData hook and pass it to the BalanceView component
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
