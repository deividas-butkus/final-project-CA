import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../../schemas/authSchema";
import InputWithLabel from "../molecules/InputWithLabel";
import { z } from "zod";

type FormData = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode: "login" | "register" | "edit";
  onSubmit: (data: FormData) => void;
  defaultValues?: Partial<FormData>;
}

export const AuthForm = ({
  mode,
  onSubmit,
  defaultValues = {},
}: AuthFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
    defaultValues,
  });

  const isRegister = mode === "register";
  const isEdit = mode === "edit";

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {/* Username Field */}
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

      {/* Profile Image Field (Only for Register and Edit modes) */}
      {(isRegister || isEdit) && (
        <Controller
          name="profileImage"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              label="Profile Image"
              type="file"
              {...field}
              error={errors.profileImage?.message}
              inputBorderColor="gray"
            />
          )}
        />
      )}

      {/* Password Field */}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <InputWithLabel
            label={isEdit ? "New Password" : "Password"}
            type="password"
            {...field}
            error={errors.password?.message}
            placeholder="Enter your password"
          />
        )}
      />

      {(isRegister || isEdit) && (
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
      )}

      <button type="submit">
        {isRegister ? "Register" : isEdit ? "Save Changes" : "Login"}
      </button>
    </form>
  );
};
