# BancoXYZ - Mobile Banking Application 🏦

A modern React Native banking application built with Expo, featuring secure authentication, balance tracking, and international money transfers.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Configuration](#configuration)
- [API Integration](#api-integration)
- [Security](#security)
- [Internationalization](#internationalization)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication** - Secure login with email and password
- **Balance Management** - Real-time account balance display with multi-currency support
- **Transaction History** - Searchable and filterable transaction list
- **Money Transfers** - Send money internationally with date scheduling
- **Secure Storage** - Encrypted token storage using Expo Secure Store
- **Multi-language Support** - English, Spanish, and Portuguese localization
- **Date Filtering** - Filter transactions by date range
- **Loading States** - User-friendly loading indicators for async operations
- **Error Handling** - Comprehensive error messages and validation

## 🛠 Tech Stack

### Frontend
- **React Native** (0.81.5) - Cross-platform mobile development
- **Expo** (54.0.20) - React Native development platform
- **TypeScript** - Type-safe development
- **React Navigation** (7.2.2) - Navigation stack management

### State Management & API
- **React Hooks** - Custom hooks for data fetching and transactions
- **Axios** (1.14.0) - HTTP client for API calls
- **i18n-js** (4.5.3) - Internationalization library

### Security
- **Expo Secure Store** (15.0.8) - Encrypted credential storage

### Testing
- **Jest** (30.3.0) - Testing framework
- **@testing-library/react-native** (13.3.3) - React component testing utilities
- **Babel** (7.29.0) - JavaScript transpiler with Flow support

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Metro** - React Native bundler

## 📦 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Android Studio (for Android development)
- Xcode (for iOS development)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/BancoXYZ.git
   cd BancoXYZ
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI** (if not already installed)
   ```bash
   npm install -g expo-cli
   ```

## 🎯 Getting Started

### Development Mode

Start the development server:
```bash
npm start
```

Or use specific platform commands:
```bash
npm run android    # Start on Android emulator
npm run ios        # Start on iOS simulator
npm run web        # Start on web browser
```

### Running the App

From the Expo output, you can:
- Press `a` to open Android emulator
- Press `i` to open iOS simulator
- Press `w` to open web browser
- Scan QR code with Expo Go app

### Development Build

Create a development build for testing:
```bash
eas build --platform android --profile preview
eas build --platform ios --profile preview
```

## 📁 Project Structure

```
BancoXYZ/
├── app/
│   ├── components/           # Reusable UI components
│   │   └── BalanceView.tsx   # Balance display component
│   ├── context/              # React Context providers
│   │   └── AuthContext.tsx   # Authentication context
│   ├── hooks/                # Custom React hooks
│   │   ├── useBalanceData.js # Balance data fetching
│   │   └── doTransactions.js # Transaction execution
│   ├── pages/                # Screen components
│   │   ├── Login.tsx         # Login screen
│   │   ├── Home.tsx          # Home/navigator
│   │   ├── Balance.tsx       # Balance screen
│   │   └── Transfer.tsx      # Transfer screen
│   ├── services/             # API services
│   │   └── apis.js           # API endpoints
│   ├── constants/            # Application constants
│   │   └── colors.js         # Color palette
│   └── pages/*.test.js       # Test files
├── i18n/                     # Internationalization
│   ├── index.js              # i18n configuration
│   └── locales/              # Language files
│       ├── en.json           # English
│       ├── es.json           # Spanish
│       └── pt-BR.json        # Portuguese (Brazil)
├── __mocks__/                # Jest mocks
│   ├── react-native.js       # React Native mock
│   └── fileMock.js           # File/image mock
├── jest.config.js            # Jest configuration
├── jest.setup.js             # Jest setup
├── babel.config.js           # Babel configuration
├── App.js                    # Main app component
├── index.js                  # Entry point
└── package.json              # Dependencies
```

## 📝 Available Scripts

```bash
npm start          # Start development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web browser
npm test           # Run all tests
npm run lint       # Run ESLint
npm run reset-project  # Reset to blank state
```

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

### Run Specific Test File
```bash
npm test app/pages/Login.test.js
```

### Test Coverage
```bash
npm test -- --coverage
```

### Test Files

The project includes comprehensive tests for:
- ✅ Pages (Login, Home, Balance, Transfer) - 20 tests
- ✅ Components (BalanceView) - 9 tests
- ✅ Context (AuthContext) - 5 tests
- ✅ Services (APIs) - 14 tests
- ✅ Hooks (useBalanceData, doTransactions) - 23 tests

**Total: 68 tests passing**

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_API_URL=https://your-api-url.com
```

### API Configuration

Update API endpoints in `app/services/apis.js`:
```javascript
export const API_URL = "https://your-api-url.com";
```

### Theme Configuration

Customize colors in `app/constants/colors.js`:
```javascript
export const COLORS = {
  primary: "#007AFF",
  background: "#FFFFFF",
  // ... more colors
};
```

## 🔌 API Integration

### Authentication Endpoints

- **Login**: `POST /default/login`
  - Body: `{ email: string, password: string }`
  - Response: `{ token: string }`

### Account Endpoints

- **Get Balance**: `GET /default/balance`
  - Response: `{ accountBalance: string, currency: string }`

- **Get Transactions**: `GET /default/transferList`
  - Response: `{ transfers: Transaction[] }`

### Transfer Endpoints

- **Execute Transfer**: `POST /default/transfer`
  - Body: `{ value: number, currency: string, payeerDocument: string, transferDate: string }`
  - Response: `{ success: boolean, transactionId: string }`

## 🔐 Security

### Best Practices Implemented

1. **Token Storage** - JWT tokens stored in Expo Secure Store (encrypted)
2. **Authorization Headers** - Tokens sent in `Authorization: Bearer <token>` header
3. **HTTPS** - All API calls use HTTPS
4. **Error Handling** - Sensitive errors not exposed to users
5. **Input Validation** - Form validation before API calls
6. **Logout** - Secure token deletion on logout

### Secure Authentication Flow

```
Login → Validate credentials → Receive token → Store encrypted token
↓
App Init → Check stored token → Restore session → Maintain auth state
↓
Logout → Delete token → Clear headers → Return to login
```

## 🌍 Internationalization

Supported languages:
- 🇺🇸 English (en)
- 🇪🇸 Spanish (es)
- 🇧🇷 Portuguese (pt-BR)

Add new translations in `app/locales/<language>.json`

Example:
```json
{
  "welcome": "Welcome",
  "login": "Login",
  "balance": "Balance"
}
```


## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Jest Testing Guide](https://jestjs.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or support, please contact: support@bancoxyz.com

---

**Last Updated**: April 2, 2026  
**Version**: 1.0.0

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
