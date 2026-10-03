import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
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

export default function AddContact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = async () => {
    if (!name || !phone || !address) {
      Alert.alert(
        "Data belum lengkap",
        "Silakan isi semua data kontak."
      );
      return;
    }

    try {
      const savedData = await AsyncStorage.getItem("contacts");

      let contacts = savedData
        ? JSON.parse(savedData)
        : defaultContacts;

      const newContact = {
        id: Date.now().toString(),
        name: name,
        phone: phone,
        address: address,
      };

      contacts = [...contacts, newContact];

      await AsyncStorage.setItem(
        "contacts",
        JSON.stringify(contacts)
      );

      Alert.alert(
        "Berhasil",
        "Kontak berhasil disimpan.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Gagal",
        "Kontak tidak dapat disimpan."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Kontak</Text>

      <Text style={styles.subtitle}>
        Tambahkan kontak baru ke BukuKontak
      </Text>

      <Text style={styles.label}>Nama</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nama"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Nomor Telepon</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan nomor telepon"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Alamat</Text>
      <TextInput
        style={[styles.input, styles.addressInput]}
        placeholder="Masukkan alamat"
        multiline
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Simpan Kontak
        </Text>
      </TouchableOpacity>
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
    marginBottom: 30,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 20,
  },

  addressInput: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});