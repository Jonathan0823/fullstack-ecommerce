"use client"
import Link from "next/link"
import { CircularProgress } from "@mui/material"; 

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { signIn } from "next-auth/react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [sending, setSending] = useState(false)

  const handleSubmit = async () => {
    try {
      setSending(true)
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!res?.ok) {
        setError("Invalid email or password");
        return;
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              
            </div>
            <Input id="password" type="password" required 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full" onClick={handleSubmit}>
          {sending ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
