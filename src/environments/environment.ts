/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC68rEgLxEW1sVzTn1MHRvPkADQbp4M6CA",
   authDomain: "hector-beverages-c32a0.firebaseapp.com",
   databaseURL: "https://hector-beverages-c32a0.firebaseio.com",
   projectId: "hector-beverages-c32a0",
   storageBucket: "hector-beverages-c32a0.appspot.com",
   messagingSenderId: "312678603657",
   appId: "1:312678603657:web:7107e5e0596d5279b4df58",
   measurementId: "G-6NLQJ52QQ6"
  },
  API_URL: '/api_dev',
  MAP_API : 'AIzaSyAKdOQTo8TQJ6x3QwmK3TfZpt49Xek81KM'
};
