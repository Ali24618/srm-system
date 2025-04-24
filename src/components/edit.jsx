import axios from "axios";
import { domain } from "../config/url";
import { useEffect, useState } from "react";
import { div } from "framer-motion/client";

const Edit = () => {
    const [data, setData] = useState([]);
    const ident = localStorage.getItem('identikay');
    const [object, setObject] = useState([]);
    const [texts, setTexts] = useState({});


    let famous = async () => {
        try {
            const person = await axios.get(`${domain}/api/texts`);
            if (person.status === 200) {
                const fetchedTexts = person.data.texts;
                setData(fetchedTexts);

                const textsObj = {};
                fetchedTexts.forEach(item => {
                    textsObj[item.id] = item.text;
                });
                setTexts(textsObj);
            }
        } catch (err) {
            console.error('Ошибка при получении текстов', err);
        }
    };

    const lol = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/admindentist`,
        });
        const user = person.data.admindentist.find(user => user.id === ident);
        if (user) {
            setObject(user);
        }
    }

    const Puut = async (id) => {
        try {
            const person = await axios.put(`${domain}/api/texts/${id}`, {
                text: texts[id],
            });

            if (person.status === 200) {
                console.log(`Текст с ID ${id} успешно обновлён`);
            }
        } catch (err) {
            console.error(`Ошибка обновления текста с ID ${id}`, err);
        }
    };

    const User = async () => {
        let response = await axios({
            method: "get",
            url: `${domain}/api/admindentist`,
        })
        const users = response.data.admindentist;
        const logIn = users.filter(i => i.id === ident);
        window.location.href = `/home/${logIn[0].id}`;
    }

    useEffect(() => {
        famous();
        lol();
    }, []);

    return (
        <>
            {data != null ? (
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg ">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Админ-Панель</a>
                            <button className="navbar-toggler"
                                type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span></button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/category">Категория</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={User} style={{ cursor: "pointer" }}>Заявки</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/doctors">Список Докторов</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/services">Услуги</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/reviews">Отзывы</a>
                                    </li>
                                </ul>
                                <span className="navbar-text">
                                    <b>{object.login}</b>
                                </span>
                            </div>
                        </div>
                    </nav>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <button onClick={Puut}>Сохранить</button>
                                </td>
                            </tr>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={texts[item.id] || ""}
                                            onChange={(e) =>
                                                setTexts((prev) => ({
                                                    ...prev,
                                                    [item.id]: e.target.value,
                                                }))
                                            }
                                            placeholder={item.text}
                                        />
                                        <button onClick={() => Puut(item.id)}>
                                            Сохранить
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            ) : (
                <table>
                    <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Edit;