import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactDetail() {
  const { id, name, phone, address } = useLocalSearchParams();

  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(String(name || ""));
  const [editPhone, setEditPhone] = useState(String(phone || ""));
  const [editAddress, setEditAddress] = useState(
    String(address || "")
  );

  const handleSaveEdit = async () => {
    if (!editName || !editPhone || !editAddress) {
      Alert.alert(
        "Data belum lengkap",
        "Silakan isi semua data kontak."
      );
      return;
    }

    try {
      const savedData = await AsyncStorage.getItem("contacts");
      const contacts = savedData ? JSON.parse(savedData) : [];

      const updatedContacts = contacts.map((contact: any) =>
        contact.id === String(id)
          ? {
              ...contact,
              name: editName,
              phone: editPhone,
              address: editAddress,
            }
          : contact
      );

      await AsyncStorage.setItem(
        "contacts",
        JSON.stringify(updatedContacts)
      );

      Alert.alert(
        "Berhasil",
        "Kontak berhasil diperbarui.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "Gagal",
        "Kontak tidak dapat diperbarui."
      );
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Hapus Kontak",
      "Apakah kamu yakin ingin menghapus kontak ini?",
      [
        {
          text: "Batal",
          style: "cancel",
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: async () => {
            try {
              const savedData =
                await AsyncStorage.getItem("contacts");

              const contacts = savedData
                ? JSON.parse(savedData)
                : [];

              const updatedContacts = contacts.filter(
                (contact: any) =>
                  contact.id !== String(id)
              );

              await AsyncStorage.setItem(
                "contacts",
                JSON.stringify(updatedContacts)
              );

              Alert.alert(
                "Berhasil",
                "Kontak berhasil dihapus.",
                [
                  {
                    text: "OK",
                    onPress: () => router.replace("/"),
                  },
                ]
              );
            } catch (error) {
              Alert.alert(
                "Gagal",
                "Kontak tidak dapat dihapus."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Kontak</Text>

      <View style={styles.card}>
        {!editMode ? (
          <>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {String(name || "?").charAt(0)}
              </Text>
            </View>

            <Text style={styles.name}>
              {String(name || "-")}
            </Text>

            <Text style={styles.label}>
              Nomor Telepon
            </Text>

            <Text style={styles.value}>
              {String(phone || "-")}
            </Text>

            <Text style={styles.label}>
              Alamat
            </Text>

            <Text style={styles.value}>
              {String(address || "-")}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.label}>Nama</Text>

            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Masukkan nama"
            />

            <Text style={styles.label}>
              Nomor Telepon
            </Text>

            <TextInput
              style={styles.input}
              value={editPhone}
              onChangeText={setEditPhone}
              placeholder="Masukkan nomor telepon"
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>
              Alamat
            </Text>

            <TextInput
              style={[styles.input, styles.addressInput]}
              value={editAddress}
              onChangeText={setEditAddress}
              placeholder="Masukkan alamat"
              multiline
            />
          </>
        )}
      </View>

      {!editMode ? (
        <>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.buttonText}>
              Edit Kontak
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>
              Hapus Kontak
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleSaveEdit}
          >
            <Text style={styles.buttonText}>
              Simpan Perubahan
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setEditMode(false)}
          >
            <Text style={styles.cancelButtonText}>
              Batal
            </Text>
          </TouchableOpacity>
        </>
      )}
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
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E5E3FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    alignSelf: "center",
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6C63FF",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 25,
    textAlign: "center",
  },

  label: {
    fontSize: 13,
    color: "#888888",
    marginTop: 10,
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    color: "#333333",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 10,
  },

  addressInput: {
    height: 90,
    textAlignVertical: "top",
  },

  editButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },

  deleteButton: {
    backgroundColor: "#E05252",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  cancelButton: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelButtonText: {
    color: "#555555",
    fontSize: 16,
    fontWeight: "bold",
  },
});