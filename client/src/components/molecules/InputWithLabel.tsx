import { forwardRef, useState, useRef, useEffect } from "react";
import styled, { DefaultTheme } from "styled-components";
import Button from "../atoms/Button";

const StyledHiddenFileInput = styled.input`
  display: none;
`;

const StyledFieldContainer = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap || "8px"};
`;

const StyledLabel = styled.label<{ color?: string; fontSize?: string }>`
  font-size: ${({ fontSize }) => fontSize || "16px"};
  color: ${({ color, theme }) => color || (theme as DefaultTheme).text};
`;

const FileInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledFileLabel = styled.span`
  color: ${({ theme }) => (theme as DefaultTheme).text};
  font-size: 14px;
`;

const inputStyles = `
  font-family: inherit;
  padding: 8px;
  border: 1px solid ${({
    theme,
    $borderColor,
  }: {
    theme: DefaultTheme;
    $borderColor?: string;
  }) => $borderColor || theme.border};
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: ${({ theme }: { theme: DefaultTheme }) =>
      theme.accent} !important;
    box-shadow: 0 0 0 2px ${({ theme }: { theme: DefaultTheme }) =>
      theme.accent} !important;
    outline: 2px solid ${({ theme }: { theme: DefaultTheme }) =>
      theme.accent} !important;
  }
`;

const StyledInput = styled.input<StyledInputProps>`
  ${inputStyles}
  padding: ${({ $padding }) => $padding || "8px"};
  &:focus {
    border-color: ${({
      $borderColor,
      theme,
    }: {
      $borderColor?: string;
      theme: DefaultTheme;
    }) => $borderColor || theme.accent};
  }
`;

const StyledTextarea = styled.textarea<StyledInputProps>`
  ${inputStyles}
  resize: none;
  overflow: hidden;
  background-color: ${({ theme }) => (theme as DefaultTheme).background};
  color: ${({ theme }) => (theme as DefaultTheme).text};
  padding: ${({ $padding }) => $padding || "8px"};
  line-height: 1.5;
  min-height: calc(1.5em + ${({ $padding }) => $padding || "16px"});
  box-sizing: border-box;

  &:focus {
    border-color: ${({
      $borderColor,
      theme,
    }: {
      $borderColor?: string;
      theme: DefaultTheme;
    }) => $borderColor || theme.accent};
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => (theme as DefaultTheme).error};
  font-size: 12px;
`;

type StyledInputProps = {
  $padding?: string;
  $borderColor?: string;
};

type InputWithLabelProps = {
  label: string;
  type?: string;
  name: string;
  value?: string | File | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  error?: string;
  labelColor?: string;
  labelFontSize?: string;
  inputPadding?: string;
  inputBorderColor?: string;
  errorBorderColor?: string;
  gap?: string;
};

const InputWithLabel = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputWithLabelProps
>(
  (
    {
      label,
      type = "text",
      name,
      value,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      error,
      labelColor,
      labelFontSize = "14px",
      inputPadding,
      inputBorderColor,
      errorBorderColor = "red",
      gap,
    },
    ref
  ) => {
    const borderColor = error ? errorBorderColor : inputBorderColor;
    const [fileChosen, setFileChosen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const resizeTextarea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"; // Reset height to auto
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    useEffect(() => {
      resizeTextarea();
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e);
      resizeTextarea();
    };

    const handleFileButtonClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
      e?.preventDefault();
      document.getElementById(name)?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFileChosen(!!e.target.files?.length);
      onChange(e);
    };

    const handleClearFile = () => {
      setFileChosen(false);
      const fileInput = document.getElementById(name) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      onChange({
        target: { name, value: null, files: null },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <StyledFieldContainer gap={gap}>
        <StyledLabel htmlFor={name} color={labelColor} fontSize={labelFontSize}>
          {label}
        </StyledLabel>
        {type === "file" ? (
          <>
            <StyledHiddenFileInput
              type="file"
              id={name}
              name={name}
              onChange={handleFileChange}
              ref={ref as React.Ref<HTMLInputElement>}
            />
            <FileInputRow>
              <Button
                onClick={handleFileButtonClick}
                $fontSize="14px"
                $padding="8px 16px"
              >
                {fileChosen ? "Choose Other" : "Choose File"}
              </Button>
              {fileChosen && (
                <>
                  <StyledFileLabel>
                    {(value as File)?.name || "File selected"}
                  </StyledFileLabel>
                  <Button
                    onClick={handleClearFile}
                    $fontSize="14px"
                    $padding="8px 16px"
                    $bgColor="#e74c3c"
                  >
                    Clear
                  </Button>
                </>
              )}
            </FileInputRow>
          </>
        ) : type === "textarea" ? (
          <StyledTextarea
            id={name}
            name={name}
            value={value as string}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            $padding={inputPadding}
            $borderColor={borderColor}
            ref={(element) => {
              textareaRef.current = element;
              if (typeof ref === "function") ref(element);
              else if (ref) ref.current = element;
            }}
            rows={1}
          />
        ) : (
          <StyledInput
            type={type}
            id={name}
            name={name}
            value={type === "file" ? undefined : (value as string)}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            $padding={inputPadding}
            $borderColor={borderColor}
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </StyledFieldContainer>
    );
  }
);

InputWithLabel.displayName = "InputWithLabel";

export default InputWithLabel;
