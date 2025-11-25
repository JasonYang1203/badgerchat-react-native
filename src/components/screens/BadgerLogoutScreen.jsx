import { View, Text, Pressable, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';

function BadgerLogoutScreen(props) {
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("token"); // Delete the token from SecureStore
        props.setIsLoggedIn(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Are you sure you're done?</Text>
            <Text style={styles.subtitle}>Come back soon!</Text>
            <Pressable style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>LOGOUT</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        marginBottom: 8
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20
    },
    button: {
        backgroundColor: "maroon",
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 5,
        elevation: 3
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default BadgerLogoutScreen;
