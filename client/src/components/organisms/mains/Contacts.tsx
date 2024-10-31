import { useEffect } from "react";
import styled from "styled-components";

import { useUsersContext } from "../../../contexts/users/useUsersContext";
import ContactCard from "../../molecules/ContactCard";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Contacts = () => {
  const { users, currentUser, fetchUsers } = useUsersContext();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const otherUsers = users.filter((user) => user._id !== currentUser?._id);

  return (
    <StyledSection>
      <h2>Contacts</h2>
      {currentUser && (
        <ContactCard key={currentUser._id} userId={currentUser._id} />
      )}
      {otherUsers.map((user) => (
        <ContactCard key={user._id} userId={user._id} />
      ))}
    </StyledSection>
  );
};

export default Contacts;