import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../config/url";

const Doctors = () => {
    const ident = localStorage.getItem('identikay');
    const [object, setObject] = useState([]);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    if (localStorage.getItem('identikay') == null) {
        window.location.href = '/adminpanelforadmins';
    }

    const famous = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/admindentist`,
        });
        const user = person.data.admindentist.find(user => user.id === ident);
        if (user) {
            setObject(user);
        }
    }
    let list = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/doctorslist`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setData(person.data.doctorslist)
                console.log('Данные успешно получены', person);
            }
        }
    }
    let categories = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/category`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setCategory(person.data.category)
                console.log('Данные успешно получены', person);
            }
        }
    }
    // const filteredData = filter ? data.filter(doc => doc.type === filter) : data Только для отдельных категорий;

    const filteredData = data.filter(doc => {
        const matchesCategory = filter ? doc.type === filter : true;
        const searchTerm = search.toLowerCase();
        const matchesSearch = search ? (doc.name.toLowerCase().includes(searchTerm) || doc.lastname.toLowerCase().includes(searchTerm)) : true;
        return matchesCategory && matchesSearch;
    });

    const Delete = async (id) => {
        const pred = window.confirm("Вы уверены что хотите удалить")
        if (pred) {
            let person = await axios({
                method: "delete",
                url: `${domain}/api/doctorslist/`,
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
        categories();
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
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-4">
                            <select
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                                className="form-select mt-2 border border-dark">
                                <option value="">Все категории</option>
                                {category.map(i => (
                                    <option key={i.id} value={i.name}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-4">
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск" className="form-control mt-2 border border-dark" />
                        </div>
                        <div className="col-2">
                            <a href="/adddoc"><button className="btn btn-success form-control rounded-0 mt-2">Добавить Врача</button></a>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10 text-center">
                            <table className="table table-bordered border border-dark">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Имя</th>
                                        <th>Фамилия</th>
                                        <th>Отчество</th>
                                        <th>Тип врача</th>
                                        <th>Номер</th>
                                        <th>Номер What's App</th>
                                        <th>Email</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length ? (
                                        filteredData.map(i => (
                                            <tr key={i.id}>
                                                <td><a href={"/doclist/" + i.id} className="href">{i.id}</a></td>
                                                <td><a href={"/doclist/" + i.id} className="href">{i.name}</a></td>
                                                <td>{i.lastname}</td>
                                                <td>{i.surname}</td>
                                                <td>{i.type}</td>
                                                <td>{i.number}</td>
                                                <td>{i.numberwhat}</td>
                                                <td>{i.email}</td>
                                                <td><i class="fa-solid fa-trash text-danger" onClick={() => Delete(i.id)}></i></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">Нет данных</td>
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
export default Doctors;