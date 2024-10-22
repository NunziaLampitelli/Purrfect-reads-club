import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteAccountPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  function HandleDeleteAccount() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUsername = localStorage.getItem('currentUser');

    if (!currentUsername) {
      setErrorMessage ("No user is currently logged in");
      return;
    }

    const updatedUsers = users.filter((user: any) => user.username !== currentUsername);
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    localStorage.removeItem("currentUser");

    navigate('/login');
  }
  return (
    <div>
      <h2> Delete Account</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <p>Are you sure you want to delete your account? If you canfirm all your data will be lost.</p>
      <button onClick={HandleDeleteAccount}>Delete my account</button>
    </div>
  )
};

export default DeleteAccountPage;