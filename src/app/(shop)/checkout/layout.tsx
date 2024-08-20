import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
export default async function CheckOutLayout({ children }: Props) {

  const session = await auth();

  if (!session?.user) {
    // redirect('/auth/login?returnTo=profile');
    redirect('/auth/login?redirectTo=/checkout/address');
  }

  return <>{children}</>;
}
