import { getServerSession } from "next-auth";
import { authOptions }  from "@/lib/authOptions";

export default async function Session() {
    const session = await getServerSession(authOptions);
    console.log("sessioninhere: ", session)
    return session?.user as any;
}