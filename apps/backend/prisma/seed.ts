import { PrismaClient, UserRole, UserStatus, PageStatus, PageVisibility, IntegrationType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  try {
    // ========================================================================
    // 1. CREATE USERS
    // ========================================================================
    console.log('📝 Creating users...');

    const superAdmin = await prisma.user.upsert({
      where: { email: 'admin@mindgraphix.com' },
      update: {},
      create: {
        email: 'admin@mindgraphix.com',
        passwordHash: await bcrypt.hash('Admin@12345', 10),
        firstName: 'Super',
        lastName: 'Admin',
        role: UserRole.SUPER_ADMIN,
        status: UserStatus.ACTIVE,
        phone: '+33612345678',
        bio: 'System administrator with full access',
      },
    });

    const editor = await prisma.user.upsert({
      where: { email: 'editor@mindgraphix.com' },
      update: {},
      create: {
        email: 'editor@mindgraphix.com',
        passwordHash: await bcrypt.hash('Editor@12345', 10),
        firstName: 'Content',
        lastName: 'Editor',
        role: UserRole.EDITOR,
        status: UserStatus.ACTIVE,
        phone: '+33612345679',
        bio: 'Content management and editing',
      },
    });

    const viewer = await prisma.user.upsert({
      where: { email: 'viewer@mindgraphix.com' },
      update: {},
      create: {
        email: 'viewer@mindgraphix.com',
        passwordHash: await bcrypt.hash('Viewer@12345', 10),
        firstName: 'View',
        lastName: 'Only',
        role: UserRole.VIEWER,
        status: UserStatus.ACTIVE,
        bio: 'Read-only access for analytics and reports',
      },
    });

    console.log(`✅ Created super admin: ${superAdmin.email}`);
    console.log(`✅ Created editor: ${editor.email}`);
    console.log(`✅ Created viewer: ${viewer.email}\n`);

    // ========================================================================
    // 2. CREATE SITE CONFIGURATION
    // ========================================================================
    console.log('⚙️  Creating site configuration...');

    const siteConfig = await prisma.siteConfig.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        siteName: 'Mind Graphix Premium',
        siteDescription: 'Professional Web Architecture, Design & CMS Platform',
        siteUrl: process.env.SITE_URL || 'http://localhost:3000',
        supportEmail: 'support@mindgraphix.com',
        supportPhone: '+33612345680',
        supportedLanguages: ['en', 'fr'],
        defaultLanguage: 'en',
        enableComments: false,
        enableSearch: true,
        enableAnalytics: true,
        enableNewsletter: false,
        socialLinks: {
          twitter: 'https://twitter.com/mindgraphix',
          linkedin: 'https://linkedin.com/company/mindgraphix',
          github: 'https://github.com/mindgraphix',
          facebook: 'https://facebook.com/mindgraphix',
        },
        contactForm: {
          enabled: true,
          fields: ['name', 'email', 'phone', 'subject', 'message'],
          recipientEmail: 'hello@mindgraphix.com',
        },
      },
    });

    console.log(`✅ Site config created: ${siteConfig.siteName}\n`);

    // ========================================================================
    // 3. CREATE DEMO PAGES
    // ========================================================================
    console.log('📄 Creating demo pages...');

    const homePage = await prisma.page.upsert({
      where: { slug: 'home' },
      update: {},
      create: {
        title: 'Welcome to Mind Graphix',
        slug: 'home',
        description: 'Discover our premium web architecture and design solutions',
        content: '<h1>Welcome</h1><p>Experience premium web solutions</p>',
        status: PageStatus.PUBLISHED,
        visibility: PageVisibility.PUBLIC,
        publishedAt: new Date(),
        metaTitle: 'Mind Graphix - Professional Web Solutions',
        metaDescription: 'Premium web architecture, design & CMS platform for enterprise solutions',
        metaKeywords: 'web design, architecture, CMS, premium',
        createdBy: superAdmin.id,
        publishedBy: superAdmin.id,
        blocks: {
          sections: [
            { type: 'hero', title: 'Welcome to Mind Graphix' },
            { type: 'features', items: ['Design', 'Architecture', 'Performance'] },
          ],
        },
      },
    });

    const aboutPage = await prisma.page.upsert({
      where: { slug: 'about' },
      update: {},
      create: {
        title: 'About Mind Graphix',
        slug: 'about',
        description: 'Learn about our company and mission',
        content: '<h1>About Us</h1><p>Building exceptional digital experiences</p>',
        status: PageStatus.PUBLISHED,
        visibility: PageVisibility.PUBLIC,
        publishedAt: new Date(),
        metaTitle: 'About Mind Graphix',
        metaDescription: 'Learn about our team, mission, and expertise',
        createdBy: superAdmin.id,
        publishedBy: superAdmin.id,
      },
    });

    const servicesPage = await prisma.page.upsert({
      where: { slug: 'services' },
      update: {},
      create: {
        title: 'Our Services',
        slug: 'services',
        description: 'Comprehensive web services for your business',
        content: '<h1>Services</h1><p>Web design, development & consulting</p>',
        status: PageStatus.PUBLISHED,
        visibility: PageVisibility.PUBLIC,
        publishedAt: new Date(),
        metaTitle: 'Services - Mind Graphix',
        metaDescription: 'Professional web design and development services',
        createdBy: superAdmin.id,
        publishedBy: superAdmin.id,
      },
    });

    const contactPage = await prisma.page.upsert({
      where: { slug: 'contact' },
      update: {},
      create: {
        title: 'Contact Us',
        slug: 'contact',
        description: 'Get in touch with our team',
        content: '<h1>Contact</h1><p>We would love to hear from you</p>',
        status: PageStatus.PUBLISHED,
        visibility: PageVisibility.PUBLIC,
        publishedAt: new Date(),
        metaTitle: 'Contact - Mind Graphix',
        metaDescription: 'Contact our team for inquiries and support',
        createdBy: superAdmin.id,
        publishedBy: superAdmin.id,
      },
    });

    console.log(`✅ Created 4 demo pages\n`);

    // ========================================================================
    // 4. CREATE PAGE VERSIONS
    // ========================================================================
    console.log('📚 Creating page versions...');

    await prisma.pageVersion.create({
      data: {
        pageId: homePage.id,
        title: homePage.title,
        content: homePage.content,
        versionNumber: 1,
        changesSummary: 'Initial version',
        createdBy: superAdmin.id,
      },
    });

    console.log(`✅ Created version history\n`);

    // ========================================================================
    // 5. CREATE DEMO SETTINGS
    // ========================================================================
    console.log('🔧 Creating settings...');

    const settings = [
      { key: 'site_timezone', value: 'Europe/Paris', type: 'string', isPublic: false },
      { key: 'site_language', value: 'en', type: 'string', isPublic: true },
      { key: 'max_upload_size', value: '52428800', type: 'number', isPublic: false }, // 50MB
      { key: 'enable_api', value: 'true', type: 'boolean', isPublic: false },
      { key: 'cache_ttl', value: '300', type: 'number', isPublic: false }, // 5 minutes
    ];

    for (const setting of settings) {
      await prisma.setting.upsert({
        where: { key: setting.key },
        update: {},
        create: setting,
      });
    }

    console.log(`✅ Created ${settings.length} settings\n`);

    // ========================================================================
    // 6. CREATE INTEGRATION PLACEHOLDERS
    // ========================================================================
    console.log('🔗 Setting up integration placeholders...');

    const integrations = [
      {
        name: 'stripe',
        type: IntegrationType.PAYMENT,
        isActive: false,
        config: {
          description: 'Stripe payment processing',
          webhooks: ['charge.succeeded', 'charge.failed', 'invoice.paid'],
        },
      },
      {
        name: 'hubspot',
        type: IntegrationType.CRM,
        isActive: false,
        config: {
          description: 'HubSpot CRM integration',
          syncInterval: 3600,
        },
      },
      {
        name: 'mailchimp',
        type: IntegrationType.EMAIL_MARKETING,
        isActive: false,
        config: {
          description: 'Mailchimp email marketing integration',
          syncInterval: 1800,
        },
      },
      {
        name: 'google_analytics',
        type: IntegrationType.ANALYTICS,
        isActive: false,
        config: {
          description: 'Google Analytics 4 integration',
          trackingId: 'G-XXXXXXXXXX',
        },
      },
      {
        name: 'aws_s3',
        type: IntegrationType.STORAGE,
        isActive: false,
        config: {
          description: 'AWS S3 media storage',
          region: 'eu-west-1',
          bucket: 'mindgraphix-media',
        },
      },
      {
        name: 'cloudflare',
        type: IntegrationType.CDN,
        isActive: false,
        config: {
          description: 'Cloudflare CDN and security',
          zoneId: 'XXXXX',
        },
      },
    ];

    for (const integration of integrations) {
      await prisma.integration.upsert({
        where: { name: integration.name },
        update: {},
        create: integration,
      });
    }

    console.log(`✅ Created ${integrations.length} integration placeholders\n`);

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ DATABASE SEEDING COMPLETED SUCCESSFULLY ✨\n');
    console.log('📊 CREATED:');
    console.log('   • 3 Users (Super Admin, Editor, Viewer)');
    console.log('   • 1 Site Configuration');
    console.log('   • 4 Demo Pages (Home, About, Services, Contact)');
    console.log('   • 1 Page Version');
    console.log('   • 5 Settings');
    console.log('   • 6 Integration Placeholders (Stripe, HubSpot, Mailchimp, etc.)');
    console.log('\n🔐 DEFAULT CREDENTIALS:');
    console.log('   Super Admin:  admin@mindgraphix.com / Admin@12345');
    console.log('   Editor:       editor@mindgraphix.com / Editor@12345');
    console.log('   Viewer:       viewer@mindgraphix.com / Viewer@12345');
    console.log('\n📍 NEXT STEPS:');
    console.log('   1. Run: pnpm db:migrate');
    console.log('   2. Run: pnpm db:seed');
    console.log('   3. Start backend: pnpm dev:backend');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('🔥 Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
