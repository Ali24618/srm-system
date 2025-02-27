import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Doclist = () => {
    const ident = localStorage.getItem('ident');
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [surname, setSurname] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [show, setShow] = useState(false);

    let param = useParams();

    let famous = async () => {
        let person = await axios({
            method: "get",
            url: `http://api.com/api/doctorslist/${param.id}`,
        })
        if (person != null) {
            if (person.status === 200) {
                setData(person.data.doctorslist)
                console.log('Данные успешно получены 1', person);
            }
        }
    }
    const Puut = async () => {        
        let person = await axios.put(`http://api.com/api/doctorslist/${param.id}`, {
            name: name || data.name,
            lastname: lastname || data.lastname,
            surname: surname || data.surname,
            number: number || data.number,
            email: email || data.email,
            numberwhat: whatsapp || data.numberwhat,
        });
        console.log('Работает запрос');
        if (person.status === 200) {
            console.log('Успешно изменено', person);
            setShow(true);
            setTimeout(() => {
                window.location.href = `/doctors`;
            }, 1000);
        }
    };
    useEffect(() => {
        famous();
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
                                    <h2>Доктор <b>{data.name}</b></h2>
                                </div>
                                <div className="card-body">
                                <div className="mb-3">
                                        <label className="form-label">Категория Врача</label>
                                        <p><b>{data.type}</b></p>
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
                                        <label className="form-label">Номер WhatsApp</label>
                                        <input onChange={(e) => setWhatsapp(e.target.value)} type="email" className="form-control border-0 spe" placeholder={data.numberwhat} value={whatsapp} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Почта</label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control border-0 spe" placeholder={data.email} value={email} />
                                    </div>
                                    <button onClick={Puut} type="submit" className="btn btn-primary w-100">Сохранить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>s</>
            }
        </>
    )
}
export default Doclist;