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
            <div className="bg-dark text-white py-2">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <small><i className="fa-solid fa-phone me-2"></i>+7 (999) 123-45-67</small>
                        <small className="ms-3"><i className="fa-solid fa-envelope me-2"></i>info@hotlinesupport.com</small>
                    </div>
                    <div>
                        <small><i className="fa-solid fa-clock me-2"></i>24/7 Support Available</small>
                    </div>
                    <div>
                        <a href="#" className="text-white me-2"><i className="fa-brands fa-facebook"></i></a>
                        <a href="#" className="text-white me-2"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="text-white me-2"><i className="fa-brands fa-telegram"></i></a>
                        <a href="#" className="text-white"><i className="fa-brands fa-whatsapp"></i></a>
                    </div>
                </div>
            </div>

            {/* Навигационная панель */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <img
                            src="https://e7.pngegg.com/pngimages/977/78/png-clipart-tooth-dentist-animal-bite-others-love-miscellaneous-thumbnail.png"
                            className="p-1 me-2"
                            width={45}
                            alt="Hotline Support"
                        />
                        <span className="fw-bold text-primary">HOTLINE<span className="text-danger">SUPPORT</span></span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="#"><i className="fa-solid fa-house me-1"></i> Главная</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle fw-semibold" href="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-headset me-1"></i> Услуги
                                </a>
                                <ul className="dropdown-menu shadow border-0" aria-labelledby="servicesDropdown">
                                    <li><a className="dropdown-item" href="#">Техническая поддержка</a></li>
                                    <li><a className="dropdown-item" href="#">Консультации</a></li>
                                    <li><a className="dropdown-item" href="#">Удаленная помощь</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Все услуги</a></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="#"><i className="fa-solid fa-circle-info me-1"></i> Тур по системе</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="#"><i className="fa-solid fa-tag me-1"></i> Цены</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="#"><i className="fa-solid fa-question-circle me-1"></i> Вопросы и поддержка</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="#"><i className="fa-solid fa-star me-1"></i> Отзывы</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="#"><i className="fa-solid fa-newspaper me-1"></i> Блог</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-semibold" href="#"><i className="fa-solid fa-address-book me-1"></i> Контакты</a>
                            </li>
                        </ul>
                        <div className="d-flex align-items-center">
                            <div className="dropdown me-2">
                                <i className="fa-solid fa-globe"></i>
                            </div>
                            <a href="/admin" className="p-2 me-2">
                                <i className="fa-solid fa-user"></i>
                            </a>
                            <a href="#" className="btn btn-danger rounded-pill px-4 d-none d-lg-inline">
                                <i className="fa-solid fa-phone-volume me-2"></i>Связаться
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Главный баннер с формой */}
            <div className="bg-primary text-white py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12 mb-5 mb-lg-0">
                            <h1 className="display-4 fw-bold mb-3">Hotline Support</h1>
                            <h3 className="fw-light mb-4">Мы предлагаем лучшие услуги поддержки клиентов, доступные 24/7</h3>
                            <div className="mb-4">
                                <div className="d-flex mb-3">
                                    <div className="bg-white text-primary p-3 rounded-circle me-3">
                                        <i className="fa-solid fa-check fa-lg"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-1">Профессиональная поддержка</h5>
                                        <p className="mb-0 opacity-75">Квалифицированные специалисты готовы помочь</p>
                                    </div>
                                </div>
                                <div className="d-flex mb-3">
                                    <div className="bg-white text-primary p-3 rounded-circle me-3">
                                        <i className="fa-solid fa-clock fa-lg"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-1">Круглосуточный сервис</h5>
                                        <p className="mb-0 opacity-75">Поддержка 24 часа, 7 дней в неделю</p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="bg-white text-primary p-3 rounded-circle me-3">
                                        <i className="fa-solid fa-bolt fa-lg"></i>
                                    </div>
                                    <div>
                                        <h5 className="mb-1">Быстрое решение проблем</h5>
                                        <p className="mb-0 opacity-75">Большинство вопросов решается за 15 минут</p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-3">
                                <button className="btn btn-light btn-lg rounded-pill px-4">
                                    <i className="fa-solid fa-headset me-2"></i>Получить поддержку
                                </button>
                                <button className="btn btn-outline-light btn-lg rounded-pill px-4">
                                    <i className="fa-solid fa-info-circle me-2"></i>Узнать больше
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Иконки-ссылки (основной блок администратора) */}
            <div className="container mt-5 py-4">
                <div className="row">
                    <div className="col-12 text-center mb-5">
                        <h6 className="text-danger fw-bold text-uppercase">Панель управления</h6>
                        <h2 className="fw-bold">Основные функции администратора</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
                            Управляйте всеми аспектами системы поддержки с помощью удобной панели администратора
                        </p>
                    </div>
                </div>
                <div className="row g-4">
                    <div className="col-md-3 col-sm-6">
                        <div className="card h-100 border-0 rounded-4 shadow-sm">
                            <div className="card-body text-center p-5">
                                <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-block mb-4">
                                    <i className="fa-solid fa-user-plus fa-3x text-primary"></i>
                                </div>
                                <h5 className="card-title fw-bold mb-3">Создание персонала</h5>
                                <p className="card-text text-muted mb-4">Управляйте персоналом вашей системы поддержки</p>
                                <button className="btn btn-primary btn-lg rounded-pill px-4 w-100"><b>Управление</b></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card h-100 border-0 rounded-4 shadow-sm">
                            <div className="card-body text-center p-5">
                                <div className="rounded-circle bg-danger bg-opacity-10 p-3 d-inline-block mb-4">
                                    <i className="fa-solid fa-circle-plus fa-3x text-danger"></i>
                                </div>
                                <h5 className="card-title fw-bold mb-3">Создание услуг</h5>
                                <p className="card-text text-muted mb-4">Добавляйте и редактируйте услуги поддержки</p>
                                <button className="btn btn-danger btn-lg rounded-pill px-4 w-100"><b>Добавить услуги</b></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card h-100 border-0 rounded-4 shadow-sm">
                            <div className="card-body text-center p-5">
                                <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-block mb-4">
                                    <i className="fa-solid fa-list fa-3x text-info"></i>
                                </div>
                                <h5 className="card-title fw-bold mb-3">Прайс Лист</h5>
                                <p className="card-text text-muted mb-4">Управляйте ценами на ваши услуги поддержки</p>
                                <button className="btn btn-info btn-lg rounded-pill px-4 w-100 text-white"><b>Настроить цены</b></button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="card h-100 border-0 rounded-4 shadow-sm">
                            <div className="card-body text-center p-5">
                                <div className="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-block mb-4">
                                    <i className="fa-solid fa-crown fa-3x text-warning"></i>
                                </div>
                                <h5 className="card-title fw-bold mb-3">Премиум</h5>
                                <p className="card-text text-muted mb-4">Получите расширенный доступ к функциям системы</p>
                                <button className="btn btn-warning btn-lg rounded-pill px-4 w-100 text-white"><b>Подключить</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Счетчики и статистика */}
            <div className="container-fluid bg-light py-5 mt-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div className="card border-0 rounded-4 h-100 py-5">
                                <div className="card-body">
                                    <i className="fa-solid fa-headset fa-3x text-primary mb-4"></i>
                                    <h2 className="display-4 fw-bold text-primary mb-2 counter">24</h2>
                                    <p className="text-muted">Часа в сутки</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div className="card border-0 rounded-4 h-100 py-5">
                                <div className="card-body">
                                    <i className="fa-solid fa-users fa-3x text-danger mb-4"></i>
                                    <h2 className="display-4 fw-bold text-danger mb-2 counter">10000+</h2>
                                    <p className="text-muted">Довольных клиентов</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4 mb-sm-0">
                            <div className="card border-0 rounded-4 h-100 py-5">
                                <div className="card-body">
                                    <i className="fa-solid fa-medal fa-3x text-info mb-4"></i>
                                    <h2 className="display-4 fw-bold text-info mb-2 counter">98%</h2>
                                    <p className="text-muted">Уровень удовлетворенности</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="card border-0 rounded-4 h-100 py-5">
                                <div className="card-body">
                                    <i className="fa-solid fa-clock-rotate-left fa-3x text-warning mb-4"></i>
                                    <h2 className="display-4 fw-bold text-warning mb-2 counter">15</h2>
                                    <p className="text-muted">Минут среднее время ответа</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Услуги в виде карточек */}
            <div className="container-fluid py-5">
                <div className="row mb-5 text-center text-with-image">
                    <div className="col-12">
                        <h6 className="text-danger fw-bold text-uppercase mt-5">Наши услуги</h6>
                        <h2 className="fw-bold mt-5">Что мы предлагаем</h2>
                        <p className="text-muted mx-auto mt-5" style={{ maxWidth: "700px" }}>
                            <b>Полный спектр услуг технической поддержки и консультаций для вашего бизнеса</b>
                        </p>
                    </div>
                </div>
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                                        <i className="fa-solid fa-headset fa-2x text-primary"></i>
                                    </div>
                                    <h5 className="card-title mb-0 fw-bold">Техническая поддержка</h5>
                                </div>
                                <p className="card-text text-muted">Круглосуточная поддержка пользователей по всем техническим вопросам. Оперативное решение проблем и консультации.</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-primary rounded-pill px-3 py-2">24/7 доступно</span>
                                    <a href="#" className="text-primary fw-bold text-decoration-none">Подробнее <i className="fa-solid fa-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-danger bg-opacity-10 p-3 rounded-3 me-3">
                                        <i className="fa-solid fa-desktop fa-2x text-danger"></i>
                                    </div>
                                    <h5 className="card-title mb-0 fw-bold">Удаленная помощь</h5>
                                </div>
                                <p className="card-text text-muted">Оперативная помощь с удаленным доступом к вашему устройству. Специалисты решат проблему без вашего участия.</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-danger rounded-pill px-3 py-2">Оперативно</span>
                                    <a href="#" className="text-danger fw-bold text-decoration-none">Подробнее <i className="fa-solid fa-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-info bg-opacity-10 p-3 rounded-3 me-3">
                                        <i className="fa-solid fa-briefcase fa-2x text-info"></i>
                                    </div>
                                    <h5 className="card-title mb-0 fw-bold">Бизнес-консультации</h5>
                                </div>
                                <p className="card-text text-muted">Профессиональные консультации по вопросам развития бизнеса, оптимизации процессов и внедрения IT-систем.</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-info rounded-pill px-3 py-2">Для бизнеса</span>
                                    <a href="#" className="text-info fw-bold text-decoration-none">Подробнее <i className="fa-solid fa-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                                        <i className="fa-solid fa-shield-alt fa-2x text-warning"></i>
                                    </div>
                                    <h5 className="card-title mb-0 fw-bold">Безопасность данных</h5>
                                </div>
                                <p className="card-text text-muted">Консультации и услуги по защите ваших данных, аудит безопасности и внедрение решений защиты информации.</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-warning rounded-pill px-3 py-2">Надежно</span>
                                    <a href="#" className="text-warning fw-bold text-decoration-none">Подробнее <i className="fa-solid fa-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-success bg-opacity-10 p-3 rounded-3 me-3">
                                        <i className="fa-solid fa-graduation-cap fa-2x text-success"></i>
                                    </div>
                                    <h5 className="card-title mb-0 fw-bold">Обучение персонала</h5>
                                </div>
                                <p className="card-text text-muted">Тренинги и обучающие программы для повышения квалификации персонала в области IT и клиентского сервиса.</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-success rounded-pill px-3 py-2">Эффективно</span>
                                    <a href="#" className="text-success fw-bold text-decoration-none">Подробнее <i className="fa-solid fa-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="bg-secondary bg-opacity-10 p-3 rounded-3 me-3">
                                        <i className="fa-solid fa-laptop-code fa-2x text-secondary"></i>
                                    </div>
                                    <h5 className="card-title mb-0 fw-bold">Разработка решений</h5>
                                </div>
                                <p className="card-text text-muted">Создание индивидуальных программных решений под ваши задачи, интеграция систем и автоматизация процессов.</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-secondary rounded-pill px-3 py-2">Индивидуально</span>
                                    <a href="#" className="text-secondary fw-bold text-decoration-none">Подробнее <i className="fa-solid fa-arrow-right ms-1"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            {show ? (
                                <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                                    <div className="card-header bg-primary text-white p-4 border-0">
                                        <h2 className="m-0 text-center fw-bold">
                                            <i className="fa-solid fa-headset me-2"></i> Оставьте заявку
                                        </h2>
                                    </div>
                                    <div className="card-body p-4 p-lg-5">
                                        <p className="text-muted text-center mb-4">Заполните форму, и наш специалист свяжется с вами в ближайшее время</p>

                                        <form>
                                            <div className="row g-4">
                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input
                                                            type="text"
                                                            className={`form-control border ${lastname ? 'is-valid' : ''}`}
                                                            id="lastname"
                                                            placeholder="Фамилия"
                                                            value={lastname}
                                                            onChange={(e) => setLastname(e.target.value)}
                                                        />
                                                        <label htmlFor="lastname">
                                                            <i className="fa-solid fa-user me-2"></i>Фамилия
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input
                                                            type="text"
                                                            className={`form-control border ${name ? 'is-valid' : ''}`}
                                                            id="name"
                                                            placeholder="Имя"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                        <label htmlFor="name">
                                                            <i className="fa-solid fa-user me-2"></i>Имя
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="form-floating">
                                                        <input
                                                            type="text"
                                                            className={`form-control border ${surname ? 'is-valid' : ''}`}
                                                            id="surname"
                                                            placeholder="Отчество"
                                                            value={surname}
                                                            onChange={(e) => setSurname(e.target.value)}
                                                        />
                                                        <label htmlFor="surname">
                                                            <i className="fa-solid fa-user me-2"></i>Отчество
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input
                                                            type="tel"
                                                            className={`form-control border ${phone ? 'is-valid' : 'border-danger'}`}
                                                            id="phone"
                                                            placeholder="Номер телефона"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            required
                                                        />
                                                        <label htmlFor="phone">
                                                            <i className="fa-solid fa-phone me-2"></i>Номер телефона*
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input
                                                            type="email"
                                                            className={`form-control border ${email ? 'is-valid' : ''}`}
                                                            id="email"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                        <label htmlFor="email">
                                                            <i className="fa-solid fa-envelope me-2"></i>Email (необязательно)
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-check mt-3">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="agreement"
                                                            checked={agreement}
                                                            onChange={(e) => setAgreement(e.target.checked)}
                                                        />
                                                        <label className="form-check-label" htmlFor="agreement">
                                                            Подтверждаю согласие на обработку персональных данных
                                                        </label>
                                                    </div>
                                                    {text && (
                                                        <div className="alert alert-danger mt-3 d-flex align-items-center" role="alert">
                                                            <i className="fa-solid fa-circle-exclamation me-2"></i>
                                                            <div><strong>{text}</strong></div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-12 text-center mt-4">
                                                    <button
                                                        type="submit"
                                                        onClick={Ad}
                                                        className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm"
                                                        disabled={!agreement}
                                                    >
                                                        <i className="fa-solid fa-paper-plane me-2"></i>
                                                        Отправить заявку
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="card border-0 shadow-lg rounded-3 overflow-hidden text-center">
                                    <div className="card-body p-5 bg-success bg-opacity-10">
                                        <div className="my-4">
                                            <div className="d-inline-block bg-success p-4 rounded-circle text-white mb-4">
                                                <i className="fa-solid fa-check fa-5x"></i>
                                            </div>
                                            <h2 className="mt-4 mb-3">Заявка успешно отправлена!</h2>
                                            <p className="lead mb-4">В ближайшее время с вами свяжется наш менеджер.</p>
                                            <button onClick={() => setShow(true)} className="btn btn-outline-success btn-lg rounded-pill px-4">
                                                <i className="fa-solid fa-arrow-left me-2"></i>
                                                Отправить новую заявку
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Блок преимуществ рядом с формой - виден только на больших экранах */}
                        <div className="col-lg-4 d-none d-lg-block">
                            <div className="h-100 d-flex flex-column justify-content-center">
                                <div className="card border-0 shadow mb-4 rounded-3 bg-primary text-white">
                                    <div className="card-body p-4 text-center">
                                        <i className="fa-solid fa-headset fa-3x mb-3"></i>
                                        <h4>Быстрая связь</h4>
                                        <p className="mb-0">Ответим на ваше обращение в течение 15 минут</p>
                                    </div>
                                </div>

                                <div className="card border-0 shadow mb-4 rounded-3 bg-info text-white">
                                    <div className="card-body p-4 text-center">
                                        <i className="fa-solid fa-user-tie fa-3x mb-3"></i>
                                        <h4>Опытные специалисты</h4>
                                        <p className="mb-0">Более 10 лет опыта работы</p>
                                    </div>
                                </div>

                                <div className="card border-0 shadow rounded-3 bg-warning text-white">
                                    <div className="card-body p-4 text-center">
                                        <i className="fa-solid fa-shield fa-3x mb-3"></i>
                                        <h4>Гарантия качества</h4>
                                        <p className="mb-0">Мы обеспечиваем высокое качество обслуживания</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Блок отзывов */}
            <div className="container-fluid py-5 bg-light bg-opacity-50">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Отзывы наших клиентов</h2>
                        <p className="lead text-muted">Что говорят люди, которые уже воспользовались нашими услугами</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary text-white rounded-circle p-2 me-3">
                                                <i className="fa-solid fa-user"></i>
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Иван Петров</h5>
                                                <small className="text-muted">Москва</small>
                                            </div>
                                        </div>
                                        <div className="text-warning">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <p className="mb-0">Отличный сервис! Связались со мной буквально через 10 минут после заявки. Профессиональный подход и внимание к деталям.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary text-white rounded-circle p-2 me-3">
                                                <i className="fa-solid fa-user"></i>
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Елена Сидорова</h5>
                                                <small className="text-muted">Санкт-Петербург</small>
                                            </div>
                                        </div>
                                        <div className="text-warning">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star-half-alt"></i>
                                        </div>
                                    </div>
                                    <p className="mb-0">Сотрудники компании всегда вежливы и готовы помочь. Хотела бы отметить высокий уровень сервиса и внимание к клиентам.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary text-white rounded-circle p-2 me-3">
                                                <i className="fa-solid fa-user"></i>
                                            </div>
                                            <div>
                                                <h5 className="mb-0">Алексей Иванов</h5>
                                                <small className="text-muted">Казань</small>
                                            </div>
                                        </div>
                                        <div className="text-warning">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                    <p className="mb-0">Рекомендую всем! Оперативная обратная связь, квалифицированные специалисты. Решили мою проблему в кратчайшие сроки.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Секция вопросов/ответов */}
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold">Часто задаваемые вопросы</h2>
                    <p className="lead text-muted">Ответы на популярные вопросы наших клиентов</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="accordion" id="faqAccordion">
                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                        Как быстро вы ответите на мою заявку?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Мы стараемся обрабатывать все заявки в течение 15-30 минут в рабочее время. В нерабочее время заявка будет обработана в первые часы следующего рабочего дня.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                        Какие способы связи вы предлагаете?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Мы можем связаться с вами по телефону, email, WhatsApp или Telegram - просто укажите предпочтительный способ связи в заявке или в поле комментариев.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                        Какие гарантии вы предоставляете на свои услуги?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Мы предоставляем полную гарантию на все наши услуги. Если вы не удовлетворены результатом, мы исправим недостатки бесплатно или вернем вам деньги.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item border-0 shadow-sm">
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                                        Работаете ли вы в выходные дни?
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Да, наша служба поддержки работает и в выходные дни с 10:00 до 18:00. Для срочных вопросов у нас есть дежурные специалисты.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call-to-action перед футером */}
            <div className="container-fluid bg-primary py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8 text-center text-lg-start mb-4 mb-lg-0">
                            <h2 className="text-white mb-3">Нужна консультация? Мы всегда на связи!</h2>
                            <p className="text-white opacity-75 mb-0">Свяжитесь с нами любым удобным способом, и мы ответим на все ваши вопросы</p>
                        </div>
                        <div className="col-lg-4 text-center text-lg-end">
                            <a href="tel:+79999999999" className="btn btn-light rounded-pill btn-lg px-4 me-2 mb-2 mb-sm-0">
                                <i className="fa-solid fa-phone me-2"></i>Позвонить
                            </a>
                            <a href="#" className="btn btn-outline-light rounded-pill btn-lg px-4">
                                <i className="fa-brands fa-whatsapp me-2"></i>Whatsapp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Расширенный футер */}
            <footer className="bg-dark text-white py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <h4 className="mb-4 border-bottom border-light border-2 pb-2">О компании</h4>
                            <h2 className="mb-3">HOTLINE SUPPORT</h2>
                            <p className="mb-4">Мы предоставляем высококачественную поддержку клиентов и техническое обслуживание 24/7. Наша цель - обеспечить вам быстрое и эффективное решение любых проблем.</p>
                            <div className="d-flex gap-3">
                                <a href="#" className="btn btn-outline-light rounded-circle">
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light rounded-circle">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light rounded-circle">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light rounded-circle">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h4 className="mb-4 border-bottom border-light border-2 pb-2">Услуги</h4>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Техподдержка
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Консультации
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Обучение
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Внедрение ПО
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Аудит систем
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-2 col-md-6">
                            <h4 className="mb-4 border-bottom border-light border-2 pb-2">Полезные ссылки</h4>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Главная
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>О нас
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Услуги
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Цены
                                    </a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-white text-decoration-none">
                                        <i className="fa-solid fa-angle-right me-2"></i>Контакты
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <h4 className="mb-4 border-bottom border-light border-2 pb-2">Контактная информация</h4>
                            <ul className="list-unstyled">
                                <li className="d-flex mb-3">
                                    <i className="fa-solid fa-location-dot mt-1 me-3"></i>
                                    <div>
                                        <strong>Адрес:</strong><br />
                                        г. Ташкент, ул. Амир Темур, 15, офис 204
                                    </div>
                                </li>
                                <li className="d-flex mb-3">
                                    <i className="fa-solid fa-phone mt-1 me-3"></i>
                                    <div>
                                        <strong>Телефон:</strong><br />
                                        <a href="tel:+998999999999" className="text-white">+998 99 999 99 99</a>
                                    </div>
                                </li>
                                <li className="d-flex mb-3">
                                    <i className="fa-solid fa-envelope mt-1 me-3"></i>
                                    <div>
                                        <strong>Email:</strong><br />
                                        <a href="mailto:info@hotlinesupport.com" className="text-white">info@hotlinesupport.com</a>
                                    </div>
                                </li>
                                <li className="d-flex">
                                    <i className="fa-solid fa-clock mt-1 me-3"></i>
                                    <div>
                                        <strong>Режим работы:</strong><br />
                                        Пн-Пт: 9:00 - 19:00<br />
                                        Сб-Вс: 10:00 - 18:00
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Нижний футер с копирайтом */}
            <div className="bg-black text-white py-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                            <small>&copy; 2025 Hotline Support. Все права защищены.</small>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <small>
                                <a href="#" className="text-white text-decoration-none me-3">Политика конфиденциальности</a>
                                <a href="#" className="text-white text-decoration-none">Условия использования</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            {/* Кнопка прокрутки вверх */}
                <i className="fa-solid fa-arrow-up position-fixed bottom-0 end-0 m-4 p-3 border border-dark rounded-circle bg-white text-dark"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}></i>
        </>
    );
};

export default Add;