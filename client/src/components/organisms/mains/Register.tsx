import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { useUsersContext } from "../../../contexts/users/useUsersContext";
import { registerSchema } from "../../../schemas/authSchema";
import InputWithLabel from "../../molecules/InputWithLabel";
import Button from "../../atoms/Button";

const StyledSection = styled.section`
  > form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    > p {
      transition: transform 0.2s ease;
      > a {
        display: inline-block;
        color: ${({ theme }) => theme.accent};
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
`;

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { addUser, checkUsernameAvailability } = useUsersContext();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      profileImage: null,
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("username", data.username);
    if (data.profileImage) formData.append("profileImage", data.profileImage);
    formData.append("password", data.password);

    try {
      await addUser(formData);
      setRegisterSuccess("Registration successful!");
      setTimeout(() => navigate("/user"), 3000);
    } catch (err) {
      console.error("Failed to register user:", err);
      setRegisterError("An error occurred during registration.");
    }
  };

  const handleUsernameBlur = async (username: string) => {
    if (username.length < 5 || username.length > 20) return;

    const isAvailable = await checkUsernameAvailability(username);
    setUsernameError(
      isAvailable
        ? null
        : "This username is already taken. Please choose another one."
    );
  };

  const handleUsernameFocus = () => {
    setUsernameError(null);
  };

  return (
    <StyledSection>
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
              onFocus={handleUsernameFocus}
              onBlur={() => handleUsernameBlur(field.value)}
              error={usernameError || errors.username?.message}
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
        <Button type="submit" $width="100px">
          Register
        </Button>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </form>

      {registerError && <p style={{ color: "red" }}>{registerError}</p>}
      {registerSuccess && <p style={{ color: "green" }}>{registerSuccess}</p>}
    </StyledSection>
  );
};

export default Register;
