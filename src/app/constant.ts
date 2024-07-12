export const API_ENDPOINTS = {
    GET_TODOS: 'http://localhost:3000/todos',
    CREATE_TODO: 'http://localhost:3000/todos',
    UPDATE_TODO: (Id: number) => `http://localhost:3000/todos/edit/${Id}`,
    DELETE_TODO: (Id: number) => `http://localhost:3000/todos/delete/${Id}`
  };
  