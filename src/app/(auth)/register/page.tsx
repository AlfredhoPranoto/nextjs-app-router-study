import Button from "@/components/elements/Button";
import FormInput from "@/components/fragments/FormInput";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthLayout title="Sign up your account">
      <form className="space-y-4 md:space-y-6">
        <FormInput htmlFor="fullname" name="fullname" placeholder="fullname">
          Fullname
        </FormInput>
        <FormInput htmlFor="email" name="email" placeholder="email@mail.com">
          Email
        </FormInput>
        <FormInput
        
          htmlFor="password"
          name="password"
          placeholder="••••••••"
          type="password"
        >
          Password
        </FormInput>
        <Button>Sign up</Button>
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
