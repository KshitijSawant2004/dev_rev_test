import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { weLogin, weSetUserAttributes, weTrack } from '../lib/webengage';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const { login } = useStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in Name and Email');
      return;
    }

    // ✅ Use a safe userId (avoid special chars like @ .)
    const safeUserId = `user_${btoa(formData.email).replace(/=+/g, "")}`;

    // 1) Store locally
    login({ ...formData, id: safeUserId });

    // ✅ 2) WebEngage: login FIRST
    weLogin(safeUserId);

    // ✅ 3) Zipy: Identify User for Session Replay
    if (window.zipy) {
      window.zipy.identify(safeUserId, {
        email: formData.email,
        name: formData.name
      });
    }

    // ✅ 4) Set system attributes (use correct values)
    weSetUserAttributes({
      email: formData.email,
      first_name: formData.name,
      phone: formData.phone.replace(/\D/g, ""),
      user_type: "customer"
    });

    // ✅ 4) Track login event LAST (so it’s tied to known user)
    weTrack("Login Success", { method: "Email" });

    navigate('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h1>Login</h1>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="John Doe"
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+1234567890"
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
