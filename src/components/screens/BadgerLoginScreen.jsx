import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState(""); // State for username
    const [pin, setPin] = useState(""); // State for PIN

    // Function to handle login
    async function attemptLogin() {
        const res = await fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/login", {
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
            await SecureStore.setItemAsync("token", data.token); // Store the token in SecureStore
            props.handleLogin(username, pin);
        } else { // Handle error
            const err = await res.json();
            Alert.alert("Login failed", err.msg);
        }
    }

    // Function to handle guest login
    function continueAsGuest() {
        props.handleGuest();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BadgerChat Login</Text>

            {/* Input fields for username*/}
            <Text style={styles.label}>Username</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} autoCapitalize="none" />

            {/* Input field for PIN */}
            <Text style={styles.label}>PIN</Text>
            <TextInput style={styles.input} value={pin} onChangeText={setPin} secureTextEntry keyboardType="number-pad" maxLength={7} />

            {/* Login button */}
            <Pressable style={styles.crimsonBtn} onPress={attemptLogin}>
                <Text style={styles.btnText}>LOGIN</Text>
            </Pressable>

            {/* warm up text */}
            <Text style={{ marginTop: 12 }}>New here?</Text>

            {/* Buttons for signing up and continuing as guest */}
            <View style={styles.row}>
                <Pressable style={styles.grayBtn} onPress={() => props.setIsRegistering(true)}>
                    <Text style={styles.btnText}>SIGNUP</Text>
                </Pressable>
                <Pressable style={styles.grayBtn} onPress={continueAsGuest}>
                    <Text style={styles.btnText}>CONTINUE AS GUEST</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        marginBottom: 24
    },
    label: {
        alignSelf: "flex-start",
        marginLeft: "20%",
        marginBottom: 4
    },
    input: {
        height: 40,
        width: "60%",
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 16
    },
    crimsonBtn: {
        backgroundColor: "maroon",
        padding: 10,
        width: "60%",
        alignItems: "center",
        marginTop: 8
    },
    grayBtn: {
        backgroundColor: "gray",
        padding: 10,
        width: "45%",
        alignItems: "center",
        margin: 6
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "90%"
    }
});

export default BadgerLoginScreen;
