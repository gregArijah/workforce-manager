'use client'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

interface Session {
  user: {
    name: string;
    sub: string;
    userRole: string;
    iat: number;
    exp: number;
    jti: string;
  };
}

export default function SessionInfo() {
  const {data: session, status}= useSession();

  return {session:session?.user,loading:status=="loading"} || null;
}

