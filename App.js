import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Clear form
  const clearForm = () => {
    setName('');
    setCategory('');
    setPrice('');
    setDescription('');
    setEditingId(null);
  };

  // Add or update item (LOCAL ONLY)
  const saveFood = () => {
    if (!name || !category || !price || !description) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    const foodData = {
      id: editingId || Date.now().toString(),
      name,
      category,
      price: parseFloat(price),
      description,
    };

    if (editingId) {
      // update
      setFoods(prev =>
        prev.map(item => (item.id === editingId ? foodData : item))
      );
      Alert.alert('Success', 'Menu item updated successfully.');
    } else {
      // add
      setFoods(prev => [...prev, foodData]);
      Alert.alert('Success', 'Menu item added successfully.');
    }

    clearForm();
  };

  // Edit item
  const editFood = (item) => {
    setName(item.name);
    setCategory(item.category);
    setPrice(String(item.price));
    setDescription(item.description);
    setEditingId(item.id);
  };

  // Delete item
  const removeFood = (id) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setFoods(prev => prev.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  // Render item
  const renderFood = ({ item }) => (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={['#ffffff', '#f5f7ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodCategory}>{item.category}</Text>
        <Text style={styles.foodPrice}>₱{Number(item.price).toFixed(2)}</Text>
        <Text style={styles.foodDescription}>{item.description}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => editFood(item)}
          >
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => removeFood(item.id)}
          >
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>🍔 Online Food Ordering System</Text>
          <Text style={styles.headerSubtitle}>
            Local CRUD Version (No Firebase)
          </Text>
        </LinearGradient>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>
            {editingId ? 'Update Menu Item' : 'Add Menu Item'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Food Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />

          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveFood}>
            <LinearGradient
              colors={['#43cea2', '#185a9d']}
              style={styles.saveGradient}
            >
              <Text style={styles.saveButtonText}>
                {editingId ? 'Update Item' : 'Add Item'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {editingId && (
            <TouchableOpacity style={styles.cancelButton} onPress={clearForm}>
              <Text style={styles.cancelButtonText}>Cancel Editing</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sectionTitle}>📋 Available Menu</Text>

        <FlatList
          data={foods}
          renderItem={renderFood}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No menu items found.</Text>
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2ff' },

  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  headerSubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
  },

  formCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 25,
    elevation: 8,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginBottom: 15,
  },

  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
  },

  descriptionInput: { height: 90 },

  saveButton: { borderRadius: 15, overflow: 'hidden' },

  saveGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },

  saveButtonText: { color: '#fff', fontWeight: 'bold' },

  cancelButton: { marginTop: 10, alignItems: 'center' },

  cancelButtonText: { color: '#ef4444' },

  cardWrapper: { marginHorizontal: 15, marginBottom: 15 },

  card: {
    borderRadius: 22,
    padding: 18,
    elevation: 6,
  },

  foodName: { fontSize: 22, fontWeight: 'bold' },
  foodCategory: { color: '#6366f1', marginTop: 4 },
  foodPrice: { color: '#10b981', marginTop: 8, fontSize: 20 },
  foodDescription: { marginTop: 8, color: '#6b7280' },

  buttonRow: { flexDirection: 'row', marginTop: 15 },

  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  editButton: { backgroundColor: '#3b82f6' },
  deleteButton: { backgroundColor: '#ef4444' },

  actionText: { color: '#fff', fontWeight: 'bold' },

  emptyText: { textAlign: 'center', color: '#6b7280', marginBottom: 30 },
});