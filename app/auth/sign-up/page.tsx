'use client';

import Link from 'next/link';
import Image from 'next/image';

import SignUpForm from '@/components/Forms/SignUpForm';

const SignUp = () => {
  return (
    <div className="flex h-screen max-h-screen bg-slate-950">
      <Link className="text-green-500 m-4 absolute" href="/">
        <Image src="/assets/icons/arrow.svg" height={40} width={40} alt="logo" />
      </Link>
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[400px]">
          <SignUpForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">© 2024 FarmAssistant</p>
            <Link className="text-green-500 underline" href="/auth/sign-in">
              Sign in
            </Link>
          </div>
        </div>
      </section>
      <Image src="/assets/images/onboarding-img.png" height={1000} width={1000} alt="farmer" className="side-img max-w-[50%]" />
    </div>
  );
};

export default SignUp;
