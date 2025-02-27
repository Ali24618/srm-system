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
                <div className="container-fluid mt-4">
                    <div className="row justify-content-center">
                        {show ? (
                            <div className="col-12 text-center pos p-5">
                                <h1 className="block">Успешно</h1>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        <div className="col-md-8 col-lg-6">
                            <div className="card shadow-lg">
                                <div className="card-header text-center bg-primary text-white">
                                    <h2>Клиент <b>{data.name}</b></h2>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            Обработанно
                                            <div class="checkbox-con">
                                                <input checked={processlng} value={processlng} onChange={(e) => setProcesslng(e.target.checked)} id="checkbox" type="checkbox" />
                                            </div>
                                        </div>
                                        <div className="col-6 text-center">
                                            <button className="btn btn-primary rounded-0 shadow-lg" onClick={scrollToBottom}>Перенаправить</button>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Имя</label>
                                        <input type="text" onChange={(e) => setName(e.target.value)} className="form-control border-0 spe" placeholder={data.name} value={name} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Фамилия</label>
                                        <input type="text" onChange={(e) => setLastname(e.target.value)} className="form-control border-0 spe" placeholder={data.lastname} value={lastname} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Отчество</label>
                                        <input onChange={(e) => setSurname(e.target.value)} type="text" className="form-control border-0 spe" placeholder={data.surname} value={surname} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Номер</label>
                                        <input onChange={(e) => setNumber(e.target.value)} type="text" className="form-control border-0 spe" placeholder={data.number} value={number} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Почта</label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control border-0 spe" placeholder={data.email} value={email} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Описание</label>
                                        <textarea className="form-control spe" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder={data.description === null ? "Введите текст..." : data.description}></textarea>
                                    </div>
                                    <button onClick={Puut} type="submit" className="btn btn-primary w-100">Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-2 mt-5"></div>
                        <div className="col-8 mt-5">
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
                    </div>
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6 text-center p-3">Нажмите на номер на который вы хотите отправить данные клиента</div>
                    </div>
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <table className="table table-bordered border border-dark mt-3">
                                <div className="responsive-table">
                                    <table>
                                        <thead>
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
                                                        <td data-label="ID"><a href={`/doclist/${i.id}`} className="href">{i.id}</a></td>
                                                        <td data-label="Имя"><a href={`/doclist/${i.id}`} className="href">{i.name}</a></td>
                                                        <td data-label="Фамилия">{i.lastname}</td>
                                                        <td data-label="Тип">{i.type}</td>
                                                        <td data-label="Номер">{i.numberwhat}</td>
                                                        <td data-label="WhatsApp">
                                                            <a href={`https://web.whatsapp.com/send?phone=${i.number}&text=${encodeURIComponent(
                                                                `Имя: ${data.name}\nФамилия: ${data.lastname}\nОтчество: ${data.surname}\nНомер: ${data.number}\nПочта: ${data.email}\nОписание: ${data.description}`
                                                            )}`} target="_blank" rel="noopener noreferrer">
                                                                {i.number}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Нет данных</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
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
export default Users;