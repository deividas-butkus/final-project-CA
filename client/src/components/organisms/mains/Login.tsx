import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { useUsersContext } from "../../../contexts/users/useUsersContext";
import { useChatsContext } from "../../../contexts/chats/useChatsContext";
import { loginSchema } from "../../../schemas/authSchema";
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

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useUsersContext();
  const { fetchChatsSummary } = useChatsContext();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ username: data.username, password: data.password });
      setLoginError(null);
      setLoginSuccess("Login successful!");
      fetchChatsSummary();
      setTimeout(() => {
        navigate("/chats");
      }, 3000);
    } catch (err) {
      console.error("Failed to login:", err);
      setLoginError("An error occurred during login.");
    }
  };

  return (
    <StyledSection>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" $width="fit-content">
          Login
        </Button>
        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </form>

      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      {loginSuccess && <p style={{ color: "green" }}>{loginSuccess}</p>}
    </StyledSection>
  );
};

export default Login;
