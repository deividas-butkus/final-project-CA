import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  }
`;

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useUsersContext();
  const { fetchChats } = useChatsContext();
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
      setLoginSuccess("Login successful!");
      fetchChats();
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
      </form>

      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      {loginSuccess && <p style={{ color: "green" }}>{loginSuccess}</p>}
    </StyledSection>
  );
};

export default Login;
