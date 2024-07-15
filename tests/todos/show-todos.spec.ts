import {expect, Page, test} from "@playwright/test";
import {Todo} from "../../src/todos/model/todo";

class ShowTodosFixture {
  constructor(private readonly page: Page) {}

  async prepareTodos(todos: Todo[]) {
    await this.page.route('**/todos/list-todos', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify(todos),
      });
    });
  }

  async loadPage() {
    await this.page.goto('/');
  }

  async expectTodo(todo: Todo) {
    const block = this.page.getByTestId(`todo-${todo.id}-title`);
    await block.waitFor();

    const text = await block.innerText()
    expect(text).toBe(todo.title);
  }
}

test('show all the todos', async ({ page }) => {
  const fixture = new ShowTodosFixture(page);
  await fixture.prepareTodos([{
    id: "1",
    title: "Buy milk",
    completed: false,
  }, {
    id: "2",
    title: "Buy eggs",
    completed: true,
  }]);
  await fixture.loadPage();
  await fixture.expectTodo({
    id: "1",
    title: "Buy milk",
    completed: false,
  });
  await fixture.expectTodo({
    id: "2",
    title: "Buy eggs",
    completed: true,
  });
})