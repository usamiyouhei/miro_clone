import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import './Signup.css';

export default function Signup() {
  return (
    <div className="signup-page">
      <Card className="signup-card">
        <h1 className="signup-title">Miro Clone</h1>

        <div className="signup-form">
          <Input
            id="username"
            type="text"
            label="ユーザー名"
            placeholder="山田太郎"
          />

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
            placeholder="8文字以上"
          />

          <Button type="button" className="signup-submit-button">
            アカウント作成
          </Button>
        </div>

        <div className="signup-footer">
          既にアカウントをお持ちの方は
          <Link to="" className="signup-link">
            ログイン
          </Link>
        </div>
      </Card>
    </div>
  );
}
