// components/Navbar.js
import Link from "next/link";
import { PackageOpen } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 py-2 ">
      <div className="container mx-auto flex justify-between items-center ">
        <Link href="/">
          <div className="flex gap-2">
            <PackageOpen size={36} className="text-white font-extrabold" />
            <div className="text-white font-bold text-2xl mt-0.5">
              StockWise
            </div>
          </div>
        </Link>
        <div className="flex flex-end gap-6">
          <Link href="/products">
            <div className="text-white hover:underline">Products</div>
          </Link>
          <Link href="/customers">
            <div className="text-white hover:underline">Customers</div>
          </Link>
          <Link href="/vendors">
            <div className="text-white hover:underline">Vendors</div>
          </Link>
        </div>
        {/* Add more links for additional pages/routes */}
      </div>
    </nav>
  );
};

export default Navbar;
