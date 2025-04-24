import axios from "axios";
import { useEffect, useState } from "react";
import { domain } from "../config/url";
import { useParams } from "react-router-dom";

const Servicesid = () => {
    const [data, setData] = useState([]);
    const [categoriess, setCategoriess] = useState([]);
    const [doc, setDoc] = useState([]);
    const [sercat, setSercat] = useState([]);
    const [name, setName] = useState("");
    const [doctor, setDoctor] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [thename, setThename] = useState("");
    const [description, setDescription] = useState("");
    const [icon, setIcon] = useState("");
    const [icontype, setIconType] = useState("");
    const [show, setShow] = useState(false);

    if (localStorage.getItem('identikay') == null) {
        window.location.href = '/adminpanelforadmins';
    }

    let param = useParams();

    let famous = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/services/${param.id}`,
        })
        if (person != null) {
            if (person.status === 200) {
                setData(person.data.services)
                console.log('Данные услуг успешно получены', person);
            }
        }
    }

    const handleSelectChange = (e) => {
        setIconType(e.target.value);
    };

    let categories = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/category_sevices`,
        })
        console.log('Данные категорий успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setCategoriess(person.data.category_sevices)
                console.log('Данные успешно получены', person);
            }
        }
    }

    let doctors = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/doctorslist`,
        })
        console.log('Данные докторов получены', person);
        if (person != null) {
            if (person.status == 200) {
                setDoc(person.data.doctorslist)
                console.log('Данные докторов успешно получены', person);
            }
        }
    }

    let list = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/category_sevices`,
        })
        console.log('Данные докторов получены', person);
        if (person != null) {
            if (person.status == 200) {
                setSercat(person.data.category_sevices)
                console.log('Данные докторов успешно получены', person);
            }
        }
    }

    const Puut = async () => {
        let person = await axios.put(`${domain}/api/services/${param.id}`, {
            title: name || data.title,
            doctor: doctor || data.doctor,
            price: price || data.price,
            category: category || data.category,
        });
        console.log('Работает запрос');
        if (person.status === 200) {
            console.log('Успешно изменено', person);
            setShow(true);
            setTimeout(() => {
                window.location.href = `/services`;
            }, 500);
        }
    };

    const Ad = async () => {
        let person = await axios({
            method: "post",
            url: `${domain}/api/category_sevices`,
            params: {
                name: thename,
                description: description,
                icon: icontype || icon,
            }
        });
        if (person != null) {
            if (person.status >= 200 && person.status < 300) {
                console.log('Услуга успешно добавлена');
                list();
            }
        }
    };

    const Delete = async (id) => {
        const pred = window.confirm("Вы уверены что хотите удалить")
        if (pred) {
            let person = await axios({
                method: "delete",
                url: `${domain}/api/category_sevices/`,
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


    useEffect(() => {
        famous();
        categories();
        doctors();
        list();
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
                        <div className="col-8 col-lg-4">
                            <div className="card shadow-lg">
                                <div className="card-header text-center bg-primary text-white">
                                    <h2>Услуги</h2>
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Название услуги</label>
                                        <input placeholder={data.title} value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control border border-dark rounded-0 spe" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Категория услуги</label>
                                        <select className="form-control border border-dark rounded-0" value={category} onChange={(e) => setCategory(e.target.value)}>
                                            <option value="">{data.category}</option>
                                            {categoriess.map(i => (
                                                <option key={i.id} value={i.name}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Цена</label>
                                        <input placeholder={data.price} value={price} onChange={(e) => setPrice(e.target.value)} type="text" className="form-control rounded-0 border border-dark spe" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Доктор который предоставляет эту услууг</label>
                                        <select className="form-control border border-dark rounded-0" value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                                            <option value="">{data.doctor}</option>
                                            {doc.map(i => (
                                                <option key={i.id} value={i.name}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100" onClick={Puut}>Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            <div className="text-center mt-3 p-3">
                                <button type="button" className="btn btn-success rounded-0 form-control" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить</button>
                            </div>
                            <table className="table table-bordered border border-dark">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Название услуги</th>
                                        <th>Икнока</th>
                                        <th>Удалить</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sercat.length ? (
                                        sercat.map(i => (
                                            <tr key={i.id}>
                                                <td>{i.id}</td>
                                                <td><input placeholder={i.name} type="text" className="form-control border-0" /></td>
                                                <td><div className="fa-2x" dangerouslySetInnerHTML={{ __html: i.icon }} /></td>
                                                <td><i class="fa-solid fa-trash text-danger fa-2x" onClick={() => Delete(i.id)}></i></td>
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
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Добавить новую категорию услуги</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <input value={thename} onChange={(e) => setThename(e.target.value)} type="text" className="form-control border border-dark rounded-0 mt-3" placeholder="Название категории услуги" />
                                        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" className="form-control border border-dark rounded-0 mt-3" placeholder="Введите описание" />
                                        <select value={icontype} onChange={handleSelectChange} className="form-control border border-dark rounded-0 mt-3">
                                            <option value="">Все иконки</option>
                                            <option value="<i class='fa-solid fa-house'></i>">🏠 Дом (fa-house)</option>
                                            <option value="<i class='fa-solid fa-user'></i>">👤 Пользователь (fa-user)</option>
                                            <option value="<i class='fa-solid fa-envelope'></i>">📩 Письмо (fa-envelope)</option>
                                            <option value="<i class='fa-solid fa-phone'></i>">📞 Телефон (fa-phone)</option>
                                            <option value="<i class='fa-solid fa-gear'></i>">⚙️ Настройки (fa-gear)</option>
                                            <option value="<i class='fa-solid fa-heart'></i>">❤️ Сердце (fa-heart)</option>
                                            <option value="<i class='fa-solid fa-star'></i>">⭐ Звезда (fa-star)</option>
                                            <option value="<i class='fa-solid fa-check'></i>">✔️ Галочка (fa-check)</option>
                                            <option value="<i class='fa-solid fa-xmark'></i>">❌ Крестик (fa-xmark)</option>
                                            <option value="<i class='fa-solid fa-trash'></i>">🗑️ Удалить (fa-trash)</option>
                                            <option value="<i class='fa-solid fa-lock'></i>">🔒 Замок (fa-lock)</option>
                                            <option value="<i class='fa-solid fa-unlock'></i>">🔓 Открытый замок (fa-unlock)</option>
                                            <option value="<i class='fa-solid fa-cart-shopping'></i>">🛒 Корзина (fa-cart-shopping)</option>
                                            <option value="<i class='fa-solid fa-wallet'></i>">👛 Кошелек (fa-wallet)</option>
                                            <option value="<i class='fa-solid fa-clock'></i>">⏰ Часы (fa-clock)</option>
                                            <option value="<i class='fa-solid fa-calendar'></i>">📅 Календарь (fa-calendar)</option>
                                            <option value="<i class='fa-solid fa-bell'></i>">🔔 Уведомления (fa-bell)</option>
                                            <option value="<i class='fa-solid fa-magnifying-glass'></i>">🔍 Поиск (fa-magnifying-glass)</option>
                                            <option value="<i class='fa-solid fa-comment'></i>">💬 Комментарий (fa-comment)</option>
                                            <option value="<i class='fa-solid fa-camera'></i>">📷 Камера (fa-camera)</option>
                                            <option value="<i class='fa-solid fa-video'></i>">📹 Видео (fa-video)</option>
                                            <option value="<i class='fa-solid fa-music'></i>">🎵 Музыка (fa-music)</option>
                                            <option value="<i class='fa-solid fa-book'></i>">📖 Книга (fa-book)</option>
                                            <option value="<i class='fa-solid fa-globe'></i>">🌍 Глобус (fa-globe)</option>
                                            <option value="<i class='fa-solid fa-map'></i>">🗺️ Карта (fa-map)</option>
                                            <option value="<i class='fa-solid fa-lightbulb'></i>">💡 Идея (fa-lightbulb)</option>
                                            <option value="<i class='fa-solid fa-fire'></i>">🔥 Огонь (fa-fire)</option>
                                            <option value="<i class='fa-solid fa-triangle-exclamation'></i>">⚠️ Внимание (fa-triangle-exclamation)</option>
                                            <option value="<i class='fa-solid fa-circle-info'></i>">ℹ️ Информация (fa-circle-info)</option>
                                            <option value="<i class='fa-solid fa-user-doctor'></i>">🩺 Врач (fa-user-doctor)</option>
                                            <option value="<i class='fa-solid fa-hospital'></i>">🏥 Больница (fa-hospital)</option>
                                            <option value="<i class='fa-solid fa-syringe'></i>">💉 Шприц (fa-syringe)</option>
                                            <option value="<i class='fa-solid fa-pills'></i>">💊 Таблетки (fa-pills)</option>
                                            <option value="<i class='fa-solid fa-capsules'></i>">🧴 Капсулы (fa-capsules)</option>
                                            <option value="<i class='fa-solid fa-prescription-bottle'></i>">🧪 Бутылочка с лекарством (fa-prescription-bottle)</option>
                                            <option value="<i class='fa-solid fa-prescription'></i>">📜 Рецепт (fa-prescription)</option>
                                            <option value="<i class='fa-solid fa-kit-medical'></i>">🩹 Аптечка (fa-kit-medical)</option>
                                            <option value="<i class='fa-solid fa-tooth'></i>">🦷 Зуб (fa-tooth)</option>
                                            <option value="<i class='fa-solid fa-bone'></i>">🦴 Кость (fa-bone)</option>
                                            <option value="<i class='fa-solid fa-stethoscope'></i>">🩺 Стетоскоп (fa-stethoscope)</option>
                                            <option value="<i class='fa-solid fa-heartbeat'></i>">❤️‍🔥 Сердцебиение (fa-heartbeat)</option>
                                            <option value="<i class='fa-solid fa-dna'></i>">🧬 ДНК (fa-dna)</option>
                                            <option value="<i class='fa-solid fa-virus'></i>">🦠 Вирус (fa-virus)</option>
                                            <option value="<i class='fa-solid fa-lungs'></i>">🫁 Лёгкие (fa-lungs)</option>
                                            <option value="<i class='fa-solid fa-brain'></i>">🧠 Мозг (fa-brain)</option>
                                            <option value="<i class='fa-solid fa-eye'></i>">👁️ Глаз (fa-eye)</option>
                                            <option value="<i class='fa-solid fa-ear-deaf'></i>">🦻 Глухота (fa-ear-deaf)</option>
                                            <option value="<i class='fa-solid fa-crutch'></i>">🦯 Костыль (fa-crutch)</option>
                                            <option value="<i class='fa-solid fa-wheelchair'></i>">♿ Инвалидная коляска (fa-wheelchair)</option>
                                            <option value="<i class='fa-solid fa-head-side-cough'></i>">🤧 Кашель (fa-head-side-cough)</option>
                                            <option value="<i class='fa-solid fa-head-side-mask'></i>">😷 Маска (fa-head-side-mask)</option>
                                            <option value="<i class='fa-solid fa-bacteria'></i>">🦠 Бактерии (fa-bacteria)</option>
                                            <option value="<i class='fa-solid fa-microscope'></i>">🔬 Микроскоп (fa-microscope)</option>
                                            <option value="<i class='fa-solid fa-vial'></i>">🧫 Пробирка (fa-vial)</option>
                                            <option value="<i class='fa-solid fa-file-medical'></i>">📋 Медицинская карта (fa-file-medical)</option>
                                            <option value="<i class='fa-solid fa-thermometer'></i>">🌡️ Термометр (fa-thermometer)</option>
                                            <option value="<i class='fa-solid fa-ribbon'></i>">🎗️ Символ борьбы с болезнями (fa-ribbon)</option>
                                            <option value="<i class='fa-solid fa-suitcase-medical'></i>">💼 Медицинский чемодан (fa-suitcase-medical)</option>
                                            <option value="<i class='fa-solid fa-user-nurse'></i>">👩‍⚕️ Медсестра (fa-user-nurse)</option>
                                            <option value="<i class='fa-solid fa-x-ray'></i>">🩻 Рентген (fa-x-ray)</option>
                                            <option value="<i class='fa-solid fa-virus-slash'></i>">🦠❌ Безопасность от вирусов (fa-virus-slash)</option>
                                            <option value="<i class='fa-solid fa-sanitizer'></i>">🧴 Антисептик (fa-sanitizer)</option>
                                            <option value="<i class='fa-solid fa-diagnoses'></i>">📊 Диагностика (fa-diagnoses)</option>
                                            <option value="<i class='fa-solid fa-pump-medical'></i>">💉 Насос для инъекций (fa-pump-medical)</option>
                                        </select>
                                        <div className="row">
                                            <div className="col-5 mt-4"><hr /></div>
                                            <div className="col-2 text-center mt-4">ИЛИ</div>
                                            <div className="col-5 mt-4"><hr /></div>
                                        </div>
                                        <input value={icon} onChange={(e) => setIcon(e.target.value)} type="text" className="form-control border border-dark rounded-0 mt-3" placeholder="Название иконки (если нет подходящего)" />
                                        <button type="button" className="btn btn-success rounded-0 form-control mt-2" onClick={Ad}>Добавить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </>
            }
        </>
    )
}
export default Servicesid;