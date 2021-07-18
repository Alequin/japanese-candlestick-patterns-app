import React, { useState } from "react";
import { Modal, View, Text } from "react-native";
import { Header } from "../../components/header";
import { modalBackground } from "../../colours";
import { AccessibleTouchableOpacity } from "../../components/accessible-touchable-opacity";
import { Icon } from "../../components/icon";

export const HelpIcon = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  return (
    <>
      <AccessibleTouchableOpacity
        style={{
          padding: 5,
          height: "5%",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
        onPress={() => setIsHelpModalOpen(true)}
      >
        <Icon name="questionCircle" color="white" size={30} />
      </AccessibleTouchableOpacity>
      <Modal
        animationType="fade"
        transparent
        visible={isHelpModalOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            backgroundColor: modalBackground,
          }}
        >
          <View
            style={{
              marginTop: "10%",
              width: "90%",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Header style={{ fontSize: 18, fontWeight: "bold" }}>
                Using the Pattern Identifier
              </Header>
              <AccessibleTouchableOpacity
                style={{ padding: 5 }}
                onPress={() => setIsHelpModalOpen(false)}
              >
                <Icon name="cross" color="black" size={32} />
              </AccessibleTouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
              }}
            >
              <ModalText>
                Change the candles price values to see if any patterns match
                your candles.
              </ModalText>
              <ModalText>
                Use the Add and Remove buttons to try double and triple candle
                patterns.
              </ModalText>
              <ModalText>
                When working with multiple candles, click on each candle to
                change the one being edited.
              </ModalText>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const ModalText = ({ children }) => (
  <Text style={{ margin: 10 }}>{`\u2022 ${children}`}</Text>
);
