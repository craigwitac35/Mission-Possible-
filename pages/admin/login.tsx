import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '@/lib/supabaseClient';
import { HorseshoePawDivider } from '@/components/svg/Ornaments';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace('/admin/dashboard');
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push('/admin/dashboard');
  };

  return (
    <>
      <Head>
        <title>Admin Login | Mission Possible</title>
      </Head>

      <main className="mp-site mp-admin-login-page">
        <section className="mp-admin-login-section">
          <div className="mp-admin-login-frame">
            <p className="mp-eyebrow">Mission Possible &middot; Admin</p>

            <h1 className="mp-page-title mp-title-light">
              Field <em>Office</em>
            </h1>

            <div className="mp-hero-divider">
              <HorseshoePawDivider className="mp-svg-divider" />
            </div>

            <p className="mp-admin-login-tagline">
              Sign in to manage registrations.
            </p>

            <form className="mp-admin-login-form" onSubmit={handleLogin}>
              <label className="mp-form-label">
                <span className="mp-label-text mp-label-text-light">Email</span>
                <input
                  type="email"
                  required
                  className="mp-form-input mp-form-input-dark"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="mp-form-label">
                <span className="mp-label-text mp-label-text-light">Password</span>
                <input
                  type="password"
                  required
                  className="mp-form-input mp-form-input-dark"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {error && <p className="mp-form-error">{error}</p>}

              <button
                type="submit"
                className="mp-btn mp-btn-primary mp-btn-login"
                disabled={loading}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
