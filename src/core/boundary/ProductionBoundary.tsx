"use client"

import {BoundaryProvider} from "./BoundaryContext";
import React from "react";
import axios from "axios";

export const ProductionBoundary = ({ children } : { children: React.ReactNode }) => {
  return <BoundaryProvider value={{
    fetchTodos: async () => {
      const result = await axios.get("https://monapi.com/todos/list-todos");
      return result.data;
    }
  }}>
    {children}
  </BoundaryProvider>
}