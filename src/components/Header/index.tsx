import { Link } from 'react-router-dom';
import { RiUser3Line, RiLogoutBoxRLine } from 'react-icons/ri';
import './Header.css';

export default function Header() {
  const title = 'Board Title';
  const currentUser = { name: 'Demo User' };

  return (
    <header className="common-header">
      <div className="common-header__left">
        <Link to="" className="common-header__logo">
          Miro Clone
        </Link>
        <div className="common-header__divider" />
        <h1 className="common-header__title">{title}</h1>
      </div>
      <div className="common-header__right">
        <span className="common-header__user">
          <RiUser3Line />
          {currentUser.name}
        </span>
        <button className="common-header__logout" title="ログアウト">
          <RiLogoutBoxRLine />
        </button>
      </div>
    </header>
  );
}
