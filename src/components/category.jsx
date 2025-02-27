import axios from "axios";
import { useEffect, useState } from "react";

const Category = () => {
    const [object, setObject] = useState([]);
    const ident = localStorage.getItem('ident');
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");

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

    let categories = async () => {
        let person = await axios({
            method: "get",
            url: `http://api.com/api/category`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setCategory(person.data.category)
                console.log('Данные успешно получены', person);
            }
        }
    }
    const Click = async () => {
        let person = await axios({
            method: "post",
            url: `http://api.com/api/category`,
            params: {
                name: name,
            }
        });
        if (person != null) {
            if (person.status >= 200 && person.status < 300) {
                categories();
                console.log('Успешно добалено');
            }
        }
    };

    const Delete = async (id) => {
        const pred = window.confirm("Вы уверены что хотите удалить")
        if (pred) {
            let person = await axios({
                method: "delete",
                url: `http://api.com/api/category/`,
                params: {
                    id: id,
                },
            });
            console.log('Работает удаление', person);
            if (person != null) {
                if (person.status === 200) {
                    categories();
                    console.log('Удалено');
                }
            }
        }
    }

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
        famous();
        categories();
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
                    <div className="row p-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-8">
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Введите название категории" className="form-control border border-dark rounded-0"/>
                        </div>
                        <div className="col-lg-2">
                            <button onClick={Click} className="btn btn-success rounded-0 form-control">Добавить</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            <table className="table table-bordered border border-dark">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Имя</th>    
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.length ? (
                                        category.map(i => (
                                            <tr key={i.id}>
                                                <td>{i.id}</td>
                                                <td>{i.name}</td>
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
export default Category;