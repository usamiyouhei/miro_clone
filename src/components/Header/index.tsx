import { Link } from "react-router-dom";
import { RiUser3Line, RiLogoutBoxRLine } from "react-icons/ri";
import "./Header.css";
import { useAtom } from "jotai";
import { currentUserAtom } from "../../modules/auth/current-user.state";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const logout = () => {
    if (window.confirm("ログアウトしますか？")) {
      localStorage.removeItem("token");
      setCurrentUser(undefined);
    }
  };

  return (
    <header className="common-header">
      <div className="common-header__left">
        <Link to="/" className="common-header__logo">
          Miro Clone
        </Link>
        <div className="common-header__divider" />
        <h1 className="common-header__title">{title}</h1>
      </div>
      <div className="common-header__right">
        <span className="common-header__user">
          <RiUser3Line />
          {currentUser!.name}
        </span>
        <button
          className="common-header__logout"
          title="ログアウト"
          onClick={logout}
        >
          <RiLogoutBoxRLine />
        </button>
      </div>
    </header>
  );
}
