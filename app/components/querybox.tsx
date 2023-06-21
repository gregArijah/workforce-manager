import { useState } from "react";
import prisma from "../lib/prisma";

interface Company {
    id: number;
    name: string;
}

export const QueryBox: React.FC = () => {

    const [companies,setCompanies] = useState<Company[]>([]);


    await prisma.company.findMany();

    return (
        <div>
            <h1>QueryBox</h1>
            <ul>
                {companies.map((company) => (
                    <li key={company.id}>
                        <h2>{company.name}</h2>
                    </li>
                ))}
            </ul>
        </div>
    )
                
}