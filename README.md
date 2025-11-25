BadgerChat Mobile — React Native Chat Application

BadgerChat Mobile is a cross-platform chat application built with React Native and Expo.
It enables users to browse chatrooms, view message history, and communicate through a clean, card-based mobile interface.

This project was completed as part of the CS 571 Mobile Development course at the University of Wisconsin–Madison.

------------------------------------------------------------
Features
------------------------------------------------------------
- Multi-screen mobile navigation using React Navigation
- Landing experience for guest users and registered users
- Full authentication flow: register, login, guest access, logout
- Chatroom list page with card-style layout
- Conversation screen with message history and timestamps
- Message components with username, time, and content
- Client-side state management and backend API integration
- Mobile-friendly UI built with React Native Paper

------------------------------------------------------------
Tech Stack
------------------------------------------------------------
- React Native (Expo)
- React Navigation
- React Native Paper
- JavaScript (ES6+)
- Expo toolchain for iOS, Android, and Web

------------------------------------------------------------
Project Structure
------------------------------------------------------------
App.js  
Initializes navigation and the root application.

src/components/BadgerChat.jsx  
Top-level component connecting screens and app logic.

src/components/helper/BadgerCard.jsx  
Reusable card UI component.

src/components/helper/BadgerChatMessage.jsx  
Message bubble component.

src/components/screens/  
BadgerLandingScreen.jsx — Entry screen  
BadgerGuestScreen.jsx — Guest access flow  
BadgerLoginScreen.jsx — User login  
BadgerRegisterScreen.jsx — Account registration  
BadgerChatroomScreen.jsx — Chatroom directory  
BadgerConversationScreen.jsx — Conversation interface  
BadgerLogoutScreen.jsx — Logout handler

_figures/  
Documentation images and screenshots.

assets/  
App icons and Expo splash screen resources.

------------------------------------------------------------
How to Run the App
------------------------------------------------------------
1. Install Node.js, npm, and Expo CLI.

2. Clone the repository:
   git clone https://github.com/JasonYang1203/badger-chat-mobile.git
   cd badger-chat-mobile

3. Install dependencies:
   npm install

4. Start the Expo development server:
   npm start

5. Choose a platform:
   - Press "i" for iOS Simulator
   - Press "a" for Android Emulator
   - Press "w" for web preview
   - Or scan the QR code using the Expo Go mobile app

------------------------------------------------------------
My Role and Contributions
------------------------------------------------------------
I was responsible for:
- Designing and implementing the full navigation system (stack and screen navigation)
- Building all application screens: landing, guest, login, registration, chatrooms, conversation, and logout
- Creating reusable UI components such as BadgerCard and BadgerChatMessage
- Managing client-side authentication and chatroom state
- Integrating the application with the BadgerChat backend API
- Implementing responsive, mobile-friendly UI using React Native and React Native Paper

This project demonstrates my capabilities in mobile development, multi-screen architecture, reusable component design, and frontend API integration.

------------------------------------------------------------
Learning Outcomes
------------------------------------------------------------
Through this project, I strengthened my skills in:
- Cross-platform development with React Native and Expo
- Mobile navigation and multi-screen app architecture
- Designing reusable UI components
- Handling asynchronous API requests and updating UI state
- Debugging and completing an end-to-end mobile app workflow

------------------------------------------------------------
License
------------------------------------------------------------
MIT License
