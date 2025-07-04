# Weekly Timesheet Tracker

A modern, minimalist web application for tracking daily work hours with Google Drive integration and elegant pastel design.

## ✨ Features

- **Easy Time Logging**: One-click buttons for Clock In, Lunch Out, Lunch In, and Clock Out
- **Google Drive Integration**: Sign in with Google to sync your data across devices
- **Weekly Overview**: View your entire week's schedule in a clean table format
- **Real-time Calculations**: Automatic calculation of daily and weekly hours
- **Cloud Sync**: All data automatically saved to Google Drive when signed in
- **Local Storage Fallback**: Works offline with browser storage when not signed in
- **Export Functionality**: Export your timesheet data as JSON
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Minimalist UI**: Clean, elegant design with pastel colors

## 🔐 Authentication

- **Google Sign-In**: Secure authentication with your Google account
- **Cross-Device Sync**: Access your timesheet from any device
- **Privacy**: Data is stored in your personal Google Drive
- **Optional**: App works without signing in using local storage

## 🚀 How to Use

1. **Sign In (Optional)**: Click "Sign in with Google" to sync data across devices
2. **Clock In**: Click the "Clock In" button when you start work
3. **Lunch Break**: Use "Lunch Out" and "Lunch In" buttons to track your break
4. **Clock Out**: Click "Clock Out" when you finish work
5. **View Summary**: Check your daily and weekly hours in the summary cards
6. **Export Data**: Use the "Export Data" button to download your timesheet

## 🔧 Setup for Google Drive Integration

1. **For Users**: The app works immediately with local storage. Sign in with Google for cloud sync.

2. **For Developers**: See `GOOGLE_API_SETUP.md` for Google API configuration instructions.

## 📱 Features

- **Smart Calculations**: Automatically calculates total hours excluding lunch breaks
- **Weekly Table View**: See all your time entries organized by day
- **Recent Entries Log**: Quick view of your last 10 time entries
- **Data Export**: Download your timesheet data as JSON
- **Clear Data Option**: Reset all data when needed
- **Cloud Backup**: Automatic sync with Google Drive when signed in

## GitHub Pages Deployment

This site is designed to be deployed on GitHub Pages. Simply push to your repository and enable GitHub Pages in the repository settings.

## Browser Compatibility

Works in all modern browsers that support:
- Local Storage
- ES6 JavaScript features
- CSS Grid and Flexbox

## 🌐 Data Storage

- **With Google Sign-In**: Data is securely stored in your Google Drive
- **Without Sign-In**: Data is stored locally in your browser using localStorage
- **Privacy**: No data is sent to external servers (except Google Drive when signed in)
- **Sync**: Automatic synchronization across all your devices when signed in

## 🎨 Design

- **Minimalist**: Clean, uncluttered interface
- **Pastel Colors**: Soft, elegant color palette
- **Responsive**: Works perfectly on all screen sizes
- **Modern**: Contemporary design with smooth animations

## 🔒 Security

- **OAuth 2.0**: Secure Google authentication
- **Encrypted**: All data transmission is encrypted
- **Private**: Data stays in your personal Google Drive
- **No Tracking**: No analytics or user tracking

## 🚀 Future Enhancements

- **Multi-Project Support**: Track time for different projects
- **Advanced Reports**: Detailed analytics and reports
- **CSV Export**: Export in multiple formats
- **Time Editing**: Edit existing time entries
- **Dark Mode**: Toggle between light and dark themes
- **Calendar Integration**: Sync with Google Calendar
- **Team Features**: Share timesheets with team members
- **Mobile App**: Native mobile applications