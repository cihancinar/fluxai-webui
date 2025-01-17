import { FC } from "react";

const Navbar: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-16 max-w-10xl items-center justify-between px-4 md:px-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">FluxAI WebUI</h1>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
