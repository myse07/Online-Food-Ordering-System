import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// ================= FIREBASE CONFIG =================
// Replace with your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCV5fqc29jcNFDJRmTA-mIwWJChAB6iGjQ",
  authDomain: "ordering-system-5e268.firebaseapp.com",
  projectId: "ordering-system-5e268",
  storageBucket: "ordering-system-5e268.firebasestorage.app",
  messagingSenderId: "1085705731990",
  appId: "1:1085705731990:web:2e36ad5d4e9019fb5867b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [foods, setFoods] = useState([]);

  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  // ================= READ DATA =================
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "foods"), (snapshot) => {
      const foodList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFoods(foodList);
    });

    return () => unsubscribe();
  }, []);

  // ================= CREATE =================
  const addFood = async () => {
    if (!foodName || !category || !price || !description) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "foods"), {
        foodName,
        category,
        price,
        description,
      });

      Alert.alert("Success", "Food Added");

      clearFields();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // ================= UPDATE =================
  const updateFood = async () => {
    try {
      const foodRef = doc(db, "foods", editingId);

      await updateDoc(foodRef, {
        foodName,
        category,
        price,
        description,
      });

      Alert.alert("Updated", "Food Updated Successfully");

      setEditingId(null);
      clearFields();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // ================= DELETE =================
  const deleteFood = async (id) => {
    try {
      await deleteDoc(doc(db, "foods", id));
      Alert.alert("Deleted", "Food Removed");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // ================= EDIT =================
  const editFood = (item) => {
    setFoodName(item.foodName);
    setCategory(item.category);
    setPrice(item.price);
    setDescription(item.description);

    setEditingId(item.id);
  };

  // ================= CLEAR =================
  const clearFields = () => {
    setFoodName("");
    setCategory("");
    setPrice("");
    setDescription("");
  };

  // ================= UI =================
  return (
    <LinearGradient
      colors={["#0f172a", "#1e293b", "#334155"]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>🍔 Food Ordering System</Text>

          {/* 3D FORM CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {editingId ? "Update Food" : "Add Food Item"}
            </Text>

            <TextInput
              placeholder="Food Name"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={foodName}
              onChangeText={setFoodName}
            />

            <TextInput
              placeholder="Category"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              value={category}
              onChangeText={setCategory}
            />

            <TextInput
              placeholder="Price"
              placeholderTextColor="#94a3b8"
              style={styles.input}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <TextInput
              placeholder="Description"
              placeholderTextColor="#94a3b8"
              style={[styles.input, { height: 80 }]}
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={editingId ? updateFood : addFood}
            >
              <LinearGradient
                colors={["#f97316", "#fb923c"]}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>
                  {editingId ? "UPDATE FOOD" : "ADD FOOD"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* FOOD LIST */}
          <Text style={styles.menuTitle}>📋 Available Foods</Text>

          <FlatList
            data={foods}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.foodCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.foodName}>{item.foodName}</Text>

                  <Text style={styles.foodCategory}>
                    {item.category}
                  </Text>

                  <Text style={styles.foodPrice}>
                    ₱ {item.price}
                  </Text>

                  <Text style={styles.foodDescription}>
                    {item.description}
                  </Text>
                </View>

                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => editFood(item)}
                  >
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => deleteFood(item.id)}
                  >
                    <Text style={styles.actionText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "#1e293b",
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    elevation: 15,
    borderWidth: 1,
    borderColor: "#334155",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#0f172a",
    color: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#475569",
    fontSize: 16,
  },

  button: {
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 10,
  },

  gradientButton: {
    padding: 16,
    alignItems: "center",
    borderRadius: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  menuTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 10,
  },

  foodCard: {
    backgroundColor: "#1e293b",
    marginHorizontal: 20,
    marginBottom: 18,
    padding: 18,
    borderRadius: 22,

    shadowColor: "#000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,

    elevation: 12,

    borderWidth: 1,
    borderColor: "#334155",
  },

  foodName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  foodCategory: {
    color: "#cbd5e1",
    marginTop: 4,
    fontSize: 15,
  },

  foodPrice: {
    color: "#f97316",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 8,
  },

  foodDescription: {
    color: "#e2e8f0",
    marginTop: 8,
    lineHeight: 22,
  },

  actionContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  editBtn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginRight: 10,
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});