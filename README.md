# LeoVegasUK Native Candidate Task

This is a butchered version of an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Fire up the app for details of the test task 🦁

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Add the explaination of your changes here 🦁

#### 1 - After installing project dependencies i have tried to run the mobile app and got several warnings related to Expo version mismatches,

Warnings -

```
The following packages should be updated for best compatibility with the installed expo version:
expo@52.0.40 - expected version: ~52.0.46
expo-router@4.0.19 - expected version: ~4.0.21
expo-splash-screen@0.29.22 - expected version: ~0.29.24
expo-system-ui@4.0.8 - expected version: ~4.0.9
react-native@0.76.7 - expected version: 0.76.9
Your project may not work correctly until you install the expected versions of the packages.
```

This will lead to bugs, build failures, or unexpected behavior in future so i decided to upgrade the listed dependencies to match the expected versions.

#### 2 - After successfully running the app, I explored the available screens. While switching to the Task tab i got the following warning in the terminal,

```
VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.
```

This warning happened because the app was using nested scrollable views, outer scrollable view coming from ParallaxScrollView and the inner scrollable view was FlatList, which is itself virtualized scroll container. To fix the issue i have refactored the code, FlatList as the only scrollable container and moved ParallaxScrollView (with the TextInput) into FlatList by using its ListHeaderComponent.
