interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <main className= "min-h-screen bg-red-500">
      {children}
    </main>
  );
}
