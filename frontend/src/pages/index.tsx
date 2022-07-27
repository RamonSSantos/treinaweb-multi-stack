import SafeEnvironment from "ui/components/feedback/SafeEnvironment";
import PageTitle from "ui/components/data-display/PageTitle";
import UserInformation from "ui/components/data-display/UserInformation";
import TextFieldMask from "ui/components/inputs/TextFieldMask";
import {
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";

import UseIndex from "data/hooks/pages/UseIndex";

import {
  FormElementsContainer,
  HousekeeperList,
  HousekeeperContainer,
} from "ui/styles/pages/index.style";

export default function Home() {
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

  return (
    <div>
      <SafeEnvironment />
      <PageTitle
        title={"Conheça os profissionais"}
        subtitle={
          "Preencha seu endereço e veja todos os profissionais da sua localidade."
        }
      />
      <Container>
        <FormElementsContainer>
          <TextFieldMask
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            mask={"99.999-999"}
            variant="outlined"
            label={"Digite seu CEP"}
            fullWidth
          />
          {error && <Typography color={"error"}>{error}</Typography>}
          <Button
            variant={"contained"}
            disabled={!cepValidation || searching}
            onClick={() => getHousekeepers(cep)}
            color={"secondary"}
            sx={{ width: "220px" }}
          >
            {searching ? <CircularProgress size={20} /> : "Buscar"}
          </Button>
        </FormElementsContainer>

        {searchCompleted &&
          (housekeepers.length > 0 ? (
            <HousekeeperList>
              <HousekeeperContainer>
                {housekeepers.map((item, index) => {
                  return (
                    <UserInformation
                      key={index}
                      name={item.fullname}
                      picture={item.picture}
                      rating={item.rating}
                      description={item.town}
                    />
                  );
                })}
              </HousekeeperContainer>
              <Container sx={{ textAlign: "center" }}>
                {housekeepersRemaining > 0 && (
                  <Typography sx={{ mt: 5 }}>
                    ...e mais {housekeepersRemaining}
                    {housekeepersRemaining > 1
                      ? " profissionais atendem"
                      : " profissional atende"}
                    ao seu endereço.
                  </Typography>
                )}
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  sx={{ mt: 5 }}
                >
                  Contratar um profissional
                </Button>
              </Container>
            </HousekeeperList>
          ) : (
            <Typography align={"center"} color={"textPrimary"}>
              Ainda não temos nenhuma diarista disponível em sua região!
            </Typography>
          ))}
      </Container>
    </div>
  );
}
