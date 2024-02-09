import { TabProps } from "@/components/utils/ui/Tabs";
import { PropsWithChildren, createContext, use, useState } from "react";

interface TabContext {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}
export const tabContext = createContext<TabContext | null>(null);
export function TabsProvider({ children }: PropsWithChildren) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <tabContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </tabContext.Provider>
  );
}
