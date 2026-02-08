
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const usePageTitle = () => {
  const pathname = usePathname();

  useEffect(() => {
    const path = pathname;
    let title = 'Mind Graphix Solution | Agence Digitale';

    switch (path) {
      case '/':
        title = 'Accueil | Mind Graphix Solution';
        break;
      case '/about':
        title = 'À Propos | Mind Graphix Solution';
        break;
      case '/services':
        title = 'Nos Services | Mind Graphix Solution';
        break;
      case '/portfolio':
        title = 'Portfolio & Réalisations | Mind Graphix Solution';
        break;
      case '/team':
        title = 'L\'Équipe | Mind Graphix Solution';
        break;
      case '/contact':
        title = 'Contactez-nous | Mind Graphix Solution';
        break;
      case '/devis':
        title = 'Demander un Devis | Mind Graphix Solution';
        break;
      case '/careers':
        title = 'Carrières | Mind Graphix Solution';
        break;
      default:
        if (path.startsWith('/admin')) {
          title = 'Admin Panel | MGS';
        }
        break;
    }

    document.title = title;
  }, [pathname]);
};

export default usePageTitle;
