import prisma from "../lib/prisma";

interface EmployeeCreateInput {
    name: string;
    code: string;
    companyId: string;
    departmentId: string;
    isClockedIn: boolean;
  }
  

async function seed() {
  try {
    // Create Company 1
    const company1 = await prisma.company.create({
      data: {
        name: 'Company 1',
        code: 1,
        password: 'company1pass',
        adminPassword: 'company1adminpass',
      },
    });

    // Create Department 1 for Company 1
    const department1 = await prisma.department.create({
      data: {
        name: 'Department 1',
        code: 'D1',
        companyId: company1.id,
      },
    });

    // Create Department 2 for Company 1
    const department2 = await prisma.department.create({
      data: {
        name: 'Department 2',
        code: 'D2',
        companyId: company1.id,
      },
    });

    // Create Employees for Company 1
    const employee1 = await prisma.employee.create({
      data: {
        name: 'Employee 1',
        code: 'E1',
        companyId: company1.id,
        departmentId: department1.id,
        isClockedIn: false,
      } as EmployeeCreateInput,
    });

    const employee2 = await prisma.employee.create({
      data: {
        name: 'Employee 2',
        code: 'E2',
        companyId: company1.id,
        departmentId: department1.id,
        isClockedIn: false,
      } as EmployeeCreateInput,
    });

    const employee3 = await prisma.employee.create({
      data: {
        name: 'Employee 3',
        code: 'E3',
        companyId: company1.id,
        departmentId: department2.id,
        isClockedIn: false,
      } as EmployeeCreateInput,
    });

    const employee4 = await prisma.employee.create({
      data: {
        name: 'Employee 4',
        code: 'E4',
        companyId: company1.id,
        departmentId: department2.id,
        isClockedIn: false,
      } as EmployeeCreateInput,
    });

 

    // Create Company 2
    const company2 = await prisma.company.create({
      data: {
        name: 'Company 2',
        code: 2,
        password: 'company2pass',
        adminPassword: 'company2adminpass',
      },
    });

    // Create Department 3 for Company 2
    const department3 = await prisma.department.create({
      data: {
        name: 'Department 3',
        code: 'D3',
        companyId: company2.id,
      },
    });

    // Create Department 4 for Company 2
    const department4 = await prisma.department.create({
      data: {
        name: 'Department 4',
        code: 'D4',
        companyId: company2.id,
      },
    });

    // Create Employees for Company 2
    const employee5 = await prisma.employee.create({
      data: {
        name: 'Employee 5',
        code: 'E5',
        companyId: company2.id,
        departmentId: department3.id,
        isClockedIn: false,
      } as EmployeeCreateInput,
    });

    const employee6 = await prisma.employee.create({
      data: {
        name: 'Employee 6',
        code: 'E6',
        companyId: company2.id,
        departmentId: department3.id,
        isClockedIn: false,
      } as EmployeeCreateInput,
    });

    const employee7 = await prisma.employee.create({
      data: {
        name: 'Employee 7',
        code: 'E7',
        companyId: company2.id,
        departmentId: department4.id,
        isClockedIn: false,
      } as EmployeeCreateInput,
    });

    const employee8 = await prisma.employee.create({
      data: {
        name: 'Employee 8',
        code: 'E8',
        companyId: company2.id,
        departmentId: department4.id,
        isClockedIn: false,
      } as EmployeeCreateInput,
    });

   // Create Time Cards for Employees
   const weeks = 8;
   const workDaysPerWeek = 5; // Number of work days per week
   const hoursPerWeek = 40;
   const startDate = new Date();
   startDate.setDate(startDate.getDate() - weeks * 7);

   const employees = [employee1, employee2, employee3, employee4, employee5, employee6, employee7, employee8];

   for (const employee of employees) {
     for (let i = 0; i < weeks; i++) {
       const weekStartDate = new Date(startDate);
       weekStartDate.setDate(weekStartDate.getDate() + i * 7);
       const weekEndDate = new Date(weekStartDate);
       weekEndDate.setDate(weekEndDate.getDate() + workDaysPerWeek - 1); // Subtract 1 to get the last work day of the week

       for (let j = 0; j < workDaysPerWeek; j++) {
         const timeIn = new Date(weekStartDate);
         timeIn.setDate(timeIn.getDate() + j);
         const timeOut = new Date(timeIn);
         timeOut.setHours(timeOut.getHours() + hoursPerWeek / workDaysPerWeek);

         await prisma.timeCard.create({
           data: {
             employeeId: employee.id,
             timeIn,
             timeOut,
             duration: hoursPerWeek / workDaysPerWeek,
           },
         });
       }
     }
   }
 } catch (error) {
   console.error('Error seeding data:', error);
 } finally {
   await prisma.$disconnect();
 }
}

seed()
 .catch((error) => {
   console.error('Error running seed:', error);
 })
 .finally(() => {
   process.exit(0);
 });