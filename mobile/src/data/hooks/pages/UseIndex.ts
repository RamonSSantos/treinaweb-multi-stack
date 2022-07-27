import { useState, useMemo } from "react";
import { SimpleHousekeeperInterface } from "data/@types/Housekeeper";
import { ValidationService } from "data/services/ValidationService";
import { ApiService } from "data/services/ApiService";

export default function UseIndex() {
  const [cep, setCep] = useState(""),
    cepValidation = useMemo(() => {
      return ValidationService.cep(cep);
    }, [cep]),
    [error, setError] = useState(""),
    [searching, setSearching] = useState(false),
    [searchCompleted, setSearchCompleted] = useState(false),
    [housekeepers, setHousekeepers] = useState(
      [] as SimpleHousekeeperInterface[]
    ),
    [housekeepersRemaining, setHousekeepersRemaining] = useState(0);

  async function getHousekeepers(cepValue: string) {
    setSearchCompleted(false);
    setSearching(true);
    setError("");

    try {
      const { data } = await ApiService.get<{
        housekeepers: SimpleHousekeeperInterface[];
        housekeepers_quantity: number;
      }>("/api/housekeepers-town?cep=" + cepValue.replace(/\D/g, ""));

      setHousekeepers(data.housekeepers);
      setHousekeepersRemaining(data.housekeepers_quantity);

      setSearchCompleted(true);
      setSearching(false);
    } catch (error) {
      setError("CEP não encontrado.");
      setSearching(false);
    }

    setSearchCompleted(true);
  }

  return {
    cep,
    setCep,
    cepValidation,
    getHousekeepers,
    error,
    housekeepers,
    housekeepersRemaining,
    searchCompleted,
    searching,
  };
}
