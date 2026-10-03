import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const defaultContacts = [
  {
    id: "1",
    name: "Ike",
    phone: "081234567890",
    address: "Malang",
  },
  {
    id: "2",
    name: "Meng",
    phone: "082345678901",
    address: "Batu",
  },
  {
    id: "3",
    name: "Dea",
    phone: "083456789012",
    address: "Malang",
  },
  {
    id: "4",
    name: "Bella",
    phone: "084567890123",
    address: "Malang",
  },
  {
    id: "5",
    name: "Kasih",
    phone: "085678901234",
    address: "Batu",
  },
];

export default function Index() {
  const [contacts, setContacts] = useState(defaultContacts);

  const loadContacts = async () => {
    try {
      const savedData = await AsyncStorage.getItem("contacts");

      if (savedData) {
        setContacts(JSON.parse(savedData));
      } else {
        await AsyncStorage.setItem(
          "contacts",
          JSON.stringify(defaultContacts)
        );

        setContacts(defaultContacts);
      }
    } catch (error) {
      console.log("Gagal membaca kontak:", error);
      setContacts(defaultContacts);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Konekta</Text>

          <Text style={styles.subtitle}>
            Daftar kontak kamu
          </Text>
        </View>

        <Text style={styles.count}>
          {contacts.length} Kontak
        </Text>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-contact")}
      >
        <Text style={styles.addButtonText}>
          + Tambah Kontak
        </Text>
      </TouchableOpacity>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/contact-detail",
                params: {
                  id: item.id,
                  name: item.name,
                  phone: item.phone,
                  address: item.address,
                },
              })
            }
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0)}
              </Text>
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.phone}>
                {item.phone}
              </Text>

              <Text style={styles.address}>
                {item.address}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 4,
  },

  count: {
    fontSize: 13,
    color: "#666666",
  },

  addButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E5E3FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  contactInfo: {
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },

  phone: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 3,
  },

  address: {
    fontSize: 13,
    color: "#888888",
  },
});