# Pro Intern

## Overview

**Pro Intern** is a mobile application designed to help students find and apply for internships easily. The app provides a user-friendly interface for students to create profiles, explore internship opportunities, and apply based on their preferences and qualifications.

## Features

- Role-based authentication for **Professionals** and **Interns**
- Separate login and registration processes for both user types
- Searchable dropdown for Sri Lankan districts
- Ability to upload and manage profile pictures
- Full name field in the registration process
- User-specific dashboard for managing internship applications
- Built with **React Native Expo** and **Firebase**

## Technology Stack

- ![React Native](https://img.shields.io/badge/Frontend-React%20Native%20(Expo)-61DAFB?logo=react)  
- ![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?logo=firebase)  
- ![Poppins](https://img.shields.io/badge/Font-Poppins-000000?logo=googlefonts)  
- ![Ionicons](https://img.shields.io/badge/Icons-Ionicons-lightgrey?logo=ionic)  
- ![AsyncStorage](https://img.shields.io/badge/Storage-AsyncStorage-blue?logo=datastax)  


## Installation

To run the app locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/yourusername/pro-intern.git
```
2. Install dependencies:
```
npm install
```
3. Start the Expo server:
```
expo start
```

## Key Components

- **Intern_Recruit**: Component for registering interns with searchable district dropdown.
- **ProfilePic_Recruit**: Allows users to upload or skip uploading their profile pictures.
- **BlindHome**: For the blind user interface of the app.
- **Onboarding1.js**: First onboarding screen introducing the app.
- **Settings**: Contains app settings with custom font (Poppins).

## How to Use

1. **Registration**: Register as either an intern or a professional.
   - **Interns**: Provide personal information and choose a profile picture.
   - **Professionals**: Enter relevant details about professional experience.

2. **Login**: Authenticate using email and password.

3. **Dashboard**:
   - View available internships.
   - Apply for internships that match your skills.

## Custom Fonts

- The app uses **Poppins-Regular** and **Poppins-SemiBold** for text styling.
- To load the fonts, they are pre-configured in `App.js` using Expo's font loader.

## Role Management

- Roles are managed using **AsyncStorage**, and the app has separate flows for **recruits** and **interns**.

## Future Enhancements

- Networking feature to connect professionals and interns.
- Advanced filters for internship search.
- In-app notifications for new internship openings.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
