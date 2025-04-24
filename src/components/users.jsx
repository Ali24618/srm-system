import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const Users = () => {
    const ident = localStorage.getItem('ident');
    const [data, setData] = useState([]);
    const [object, setObject] = useState([]);
    const [category, setCategory] = useState([]);
    const [filter, setFilter] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [processlng, setProcesslng] = useState(false);
    const [show, setShow] = useState(false);

    let param = useParams();

    let famous = async () => {
        let person = await axios({
            method: "get",
            url: `http://api.com/api/usersdentist/${param.id}`,
        })
        if (person != null) {
            if (person.status === 200) {
                setData(person.data.usersdentist)
                console.log('Данные успешно получены 1', person);
            }
        }
    }
    let list = async () => {
        let person = await axios({
            method: "get",
            url: `http://api.com/api/doctorslist`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setObject(person.data.doctorslist)
                console.log('Данные успешно получены', person);
            }
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

    const filteredData = filter ? object.filter(doc => doc.type === filter) : object

    const Puut = async () => {
        let response = await axios({
            method: "get",
            url: `http://api.com/api/admindentist`,
        })
        const users = response.data.admindentist;
        const logIn = users.filter(i => i.id === ident);

        let person = await axios.put(`http://api.com/api/usersdentist/${param.id}`, {
            name: name || data.name,
            lastname: lastname || data.lastname,
            surname: surname || data.surname,
            number: number || data.number,
            email: email || data.email,
            description: description || data.description,
            processlng: processlng || data.processlng,
        });
        console.log('Работает запрос');
        if (person.status === 200) {
            console.log('Успешно изменено', person);
            setShow(true);
            setTimeout(() => {
                window.location.href = `/home/${logIn[0].id}`;
            }, 2000);
        }
    };
    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };
    useEffect(() => {
        famous();
        list();
        categories();
    }, []);
    return (
        <>
            {data != null ?
                <div className="container-fluid py-4">
                    {/* Уведомление об успешном сохранении */}
                    {show && (
                        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                            <strong>Успешно!</strong> Данные были сохранены.
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}

                    {/* Карточка клиента */}
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-8 col-lg-6">
                            <div className="card shadow-sm">
                                <div className="card-header bg-light">
                                    <h4 className="mb-0">Клиент: {data.name}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row mb-4">
                                        <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="processStatus"
                                                    checked={processlng}
                                                    onChange={(e) => setProcesslng(e.target.checked)}
                                                />
                                                <label className="form-check-label" htmlFor="processStatus">Обработано</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Имя</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                            placeholder={data.name}
                                            value={name}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Фамилия</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setLastname(e.target.value)}
                                            className="form-control"
                                            placeholder={data.lastname}
                                            value={lastname}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Отчество</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setSurname(e.target.value)}
                                            className="form-control"
                                            placeholder={data.surname}
                                            value={surname}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Номер</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setNumber(e.target.value)}
                                            className="form-control"
                                            placeholder={data.number}
                                            value={number}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Почта</label>
                                        <input
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            placeholder={data.email}
                                            value={email}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Описание</label>
                                        <textarea
                                            className="form-control"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows="3"
                                            placeholder={data.description === null ? "Введите текст..." : data.description}
                                        ></textarea>
                                    </div>
                                    <button
                                        onClick={Puut}
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Секция перенаправления */}
                    <div className="row justify-content-center mb-2" id="redirect-section">
                        <div className="col-md-8">
                            <div className="card shadow-sm">
                                <div className="card-header bg-light">
                                    <h5 className="mb-0">Выберите получателя</h5>
                                </div>
                                <div className="card-body">
                                    <p className="text-center mb-4">
                                        Нажмите на номер, на который вы хотите отправить данные клиента
                                    </p>

                                    <div className="mb-4">
                                        <select
                                            value={filter}
                                            onChange={e => setFilter(e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="">Все категории</option>
                                            {category.map(i => (
                                                <option key={i.id} value={i.name}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead className="bg-light">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Имя</th>
                                                    <th>Фамилия</th>
                                                    <th>Тип</th>
                                                    <th>WhatsApp</th>
                                                    <th>Номер</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData.length ? (
                                                    filteredData.map(i => (
                                                        <tr key={i.id}>
                                                            <td>
                                                                <a href={`/doclist/${i.id}`} className="text-decoration-none">
                                                                    {i.id}
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <a href={`/doclist/${i.id}`} className="text-decoration-none">
                                                                    {i.name}
                                                                </a>
                                                            </td>
                                                            <td>{i.lastname}</td>
                                                            <td>{i.type}</td>
                                                            <td>{i.numberwhat}</td>
                                                            <td>
                                                                <a
                                                                    href={`https://web.whatsapp.com/send?phone=${i.number}&text=${encodeURIComponent(
                                                                        `Имя: ${data.name}\nФамилия: ${data.lastname}\nОтчество: ${data.surname}\nНомер: ${data.number}\nПочта: ${data.email}\nОписание: ${data.description}`
                                                                    )}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-sm btn-outline-success"
                                                                >
                                                                    <i className="fa-brands fa-whatsapp me-1"></i>
                                                                    {i.number}
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="text-center py-4 text-muted">
                                                            Нет данных
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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
export default Users;