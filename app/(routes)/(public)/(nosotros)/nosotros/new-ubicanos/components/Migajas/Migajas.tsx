import Link from "next/link";

export function MigajasView() {
  return (
    <div className="mb-8">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="text-gray-700 hover:text-blueInka">
              Inicio
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-500">Red de atención</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
}
