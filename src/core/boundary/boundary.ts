import {Todo} from "../../todos/model/todo";

export type Boundary = {
  fetchTodos: () => Promise<Todo[]>
  redirect: () => {}
  showSuccess: () => {}
  showError: () => {}
}