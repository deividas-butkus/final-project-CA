import styled from "styled-components";

const FieldContainer = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
`;

const StyledLabel = styled.label<{ color?: string; fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "16px"};
  color: ${(props) => props.color || props.theme.text};
`;

type StyledInputProps = {
  padding?: string;
  $borderColor?: string;
};

const StyledInput = styled.input<StyledInputProps>`
  font-family: inherit;
  padding: ${(props) => props.padding || "8px"};
  border: 1px solid ${(props) => props.$borderColor || props.theme.border};
  border-radius: 15px;
  outline: none;
  &:focus {
    border-color: ${(props) => props.theme.background};
  }
`;

const StyledTextarea = styled.textarea<StyledInputProps>`
  font-family: inherit;
  padding: ${(props) => props.padding || "8px"};
  border: 1px solid ${(props) => props.$borderColor || props.theme.border};
  border-radius: 15px;
  outline: none;
  resize: vertical;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};

  &:focus {
    border-color: ${(props) => props.theme.accent};
  }
`;

const ErrorMessage = styled.span`
  color: ${(props) => props.theme.error};
  font-size: 12px;
`;

type InputWithLabelProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
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

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  labelColor,
  labelFontSize,
  inputPadding,
  inputBorderColor,
  errorBorderColor = "red",
  gap,
}) => {
  const borderColor = error ? errorBorderColor : inputBorderColor;

  return (
    <FieldContainer gap={gap}>
      <StyledLabel htmlFor={name} color={labelColor} fontSize={labelFontSize}>
        {label}
      </StyledLabel>
      {type === "textarea" ? (
        <StyledTextarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          padding={inputPadding}
          $borderColor={borderColor}
          rows={8}
        />
      ) : (
        <StyledInput
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          padding={inputPadding}
          $borderColor={borderColor}
        />
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FieldContainer>
  );
};

export default InputWithLabel;