import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { useState } from "react";

const loadApplication = async () => {
  await Font.loadAsync({
    "Inconsolata-Regular": require("./fonst/Inconsolata/Inconsolata-Regular.ttf"),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return <RegistrationScreen />;
}
