import { Link } from 'react-router-dom';

export default function NavLink(props) {
  return (
    <Link {...props} activeClassName="active">
      {props.children}
    </Link>
  );
}
