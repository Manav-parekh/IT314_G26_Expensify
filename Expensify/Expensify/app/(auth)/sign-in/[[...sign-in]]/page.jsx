import { SignIn } from '@clerk/nextjs';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Sign In - Squid 🦑</title>
        <meta name="description" content="Sign in to Squid, your personalized experience." />
        <meta property="og:title" content="Sign In - Squid 🦑" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        />
      </Head>

      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          {/* Left Section */}
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="A modern abstract art piece"
              src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="#">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG Path */}
                  <path
                    d="M0.41 10.3847C1.14777 7.4194..."
                    fill="currentColor"
                  />
                </svg>
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Expensify 
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Dive into your next adventure with our service.
              </p>
            </div>
          </section>

          {/* Right Section */}
          <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            <div className="max-w-xl lg:max-w-3xl">
              {/* Mobile Header */}
              <div className="relative -mt-16 block lg:hidden">
                <a
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                  href="#"
                >
                  <span className="sr-only">Home</span>
                  <svg
                    className="h-8 sm:h-10"
                    viewBox="0 0 28 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Path */}
                    <path
                      d="M0.41 10.3847C1.14777 7.4194..."
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to Squid 🦑
                </h1>
                <p className="mt-4 leading-relaxed text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>

              {/* SignIn Component */}
              <SignIn />
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/sign-up" className="font-medium text-blue-600 hover:underline">
                    Sign up
                  </a>
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Forgot your password?{' '}
                  <a href="/forgot-password" className="font-medium text-blue-600 hover:underline">
                    Reset it
                  </a>
                </p>
              </div>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
