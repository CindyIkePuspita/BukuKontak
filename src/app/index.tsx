import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "../styles";

interface Contact {
  id: string;
  name: string;
  phone: string;
  address: string;
}

const defaultContacts: Contact[] = [
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
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);

  const loadContacts = async (): Promise<void> => {
    try {
      const savedContacts = await AsyncStorage.getItem("contacts");

      if (savedContacts) {
        const parsedContacts: Contact[] = JSON.parse(savedContacts);
        setContacts(parsedContacts);
      } else {
        await AsyncStorage.setItem(
          "contacts",
          JSON.stringify(defaultContacts)
        );
        setContacts(defaultContacts);
      }
    } catch (error) {
      console.log("Gagal memuat kontak:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadContacts();
    }, [])
  );

  const renderContact = ({ item }: { item: Contact }) => {
    return (
      <TouchableOpacity
        style={styles.contactCard}
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
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>

          <Text style={styles.contactPhone}>
            {item.phone}
          </Text>

          <Text style={styles.contactAddress}>
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Konekta</Text>

          <Text
            style={{
              marginTop: 4,
              fontSize: 14,
              color: "#777",
            }}
          >
            Daftar kontak kamu
          </Text>
        </View>

        <View style={styles.countBox}>
          <Text style={styles.countText}>
            {contacts.length} Kontak
          </Text>
        </View>
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
        renderItem={renderContact}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}