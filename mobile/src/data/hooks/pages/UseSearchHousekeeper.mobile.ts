import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default function UseSearchHousekeeper() {
  const [defaultCep, setDefaultCep] = useState("");
  const [coords, setCoords] =
    useState<{
      latitude: number;
      longitude: number;
    }>();

  useEffect(() => {
    (async () => {
      try {
        const gpsAllowed = await askPermission();
        if (gpsAllowed) {
          setCoords(await getCoords());
        }
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (coords) {
          setDefaultCep(await getCep());
        }
      } catch (error) {}
    })();
  }, [coords]);

  async function askPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === "granted";
    } catch (error) {
      return false;
    }
  }

  async function getCoords(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    return location.coords;
  }

  async function getCep(): Promise<string> {
    if (coords) {
      const address = await Location.reverseGeocodeAsync(coords);
      if (address.length > 0) {
        return address[0].postalCode || "";
      }
    }

    return "";
  }

  return {
    defaultCep,
  };
}
