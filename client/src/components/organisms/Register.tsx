import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../../schemas/authSchema";
import InputWithLabel from "../molecules/InputWithLabel";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type RegisterFormData = z.infer<typeof authSchema>;

const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      profileImage: null,
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      if (data.profileImage) formData.append("profileImage", data.profileImage);

      const res = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          setRegisterError(errorData.message || "Registration failed");
        } else {
          setRegisterError("Unexpected error occurred. Please try again.");
          console.error("Unexpected response format:", await res.text());
        }
      } else {
        setRegisterSuccess("Registration successful!");
        reset();
        setTimeout(() => navigate("/profile"), 2000);
      }
    } catch (err) {
      console.error("Catch error:", err);
      setRegisterError("An error occurred during registration.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              label="Username"
              type="text"
              {...field}
              error={errors.username?.message}
              placeholder="Enter your username"
            />
          )}
        />

        <Controller
          name="profileImage"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              label="Profile Image"
              type="file"
              {...field}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                field.onChange(
                  target.files && target.files[0] ? target.files[0] : null
                );
              }}
              error={errors.profileImage?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              label="Password"
              type="password"
              {...field}
              error={errors.password?.message}
              placeholder="Enter your password"
            />
          )}
        />

        <Controller
          name="passwordRepeat"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              label="Repeat Password"
              type="password"
              {...field}
              error={errors.passwordRepeat?.message}
              placeholder="Repeat your password"
            />
          )}
        />

        <button type="submit">Register</button>
      </form>

      {registerError && <p style={{ color: "red" }}>{registerError}</p>}
      {registerSuccess && <p style={{ color: "green" }}>{registerSuccess}</p>}
    </div>
  );
};

export default Register;
