import { NavLink } from "react-router-dom";

// inside UserItem
const UserItem = React.memo(({ user }) => (
  <li className="userlist-item">
    <NavLink to={`/users/${user.id}`}>
      {user.name} <span className="userlist-email">({user.email})</span>
    </NavLink>
  </li>
));
