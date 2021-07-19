import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Header } from "../../components/header";
import { fadedGray } from "../../colours";
import { AccessibleTouchableOpacity } from "../../components/accessible-touchable-opacity";
import { Icon } from "../../components/icon";

export const HelpIcon = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <>
      <AccessibleTouchableOpacity
        style={helpIconStyles.helpButton}
        onPress={() => setIsHelpModalOpen(true)}
      >
        <Icon name="questionCircle" color="white" size={27} />
      </AccessibleTouchableOpacity>
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </>
  );
};

const HelpModal = ({ isOpen, onClose }) => (
  <Modal animationType="fade" transparent visible={isOpen}>
    <View style={helpModalStyles.page}>
      <View style={helpModalStyles.container}>
        <View style={helpModalStyles.headerContainer}>
          <Header style={helpModalStyles.header}>
            Using the Pattern Identifier
          </Header>
          <AccessibleTouchableOpacity
            style={helpModalStyles.closeButton}
            onPress={onClose}
          >
            <Icon name="cross" color="black" size={25} />
          </AccessibleTouchableOpacity>
        </View>
        <View style={helpModalStyles.helpTextContainer}>
          <ModalText>
            Change the candles price values to see if any patterns match your
            candles.
          </ModalText>
          <ModalText>
            Use the Add and Remove buttons to try double and triple candle
            patterns.
          </ModalText>
          <ModalText>
            When working with multiple candles, click on each candle to change
            the one being edited.
          </ModalText>
        </View>
      </View>
    </View>
  </Modal>
);

const ModalText = ({ children }) => (
  <Text style={helpModalStyles.modalText}>{`\u2022 ${children}`}</Text>
);

const helpIconStyles = StyleSheet.create({
  helpButton: {
    padding: 5,
    margin: 5,
    height: "5%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

const helpModalStyles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: fadedGray,
  },
  container: {
    marginTop: "10%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: { fontSize: 18, fontWeight: "bold" },
  closeButton: { padding: 5 },
  helpTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  modalText: { margin: 10 },
});
