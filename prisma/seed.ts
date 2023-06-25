import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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

    console.log('Created Company 1:', company1);
    console.log('Created Department 1:', department1);
    console.log('Created Department 2:', department2);
    console.log('Created Employee 1:', employee1);
    console.log('Created Employee 2:', employee2);
    console.log('Created Employee 3:', employee3);
    console.log('Created Employee 4:', employee4);

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

    console.log('Created Company 2:', company2);
    console.log('Created Department 3:', department3);
    console.log('Created Department 4:', department4);
    console.log('Created Employee 5:', employee5);
    console.log('Created Employee 6:', employee6);
    console.log('Created Employee 7:', employee7);
    console.log('Created Employee 8:', employee8);
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
