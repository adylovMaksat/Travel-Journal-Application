# Travel Journal Mobile Application

A modern mobile application that allows users to save and organize their travel memories.

Built with React Native and Expo.

---
## Developers

- 1. Maksatbek Adylov - 56422
- 2. Omurbek Uraimov - 54167

Course Project – Mobile Application Development

## Features

### Home Screen
- View recently added trips
- Personalized greeting with profile picture
- Quick access to trip details
- Modern and clean UI

### Add Entry
- Add a new travel journal entry
- Upload travel photos from gallery
- Add trip title
- Add notes and descriptions
- Enter travel location manually
- Automatically save travel date

### My Trips
- View all saved trips
- Trips are sorted from newest to oldest
- See trip image, location and date
- Open detailed trip information
- Search saved trips

### Trip Details
- Large trip image preview
- Travel date
- Travel location
- Notes and memories
- Delete trip with confirmation dialog

### Profile
- Edit personal information
- Upload profile picture
- Remove profile picture
- Save profile information locally

### Local Storage
- Journal entries remain saved after restarting the app
- Profile information is stored locally using AsyncStorage

---

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Image Picker
- AsyncStorage
- Expo Fonts
- Montserrat Font

---

## Project Structure

```
src
│
├── context
│   └── JournalContext.js
│
├── screens
│   ├── HomeScreen.tsx
│   ├── AddEntryScreen.tsx
│   ├── ListScreen.tsx
│   ├── DetailsScreen.tsx
│   └── ProfileScreen.tsx
│   └── EditEntryScreen.tsx
│
└── assets
```

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/travel-journal.git
```

### 2. Open Project

```bash
cd travel-journal
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Application

```bash
npx expo start
```

### 5. Run on Mobile

- Install Expo Go
- Scan QR Code
- Launch application

---

## Screens

- Home Screen
- My Trips Screen
- Add Entry Screen
- Details Screen
- Profile Screen

---

## Project Goal

The goal of this project is to provide travelers with a simple and user-friendly way to record travel experiences, organize memories, and store photos and notes in one place.

<img width="591" height="1280" alt="photo_2026-06-19_15-30-13" src="https://github.com/user-attachments/assets/3025d5c2-93a1-47dc-a896-8c1bbb878da0" />
<img width="591" height="1280" alt="photo_2026-06-19_15-30-07" src="https://github.com/user-attachments/assets/96a21b99-6ac6-4767-a637-fb134a0bf581" />
<img width="591" height="1280" alt="photo_2026-06-19_15-30-02" src="https://github.com/user-attachments/assets/b826d6b4-a5fa-4cde-ba80-509a1bb34fe4" />
<img width="591" height="1280" alt="photo_2026-06-19_15-29-57" src="https://github.com/user-attachments/assets/a627aa85-fdee-4012-b2ff-1d654f50e044" />
<img width="591" height="1280" alt="photo_2026-06-19_15-29-49" src="https://github.com/user-attachments/assets/99b8554b-572a-4d0b-8551-20a4385e369b" />


