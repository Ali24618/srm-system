import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
    const ident = localStorage.getItem('ident');
    const [object, setObject] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [datefilter, setDateFilter] = useState("");

    const famous = async () => {
        let person = await axios({
            method: "get",
            url: `http://api.com/api/admindentist`,
        });
        const user = person.data.admindentist.find(user => user.id === ident);
        if (user) {
            setObject(user);

        }
    }
    let list = async () => {
        let person = await axios({
            method: "get",
            url: `http://api.com/api/usersdentist`,
        })
        if (person != null) {
            if (person.status == 200) {
                setData(person.data.usersdentist)
                console.log('Данные успешно получены', person);
            }
        }
    }
    const Delete = async (id) => {
        const pred = window.confirm("Вы уверены что хотите удалить")
        if (pred) {
            let person = await axios({
                method: "delete",
                url: `http://api.com/api/usersdentist/`,
                params: {
                    id: id,
                },
            });
            console.log('Работает удаление', person);
            if (person != null) {
                if (person.status === 200) {
                    list();
                    console.log('Удалено');
                }
            }
        }
    }

    // const filteredData = data.filter((i) => {
    //     const filterprocessing = i.processlng === null ? "false" : "true";
    //     const matchesProcessing = filter ? filterprocessing === filter : true;
    //     const searchTerm = search.toLowerCase();
    //     const matchesSearch = search ? ((i.name || "").toLowerCase().includes(searchTerm) || (i.lastname || "").toLowerCase().includes(searchTerm) || (i.number || "").toLowerCase().includes(searchTerm)) : true;
    //     return matchesSearch && matchesProcessing;
    // });

    const getProcessingStatus = (processlng) => processlng === null ? "false" : "true";

    const resetTime = (date) => { return new Date(date.getFullYear(), date.getMonth(), date.getDate()); };

    const filteredData = data.filter((doc) => {
        const filterprocessing = getProcessingStatus(doc.processlng);
        const matchesProcessing = filter ? filterprocessing === filter : true;
        const searchTerm = search.toLowerCase();
        const matchesSearch = search
            ? (
                (doc.name || "").toLowerCase().includes(searchTerm) ||
                (doc.lastname || "").toLowerCase().includes(searchTerm) ||
                (doc.number || "").toLowerCase().includes(searchTerm)
            )
            : true;
        let matchesDate = true;
        if (datefilter) {
            const createdDate = new Date(doc.created_date);
            if (isNaN(createdDate.getTime())) {
                matchesDate = false;
            } else {
                const recordDate = resetTime(createdDate);
                const today = resetTime(new Date());
                let days;
                if (datefilter === "lasthour") {
                    matchesDate = new Date() - createdDate <= 3600000;
                } else if (datefilter === "last3day") days = 3;
                else if (datefilter === "last7day") days = 7;
                else if (datefilter === "last30day") days = 30;
                else days = 0;
                if (days) {
                    const pastDate = new Date(today);
                    pastDate.setDate(today.getDate() - days);
                    matchesDate = recordDate >= pastDate;
                }
            }
        }
        return matchesProcessing && matchesSearch && matchesDate;
    });

    const User = async () => {
        let response = await axios({
            method: "get",
            url: `http://api.com/api/admindentist`,
        })
        const users = response.data.admindentist;
        const logIn = users.filter(i => i.id === ident);
        window.location.href = `/home/${logIn[0].id}`;
    }

    useEffect(() => {
        list();
        famous();
    }, []);
    return (
        <>
            {object != null ?
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
                                </ul>
                                <span className="navbar-text">
                                    <b>{object.login}</b>
                                </span>
                            </div>
                        </div>
                    </nav>
                    {/* Фильтр с помощью
                    Имени
                    Фамилии
                    Номеру
                    Обработка через sellect и all */}
                    <div className="row mt-3">
                        <div className="col-1"></div>
                        <div className="col-4">
                            <input type="text" className="form-control border border-dark rounded-0" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <div className="col-3">
                            <select className="form-select border border-dark rounded-0" value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="">Все</option>
                                <option value="true">Обработано</option>
                                <option value="false">Не обработано</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <select value={datefilter} onChange={(e) => setDateFilter(e.target.value)} className="form-select border border-dark rounded-0">
                                <option value="">Все</option>
                                <option value="lasthour">Последний час</option>
                                <option value="last3day">Последние 3 дня</option>
                                <option value="last7day">Последние 7 дней</option>
                                <option value="last30day">Последние 30 дней</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            <table className="table table-bordered border border-dark">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Имя</th>
                                        <th>Фамилия</th>
                                        <th>Отчество</th>
                                        <th>Номер</th>
                                        <th>Почта</th>
                                        <th>Дата</th>
                                        <th>Обработка</th>
                                        <th>Согласие</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length ? (
                                        filteredData.filter((i) => i.agreement === "true").map((i) => (
                                            <tr key={i.id}>
                                                <td><a href={"/users/" + i.id} className="href">{i.id}</a></td>
                                                <td><a href={"/users/" + i.id} className="href">{i.name}</a></td>
                                                <td>{i.lastname}</td>
                                                <td>{i.surname}</td>
                                                <td>{i.number}</td>
                                                <td>{i.email}</td>
                                                <td>{i.created_date}</td>
                                                <td className="text-center">{i.agreement === "true" ? "✓" : "✗"}</td>
                                                <td>{i.processlng === null ? "Не обработано" : "Обработано"}</td>
                                                <td><i class="fa-solid fa-trash text-danger" onClick={() => Delete(i.id)}></i></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">Нет данных</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}
export default Home;