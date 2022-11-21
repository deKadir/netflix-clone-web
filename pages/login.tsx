import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

interface Inputs {
  email: string;
  password: string;
}

function Login() {
  const [auth, setAuth] = useState('login');
  const { signIn, signUp, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (auth === 'login') {
      signIn(data.email, data.password);
    } else {
      signUp(data.email, data.password);
    }
  };

  return (
    <div className="relative flex  h-screen w-screen flex-col bg-black md:items-center md:justify-center">
      <Head>
        <title>Netflix Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        className="z-1  opacity-60 hidden lg:inline "
        layout="fill"
        alt="background"
      />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="header logo"
        width={150}
        height={150}
        className="absolute cursor-pointer object-contain left-4 top-4 md:left-10 md:top-6"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign in</h1>
        <div className="space-y-4">
          <label className="inline-block w-full">
            <input type="email" placeholder="email" className="input" {...register('email', { required: true })} />
            {errors.email && (
              <span className="p-1 text-[13px] font-light text-orange-500">Email field is required</span>
            )}
          </label>
          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="password"
              className="input"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="p-1 text-[13px] font-light text-orange-500">Password field is required</span>
            )}
          </label>
        </div>
        <button className="w-full roundend bg-[#e50914] py-3 font-semibold" onClick={() => setAuth('login')}>
          Sign in
        </button>
        <div className="text-[gray]">
          New to Netflix?
          <button className="text-white hover:underline ml-2" type="submit" onClick={() => setAuth('register')}>
            Sign up now
          </button>
        </div>
        <span className="text-sm">
          Hint: Don't forget to enter Email and Password inputs before clicking "Sign up now" button
        </span>
      </form>
    </div>
  );
}

export default Login;
