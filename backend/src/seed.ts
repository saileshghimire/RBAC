import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const predefinedItems = [
    { name: 'User' },
    { name: 'Role' },
    { name: 'Log'},
    { name: 'Model3' },
    { name: 'Model4' },
    { name: 'Model5' },
  ];
  const password = '123456'
  const hashedPassword = await bcrypt.hash(password, 10);
  const permissions = ['create', 'read', 'update', 'delete'];

  const items:string[] = [];
  //  create items
  for (const item of predefinedItems) {
    const createdItem = await prisma.item.create({
      data: item,
    });
    items.push(createdItem.name.toLowerCase());
  }

  // create admin role
  const adminRole = await prisma.role.create({
    data:{
      name:'Admin'
    }
  });

  // seed permission 
  for (const item of items){
    for (const action of permissions){
      await prisma.permissions_category.create({
        data:{
          roleId: adminRole.id,
          permission: `${action}_${item}`
        }
      });
    }
  }

  // create user

  await prisma.user.create({
    data: {
      username: 'sailesh',
      password: hashedPassword, 
      firstname: 'sailesh',
      lastname: 'Admin',
      address: '123 Admin Street',
      phonenumber: '1234567890',
      dateofbirth: new Date('1990-01-01'),
      roleID: adminRole.id,
    },
  });
  console.log("seeding complete");
  

  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
