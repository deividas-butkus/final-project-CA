import { useState, useEffect } from "react";
import styled from "styled-components";
import KeyIcon from "@mui/icons-material/Key";

import { useUsersContext } from "../../../contexts/users/useUsersContext";
import Button from "../../atoms/Button";
import ThemeToggler from "../../molecules/ThemeToggler";
import { usernameSchema, passwordSchema } from "../../../schemas/authSchema";
import InputWithLabel from "../../molecules/InputWithLabel";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

  div.headerAndMode {
    color: ${({ theme }) => theme.text};
    display: flex;
    justify-content: space-between;
    > div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
  div.profileImageContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    div.profileImage {
      width: 100%;
      max-width: 300px;
      aspect-ratio: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
      }
    }
  }
  div.fieldContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    div.inputs {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }
  div.buttonContainer {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    &.imageButtons {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
  }
  hr {
    border: 0;
    border-top: 0.5px solid #5b5c5c;
    margin: 20px 0;
  }
  p {
    text-align: end;
  }
`;

const MyProfile = () => {
  const {
    currentUser,
    updateUsername,
    updateProfileImage,
    updatePassword,
    dispatch,
  } = useUsersContext();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tempProfileImage, setTempProfileImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [oldPasswordError, setOldPasswordError] = useState<string | null>(null);

  const hasProfileImage =
    currentUser?.profileImage &&
    currentUser.profileImage !== "/uploads/defaultProfileImage.png";

  useEffect(() => {
    if (currentUser) {
      setNewUsername(currentUser.username);
      setTempProfileImage(
        currentUser.profileImage || "/uploads/defaultProfileImage.png"
      );
      setLoading(false);
    }
  }, [currentUser]);

  const validateUsername = () => {
    const result = usernameSchema.safeParse(newUsername);
    setUsernameError(result.success ? null : result.error.errors[0].message);
  };

  const validateOldPassword = async () => {
    const result = passwordSchema.safeParse(oldPassword);
    if (!result.success) {
      setOldPasswordError(result.error.errors[0].message);
      return;
    }

    try {
      const response = await fetch("/api/users/validatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ password: oldPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setOldPasswordError(errorData.message || "Old password is incorrect");
      } else {
        setOldPasswordError(null);
      }
    } catch (err) {
      console.error("Failed to validate old password:", err);
      setOldPasswordError("Error validating password. Please try again.");
    }
  };

  const validatePassword = () => {
    const result = passwordSchema.safeParse(newPassword);
    setPasswordError(result.success ? null : result.error.errors[0].message);
  };

  const validateConfirmPassword = () => {
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const handleSaveUsername = async () => {
    if (!usernameError) {
      try {
        await updateUsername(newUsername);
        setIsEditingUsername(false);
      } catch (err) {
        const errorMessage = (err as Error).message || "An error occurred.";
        setUsernameError(errorMessage);
      }
    }
  };

  const handleProfileImageChange = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    setTempProfileImage(fileURL);

    updateProfileImage(file).then(() => {
      URL.revokeObjectURL(fileURL);
    });

    setIsEditingProfileImage(false);
  };

  const handleSavePassword = async () => {
    validatePassword();
    validateConfirmPassword();

    if (!oldPassword) {
      setOldPasswordError("Old password is required");
      return;
    }

    if (passwordError || confirmPasswordError || oldPasswordError) {
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword });

      setIsEditingPassword(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess("Password updated successfully!");
      setOldPasswordError(null);
      setPasswordError(null);
      setConfirmPasswordError(null);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const handleDeleteProfileImage = () => {
    setTempProfileImage("/uploads/defaultProfileImage.png");
    updateProfileImage(null);
    setIsEditingProfileImage(false);

    dispatch({
      type: "UPDATE_PROFILE_IMAGE",
      payload: "/uploads/defaultProfileImage.png",
    });
  };

  useEffect(() => {
    if (passwordSuccess) {
      const timer = setTimeout(() => setPasswordSuccess(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [passwordSuccess]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <StyledSection>
      <div className="headerAndMode">
        <h2>My Profile</h2>
        <div>
          <ThemeToggler />
        </div>
      </div>
      <hr />

      <div className="fieldContainer">
        <div>
          {isEditingUsername ? (
            <InputWithLabel
              label="Username"
              type="text"
              name="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              onBlur={validateUsername}
              error={usernameError || ""}
              placeholder="Enter new username"
            />
          ) : (
            <h3>{currentUser?.username}</h3>
          )}
        </div>
        <div className="buttonContainer">
          {isEditingUsername ? (
            <>
              <Button onClick={handleSaveUsername}>Save</Button>
              <Button onClick={() => setIsEditingUsername(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditingUsername(true)}>
              Change Username
            </Button>
          )}
        </div>
      </div>

      <hr />

      <div className="profileImageContainer fieldContainer">
        <div className="profileImage">
          {isEditingProfileImage ? (
            <InputWithLabel
              label="Profile Image"
              type="file"
              name="profileImage"
              value={null}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.files && target.files[0]) {
                  handleProfileImageChange(target.files[0]);
                }
              }}
            />
          ) : (
            <img
              src={tempProfileImage}
              alt={currentUser?.username || "Profile Image"}
            />
          )}
        </div>
        <div className="buttonContainer imageButtons">
          {isEditingProfileImage ? (
            <>
              <Button onClick={() => setIsEditingProfileImage(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditingProfileImage(true)}>
                {hasProfileImage ? "Change Profile Image" : "Add Profile Image"}
              </Button>
              {hasProfileImage && (
                <Button className="delete" onClick={handleDeleteProfileImage}>
                  Delete Profile Image
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <hr />

      <div className="fieldContainer">
        {!isEditingPassword && <KeyIcon />}
        {passwordSuccess && <p style={{ color: "green" }}>{passwordSuccess}</p>}

        <div className="inputs">
          {isEditingPassword && (
            <>
              <InputWithLabel
                label="Old Password"
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                onBlur={validateOldPassword}
                error={oldPasswordError || ""}
                placeholder="Enter old password"
              />
              <InputWithLabel
                label="New Password"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={validatePassword}
                error={passwordError || ""}
                placeholder="Enter new password"
              />
              <InputWithLabel
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validateConfirmPassword}
                error={confirmPasswordError || ""}
                placeholder="Confirm new password"
              />
            </>
          )}
        </div>
        <div className="buttonContainer">
          {isEditingPassword ? (
            <>
              <Button onClick={handleSavePassword}>Save</Button>
              <Button
                onClick={() => {
                  setIsEditingPassword(false);
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setOldPasswordError(null);
                  setPasswordError(null);
                  setConfirmPasswordError(null);
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditingPassword(true)}>
              Change Password
            </Button>
          )}
        </div>
      </div>
      <hr />
    </StyledSection>
  );
};

export default MyProfile;
