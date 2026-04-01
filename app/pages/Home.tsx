import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Balance from "./Balance";
import Transfer from "./Transfer";

const HomeStack = createNativeStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator id="home-stack">
      <HomeStack.Screen name="Balance" component={Balance} />
      <HomeStack.Screen name="Transfer" component={Transfer} />
    </HomeStack.Navigator>
  );
};

export default Home;
