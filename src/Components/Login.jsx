import React, { useState,useEffect } from "react";
import { Link ,useHistory } from "react-router-dom";
import "../Styles/Login.css";
import {auth } from "../firebase.js"
import { useDispatch } from "react-redux";


const Login = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null)



    console.log(user)

    const signIn = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    history.push("/")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });

        
    }
    const register =(e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log(user)
          if(user){
              history.push("/")
          }
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
          alert(errorMessage)
        });

    }

	return (
		<div className="login">
			<Link to="/">
				<img
					className="login__logo"
					src="https://pngimg.com/uploads/amazon/amazon_PNG7.png"
					alt=""
				/>
			</Link>
			<div className="login__container">

        <h1>Sign in</h1>
        <form >
            <h5>Email</h5>
            <input  value={email} onChange={(e)=>setEmail(e.target.value)} type="email"  />
            <h5>password</h5>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}  type="password"  />
            <button type="submit" onClick={signIn} className="login__signInButton">sign in</button>
        </form>
        <p>
            by signing in  you agree to Amazon CLones conditions of use & sale.please see our privacy Notice, our cookies notice and our Interest based ads notice
        </p>

<button onClick={register} className="login__registerButton">Create your Amazon Account</button>
            </div>
		</div>
	);
};

export default Login;
