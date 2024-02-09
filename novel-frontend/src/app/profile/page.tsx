import { serverAPI } from "@/lib/exports";
import { auth } from "../api/auth/[...nextauth]/auth";
import ProfileInfo from "@/components/Profile/ProfileInfo";

export default async function Profile() {
  const session = await auth();
  // let api = await serverAPI();
  // // let response = await api.get("/profile/favorites");
  // // console.log(response.data);
  const user = session?.user;
  return (
    <div className="bg-gray-800 text-white h-full">
      <div className="container mx-auto p-8">
        <div className="bg-gray-900 p-8 rounded-lg shadow-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold">{user?.username}</h1>
          </div>
          <ProfileInfo />
        </div>
      </div>
    </div>
  );
}
