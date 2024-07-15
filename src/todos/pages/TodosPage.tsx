import {Todo} from "../model/todo";
import {useEffect, useState} from "react";
import {useBoundary} from "../../core/boundary/BoundaryContext";

export const TodosPage = () => {
  const boundary = useBoundary();
  const [state, setState]  = useState<Todo[]>([]);

  useEffect(() => {
    async function work() {
      const todos = await boundary.fetchTodos();
      setState(todos);
    }

    work();
  }, []);

  return <main>
    {state.map(todo => (
      <div key={todo.id} data-testid={`todo-${todo.id}-title`}>{todo.title}</div>
    ))}
  </main>
}