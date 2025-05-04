"use client";
import Button from "@/components/elements/Button";
import FormInput from "@/components/fragments/FormInput";
import AuthLayout from "@/components/layouts/AuthLayout";
import Alert from "@/components/widgets/Alert";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl: "/dashboard",
      });
      if (!res?.error) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign in to your account">
      <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
        {error && <Alert close={() => setError("")}>{error}</Alert>}
        <FormInput
          onChange={handleChange}
          type="email"
          htmlFor="email"
          name="email"
          placeholder="name@mail.com"
          value={formData.email}
        >
          Email
        </FormInput>
        <FormInput
          onChange={handleChange}
          type="password"
          htmlFor="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
        >
          Password
        </FormInput>

        <Button disabled={isLoading}>
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-300">
          Don’t have an account yet?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
