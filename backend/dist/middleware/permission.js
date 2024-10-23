"use strict";
const methodToAction = {
    GET: 'read',
    POST: 'create',
    PUT: 'update',
    DELETE: 'deleted'
};
// const Permissions = {
//       users: ['create', 'read', 'update', 'delete', 'changeRole'],
//       projects: ['create', 'read', 'update', 'delete'],
//       tasks: ['create', 'read', 'update', 'delete'],
//     },
//     manager: {
//       users: ['create', 'read', 'update', 'delete'],
//       projects: ['create', 'read', 'update', 'delete'],
//       tasks: ['create', 'read', 'update', 'delete'],
//     },
//     supervisor: {
//       users: ['superviseTasks'],
//       logs: ['readLog'],
//     },
//     employee: {
//       projects: ['create', 'update'],
//       tasks: ['create', 'update'],
//     },
//     guest: {
//       projects: ['read'],
//       tasks: ['read'],
//     }
//   };
