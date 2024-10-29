import { useState, useEffect } from "react";
import { useUsersContext } from "../../../contexts/users/useUsersContext";
import styled from "styled-components";
import Button from "../../atoms/Button";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  div {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  > div.profileImage {
    height: 300px;
    > img {
      height: 100%;
      border-radius: 10px;
      box-shadow: 1px 1px 5px ${({ theme }) => theme.accent};
    }
  }
`;

const MyProfile = () => {
  const { currentUser, updateUsername, updateProfileImage, updatePassword } =
    useUsersContext();

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tempProfileImage, setTempProfileImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setNewUsername(currentUser.username);
      setTempProfileImage(
        currentUser.profileImage || "/uploads/defaultProfileImage.png"
      );
      setLoading(false);
    }
  }, [currentUser]);

  const handleSaveUsername = () => {
    updateUsername(newUsername);
    setIsEditingUsername(false);
  };

  const handleProfileImageChange = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    setTempProfileImage(fileURL);

    updateProfileImage(file).then(() => {
      URL.revokeObjectURL(fileURL);
    });

    setIsEditingProfileImage(false);
  };

  const handleSavePassword = () => {
    if (newPassword === confirmPassword) {
      updatePassword(newPassword);
      setIsEditingPassword(false);
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <StyledSection>
      <h2>My Profile</h2>

      <div>
        {isEditingUsername ? (
          <div>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <Button onClick={handleSaveUsername}>Save</Button>
            <Button onClick={() => setIsEditingUsername(false)}>Cancel</Button>
          </div>
        ) : (
          <>
            <h3>{currentUser?.username}</h3>
            <Button onClick={() => setIsEditingUsername(true)}>
              Edit Username
            </Button>
          </>
        )}
      </div>

      <div className="profileImage">
        {isEditingProfileImage ? (
          <div>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleProfileImageChange(e.target.files[0]);
                }
              }}
            />
            <Button onClick={() => setIsEditingProfileImage(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <img src={tempProfileImage} alt={currentUser?.username} />
            <Button onClick={() => setIsEditingProfileImage(true)}>
              Edit Profile Image
            </Button>
          </>
        )}
      </div>

      <div>
        {isEditingPassword ? (
          <div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleSavePassword}>Save</Button>
            <Button onClick={() => setIsEditingPassword(false)}>Cancel</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditingPassword(true)}>
            Edit Password
          </Button>
        )}
      </div>
    </StyledSection>
  );
};

export default MyProfile;
