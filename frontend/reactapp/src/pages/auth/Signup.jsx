import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { signupApi } from '../../api/authApi';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [payload, setPayload] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: '',
    role: 'APPLICANT'
  });
  const [error, setError] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newError = {};

    if (!payload.username.trim()) {
      newError.username = 'Username is required';
    } else if (payload.username.trim().length < 3) {
      newError.username = 'Username must be at least 3 characters long';
    }

    if (!payload.email.trim()) {
      newError.email = 'Email is required';
    }

    if (!payload.password.trim()) {
      newError.password = 'Password is required';
    } else if (payload.password.trim().length < 5) {
      newError.password = 'Password must be at least 5 characters long';
    }

    if (!payload.cpassword.trim()) {
      newError.cpassword = 'Confirm Password is required';
    } else if (payload.cpassword.trim() !== payload.password.trim()) {
      newError.cpassword = 'Passwords do not match';
    }

    if (!acceptedTerms) {
      setTermsError(true);
    } else {
      setTermsError(false);
    }

    setError(newError);
    return Object.keys(newError).length === 0 && acceptedTerms;
  };

  const handle = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await signupApi(payload);
      alert('Signup successful. Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: 'calc(100vh - 70px)',
          background: 'linear-gradient(120deg, #f5f7fa, #c3cfe2)',
          padding: '20px'
        }}
      >
        <Card
          className="shadow-lg rounded-4 p-4"
          style={{ maxWidth: 500, width: '100%' }}
        >
          <h3 className="fw-bold mb-4 text-center text-primary">Sign Up</h3>
          <Form onSubmit={handle}>
            {/* Username */}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={payload.username}
                onChange={e => {
                  setPayload({ ...payload, username: e.target.value });
                  if (error.username) setError({ ...error, username: '' });
                }}
                placeholder="Enter username"
                className="shadow-sm rounded-pill px-3 py-2"
              />
              {error.username && <div className="text-danger mb-2">{error.username}</div>}
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={payload.email}
                onChange={e => {
                  setPayload({ ...payload, email: e.target.value });
                  if (error.email) setError({ ...error, email: '' });
                }}
                placeholder="Enter email"
                className="shadow-sm rounded-pill px-3 py-2"
              />
              {error.email && <div className="text-danger mb-2">{error.email}</div>}
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  value={payload.password}
                  onChange={e => {
                    setPayload({ ...payload, password: e.target.value });
                    if (error.password) setError({ ...error, password: '' });
                  }}
                  placeholder="Enter password"
                  className="shadow-sm rounded-pill px-3 py-2"
                />
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '15px',
                    transform: 'translateY(-50%)',
                    padding: 0,
                    border: 'none'
                  }}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </Button>
              </div>
              {error.password && <div className="text-danger mb-2">{error.password}</div>}
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={payload.cpassword}
                  onChange={e => {
                    setPayload({ ...payload, cpassword: e.target.value });
                    if (error.cpassword) setError({ ...error, cpassword: '' });
                  }}
                  placeholder="Re-enter password"
                  className="shadow-sm rounded-pill px-3 py-2"
                />
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '15px',
                    transform: 'translateY(-50%)',
                    padding: 0,
                    border: 'none'
                  }}
                >
                  {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </Button>
              </div>
              {error.cpassword && <div className="text-danger mb-2">{error.cpassword}</div>}
            </Form.Group>
            
            {/* Terms & Conditions */}
            <Form.Group className="my-4">
              <Form.Check
                type="checkbox"
                label={
                  <>
                    I agree to the{' '}
                    <a href="/terms" className="text-primary">Terms & Conditions</a> and{' '}
                    <a href="/privacy" className="text-primary">Privacy Policy</a>
                  </>
                }
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
              {termsError && <div className="text-danger mb-2">Please accept Terms & Conditions and Privacy Policy</div>}
            </Form.Group>

            <Button
              type="submit"
              className="w-100 rounded-pill shadow-lg py-2"
              style={{ background: '#1e3c72', border: 'none' }}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <small>
              Already have an account?{' '}
              <a href="/login" className="text-primary fw-bold">Login</a>
            </small>
          </div>
        </Card>
      </div>
    </>
  );
}

