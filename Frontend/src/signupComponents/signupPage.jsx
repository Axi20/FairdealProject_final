import { useState } from "react"
import axios from 'axios';
import '../scss/SignupPage/signup_page.scss';


function SignupPage() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone_number] = useState("")
    const [driving_licence, setDriving_licence] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
      e.preventDefault()

      try {
        const response = await axios.post('http://127.0.0.1:8080/registration', {
          firstname,
          lastname,
          email,
          phone_number,
          driving_licence,
          password
        });
          
        const user = response.data;
          window.location.href = '/login';
      } catch (error) {
          if (error.response) {
            //The request was made and the server responded with a status code
            setError(error.response.data.error || 'Hiba történt a regisztráció közben, kérjük próbálja meg újra!');
          } else if (error.request) {
            //The request was made but no response was received
            setError('Hiba történt a regisztráció közben, kérjük próbálja meg újra!');
          } else {
            //Something happened in setting up the request that triggered an Error
            setError('Hiba történt a regisztráció közben, kérjük próbálja meg újra!');
          }
        }  
    }

    return (
        <section className='signup'>
            <div className="external-container">
                <div className="form-container">
                    <h1 className="form-container__title">Regisztráció</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="firstname" id="firstname" placeholder="Vezetéknév" required  onChange={(e) => setFirstname(e.target.value)} value={firstname} />
                        <input type="text" name="lastname" id="lastname" placeholder="Keresztnév" required onChange={(e) => setLastname(e.target.value)} value={lastname} />
                        <input type="email" name="email" id="email" placeholder="Email cím" required onChange={(e) => setEmail(e.target.value)} value={email} />
                        <input type="text" name="phone" id="phone" placeholder="Telefonszám" required onChange={(e) => setPhone_number(e.target.value)} value={phone_number} />
                        <input type="text" name="licence" id="licence" placeholder="Jogosítvány szám" onChange={(e) => setDriving_licence(e.target.value)} value={driving_licence} />
                        <input type="password" name="password" id="password" placeholder="Jelszó" onChange={(e) => setPassword(e.target.value)} value={password} />
                        <div className="error">{error}</div>
                        <label><a className="have-account" href="./login">Már van fiókod? Bejelentkezés</a></label> 
                        <button name="signup" id="signup" type="submit">Regisztráció</button>
                    </form>
                    <div className='terms-and-conditions'>
                        <small className='terms-and-conditions__description'>Oldalunkra való regisztrációjával Ön elfogadja az Általános szerződési feltételeinket,
                            továbbiakban <a href='/terms-and-conditions'>ÁSZF</a>, valamint az <a href='/privacy-policy'>adatkezelési nyilatkozatot</a>.
                        </small>
                    </div>
                </div>
                <div className="image-container"></div>
            </div>
        </section>
    )
}

export default SignupPage;

