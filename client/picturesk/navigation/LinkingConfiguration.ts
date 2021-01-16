import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Explore: {
            screens: {
              TabExploreScreen: 'Explore',
            },
          },
          Camera: {
            screens: {
              TabCameraScreen: 'Camera',
            },
          },
          Profile: {
            screens: {
              TabProfileScreen: 'Profile',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
