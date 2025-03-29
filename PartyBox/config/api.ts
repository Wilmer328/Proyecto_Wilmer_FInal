import { Platform } from "react-native";

// Configuración para diferentes entornos
const LOCALHOST = "localhost:5058";        
const EMULATOR_HOST = "localhost:5058";     
const DEVICE_HOST = "localhost:5058";    

export const BASE_URL = Platform.select({
  android: `http://${EMULATOR_HOST}`,
  ios: `http://${DEVICE_HOST}`,
  default: `http://${LOCALHOST}`
});