import { View, Text, Pressable, StyleSheet } from "react-native";

export default function BadgerGuestScreen({ setIsRegistering }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ready to signup?</Text>
      <Text style={styles.subtitle}>Join BadgerChat to be able to make posts!</Text>
      <Pressable style={styles.button} onPress={() => setIsRegistering(true)}>
        <Text style={styles.buttonText}>SIGNUP!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20
  },
  button: {
    backgroundColor: 'maroon',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
