// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  userTasksApiUrl: '',
  endpoints: { 
    GetTasks: '/UserTasks/GetTasks', 
    GetTaskByTitle: '/UserTasks/GetTasksByTitle', 
    CreateTask: '/UserTasks/CreateTask', 
    CheckTitle: '/UserTasks/CheckTitle',
    GetTaskTypes: '/UserTaskTypes/GetTaskTypes',
  },
  errorMessages: {
    0: 'Network or client side error',
    404: 'The item was not found',
    500: 'Internal server error. Please try again later',
  } as { [key: number]: string },
  defaultErrorMessage: 'An unexpected error occurred',
  responseDelay: 1500,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
