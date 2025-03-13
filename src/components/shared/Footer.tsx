const Footer = () => {
  return (
    <footer className="bg-rose-200/60 text-gray-800 py-10">
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        <div>
          <p className="text-2xl font-bold mb-2">Tasty<span className="text-rose-600">Tray</span></p>
          <p className="text-sm mb-4">Delicious meals delivered to your door. Our mission is to bring you the best culinary experiences from around the world.</p>
          <p className="text-sm">&copy; {new Date().getFullYear()} TastyTray. All rights reserved.</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p className="text-sm">Email: support@tastytray.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
          <p className="text-sm">Address: 123 Food Street, Flavor Town</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Newsletter</h2>
          <p className="text-sm mb-2">Subscribe to our newsletter for the latest updates and offers.</p>
          <form className="flex flex-col">
            <input type="email" placeholder="Your email" className="p-2 rounded mb-2 border border-gray-300" />
            <button type="submit" className="bg-rose-600 text-white py-2 rounded hover:bg-rose-700">Subscribe</button>
          </form>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Legal</h2>
          <nav className="flex flex-col gap-2">
            <a href="#" className="hover:text-rose-600">Terms of Service</a>
            <a href="#" className="hover:text-rose-600">Privacy Policy</a>
            <a href="#" className="hover:text-rose-600">Cookie Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
