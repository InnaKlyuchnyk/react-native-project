import { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const initialStste = {
  email: "",
  password: "",
};

export default function LoginScreen() {
  // console.log(Platform.OS);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [loginScreenInfo, setLoginScreenInfo] = useState(initialStste);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 40 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 40 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);

    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(loginScreenInfo);
    setLoginScreenInfo(initialStste);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../images/background.jpg")}
        >
          <KeyboardAvoidingView
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 100,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Welcome back</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>EMAIL</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={loginScreenInfo.email}
                  onChangeText={(value) =>
                    setLoginScreenInfo((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsShowKeyboard(true)}
                  value={loginScreenInfo.password}
                  onChangeText={(value) =>
                    setLoginScreenInfo((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>SING IN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFE",
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    marginHorizontal: 40,
  },
  inputTitle: {
    color: "#F9FAFE",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Inconsolata-Regular",
  },
  input: {
    borderWidth: 2,
    borderColor: "#F9FAFE",
    borderRadius: 5,
    height: 40,
    color: "#F9FAFE",
  },
  button: {
    height: 40,
    borderRadius: 5,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#F9FAFE",
      },
      android: {
        backgroundColor: "#F3B7E5",
      },
    }),
  },
  btnTitle: {
    color: "#F9FAFE",
    fontSize: 18,
    fontFamily: "Inconsolata-Regular",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  headerTitle: {
    color: "#F9FAFE",
    fontSize: 32,
    fontFamily: "Inconsolata-Regular",
  },
});
