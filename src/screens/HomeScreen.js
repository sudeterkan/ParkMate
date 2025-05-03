import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../config/firebase";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="car"
        size={64}
        color="#6C47FF"
        style={styles.icon}
      />
      <Text style={styles.title}>Welcome to ParkMate!</Text>
      <Text style={styles.subtitle}>Your smart parking assistant</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.description}>
            ParkMate helps you manage your parking entry, exit, and payments
            easily. Use the tabs below to scan your QR code for entry or exit,
            and view your parking records anytime.
          </Text>
        </Card.Content>
      </Card>
      <View style={styles.quickActions}>
        <Button
          icon="qrcode-scan"
          mode="contained"
          style={styles.quickButton}
          onPress={() => navigation.navigate("Entry")}
        >
          Go to Entry
        </Button>
        <Button
          icon="clipboard-list"
          mode="outlined"
          style={styles.quickButton}
          onPress={() => navigation.navigate("Records")}
        >
          View Records
        </Button>
      </View>
      <Button
        mode="text"
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={{ color: "#6C47FF", fontWeight: "bold" }}
      >
        Sign Out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  icon: {
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#6C47FF",
    marginBottom: 18,
    textAlign: "center",
  },
  card: {
    width: "100%",
    marginBottom: 24,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#fff",
  },
  description: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginVertical: 10,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
  },
  quickButton: {
    marginHorizontal: 8,
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  logoutButton: {
    marginTop: "auto",
    marginBottom: 24,
  },
});

export default HomeScreen;
