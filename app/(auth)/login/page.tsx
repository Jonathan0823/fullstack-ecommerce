import { LoginForm } from "@/components/login-form"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session){
    redirect("/")
  }
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  )
}
