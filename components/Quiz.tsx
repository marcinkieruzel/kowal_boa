import React from "react";
import { Text, View, StyleSheet, Button, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import questions from "../data/questions.json";
import reduce from "lodash/reduce";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const initialAnswers = reduce(
      questions.questions,
      (r: any, v: any) => {
        return { ...r, [v.questionNumber]: "" };
      },
      {}
    )

const Quiz: React.FC<Props> = ({}): JSX.Element => {
  const navigation = useNavigation();
  const [answers, setAnswers] = React.useState(
      initialAnswers
     // Można bez reduce po prostu na sztywno | {1: '', 2: ''}
  );

  console.log("Answers", answers);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Quiz wiedzy ogólnej</Text>
      <ScrollView style={styles.scrollview}>
        {questions?.questions?.map((x, i) => {
          return (
            <View key={i}>
              <Text style={styles.question}>
                {x.questionNumber}. {x.question}
              </Text>
              <View>
                {Object.values(x?.answers)?.map((y, j) => {
                  return (
                    <View key={j} style={styles.answers}>
                      <RadioButton
                        key={j}
                        value={y}
                        status={
                          answers[x.questionNumber] === y
                            ? "checked"
                            : "unchecked"
                        }
                        onPress={() =>
                          setAnswers({ ...answers, [x.questionNumber]: y })
                        }
                      />
                      <Text>{y}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Button
        title="Przejdź do wyników"
        disabled={Object.values(answers).some((x) => !x)}
        onPress={() => {
          // @ts-ignore
          navigation.navigate("TabTwo", {
            itemId: 86,
            answers: answers,
          });
        }}
      />
      <View style={styles.scrollview}></View>

      <Button
        title="Resetuj Quiz"
        onPress={() => {
          // @ts-ignore
          setAnswers(initialAnswers)
        }}
      />

    </SafeAreaView>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  scrollview: {
    paddingBottom: 20,
  },
  question: {
    fontWeight: 700,
    marginBottom: 10,
  },
  answers: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
