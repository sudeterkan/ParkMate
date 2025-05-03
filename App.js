import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import QRScannerScreen from "./src/screens/QRScannerScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import RecordsScreen from "./src/screens/RecordsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Entry") iconName = "qrcode-scan";
          else if (route.name === "Exit") iconName = "exit-run";
          else if (route.name === "Records") iconName = "clipboard-list";
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Entry"
        children={({ navigation }) => (
          <QRScannerScreen
            navigation={navigation}
            route={{ params: { type: "entry" } }}
          />
        )}
      />
      <Tab.Screen
        name="Exit"
        children={({ navigation }) => (
          <QRScannerScreen
            navigation={navigation}
            route={{ params: { type: "exit" } }}
          />
        )}
      />
      <Tab.Screen name="Records" component={RecordsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ title: "Payment" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
