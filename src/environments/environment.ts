// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APP_NAME: "Management Portal v2",
  API_URL: "http://127.0.0.1:8000/api",
  LOCAL_STORAGE_KEY: "N15/GMd/rvEnSnYAl0Zx7yN1ZdMpKuqdJSWQckkzpbo=",
  SESSION_TIMEOUT: 3600,
  SESSION_TIMEOUT_COUNTDOWN: 60
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
