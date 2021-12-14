import * as React from "react";
import { StyleSheet } from "react-native";
import questions from "../data/questions.json";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { TabRouter, useIsFocused } from "@react-navigation/native";

export default function TabTwoScreen({ route }: { route: any }) {
  console.log("Nav", route);
  const isFocused = useIsFocused();

  if (!route?.params?.answers) {
    <View>
      <Text>Najpierw odpowiedź na pytania</Text>
    </View>;
  }

  const results : number[] = questions.questions.map((x, i) => {
    return x["goodAnswer"] === route?.params?.answers[x["questionNumber"]]
      ? 1
      : 0;
  });

  console.log("Results", results);

  return (
    <View style={styles.container}>
      <Text>
        Twój wynik: {results.reduce((a, b) => a + b)} / {results.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
