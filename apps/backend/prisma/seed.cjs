const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database (JS version)...\n');

  try {
    const passwordHash = await bcrypt.hash('Admin@12345', 10);

    const superAdmin = await prisma.user.upsert({
      where: { email: 'admin@mindgraphix.com' },
      update: {},
      create: {
        email: 'admin@mindgraphix.com',
        passwordHash: passwordHash,
        firstName: 'Super',
        lastName: 'Admin',
        role: 'SUPER_ADMIN',
        status: 'ACTIVE',
      },
    });

    console.log(`✅ Created user: ${superAdmin.email}`);

    await prisma.siteConfig.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        siteName: 'Mind Graphix Premium',
        siteUrl: 'http://localhost:3000',
      },
    });

    console.log('✅ Created site config');
    console.log('✨ SEED COMPLETED');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
