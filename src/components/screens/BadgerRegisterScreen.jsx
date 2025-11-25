import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState(""); // State for username
    const [pin, setPin] = useState(""); // State for PIN
    const [confirmPin, setConfirmPin] = useState(""); // State for confirming PIN
    const [error, setError] = useState(""); // State for error messages

    // Function to handle signup
    async function attemptSignup() {
        // Validate pin fields
        if (!pin || !confirmPin) {
            setError("Please enter a pin.");
            return;
        }
        // Validate pin
        if (pin !== confirmPin) {
            setError("Pins do not match.");
            return;
        }
        // Validate pin length
        if (pin.length !== 7) {
            setError("A pin must be 7 digits.");
            return;
        }

        setError(""); // Clear any previous error messages

        // Send signup request to the server
        const res = await fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_bc69ed46c77aa7b48b9f05b514a9558c980d9921773473356ef62094c5746503"
            },
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        });

        // Check if the response is ok
        if (res.status === 200) {
            const data = await res.json();
            await SecureStore.setItemAsync("token", data.token);
            props.handleSignup(username, pin);
        } else { // Handle error
            const err = await res.json();
            Alert.alert("Signup failed", err.msg);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join BadgerChat!</Text>

            {/* Input fields for username */}
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />

            {/* Input field for PIN */}
            <Text style={styles.label}>PIN</Text>
            <TextInput style={styles.input} value={pin} onChangeText={setPin} secureTextEntry keyboardType="number-pad" maxLength={7} />

            {/* Input field for confirming PIN */}
            <Text style={styles.label}>Confirm PIN</Text>
            <TextInput style={styles.input} value={confirmPin} onChangeText={setConfirmPin} secureTextEntry keyboardType="number-pad" maxLength={7} />

            {/* Error message */}
            {error !== "" && <Text style={{ color: "red" }}>{error}</Text>}

            {/* Buttons for signing up and going back */}
            <View style={styles.row}>
                <Pressable style={styles.solidButton} onPress={attemptSignup}>
                    <Text style={styles.solidButtonText}>SIGNUP</Text>
                </Pressable>
                <Pressable style={styles.ghostButton} onPress={() => props.setIsRegistering(false)}>
                    <Text style={styles.ghostButtonText}>NEVERMIND!</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20
    },
    label: {
        alignSelf: "flex-start",
        marginLeft: "20%",
        fontSize: 14,
        marginTop: 8
    },
    input: {
        width: "60%",
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginBottom: 4
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "75%",
        marginTop: 16
    },
    solidButton: {
        backgroundColor: "maroon",
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 4
    },
    solidButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    ghostButton: {
        padding: 8,
        marginHorizontal: 8
    },
    ghostButtonText: {
        color: "gray",
        fontSize: 16
    }
});

export default BadgerRegisterScreen;
