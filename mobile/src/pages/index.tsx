import React from "react";
import { View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import Button from "ui/components/inputs/Button";
import { RootStackParamsList } from "ui/router";

type NavigationProp = StackNavigationProp<RootStackParamsList, "Index">;

interface IndexProps {
  navigation: NavigationProp;
}

const Index: React.FC<IndexProps> = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Button
        mode={"contained"}
        onPress={() => navigation.navigate("SearchHousekeeper")}
      >
        Encontrar Diaristas
      </Button>
    </View>
  );
};

export default Index;
