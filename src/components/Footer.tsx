function Footer() {
  return (
    <footer className="w-full relative transform:-translate-y-full bg-black text-white p-4 flex justify-between items-center">
      <p className="text-sm">Copyright © 2023 DATASWAP</p>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Terms of Service
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
