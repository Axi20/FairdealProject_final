import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { addUserData } from "../redux/userData.js";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import '../scss/LoginPage/login_page.scss';


function LoginPage() {
  const isLoggedIn = useSelector(state => state.userData.IsLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  const [error, setError] = useState('');

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
       
        try {
          axios.post('http://127.0.0.1:8080/login', {
            email: email,
            password: password
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => {
              if (!res.data.token) {
                setError('Hibás email cím vagy jelszó!');
                throw new Error('Login failed');
              }
              //Save the token to the local storage
              console.log('Login success \n Token generated success');
              window.location.href = '/';
              localStorage.setItem('jwt', res.data.token);
              const payload = jwtDecode(res.data.token);
              const userID = localStorage.setItem('ID', payload._id);
              localStorage.setItem('isLoggedIn', true);
              dispatch(addUserData());
            });
        } catch (err) {
          setError(err);
        }
      }

    return (
        <section className="login">
            <div className="external-container">
              <div className="form-container">
                <h1 className="form-container__title">Bejelentkezés</h1>
                <form onSubmit={handleSubmit}>
                  <input type="email" name="email" id="email" required placeholder="Email cím" />
                  <input type="password" name="password" id="password" required placeholder="Jelszó" />
                  {error && <div className="error">{error}</div>}
                  <label><a className="no-account" href="./registration">Nincs még fiókod? Regisztrálj!</a></label> 
                  <button name="login" id="login" type="submit">Bejelentkezés</button>
                </form>
              </div>
              <div className="image-container"></div>
            </div>
        </section>
    )
}

export default LoginPage;