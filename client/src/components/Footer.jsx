const Footer = () => {
  return (
    <footer className="w-full py-4 text-center bg-blue-600 text-white fixed bottom-0">
      <p className="text-sm">
        Built with ❤️ by saintdannyyy &copy; {new Date().getFullYear()}
      </p>
      <a
        href="https://buymeacoffee.com/saintdannyyy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-400 hover:underline"
      >
        ☕ Buy Me a Coffee
      </a>
    </footer>
  );
};

export default Footer;
