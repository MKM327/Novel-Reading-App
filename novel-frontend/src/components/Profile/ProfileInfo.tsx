
export default function ProfileInfo() {
    
    return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4">Favorite Novels</h2>
        <ul className="pl-6"></ul>
      </div>
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
