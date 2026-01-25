import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import './Signin.css';

export default function Signin() {
  return (
    <div className="signin-page">
      <Card className="signin-card">
        <h1 className="signin-title">Miro Clone</h1>

        <div className="signin-form">
          <Input
            id="email"
            type="email"
            label="メールアドレス"
            placeholder="example@example.com"
          />

          <Input
            id="password"
            type="password"
            label="パスワード"
            placeholder="パスワード"
          />

          <Button type="button" className="signin-submit-button">
            ログイン
          </Button>
        </div>

        <div className="signin-footer">
          アカウントをお持ちでない方は
          <Link to="" className="signin-link">
            新規登録
          </Link>
        </div>
      </Card>
    </div>
  );
}
