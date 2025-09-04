import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const handleSocialLogin = (provider: string) => {
    console.log(`Initiating login with ${provider}`);
    // Integration with OAuth provider would go here
  };

  return (
    <><div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Sign in</h1>
          <p>Bergabunglah dengan ribuan trader dan investor crypto</p>
        </div>

        <div className="social-buttons">
          <button
            onClick={() => handleSocialLogin('google')}
            className="social-btn google"
          >
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Lanjutkan dengan Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin('facebook')}
            className="social-btn facebook"
          >
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z" />
            </svg>
            <span>Lanjutkan dengan Facebook</span>
          </button>

          <button
            onClick={() => handleSocialLogin('twitter')}
            className="social-btn twitter"
          >
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.006 10.006 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
            </svg>
            <span>Lanjutkan dengan X</span>
          </button>

          <button
            onClick={() => handleSocialLogin('linkedin')}
            className="social-btn linkedin"
          >
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span>Lanjutkan dengan LinkedIn</span>
          </button>
        </div>

        <div className="divider">
          <span>atau</span>
        </div>

        <div className="email-signup">
          <button
            onClick={() => handleSocialLogin('email')}
            className="email-btn"
          >
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>Daftar dengan Email</span>
          </button>
        </div>

        <div className="auth-footer">
          <p>
            Sudah punya akun? <Link to="/login" className="auth-link">Masuk</Link>
          </p>
          <p className="terms">
            Dengan mendaftar, Anda menyetujui <Link to="/terms" className="auth-link">Ketentuan Layanan</Link> dan <Link to="/privacy" className="auth-link">Kebijakan Privasi</Link> kami.
          </p>
        </div>
      </div>
    </div>
    <style>{`
      .auth-container {
        min-height: calc(100vh - 64px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        background: linear-gradient(to bottom, rgba(30, 41, 59, 0.2), rgba(15, 23, 42, 0.4)), 
                    url('/assets/images/crypto-pattern-bg.png');
        background-size: cover;
      }

      .auth-card {
        background: rgba(17, 25, 40, 0.8);
        backdrop-filter: blur(16px);
        border-radius: 16px;
        border: 1px solid rgba(66, 71, 112, 0.32);
        padding: 32px;
        width: 100%;
        max-width: 460px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }

      .auth-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .auth-header h1 {
        font-size: 24px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 8px;
        background: linear-gradient(90deg, #fff, #d6e3ff);
        -webkit-background-clip: text;
        color: transparent;
      }

      .auth-header p {
        color: #94a3b8;
        font-size: 15px;
      }

      .social-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
      }

      .social-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        background: rgba(255, 255, 255, 0.05);
        color: #e2e8f0;
        font-size: 14px;
        font-weight: 500;
        width: 100%;
        cursor: pointer;
        transition: all 0.2s;
      }

      .social-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
      }

      .icon {
        width: 20px;
        height: 20px;
        margin-right: 12px;
        fill: currentColor;
      }

      .google {
        color: #fff;
      }
      
      .google .icon {
        fill: #fff;
      }

      .facebook {
        color: #4267B2;
      }
      
      .twitter {
        color: #1DA1F2;
      }
      
      .linkedin {
        color: #0077b5;
      }

      .divider {
        display: flex;
        align-items: center;
        margin: 24px 0;
        color: #64748b;
      }

      .divider::before,
      .divider::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      }

      .divider span {
        margin: 0 16px;
        font-size: 14px;
      }

      .email-signup {
        margin-bottom: 24px;
      }

      .email-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 14px;
        background: linear-gradient(90deg, #2563eb, #7c3aed);
        border: none;
        border-radius: 12px;
        color: white;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        box-shadow: 0 6px 18px -6px rgba(59, 130, 246, 0.55);
      }

      .email-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px -6px rgba(59, 130, 246, 0.65);
        filter: brightness(1.05);
      }

      .auth-footer {
        text-align: center;
        font-size: 14px;
      }

      .auth-footer p {
        color: #94a3b8;
        margin-bottom: 8px;
      }

      .auth-link {
        color: #3b82f6;
        text-decoration: none;
        transition: all 0.2s;
      }

      .auth-link:hover {
        text-decoration: underline;
        color: #60a5fa;
      }

      .terms {
        font-size: 12px;
        color: #64748b;
        margin-top: 16px;
      }
    `}</style></>
  );
};

export default Register;
