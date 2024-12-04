# Pro Intern

## Overview

**Pro Intern** is a mobile application designed to help students find and apply for internships easily while enabling recruiters to create and manage internships. The app provides a user-friendly interface for students to organize their tasks, maintain a journal, and advance their careers seamlessly.

## Features  

### Role-based Authentication  
- Separate login and registration processes for Interns and Recruiters.  

### For Interns:  
- **Search and Apply for Internships**: Discover opportunities and apply based on preferences and qualifications.  
- **Task Manager**: Organize academic and work-related tasks.  
- **Journal**: Plan, reflect, and track progress through a dedicated journal.  

### For Recruiters:  
- **Create and Manage Internships**: Easily post and manage internship opportunities with relevant details.  

### Additional Features:  
- Searchable dropdown for selecting Sri Lankan districts.  
- Profile picture upload (optional).  
- User-specific dashboards to manage applications and internships.  

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

## How to Use  

### Registration  
- **Interns**: Provide personal information and upload a profile picture (optional).  
- **Recruiters**: Enter relevant details about their organization and experience.  

### Login  
- Authenticate using your registered email and password.  

### For Interns:  
- Explore internships via the dashboard.  
- Apply for opportunities that match your qualifications.  
- Use the Task Manager to stay organized.  
- Maintain a Journal to track your progress.  

### For Recruiters:  
- Create internships with details like title, location, and requirements.  
- Manage applications from interested interns.  

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
