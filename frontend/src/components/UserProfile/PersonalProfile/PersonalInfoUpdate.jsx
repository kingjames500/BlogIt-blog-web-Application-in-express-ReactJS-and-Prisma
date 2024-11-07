import React from 'react'
import { Toaster, toast } from 'sonner';
import Title from '@/components/Title/Title';
import { useEffect, useState } from 'react';

import userDetailsStore from '@/Store/userDetailsStore';

function PersonalInfoUpdate() {

    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const user = userDetailsStore((state) => state.user);

    useEffect(() => {
        if (!user) return;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setUsername(user.username);
        setEmail(user.email);
    }, [user]);
  return (
      <div className="login-form-container">
          <form className="login-form">
              <Toaster richColors position="top-center" expand={true} />
              <div className="login-title">
                    <Title mainTitle="update personal info" />
              </div>
              <div className="form-group">
                  <label htmlFor="firstName" className="form-group-label">
                      {" "}
                      first name
                  </label>
                  <input
                      type="text"
                      className="form-group-input"
                      value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="last-name" className="form-group-label">
                      {" "}
                     last name
                  </label>
                  <input
                      type="text"
                      className="form-group-input"
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="username" className="form-group-label">
                      {" "}
                     username
                  </label>
                  <input
                      type="text"
                      className="form-group-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="email" className="form-group-label">
                      {" "}
                      email
                  </label>
                  <input
                      type="email"
                      className="form-group-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <button
                  className="login-btn"
              >
                update profile
              </button>
              
          </form>
      </div>
  );
}

export default PersonalInfoUpdate;