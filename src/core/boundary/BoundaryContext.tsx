import {createContext, useContext} from "react";
import {Boundary} from "./boundary";

const Context = createContext<Boundary>(null as any);

export const BoundaryProvider = ({ value, children }: { value: Boundary, children: React.ReactNode }) => {
  return <Context.Provider value={value}> {children} </Context.Provider>
}

export const useBoundary = () => useContext(Context)