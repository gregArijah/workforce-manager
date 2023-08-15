import { getServerSession } from "next-auth";
import { authOptions }  from "@/lib/authOptions";

export default async function Session() {
    const session = await getServerSession(authOptions);
    return session?.user as any;
}