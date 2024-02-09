import { Tabs, Tab } from "../utils/ui/Tabs";
import { AnotherTest, Test } from "../utils/ui/Test";

export default function ProfileInfo() {
  return (
    <>
      <Tabs className="">
        <Tab label="wow a working tab" index={0}>
          <Test />
        </Tab>
        <Tab label="wow a working another tab" index={1}>
          <AnotherTest />
        </Tab>
      </Tabs>
      <div>
        <h2 className="text-xl font-semibold mb-4">Profile Read Chapters</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">novel1</li>
          <li className="mb-2">novel2</li>
          <li className="mb-2">novel3</li>
        </ul>
      </div>
    </>
  );
}
