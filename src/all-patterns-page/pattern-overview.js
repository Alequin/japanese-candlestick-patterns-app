import React from "react";
import { Text, View } from "react-native";
import { Candle } from "../candle";
import { Icon } from "../icon";

export const PatternOverview = ({
  pattern: { name, exampleCandles, sections },
}) => {
  return (
    <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
      <Title>{name}</Title>
      <ExampleCandlesView exampleCandles={exampleCandles} />
      {sections.map(({ title, content, asList }) => (
        <View key={title} style={{ width: "100%" }}>
          <TextSection
            key={title}
            title={title}
            content={content}
            asList={asList}
          />
        </View>
      ))}
    </View>
  );
};

const Title = (props) => (
  <Text
    style={{
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 26,
    }}
    {...props}
  />
);

const ExampleCandlesView = ({ exampleCandles }) => (
  <View
    style={{
      height: 200,
      marginVertical: 20,
      width: "100%",
      alignItems: "center",
    }}
  >
    {exampleCandles.map((candleDetails, index) => (
      <View key={index} style={{ width: 30, margin: 2 }}>
        <Candle candleShapeDetails={candleDetails} />
      </View>
    ))}
  </View>
);

const TextSection = ({ title, content, asList }) => {
  return (
    <>
      <Text
        style={{
          fontSize: 19,
          fontWeight: "bold",
          marginBottom: 3,
        }}
      >
        {title}
      </Text>
      {content.map((text) => (
        <Text
          key={text}
          style={{
            fontSize: 17,
            marginBottom: !asList ? 10 : 0,
            marginLeft: asList ? 10 : 0,
          }}
        >
          {asList ? `\u2022 ${text}` : text}
        </Text>
      ))}
    </>
  );
};
