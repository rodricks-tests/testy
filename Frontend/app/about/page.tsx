'use client'
import CustomFeedback from "@/components/feedback/CustomFeedback";
import Hero from "@/components/ui/Hero";
import Navbar from "@/components/ui/Navbar";
import { useRouter } from "next/navigation";


export default function AboutPage() {
    const router = useRouter();
  

  return (
  <div>
    <Navbar router={router}/>
    <Hero/>
    <CustomFeedback/>
    </div>
    );
}
