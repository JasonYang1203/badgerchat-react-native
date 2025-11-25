import { useCallback, useEffect, useState } from "react";
import { Alert, Button, FlatList, Modal, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import BadgerChatMessage from "../helper/BadgerChatMessage";

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]); 
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [username, setUsername] = useState("");

    const fetchMessages = useCallback(async () => {
        setRefreshing(true); // Start the refresh indicator
        const token = await SecureStore.getItemAsync("token"); // Get the token from SecureStore

        // Fetch messages from the API
        const res = await fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?chatroom=${props.name}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-CS571-ID": "bid_bc69ed46c77aa7b48b9f05b514a9558c980d9921773473356ef62094c5746503"
            }
        });

        // Check if the response is ok
        if (res.ok) {
            const data = await res.json();
            setMessages(data.messages);
        } else { // Handle error
            Alert.alert("Failed to load messages", "Please try again later.");
        }

        setRefreshing(false); // Stop the refresh indicator
    }, [props.name]);

    // Fetch user information if not a guest
    async function fetchUser() {
        const token = await SecureStore.getItemAsync("token"); // Get the token from SecureStore
        const res = await fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/whoami", { 
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-CS571-ID": "bid_bc69ed46c77aa7b48b9f05b514a9558c980d9921773473356ef62094c5746503"
            }
        });
        const data = await res.json();
        setUsername(data.user.username);
    }

    // Fetch messages and user information when the component mounts
    useEffect(() => {
        fetchMessages();
        if (!props.isGuest) {
            fetchUser();
        }
    }, [fetchMessages]);

    // Function to create a new post
    async function createPost() {
        if (props.isGuest) {
            Alert.alert("Join BadgerChat", "Signup to create your first post!");
            return;
        }

        const token = await SecureStore.getItemAsync("token"); // Get the token from SecureStore

        const res = await fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-CS571-ID": "bid_bc69ed46c77aa7b48b9f05b514a9558c980d9921773473356ef62094c5746503",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: newTitle,
                content: newContent
            })
        });

        // Check if the response is ok
        if (res.ok) {
            Alert.alert("Success", "Your post was created!");
            setModalVisible(false);
            setNewTitle("");
            setNewContent("");
            fetchMessages();
        } else { // Handle error
            const err = await res.json();
            Alert.alert("Post failed", err.msg || "Try again later.");
        }
    }

    // Function to delete a post
    async function deletePost(id) {
        const token = await SecureStore.getItemAsync("token");
        const res = await fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?id=${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-CS571-ID": "bid_bc69ed46c77aa7b48b9f05b514a9558c980d9921773473356ef62094c5746503"
            }
        });

        // Check if the response is ok
        if (res.ok) {
            Alert.alert("Deleted", "Your post was removed.");
            fetchMessages();
        } else { // Handle error
            const err = await res.json();
            Alert.alert("Delete failed", err.msg || "Try again later.");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <FlatList data={messages} keyExtractor={(item) => item.id.toString()} renderItem={({ item }) => (
                    <BadgerChatMessage id={item.id} title={item.title} content={item.content} poster={item.poster} created={item.created} currentUser={username} onDelete={deletePost}/>
                )}
                {/* List Header */}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchMessages} />
                }
            />

            {/* Floating button to create a new post */}
            {
                !props.isGuest &&
                <View style={styles.floatingButton}>
                    <Button title="Add Post" color="maroon" onPress={() => setModalVisible(true)} />
                </View>
            }

            {/* Modal for creating a new post */}
            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Create A Post</Text>

                    {/* Input fields for title and body */}
                    <Text style={styles.modalLabel}>Title</Text>
                    <TextInput
                        placeholder="Enter title"
                        value={newTitle}
                        onChangeText={setNewTitle}
                        style={styles.input}
                    />

                    {/* Body input field */}
                    <Text style={styles.modalLabel}>Body</Text>
                    <TextInput
                        placeholder="Enter body"
                        value={newContent}
                        onChangeText={setNewContent}
                        style={[styles.input, { height: 100 }]}
                        multiline
                    />

                    {/* Buttons to create post or cancel */}
                    <View style={styles.buttonRow}>
                        <Button
                            title="CREATE POST"
                            onPress={createPost}
                            disabled={newTitle === "" || newContent === ""}
                            color="maroon"
                        />
                        <View style={{ width: 16 }} />
                        <Button
                            title="CANCEL"
                            onPress={() => setModalVisible(false)}
                            color="gray"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 24,
        justifyContent: "center"
    },
    modalTitle: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: "center"
    },
    modalLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 12
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20
    },
    floatingButton: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: '#fff'
    }
});

export default BadgerChatroomScreen;