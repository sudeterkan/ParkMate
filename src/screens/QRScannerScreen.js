import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, Text } from "react-native-paper";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const QRScannerScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { type } = route.params; // 'entry' or 'exit'

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (scanned) return;
    setScanned(true);

    try {
      const parkingRef = collection(db, "parking_records");
      await addDoc(parkingRef, {
        qrCode: data,
        type: type,
        timestamp: serverTimestamp(),
        userId: auth.currentUser.uid,
      });

      Alert.alert(
        "Başarılı",
        type === "entry" ? "Giriş kaydedildi!" : "Çıkış kaydedildi!",
        [
          {
            text: "Tamam",
            onPress: () => {
              if (type === "exit") {
                navigation.navigate("Payment", { qrCode: data });
              } else {
                navigation.goBack();
              }
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Hata", "Bir hata oluştu. Lütfen tekrar deneyin.");
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Kamera izni bekleniyor...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Kamera erişimi reddedildi</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <View style={styles.scanArea} />
      </View>
      {scanned && (
        <Button
          mode="contained"
          onPress={() => setScanned(false)}
          style={styles.button}
        >
          Tekrar Tara
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "transparent",
  },
  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});

export default QRScannerScreen;
