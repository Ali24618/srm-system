import axios from "axios";
import { useEffect, useState } from "react";

const Admin = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [object, setObject] = useState([]);

    let famous = async () => {
        let person = await axios({
            method: "get",
            url: `http://api.com/api/admindentist`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setObject(person.data.admindentist)
                console.log('Данные успешно получены', person);
            }
        }
    }
    const LogIn = async () => {
        let response = await axios({
            method: "get",
            url: `http://api.com/api/admindentist`,
        })
        const users = response.data.admindentist;
        const logIn = users.filter(i => i.login === login && i.password === password);
        if (logIn.length > 0) {
            localStorage.setItem('ident', logIn[0].id);
            window.location.href = `/home/${logIn[0].id}`;
        } else {
            alert('Неправильный пароль или почта')
        }
    }
    useEffect(() => {
        famous();
    }, []);
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center mt-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="display-4">Login</h1>
                        <pre><p className="lead mt-5">Войти с помощью гугл <i class="fa-brands fa-google"></i></p></pre>
                        <a href="/register" className="href lead"><p>У вас нету аккаунта?</p></a>
                    </div>
                    <div className="col-12 col-md-6 col-lg-12 mt-3">
                        <div className="card shadow-lg p-4">
                            <div className="mb-4">
                                <label htmlFor="pochta" className="form-label">Email</label>
                                <input type="email" className="form-control border border-dark" id="pochta" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Enter your email" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="parol" className="form-label">Password</label>
                                <input type="text" className="form-control border border-dark" id="parol" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                            </div>
                            <button onClick={LogIn} type="submit" className="btn btn-primary w-100 py-2">
                                Login
                            </button>
                            <div className="mt-4 lead text-center">
                                <a href="/register" className="href"><p>Забыли пароль</p></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Admin;