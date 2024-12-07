import React from 'react';
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-400 hover:text-primary transition-colors"
    aria-label={label}
  >
    <Icon className="h-6 w-6" />
  </a>
);

const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.instagram.com/pedrodigitalcoach/",
      icon: Instagram,
      label: "Instagram"
    },
    {
      href: "https://x.com/pjpalomares",
      icon: Twitter,
      label: "Twitter"
    },
    {
      href: "https://www.linkedin.com/in/pedro-j-palomares-alonso/",
      icon: Linkedin,
      label: "LinkedIn"
    },
    {
      href: "https://www.youtube.com/@PedroJPalomares",
      icon: Youtube,
      label: "YouTube"
    }
  ];

  return (
    <footer className="bg-dark-lighter">
      <div className="max-w-7xl mx-auto container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-400 max-w-md">
              Ayudo a empresas y emprendedores a escalar sus negocios mediante estrategias 
              digitales, automatización e inteligencia artificial.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {['Inicio', 'Servicios', 'Sobre Mí', 'Blog', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-400">+34 619 410 431</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-400">contacto@pedropalomares.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-400">Barcelona, España</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Pedro Palomares. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;