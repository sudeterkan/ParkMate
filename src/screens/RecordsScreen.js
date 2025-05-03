import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import {
  Text,
  Card,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { auth } from "../config/firebase";

const RecordsScreen = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editType, setEditType] = useState("");
  const [error, setError] = useState("");

  const fetchRecords = async () => {
    setLoading(true);
    setError("");
    try {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (!userId) {
        setError("User session not found. Please sign in again.");
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, "parking_records"),
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(data);
    } catch (err) {
      setError("Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleUpdate = async (id) => {
    setError("");
    try {
      const recordRef = doc(db, "parking_records", id);
      await updateDoc(recordRef, { type: editType });
      setEditingId(null);
      fetchRecords();
    } catch (err) {
      setError("Failed to update record.");
    }
  };

  const handleDelete = async (id) => {
    setError("");
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "parking_records", id));
              fetchRecords();
            } catch (err) {
              setError("Failed to delete record.");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text>ID: {item.id}</Text>
        <Text>QR: {item.qrCode}</Text>
        <Text>Type: {item.type}</Text>
        <Text>
          Time: {item.timestamp?.toDate?.().toLocaleString?.() || "-"}
        </Text>
        {editingId === item.id ? (
          <View>
            <TextInput
              label="Type (entry/exit)"
              value={editType}
              onChangeText={setEditType}
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={() => handleUpdate(item.id)}
              style={styles.button}
            >
              Save
            </Button>
            <Button
              mode="outlined"
              onPress={() => setEditingId(null)}
              style={styles.button}
            >
              Cancel
            </Button>
          </View>
        ) : (
          <View style={styles.row}>
            <Button
              mode="outlined"
              onPress={() => {
                setEditingId(item.id);
                setEditType(item.type);
              }}
              style={styles.button}
            >
              Edit
            </Button>
            <Button
              mode="contained"
              onPress={() => handleDelete(item.id)}
              style={styles.button}
            >
              Delete
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Parking Records</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No records found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    marginHorizontal: 4,
    marginTop: 8,
  },
  input: {
    marginBottom: 8,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default RecordsScreen;
