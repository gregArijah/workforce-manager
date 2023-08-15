'use client';

import { useSession } from "next-auth/react";

export default function SessionInfo() { 
  const {data: session, status}= useSession();
  return {session:session?.user,loading:status=="loading"} || null;
}

