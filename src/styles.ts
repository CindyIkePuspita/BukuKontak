import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 20,
  },

  countBox: {
    backgroundColor: "#E9E5FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  countText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5A54E8",
  },

  addButton: {
    backgroundColor: "#5A54E8",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  secondaryButton: {
    backgroundColor: "#E9E5FF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },

  secondaryButtonText: {
    color: "#5A54E8",
    fontSize: 15,
    fontWeight: "600",
  },

  deleteButton: {
    backgroundColor: "#FFE5E5",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 5,
  },

  deleteButtonText: {
    color: "#D64545",
    fontSize: 15,
    fontWeight: "600",
  },

  list: {
    paddingBottom: 30,
  },

  contactCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E9E5FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5A54E8",
  },

  contactInfo: {
    flex: 1,
  },

  contactName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 4,
  },

  contactPhone: {
    fontSize: 14,
    color: "#555555",
    marginBottom: 2,
  },

  contactAddress: {
    fontSize: 13,
    color: "#888888",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1DFF0",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 12,
  },

  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  detailLabel: {
    fontSize: 13,
    color: "#888888",
    marginBottom: 5,
  },

  detailValue: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "500",
    marginBottom: 18,
  },
});