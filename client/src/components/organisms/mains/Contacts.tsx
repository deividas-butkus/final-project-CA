import { useUsersContext } from "../../../contexts/users/useUsersContext";

const Contacts = () => {
  const { users } = useUsersContext();
  console.log("Users in Contacts component:", users);

  return (
    <section>
      <h2>Contacts</h2>
      {users.length > 0 ? (
        users.map((user) => <div key={user._id}>{user.username}</div>)
      ) : (
        <p>No users found.</p>
      )}
    </section>
  );
};

export default Contacts;
