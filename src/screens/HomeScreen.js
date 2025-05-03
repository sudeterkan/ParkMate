import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { auth } from "../config/firebase";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Çıkış yapılırken hata oluştu:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ParkMate</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Otopark İşlemleri</Text>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("QRScanner", { type: "entry" })}
            style={styles.button}
          >
            Giriş Yap
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate("QRScanner", { type: "exit" })}
            style={styles.button}
          >
            Çıkış Yap
          </Button>
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Çıkış Yap
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginVertical: 10,
    paddingVertical: 5,
  },
  logoutButton: {
    marginTop: "auto",
    marginBottom: 20,
  },
});

export default HomeScreen;
