import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/lib/content.json');

// Initialiser le fichier si il n'existe pas
if (!fs.existsSync(DATA_PATH)) {
  const initialData = {
    hero: {
      titlePrefix: 'Solutions Innovantes pour',
      titleSpan: 'Entreprises Modernes',
      titleSuffix: 'avec Mind Graphix',
      description: 'Propulsez votre marque avec un design et une technologie de pointe. Nous transformons vos idées en réalité numérique.',
      ctaPrimary: 'Démarrer un Projet',
      ctaSecondary: 'En savoir plus'
    },
    services: [
      {
        id: "design-graphique",
        title: "Design Graphique",
        subtitle: "Identité visuelle & Communication",
        description: "Création d'identités visuelles percutantes, logos, supports print et éléments graphiques qui renforcent votre image de marque.",
        features: ["Création de logos", "Charte graphique", "Supports print", "Design réseaux sociaux", "Illustrations", "Retouche photo"],
        pricing: "À partir de 98.000 FCFA",
        duration: "3-7 jours",
        gradient: "from-pink-500 to-purple-600",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
        iconName: "Palette"
      },
      {
        id: "developpement-web",
        title: "Développement Web",
        subtitle: "Sites & Applications sur mesure",
        description: "Sites web et applications sur mesure, performants et sécurisés, conçus avec les dernières technologies du marché (React, Node.js).",
        features: ["Sites responsives", "PWA", "CMS (WordPress, Strapi)", "API & Backend", "SEO technique", "Maintenance"],
        pricing: "À partir de 525.000 FCFA",
        duration: "2-6 semaines",
        gradient: "from-blue-500 to-cyan-600",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        iconName: "Code"
      },
      {
        id: "ui-ux-design",
        title: "UI/UX Design",
        subtitle: "Expériences utilisateur optimisées",
        description: "Interfaces intuitives et expériences utilisateur optimisées pour maximiser l'engagement et la conversion.",
        features: ["Recherche utilisateur", "Wireframes", "Design d'interfaces", "Tests d'utilisabilité", "Design systems", "Mobile First"],
        pricing: "À partir de 394.000 FCFA",
        duration: "1-4 semaines",
        gradient: "from-green-500 to-teal-600",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
        iconName: "Smartphone"
      }
    ],
    portfolio: [
      {
        id: "1",
        title: "Plateforme Éducative LMS",
        category: "web",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
        description: "Système de gestion de l'apprentissage complet pour une université privée.",
        tags: ["React", "Node.js", "PostgreSQL"],
        client: "EduTech Faso"
      },
      {
        id: "2",
        title: "Identité Tech Startup",
        category: "design",
        image: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?auto=format&fit=crop&q=80&w=800",
        description: "Branding minimaliste et futuriste pour une fintech.",
        tags: ["Branding", "Illustrator", "Figma"],
        client: "NovaPay"
      },
      {
        id: "3",
        title: "Boutique Mode & Bio",
        category: "ecommerce",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
        description: "Shopify headless avec prévisualisation 3D des produits.",
        tags: ["Shopify", "Three.js", "Next.js"],
        client: "Koco Bio"
      }
    ],
    testimonials: [
      {
        id: "1",
        name: "Sarah Koné",
        role: "Directrice Marketing",
        company: "FasoTech",
        content: "Mind Graphix a transformé notre vision en une réalité digitale époustouflante. Leur attention aux détails est inégalée.",
        rating: 5,
        status: "approved",
        date: "2026-02-14T10:00:00.000Z"
      },
      {
        id: "2",
        name: "Marc Ouedraogo",
        role: "CEO",
        company: "Immo Burkina",
        content: "Le site web qu'ils ont conçu a doublé nos leads en 3 mois. Une équipe professionnelle et réactive.",
        rating: 5,
        status: "approved",
        date: "2026-02-14T11:00:00.000Z"
      },
      {
        id: "3",
        name: "Aïcha Diallo",
        role: "Fondatrice",
        company: "Beauty Queen",
        content: "Le branding qu'ils ont créé pour ma marque est juste magnifique. Je recommande vivement !",
        rating: 5,
        status: "approved",
        date: "2026-02-14T12:00:00.000Z"
      }
    ],
    navbar: {
      logo: "/logo_sans_font.png",
      companyName: "Mind Graphix",
      ctaLabel: "Démarrer"
    },
    footer: {
      description: "Nous concevons des écosystèmes digitaux où l'esthétique rencontre la performance technologique.",
      newsletterTitle: "Prêt pour le futur ?",
      newsletterDesc: "Rejoignez notre cercle d'innovation et recevez des insights exclusifs sur le design et la tech.",
      copyright: "© 2026 MGS Architecture. All rights reserved.",
      email: "mindgraphixsolution@gmail.com",
      phone: "+226 01 51 11 46",
      address: "Abidjan, Côte d'Ivoire",
      socials: [
        { name: "Facebook", href: "https://facebook.com/mindgraphix", icon: "Facebook" },
        { name: "Twitter", href: "https://twitter.com/mindgraphix", icon: "Twitter" },
        { name: "Instagram", href: "https://instagram.com/mindgraphix", icon: "Instagram" },
        { name: "Linkedin", href: "https://linkedin.com/company/mindgraphix", icon: "Linkedin" },
        { name: "Github", href: "https://github.com/mindgraphix", icon: "Github" }
      ]
    }
  };
  fs.writeFileSync(DATA_PATH, JSON.stringify(initialData, null, 2));
}

export async function GET() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    fs.writeFileSync(DATA_PATH, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
