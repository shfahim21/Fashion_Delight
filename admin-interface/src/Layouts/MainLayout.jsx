import { Link, Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 ">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to={"/products"}
                className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              >
                Manage Products
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              >
                Manage Orders
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              >
                Manage Customers
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}

        {/* Content */}
        {pathname === "/" ? (
          <main className="p-6 flex-1">
            <div className="border-4 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center">
              <p className="text-gray-500">Select a section from the sidebar</p>
            </div>
          </main>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default MainLayout;
