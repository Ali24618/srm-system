import { useState } from 'react';

const Docusers = () => {
    if (localStorage.getItem('identikay') == null) {
        window.location.href = '/adminpanelforadmins';
    }
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    return (
        <>
            {/* Header */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">МедЦентр</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Главная</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Врачи</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Услуги</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Контакты</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Doctor Info Section */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://мойдоктор-вл.рф/storage/app/uploads/public/63e/b2a/812/thumb_268_380_380_0_0_auto.jpeg" className="card-img-top" alt="Фото доктора" />
                            <div className="card-body text-center">
                                <h4 className="card-title">Иванов Иван Иванович</h4>
                                <p className="card-text text-muted">Кардиолог, к.м.н.</p>
                                <div className="mb-3">
                                    <span className="badge bg-primary me-1">Кардиология</span>
                                    <span className="badge bg-info me-1">УЗИ</span>
                                    <span className="badge bg-secondary">ЭКГ</span>
                                </div>
                                <div className="mb-3">
                                    <span className="text-warning">★★★★★</span>
                                    <small className="text-muted ms-2">4.9 (128 отзывов)</small>
                                </div>
                                <button className="btn btn-success btn-lg w-100" onClick={toggleModal}>
                                    Записаться на приём
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5>О враче</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">
                                    Иванов Иван Иванович — опытный кардиолог с 15-летним стажем работы.
                                    Специализируется на диагностике и лечении сердечно-сосудистых заболеваний.
                                    Автор более 20 научных публикаций в области кардиологии.
                                </p>
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <h6>Образование:</h6>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Медицинский университет им. И.М. Сеченова (2005)</li>
                                            <li className="list-group-item">Ординатура по кардиологии (2007)</li>
                                            <li className="list-group-item">Кандидат медицинских наук (2010)</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>График работы:</h6>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Пн-Пт: 9:00 - 17:00</li>
                                            <li className="list-group-item">Сб: 10:00 - 14:00</li>
                                            <li className="list-group-item">Вс: Выходной</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5>Услуги и цены</h5>
                            </div>
                            <div className="card-body p-0">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>Услуга</th>
                                            <th>Длительность</th>
                                            <th>Цена</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Первичная консультация</td>
                                            <td>50 мин</td>
                                            <td>2500 ₽</td>
                                        </tr>
                                        <tr>
                                            <td>Повторная консультация</td>
                                            <td>30 мин</td>
                                            <td>1800 ₽</td>
                                        </tr>
                                        <tr>
                                            <td>ЭКГ с расшифровкой</td>
                                            <td>20 мин</td>
                                            <td>1200 ₽</td>
                                        </tr>
                                        <tr>
                                            <td>УЗИ сердца</td>
                                            <td>40 мин</td>
                                            <td>3000 ₽</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Отзывы пациентов</h5>
                                <button className="btn btn-outline-primary btn-sm">Оставить отзыв</button>
                            </div>
                            <div className="card-body">
                                <div className="border-bottom pb-3 mb-3">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div>
                                            <strong>Мария Петрова</strong>
                                            <span className="text-warning ms-2">★★★★★</span>
                                        </div>
                                        <small className="text-muted">12.03.2025</small>
                                    </div>
                                    <p className="mb-0">Замечательный врач! Очень внимательный, все подробно объяснил и назначил эффективное лечение.</p>
                                </div>

                                <div className="border-bottom pb-3 mb-3">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div>
                                            <strong>Александр Сидоров</strong>
                                            <span className="text-warning ms-2">★★★★☆</span>
                                        </div>
                                        <small className="text-muted">27.02.2025</small>
                                    </div>
                                    <p className="mb-0">Профессиональный подход и подробные объяснения. Доктор очень компетентный, рекомендую!</p>
                                </div>

                                <div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <div>
                                            <strong>Елена Иванова</strong>
                                            <span className="text-warning ms-2">★★★★★</span>
                                        </div>
                                        <small className="text-muted">15.02.2025</small>
                                    </div>
                                    <p className="mb-0">Благодарю доктора за чуткое отношение и профессионализм. После его лечения чувствую себя намного лучше.</p>
                                </div>

                                <div className="text-center mt-3">
                                    <button className="btn btn-outline-secondary btn-sm">Показать все отзывы</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for appointment */}
            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Запись на приём</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Имя</label>
                                            <input type="text" className="form-control" placeholder="Введите ваше имя" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Телефон</label>
                                            <input type="tel" className="form-control" placeholder="+7 (___) ___-__-__" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Дата приёма</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Время приёма</label>
                                            <select className="form-select">
                                                <option value="">Выберите время</option>
                                                <option>9:00</option>
                                                <option>10:00</option>
                                                <option>11:00</option>
                                                <option>12:00</option>
                                                <option>14:00</option>
                                                <option>15:00</option>
                                                <option>16:00</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Выберите услугу</label>
                                        <select className="form-select">
                                            <option value="">Выберите услугу</option>
                                            <option>Первичная консультация (2500 ₽)</option>
                                            <option>Повторная консультация (1800 ₽)</option>
                                            <option>ЭКГ с расшифровкой (1200 ₽)</option>
                                            <option>УЗИ сердца (3000 ₽)</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Комментарий</label>
                                        <textarea className="form-control" rows="3" placeholder="Дополнительная информация (если необходимо)"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Отмена</button>
                                <button type="button" className="btn btn-success">Записаться</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop show"></div>
                </div>
            )}

            {/* Footer */}
            <footer className="bg-dark text-light py-4 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h5>МедЦентр</h5>
                            <p className="mb-0">Ваше здоровье - наш приоритет</p>
                            <p className="mb-0">© 2025 МедЦентр. Все права защищены.</p>
                        </div>
                        <div className="col-md-4 mb-3 mb-md-0">
                            <h5>Контакты</h5>
                            <p className="mb-1">Адрес: ул. Медицинская, 123</p>
                            <p className="mb-1">Телефон: +7 (123) 456-78-90</p>
                            <p className="mb-0">Email: info@medcenter.ru</p>
                        </div>
                        <div className="col-md-4">
                            <h5>Режим работы</h5>
                            <p className="mb-1">Пн-Пт: 8:00 - 20:00</p>
                            <p className="mb-1">Сб: 9:00 - 18:00</p>
                            <p className="mb-0">Вс: 9:00 - 16:00</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Docusers;