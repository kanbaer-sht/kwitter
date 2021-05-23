import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fbConf';

const Auth = () => {
    const [email, setEmail]             = useState("");
    const [password, setPassword]       = useState("");
    const [newAccount, setNewAccount]   = useState(true);
    const [error, setError]             = useState("");

    const onChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if(newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                );
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }

    const onSocialClick = async (e) => {
        let provider;
        
        if (e.target.name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (e.target.name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                name = "email"
                type="text" 
                placeholder="Email" 
                required 
                value={email} 
                onChange={onChange}
                />
                <input 
                name = "password"
                type="password" 
                placeholder="Password" 
                required 
                value={password} 
                onChange={onChange}
                />
                <input 
                type="submit" 
                value={newAccount ? "Create Account" : "Sign In"} 
                />
                {error}
            </form>
            <span onClick={toggleAccount} > {newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>    
        </div>
    );
}

export default Auth;