import axios from "axios";
import { domain } from "../config/url";
import { useEffect, useState } from "react";

const Services = () => {
    const [object, setObject] = useState([]);
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [doc, setDoc] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const ident = localStorage.getItem('identikay');

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
            url: `${domain}/api/services`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setData(person.data.services)
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

    let doctor = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/doctorslist`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setDoctors(person.data.doctorslist)
                console.log('Данные успешно получены', person);
            }
        }
    }

    const Ad = async () => {
        let person = await axios({
            method: "post",
            url: `${domain}/api/services`,
            params: {
                title: name,
                doctor: doc,
                category: type,
                price: price,
                description: description,
            }
        });
        if (person != null) {
            if (person.status >= 200 && person.status < 300) {
                console.log('Услуга успешно добавлена');
                list();
            }
        }
    };

    const filteredData = data.filter((i) => {
        const matchesCategory = filter ? i.type === filter : true;
        const searchTerm = search.toLowerCase();
        const matchesSearch = search ? (i.title.toLowerCase().includes(searchTerm)) : true;
        return matchesCategory && matchesSearch;
    });

    const Delete = async (id) => {
        const pred = window.confirm("Вы уверены что хотите удалить")
        if (pred) {
            let person = await axios({
                method: "delete",
                url: `${domain}/api/services/`,
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
        famous();
        list();
        categories();
        doctor();
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
                        <div className="col-2">
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Введите название услуги" type="text" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="col-2">
                            <select value={filter} onChange={e => setFilter(e.target.value)} className="form-control border border-dark rounded-0">
                                <option value="">Все категории</option>
                                {category.map(i => (
                                    <option key={i.id} value={i.name}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2">
                            <input placeholder="Мин цена" type="text" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="col-2">
                            <input placeholder="Макс цена" type="text" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn btn-success rounded-0 form-control" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить</button>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            <table className="table table-bordered border border-dark">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Название услуги</th>
                                        <th>Доктор</th>
                                        <th>Категория</th>
                                        <th>Цена</th>
                                        {/* <th>Длительность</th>
                                        <th>Рейтинг</th>
                                        <th>Кол-во услуг в день</th> */}
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length ? (
                                        filteredData.map(i => (
                                            <tr key={i.id}>
                                                <td><a href={"/servicesid/" + i.id} className="href">{i.id}</a></td>
                                                <td><a href={"/servicesid/" + i.id} className="href">{i.title}</a></td>
                                                <td>{i.doctor}</td>
                                                <td>{i.category}</td>
                                                <td>{i.price}</td>
                                                {/* <td>{i.timeservices}</td>
                                                <td>{i.rating}</td>
                                                <td>{i.numberorders}</td> */}
                                                <td><i class="fa-solid fa-trash text-danger" onClick={() => Delete(i.id)}></i></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Добавить новую услугу</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control border border-dark rounded-0" placeholder="Название услуги" />
                                        <label htmlFor="select">Выбрать тип врача</label>
                                        <select className="form-control border border-dark rounded-0" value={type} onChange={(e) => setType(e.target.value)}>
                                            <option value="">Все категории</option>
                                            {category.map(i => (
                                                <option key={i.id} value={i.name}>{i.name}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="select">Выбрать врача</label>
                                        <select className="form-control border border-dark rounded-0" value={doc} onChange={(e) => setDoc(e.target.value)}>
                                            <option value="">Все врачи</option>
                                            {doctors.map(i => (
                                                <option key={i.id} value={i.name}>{i.name}</option>
                                            ))}
                                        </select>
                                        <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="form-control border border-dark rounded-0 mt-3" placeholder="Цена услуги" />
                                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control rounded-0 mt-3 border border-dark" placeholder="Введите описание услуги" rows={10}></textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary rounded-0 form-control" data-bs-dismiss="modal">Закрыть</button>
                                        <button onClick={Ad} type="button" class="btn btn-primary rounded-0 form-control">Добавить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}
export default Services;