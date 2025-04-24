import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { domain } from "../config/url";

const AddGroup = () => {
    const [data, setData] = useState([]);
    const [object, setObject] = useState([]);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    if (localStorage.getItem('identikay') == null) {
        window.location.href = '/adminpanelforadmins';
    }

    let param = useParams();

    let famous = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/category/${param.id}`,
        })
        if (person != null) {
            if (person.status === 200) {
                setData(person.data.category)
                console.log('Данные успешно получены 1', person);
            }
        }
    }
    let list = async () => {
        let human = await axios({
            method: "get",
            url: `${domain}/api/category/${param.id}`,
        })
        let person = await axios({
            method: "get",
            url: `${domain}/api/groupcategory`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status === 200) {
                const detail = person.data.groupcategory.filter((i) => i.category_name == human.data.category.name);
                if (detail.length > 0) {
                    setObject(detail);
                    console.log('Данные успешно получены 2', detail);
                } else {
                    console.log('Нет данных 2');
                }
            }
        }
    }
    const Ad = async () => {
        let person = await axios({
            method: "post",
            url: `${domain}/api/groupcategory`,
            params: {
                name: name,
                link: link,
                category_id: param.id,
                category_name: data.name,
            }
        });
        if (person != null) {
            if (person.status >= 200 && person.status < 300) {
                console.log('Успешно добалено');
                list();
            }
        }
    };
    useEffect(() => {
        famous();
        list();
    }, []);
    return (
        <>
            {data != null ?
                <div className="container">
                    <div className="row mb-4">
                        <div className="col text-center">
                            <h1 className="text-primary">{data.name}</h1>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-5">
                            <div className="input-group">
                                <span className="input-group-text bg-primary text-white">Название</span>
                                <input value={name} onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="form-control border border-dark"
                                    placeholder="Введите название"
                                />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="input-group">
                                <span className="input-group-text bg-primary text-white">Ссылка</span>
                                <input value={link} onChange={(e) => setLink(e.target.value)}
                                    type="text"
                                    className="form-control border border-dark"
                                    placeholder="Введите ссылку"
                                />
                            </div>
                        </div>
                        <div className="col-md-2 text-center">
                            <button className="btn btn-primary form-control" onClick={Ad}>Добавить</button>
                        </div>
                    </div>
                    <div className="row">
                        <table className="table table-bordered table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Название</th>
                                    <th>Ссылка</th>
                                    <th>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {object.length ? (
                                    object.map(i => (
                                        <tr key={i.id}>
                                            <td>{i.name}</td>
                                            <td>{i.link}</td>
                                            <td>
                                                <button className="btn btn-danger">Удалить</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">Нет данных 1</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                <div className="alert alert-warning text-center">Нет данных</div>
            }
        </>
    )
}
export default AddGroup;