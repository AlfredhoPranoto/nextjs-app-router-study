"use client";
import Button from "@/components/elements/Button";
import FormInput from "@/components/fragments/FormInput";
import AuthLayout from "@/components/layouts/AuthLayout";
import Alert from "@/components/widgets/Alert";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      console.log(res.status);
      if (res.status === 201) {
        push("/login");
      } else {
        setError("Registration failed. Email might already be in use");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout title="Sign up your account">
      <form
        className="space-y-4 md:space-y-6"
        method="POST"
        onSubmit={handleSubmit}
      >
        {error && <Alert close={() => setError("")}>{error}</Alert>}
        <FormInput
          value={formData.fullName}
          onChange={handleChange}
          htmlFor="fullname"
          name="fullName"
          placeholder="fullname"
        >
          Fullname
        </FormInput>
        <FormInput
          value={formData.email}
          onChange={handleChange}
          htmlFor="email"
          name="email"
          placeholder="email@mail.com"
        >
          Email
        </FormInput>
        <FormInput
          value={formData.password}
          onChange={handleChange}
          htmlFor="password"
          name="password"
          placeholder="••••••••"
          type="password"
        >
          Password
        </FormInput>
        <Button disabled={isLoading}>
          {isLoading ? "Sign up..." : "Sign up"}
        </Button>
        <p className="text-sm text-center font-light text-gray-500 dark:text-gray-300">
          Already have an account yet?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
