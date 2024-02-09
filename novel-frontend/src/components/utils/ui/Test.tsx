"use client";

import { tabContext } from "@/contexts/TabContext";
import { useContext } from "react";
export function AnotherTest() {
  return <div>Another Test</div>;
}
export function Test() {
  const context = useContext(tabContext);
  return <div>testComponent</div>;
}
