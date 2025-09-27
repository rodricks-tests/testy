"use client";
import AccountPage from "@/components/ui/AccountPage";
import { useAuth } from "@/contexts/AuthContext";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const {user} = useAuth();
  return <div>User ID: {id}
  
  <AccountPage user={user}/>
  </div>;
};
export default page;