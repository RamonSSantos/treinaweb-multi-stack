import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationTheme } from "ui/themes";

import Index from "pages";
import SearchHousekeeper from "pages/search-housekeeper";

import Logo from "@assets/img/logos/e-diaristas-logo.png";

const Stack = createStackNavigator();

export type RootStackParamsList = {
  Index: undefined;
  SearchHousekeeper: undefined;
};

const Router: React.FC = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={"Index"}
          component={Index}
          options={{
            headerTitleAlign: "center",
            headerTitle: () => (
              <Image
                source={Logo}
                style={{
                  width: 150,
                  height: 50,
                  resizeMode: "contain",
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name={"SearchHousekeeper"}
          component={SearchHousekeeper}
          options={{
            title: "Encontrar Diarista",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
