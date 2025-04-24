import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../config/url";

const Adddoc = () => {
    const [object, setObject] = useState([]);
    const ident = localStorage.getItem('identikay');
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [text, setText] = useState("");
    const [photo, setPhoto] = useState(null);

    if (localStorage.getItem('identikay') == null) {
        window.location.href = '/adminpanelforadmins';
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];  // Берем первое изображение
        if (file) {
            setPhoto(URL.createObjectURL(file)); // Сохраняем URL для предпросмотра
        }
    };

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

    const Ad = async () => {
        if (!email || !surname || !whatsapp) {
            if (name && lastname && phone && type) {
                let person = await axios({
                    method: "post",
                    url: `${domain}/api/doctorslist`,
                    params: {
                        name: name,
                        lastname: lastname,
                        surname: surname,
                        email: email,
                        numberwhat: whatsapp,
                        type: type,
                        number: phone,
                        photo: photo,
                    }
                });
                if (person != null) {
                    if (person.status >= 200 && person.status < 300) {
                        console.log('Успешно добалено');
                        window.location.href = `/doctors`;
                    }
                }
            } else {
                setText("Заполните все поля");
            }
        } else {
            setText("Заполните все поля");
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
        categories();
    }, []);
    return (
        <>
            <div className="container-fluid">
                <div className="row p-2">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <div className="mt-3">
                            <label htmlFor="lastname" className="form-label">Имя</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Имя врача" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="lastname" className="form-label">Фамилия</label>
                            <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" placeholder="Фамилия врача" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="lastname" className="form-label">Отчество</label>
                            <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" placeholder="Отчество врача" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="select">Выбрать тип врача</label>
                            <select className="form-control border border-dark rounded-0" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Все категории</option>
                                {category.map(i => (
                                    <option key={i.id} value={i.name}>{i.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="lastname" className="form-label">Номер</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Номер врача" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="lastname" className="form-label">Номер What's App</label>
                            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} type="text" placeholder="Номер What's App врача" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="lastname" className="form-label">Почта</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email врача" className="form-control border border-dark rounded-0" />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="photo" className="form-label">Фото доктора</label>
                            <input type="file" className="form-control" accept="image/*" onChange={handlePhotoChange} />
                        </div>
                        {photo && (
                            <div className="mt-3">
                                <img src={photo} alt="Doctor" className="img-thumbnail" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                            </div>
                        )}
                        <p className="mt-3 text-danger"><b>{text}</b></p>
                        <div className="text-center mt-3">
                            <button className="btn btn-success rounded-0 form-control" onClick={Ad}>Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Adddoc;