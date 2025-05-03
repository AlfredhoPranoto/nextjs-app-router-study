import React from "react";

type AuthProps = {
  children: React.ReactNode;
  title: string;
};

const AuthLayout = ({ children, title }: AuthProps) => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex md:block ">
      <div className="flex flex-col items-center justify-center md:px-6 py-8 mx-auto md:h-screen w-full px-8 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
