"use client";
import { TabsProvider, tabContext } from "@/contexts/TabContext";
import { useTabContext } from "@/hooks/useTabContext";
import { Children, PropsWithChildren, ReactElement, useContext } from "react";
import Button from "./Button";
import TabLabelWrapper from "./TabLabel";
export interface TabProps extends PropsWithChildren {
  label: string;
  index: number;
}
interface TabsProps extends PropsWithChildren {
  className?: string;
}
export function Tab(props: TabProps) {
  const { children, index } = props;
  const { activeIndex } = useTabContext();
  return index == activeIndex && <>{children}</>;
}
function TabLabel({ label, index }: { label: string; index: number }) {
  const { activeIndex, setActiveIndex } = useTabContext();
  return (
    <Button
      onClick={() => {
        setActiveIndex(index);
      }}
      className={`bg-transparent  ${
        activeIndex == index ? "border-b" : "border-transparent border"
      } rounded-none hover:bg-gray-800`}
    >
      {label}
    </Button>
  );
}
function TabsWrapper({ children, className }: TabsProps) {
  const allLabels = Children.toArray(children) as ReactElement[];
  return (
    <>
      <TabLabelWrapper className={className}>
        {allLabels.map((tab, index) => {
          return (
            <TabLabel
              key={index}
              index={tab.props.index}
              label={tab.props.label}
            />
          );
        })}
      </TabLabelWrapper>
      {children}
    </>
  );
}
export function Tabs({ children, className }: TabsProps) {
  return (
    <TabsProvider>
      <TabsWrapper className={className}>{children}</TabsWrapper>
    </TabsProvider>
  );
}
