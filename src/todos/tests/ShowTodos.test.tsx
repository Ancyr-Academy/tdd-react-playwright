import {test, expect, vi } from "vitest";
import {TodosPage} from "../pages/TodosPage";
import {Todo} from "../model/todo";
import {PageTester} from "../../shared-kernel/tests/page-tester";

const buyMilk : Todo = {
  id: '1',
  title: 'Buy milk',
  completed: false
}

const buyEggs : Todo = {
  id: '2',
  title: 'Buy eggs',
  completed: false
}

test('showing one todo', async () => {
  const fetchTodos = vi.fn().mockResolvedValue([buyMilk]);

  const pageTester = new PageTester({
    boundary: {
      fetchTodos
    }
  });
  await pageTester.render(<TodosPage />);

  const element = pageTester.findByTestId(`todo-${buyMilk.id}-title`);
  expect(element).not.toBeNull();
  expect(element!.hasContent(buyMilk.title)).toBe(true);
});


test('loading the todos from the API', async () => {
  const fetchTodos = vi.fn().mockResolvedValue([buyMilk]);
  const pageTester = new PageTester({
    boundary: {
      fetchTodos
    }
  });
  await pageTester.render(<TodosPage />);

  expect(fetchTodos).toHaveBeenCalledOnce();
});

test('showing many todos', async () => {
  const todos : Todo[] = [buyMilk, buyEggs];
  const fetchTodos = vi.fn().mockResolvedValue(todos);

  const pageTester = new PageTester({
    boundary: {
      fetchTodos
    }
  });

  await pageTester.render(<TodosPage />);

  const todoElement = pageTester.findByTestId(`todo-${buyMilk.id}-title`);
  expect(todoElement).not.toBeNull();
  expect(todoElement!.hasContent(buyMilk.title)).toBe(true);

  const todoElement2 = pageTester.findByTestId(`todo-${buyEggs.id}-title`);
  expect(todoElement2).not.toBeNull();
  expect(todoElement2!.hasContent(buyEggs.title)).toBe(true);
})