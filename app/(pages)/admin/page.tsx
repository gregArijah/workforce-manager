import Link from "next/link"

import Header from "../_components/header"

export default function Admin() {
    return (
        <div className="h-screen">
            <Header />
            <br />
            <p>Admin page</p>
            <br />
            <p><Link href="/admin/departments" className="text-red-700">BUTTON:</Link> for dept manager - this section will add/del/edit the department</p>
            <p><Link href="/admin/employees" className="text-red-700">BUTTON:</Link> for employee manager - this section will add/del/edit the employees</p>
            <p><Link href="/admin/timecards" className="text-red-700">BUTTON:</Link> for time clerk - this section will add/del/edit the time card, we need to discuss the exact functionaility of this section</p>           
        </div>
    )
}