import '../../../assets/styles/AuthPage.css';

interface AuthPageProps {
  readonly children: React.ReactNode;
}

function AuthPage({ children }: AuthPageProps) {
  return (
    <main className='flex h-dvh w-full'>
      <section className='flex items-center justify-center w-full md:w-1/2'>
        { children }
      </section>
      <section className='auth-background-image'>
      </section>
    </main>
  );
}

export default AuthPage;