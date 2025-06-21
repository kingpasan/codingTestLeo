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

#### 3 - While reviewing the layout structure, I noticed that the app did not use SafeAreaView,

which is important for avoiding UI overlap with device-specific areas like the notch, status bar, and home indicator, especially on iOS devices. Without it, certain elements were visually too close to or clipped by the system UI. To improve layout safety and consistency across devices, I wrapped the ParallaxScrollView content with SafeAreaView from react-native-safe-area-context. This ensures that all screens respect platform-specific safe areas, resulting in a better and more polished user experience.

#### 4 - I was wrong about #2, and I realized the UI was not working as expected; especially the ParallaxScrollView in the Task screen.

So I created a separate component for FlatList called ParallaxFlatList, and moved the SearchBar and animated header into the ListHeaderComponent. This allowed the parallax effect to work correctly while still keeping FlatList as the main scrollable container, resolving the original warning without breaking the UI.

#### 5 - I have added local filtering logic for the user search functionality.

Since the current data set retrieved from the API is relatively small, I decided to perform the filtering on the client side using JavaScript’s native array filter method. However, if the expected outcome is a large data set (such as thousands of users), this approach will not be scalable or performant. In that case, the filtering logic should be moved to the backend, and the app should query the API with search parameters (e.g., /users?search=Pasan). This change would improve performance and reduce memory usage by only fetching relevant results directly from the server.

#### 6 - Improved performance and UI structure with modular reusable components

To keep the codebase clean and maintainable, I split the logic and UI into smaller, focused components. For example:

- UserCard – displays user info in list view
- DetailsCard – shows user details in modal view
- DialogModal – generic modal wrapper for reuse
- ParallaxFlatList – scrollable list with animated header
- SearchBar – input with icons and clear functionality

This structure improves readability, encourages reuse, and helps isolate logic for testing and scaling.

#### 7 - Added loading, error, and refresh states to improve UX

I added proper user feedback during network interactions:

- Loading: A loading spinner and message are displayed while fetching users.
- Error: If the fetch fails, a message with a retry button is shown.
- Pull to refresh: FlatList now supports pull-to-refresh via onRefresh and refreshing props.

These states improve the overall experience and help users understand what’s happening.

#### 8 - Optimized component performance using useCallback and useMemo

To reduce unnecessary re-renders and improve runtime performance, I memoized functions like openDialog, closeDialog, loadUsers, and onRefresh using useCallback.The filtered list of users is memoized with useMemo.Static components like SearchBar and IconSymbol were optimized by avoiding prop changes unless necessary. This keeps the UI responsive even with larger datasets.

#### 9 - Improved type safety with TypeScript

Throughout the app, I improved type usage by:

- Defining clear and consistent types (User, UserCardProps, etc.)
- Using generics with components like ParallaxFlatList<T>
- Adding fallback checks (e.g., if (!user) return null)

These changes help prevent runtime errors and make the code easier to work with in teams or at scale.

#### 10 - Consistent UI spacing and theme usage

I refined the layout styling to:

- Respect spacing and padding across platforms
- Use consistent colors, font sizes, and alignments
- Apply SafeAreaView, margins, and gap where appropriate

The result is a cleaner, platform-consistent look that feels more polished and reliable across different screen sizes.
