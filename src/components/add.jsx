import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";

const Add = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [users, setUsers] = useState([]);
    const [agreement, setAgreement] = useState(false);
    const [show, setShow] = useState(false);

    let famous = async () => {
        let person = await axios({
            method: "get",
            url: `http://api.com/api/usersdentist`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setUsers(person.data.usersdentist);
                console.log('Данные успешно получены', person);
                setShow(true);
            }
        }
    }

    const Ad = async (e) => {
        e.preventDefault();
        if (!email) {
            if (validator.isLength(name, { min: 2, max: 15 }) &&
                validator.isLength(lastname, { min: 2, max: 15 }) &&
                validator.isMobilePhone(phone) &&
                validator.isLength(surname, { min: 2, max: 15 })) {
                let person = await axios({
                    method: "post",
                    url: `http://api.com/api/usersdentist`,
                    params: {
                        name: name,
                        lastname: lastname,
                        surname: surname,
                        number: phone,
                        agreement: true,
                    }
                });
                console.log(person);
                if (person != null) {
                    if (person.status >= 200 && person.status < 300) {
                        console.log('Успешно добавлено');
                        if (person.data.id) {
                            localStorage.setItem('ident', person.data.id);
                            // window.location.href = `/request/${person.data.id}`;
                        }
                    }
                }
            } else {
                setText("Введите данные как следует");
            }
        }
        else if (email) {
            const emailOshIbka = users.some((i) => i.email === email);
            if (emailOshIbka) {
                alert("Пользователь с таким email уже существует");
            } else {
                if (validator.isLength(name, { min: 2, max: 15 }) &&
                    validator.isLength(lastname, { min: 2, max: 15 }) &&
                    validator.isLength(surname, { min: 2, max: 15 }) &&
                    validator.isMobilePhone(phone) &&
                    validator.isEmail(email)) {
                    let person = await axios({
                        method: "post",
                        url: `http://api.com/api/usersdentist`,
                        params: {
                            name: name,
                            lastname: lastname,
                            surname: surname,
                            number: phone,
                            email: email,
                            agreement: agreement,
                        }
                    });
                    console.log(person);

                    if (person != null) {
                        if (person.status >= 200 && person.status < 300) {
                            console.log('Успешно добавлено');
                            if (person.data.id) {
                                localStorage.setItem('ident', person.data.id);
                                // window.location.href = `/request/${person.data.id}`;
                                alert("Заявка успешно отправлена");
                                setShow(false);
                            }
                        }
                    }
                } else {
                    setText("Введите данные как следует");
                }
            }
        }
    }

    useEffect(() => {
        famous();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            src="https://e7.pngegg.com/pngimages/977/78/png-clipart-tooth-dentist-animal-bite-others-love-miscellaneous-thumbnail.png"
                            className="rounded"
                            width={30}
                            alt="Dentist"
                        />
                        DENTIST
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Главная</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Услуги</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Тур по системе</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Цены</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Вопросы и поддержка</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Отзывы</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Блог</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Контакты</a>
                            </li>
                        </ul>
                    </div>
                    <a href="/admin"><i class="fa-solid fa-user border border-1 border-secondary rounded-circle p-3"></i></a>
                </div>
            </nav>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12 col-md-3 mb-4">
                        <div className="list-group">
                            <h5><b>Быстрый старт</b></h5>
                            <a href="#" className="list-group-item ali">Обзор интерфейса</a>
                            <a href="#" className="list-group-item ali">Вход в систему</a>
                            <a href="#" className="list-group-item ali">Настройка программы</a>
                            <a href="#" className="list-group-item ali">Создание персонала</a>
                            <a href="#" className="list-group-item ali">Создание услуги (прайса)</a>
                            <a href="#" className="list-group-item ali">Добавление расходных материалов</a>
                            <a href="#" className="list-group-item ali">Запись пациента на прием</a>
                            <a href="#" className="list-group-item ali">Проведение лечения</a>
                            <h5><b>Описание модулей</b></h5>
                            <a href="#" className="list-group-item ali">Модуль "Календарь"</a>
                            <a href="#" className="list-group-item ali">Модуль "Пациенты"</a>
                            <a href="#" className="list-group-item ali">Модуль "Персонал"</a>
                            <a href="#" className="list-group-item ali">Модуль "Услуги"</a>
                            <a href="#" className="list-group-item ali">Модуль "Склад"</a>
                            <a href="#" className="list-group-item ali">Модуль "Отчеты"</a>
                            <a href="#" className="list-group-item ali">Модуль "Бухгалтерия"</a>
                            <a href="#" className="list-group-item ali">Модуль "Касса"</a>
                            <a href="#" className="list-group-item ali">Модуль "Страховка"</a>
                            <a href="#" className="list-group-item ali">Модуль "Шаблоны"</a>
                            <a href="#" className="list-group-item ali">Модуль "Маркетинг"</a>
                            <a href="#" className="list-group-item ali">Модуль "CRM"</a>
                            <a href="#" className="list-group-item ali">Модуль "Бонусная система"</a>
                        </div>
                    </div>
                    <div className="col-12 col-md-8">
                        <p>
                            В меню тура по системе вы можете выбрать соответствующий пункт и ознакомиться с возможностями каждой функции программы...
                        </p>
                        <p>
                            Программа Dentist Plus разработана с учетом всех потребностей современной стоматологической практики, обеспечивая удобство и простоту использования...
                        </p>
                        <img
                            src="https://dentist-plus.com/kcfinder/upload/images/dentist-plus-zubnaya-formula.png"
                            alt="Dentist Plus"
                            className="img-fluid"
                        />
                        <p>
                            Присоединяйтесь к нам и узнайте, как Dentist Plus может улучшить работу вашей стоматологической клиники!
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-5 color-1">
                <div className="row">
                    <div className="col-1"></div>
                    {show ? (
                        <div className="col-10">
                            <h2 className="mt-4">Оставьте заявку</h2>
                            <form>
                                <div className="mt-3">
                                    <label htmlFor="lastname" className="form-label">Фамилия</label>
                                    <input type="text" className="form-control border border-dark" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Введите фамилию" />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="name" className="form-label">Имя</label>
                                    <input type="text" className="form-control border border-dark" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите имя" />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="surname" className="form-label">Отчество</label>
                                    <input type="text" className="form-control border border-dark" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Введите отчество" />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="phone" className="form-label">Номер телефона</label>
                                    <input type="text" className="form-control border border-dark" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Введите номер" required />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="email" className="form-label">Почта (необязательно)</label>
                                    <input type="email" className="form-control border border-dark" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите email" />
                                </div>
                                <div className="mt-3">
                                    <input type="checkbox" id="agreement" checked={agreement} onChange={(e) => setAgreement(e.target.checked)} />
                                    <label htmlFor="agreement" className="ms-2">Подтверждаю согласие на обработку персональных данных</label>
                                </div>
                                <p className="mt-3 text-danger"><b>{text}</b></p>
                                <div className="col-12 mt-3 text-center">
                                    <button type="submit" onClick={Ad} className="btn btn-primary mb-3 border border-dark border-3" disabled={!agreement}>
                                        Отправить
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="col-12 text-center bg-success p-5">
                            <i class="fa-solid fa-check fa-5x border border-5 rounded-circle p-5"></i>
                            <p className="mt-5"><b>В ближайшие время с вами свяжется менеджер.</b></p>
                        </div>
                    )}
                </div>
            </div>
            <div className="container-fluid bg-dark text-white qwerty">
                <div className="row">
                    <div className="col-12 text-center">
                        <h2 className="mt-5" onClick={() => setShow(!show)}>Наши контакты</h2>
                        <p>г. Ташкент, ул. Амир Темур, 15</p>
                        <p>Телефон: +998 99 999 99 99</p>
                        <p>Email:,/</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add;
