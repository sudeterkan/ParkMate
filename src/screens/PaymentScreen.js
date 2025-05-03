import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const PaymentScreen = ({ route, navigation }) => {
  const { qrCode } = route.params;
  const [parkingInfo, setParkingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkingInfo = async () => {
      try {
        const parkingRef = collection(db, "parking_records");
        const q = query(
          parkingRef,
          where("qrCode", "==", qrCode),
          where("type", "==", "entry")
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const entryTime = querySnapshot.docs[0].data().timestamp.toDate();
          const exitTime = new Date();
          const duration = Math.ceil((exitTime - entryTime) / (1000 * 60 * 60)); // hours
          const fee = calculateFee(duration);

          setParkingInfo({
            entryTime,
            exitTime,
            duration,
            fee,
          });
        }
      } catch (error) {
        console.error("Parking info fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParkingInfo();
  }, [qrCode]);

  const calculateFee = (hours) => {
    const baseRate = 20; // TL per hour
    return hours * baseRate;
  };

  const handlePayment = async () => {
    // Here you would implement the actual payment processing
    // For now, we'll just navigate back to home
    navigation.navigate("Home");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  if (!parkingInfo) {
    return (
      <View style={styles.container}>
        <Text>Park kaydı bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Park Ücreti</Text>

          <View style={styles.infoRow}>
            <Text>Giriş Zamanı:</Text>
            <Text>{parkingInfo.entryTime.toLocaleString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Çıkış Zamanı:</Text>
            <Text>{parkingInfo.exitTime.toLocaleString()}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text>Toplam Süre:</Text>
            <Text>{parkingInfo.duration} saat</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.feeLabel}>Toplam Ücret:</Text>
            <Text style={styles.feeAmount}>{parkingInfo.fee} TL</Text>
          </View>

          <Button
            mode="contained"
            onPress={handlePayment}
            style={styles.payButton}
          >
            Öde
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  feeLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  feeAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
  },
  payButton: {
    marginTop: 20,
    paddingVertical: 5,
  },
});

export default PaymentScreen;
