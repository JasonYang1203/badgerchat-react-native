import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerGuestScreen from './screens/BadgerGuestScreen';


const ChatDrawer = createDrawerNavigator(); // Create a drawer navigator

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false) // State to track if the user is logged in
  const [isRegistering, setIsRegistering] = useState(false); // State to track if the user is registering
  const [chatrooms, setChatrooms] = useState([]); // State to store chatrooms
  const [isGuest, setIsGuest] = useState(false); // State to track if the user is a guest

  // Load chatrooms when the component mounts
  useEffect(() => {
    // Function to load chatrooms
    async function loadChatrooms() {
        const token = await SecureStore.getItemAsync("token"); // Get the token from SecureStore
        const res = await fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/chatrooms", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-CS571-ID": "bid_bc69ed46c77aa7b48b9f05b514a9558c980d9921773473356ef62094c5746503"
            }
        });
        const data = await res.json();
        setChatrooms(data);
    }
    loadChatrooms();
}, []);

  // Function to handle login
  function handleLogin(username, pin) {
    // hmm... maybe this is helpful!
    setIsLoggedIn(true); // I should really do a fetch to login first!
  }

  // Function to handle signup
  function handleSignup(username, pin) {
    setIsGuest(false);
    setIsRegistering(false);
    setIsLoggedIn(true); // I should really do a fetch to register first!
  }

  // Function to handle guest login
  function handleGuest() {
    setIsGuest(true);
  }


  // Function to handle logout
  if (isLoggedIn) { // Logged in user
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Logout">
            {(props) => <BadgerLogoutScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </ChatDrawer.Screen>
          
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isGuest && !isRegistering) { // Guest user
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => (
              <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isGuest={true} />}
              </ChatDrawer.Screen>
            ))
          }
          <ChatDrawer.Screen name="Signup">
            {(props) => <BadgerGuestScreen {...props} setIsRegistering={setIsRegistering} />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) { // Registering user
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else { // Login screen
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} handleGuest={handleGuest} />
  }
}