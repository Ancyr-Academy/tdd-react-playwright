import {act, render} from "@testing-library/react";
import React from "react";
import {vi} from "vitest";

import {Boundary} from "../../core/boundary/boundary";
import {BoundaryProvider} from "../../core/boundary/BoundaryContext";

export class PageTester {
  private container: HTMLElement | null = null;
  private boundary: Boundary;

  constructor(config?: {
    boundary?: Partial<Boundary>
  }) {
    this.boundary = {
      fetchTodos: vi.fn(),
      ...config?.boundary
    }
  }

  async render(page: React.ReactElement) {
    await act(async () => {
      const result = render(
        <BoundaryProvider value={this.boundary}>
          {page}
        </BoundaryProvider>
      );
      this.container = result.container;
    })
  }

  getContainer() {
    return this.container!;
  }

  findByTestId(id: string) {
    const element = this.container!.querySelector(`[data-testid="${id}"]`);
    if (!element) {
      return null;
    }

    return new PageElement(element as HTMLElement);
  }
}

class PageElement {
  constructor(private readonly element: HTMLElement) {}

  hasContent(content: string) {
    return this.element.textContent === content;
  }
}
