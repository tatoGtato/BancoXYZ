import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Pressable,
  StyleSheet,
  Text
} from "react-native";
import { COLORS } from "../constants/colors";
import { useAuth } from "./../context/AuthContext";
import Balance from "./Balance";
import Transfer from "./Transfer";

const HomeStack = createNativeStackNavigator();

const Home = () => {
  const { onLogout } = useAuth();
  return (
    <HomeStack.Navigator id="home-stack">
      <HomeStack.Screen
        name="Balance"
        component={Balance}
        options={{
          headerRight: () => (
            <Pressable onPress={onLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
          ),
        }}
      />
      <HomeStack.Screen
        name="Transfer"
        component={Transfer}

        options={() => ({
          gestureEnabled: true,
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },

          headerBackVisible: false,
        })}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
    paddingLeft: 12,
    paddingRight: 12
  },
})

export default Home;
