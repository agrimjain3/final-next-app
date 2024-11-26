import { back, logout } from "../../actions/auth-actions";

export default function HeaderLoggedIn() {
  return (
    <div id="auth-header">
      <p>Welcome Back!</p>
      <form action={logout}>
        <button>Logout</button>
      </form>
      <form action={back}>
        <button>Back</button>
      </form>
    </div>
  );
}
