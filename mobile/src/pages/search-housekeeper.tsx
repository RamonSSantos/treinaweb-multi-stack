import React, { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";

import Button from "ui/components/inputs/Button";
import PageTitle from "ui/components/data-display/PageTitle";
import TextInput from "ui/components/inputs/TextInput";
import UserInformation from "ui/components/data-display/UserInformation";
import {
  FormContainer,
  TextContainer,
  ErrorText,
  ResponseContainer,
} from "@styles/pages/search-housekeeper";
import UseIndex from "data/hooks/pages/UseIndex";
import UseSearchHousekeeper from "data/hooks/pages/UseSearchHousekeeper.mobile";

const SearchHousekeeper: React.FC = () => {
  const { colors } = useTheme();
  const {
    cep,
    setCep,
    cepValidation,
    getHousekeepers,
    error,
    housekeepers,
    housekeepersRemaining,
    searchCompleted,
    searching,
  } = UseIndex();
  const { defaultCep } = UseSearchHousekeeper();

  useEffect(() => {
    if (defaultCep && !cep) {
      setCep(defaultCep);
      getHousekeepers(defaultCep);
    }
  }, [defaultCep]);

  return (
    <ScrollView>
      <PageTitle
        title={"Conheça os profissionais"}
        subtitle={
          "Preencha seu endereço e veja todos os profissionais da sua localidade."
        }
      />

      <FormContainer>
        <TextInputMask
          value={cep}
          onChangeText={setCep}
          type={"custom"}
          options={{
            mask: "99.999-999",
          }}
          customTextInput={TextInput}
          customTextInputProps={{
            label: "Digite o seu CEP",
          }}
        />

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button
          mode={"contained"}
          style={{ marginTop: 32 }}
          color={colors.accent}
          disabled={!cepValidation || searching}
          onPress={() => getHousekeepers(cep)}
          loading={searching}
        >
          Buscar
        </Button>
      </FormContainer>

      {searchCompleted &&
        (housekeepers.length > 0 ? (
          <ResponseContainer>
            {housekeepers.map((item, index) => (
              <UserInformation
                key={index}
                name={item.fullname}
                rating={item.rating || 0}
                picture={item.picture || ""}
                description={item.town}
                darker={index % 2 === 1}
              />
            ))}

            {housekeepersRemaining > 0 && (
              <TextContainer>
                ...e mais {housekeepersRemaining}
                {housekeepersRemaining > 1
                  ? "profissionais atendem"
                  : "profissional atende"}
                ao seu endereço.
              </TextContainer>
            )}

            <Button mode={"contained"} color={colors.accent}>
              Contratar um profissional
            </Button>
          </ResponseContainer>
        ) : (
          <TextContainer>
            Ainda não temos nenhuma diarista disponível em sua região!
          </TextContainer>
        ))}
    </ScrollView>
  );
};

export default SearchHousekeeper;
