import Head from 'next/head';
import Link from 'next/link';
import RegistrationForm from '@/components/registration/RegistrationForm';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Mud Run</title>
      </Head>
      <main className="container">
        <Link href="/" className="back-link">
          &larr; Back to home
        </Link>
        <h1>Event Registration</h1>
        <p>Register yourself or your group below.</p>
        <RegistrationForm />
      </main>
    </>
  );
}
