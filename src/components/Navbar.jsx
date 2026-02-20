const links = [
  { label: "Dettagli", href: "#dettagli" },
  { label: "Programma", href: "#programma" },
  { label: "Premi", href: "#premi" },
  { label: "Divise", href: "#divise" },
  { label: "Iscriviti", href: "#iscriviti" },
];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <a href="#" className="text-xl font-bold tracking-tight text-white">
        Champagne League
      </a>

      {/* Links */}
      <ul className="flex items-center gap-8">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-medium text-white transition-opacity hover:text-pacific-cyan"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
