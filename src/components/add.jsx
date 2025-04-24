import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";
import { domain } from "../config/url";
import { div } from "framer-motion/client";

const Add = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [serser, setSerser] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [category, setCategory] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [docuser, setDocuser] = useState([]);
    const [agreement, setAgreement] = useState(false);
    const [show, setShow] = useState(false);
    const [showtext, setShowtext] = useState(false);
    const [showdoctors, setShowDoctors] = useState(true);

    // if (localStorage.getItem('identikay') == null) {
    //     window.location.href = '/adminpanelforadmins';
    // }

    let famous = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/usersdentist`,
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

    let docus = async (doctorid) => {
        doctorid = localStorage.getItem('doctorId')
        try {
            let person = await axios({
                method: "get",
                url: `${domain}/api/doctorslist/${doctorid}`,
            })
            console.log('Данные дока успешно получены', person);
            if (person != null) {
                if (person.status == 200) {
                    setDocuser(person.data.doctorslist);
                    console.log('Данные дока успешно получены 1', person);
                }
            }
        } catch (error) {
            console.error('Ошибка при получении данных', error);
        }
    }

    let doctor = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/doctorslist`,
        })
        console.log('Данные дока получены', person);
        if (person != null) {
            if (person.status == 200) {
                setDoctors(person.data.doctorslist)
                console.log('Данные дока успешно получено', person);
            }
        }
    }

    let reviewss = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/reviews`,
        })
        console.log('Данные отзывов получены', person);
        if (person != null) {
            if (person.status == 200) {
                setReviews(person.data.reviews);
                console.log('Данные отзывов успешно получены', person);
            }
        }
    }

    let categories = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/typeapp`,
        })
        console.log('Данные типов заявок получены', person);
        if (person != null) {
            if (person.status == 200) {
                setCategory(person.data.typeapp)
                console.log('Данные заявок успешно получены', person);
            }
        }
    }

    let serservis = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/category_sevices`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setSerser(person.data.category_sevices);
            }
        }
    }

    const [language, setLanguage] = useState('ru')
    const translations = {
        ru: {
            services: 'Услуги',
            home: 'Главная',
            tour: 'Тур по системе',
            price: 'Цены',
            questions: 'Вопросы и поддержка',
            reviews: 'Отзывы',
            blog: 'Блог',
            contacts: 'Контакты',
            helpone: 'Мы предлагаем лучшие услуги поддержки клиентов, доступные 24/7',
            helone: 'Квалифицированные специалисты готовы помочь',
            helptwo: 'Профессиональная поддержка',
            heltwo: 'Поддержка 24 часа в сутки',
            helpthree: 'Круглосуточный сервис',
            helthree: 'Большинство вопросов решается за 15 минут',
            helpfour: 'Быстрое решение проблем',
            gethelp: 'Получить поддержку',
            learnmore: 'Узнать больше',
            panel: 'Панель управления',
            functions: 'Основные функции администратора',
            text: 'Управляйте всеми аспектами системы поддержки с помощью удобной панели администратора',
            staff: 'Создание персонала',
            servicess: 'Создание услуг',
            prices: 'Прайс лист',
            premium: 'Премиум',
            deskone: 'Управляйте персоналом вашей системы поддержки',
            desktwo: 'Добавляйте и редактируйте услуги поддержки',
            deskthree: 'Управляйте ценами на ваши услуги поддержки',
            deskfour: 'Получите расширенный доступ к функциям системы',
            control: 'Управление',
            addser: 'Добавить услуги',
            setprice: 'Настроить цены',
            sellect: 'Подключить',
            hourday: 'Часа в сутки',
            cliients: 'Довольных клиентов',
            leveup: 'Уровень удовлетворенности',
            minage: 'Минут среднее время ответа',
            ourser: 'Наши услуги',
            whatwe: 'Что мы предлагаем',
            descwho: 'Полный спектр услуг технической поддержки и консультаций для вашего бизнеса',
            tech: 'Техническая поддержка',
            dayhour: 'Круглосуточная поддержка пользователей по всем техническим вопросам. Оперативное решение проблем и консультации.',
            ddayhour: '24/7 доступно',
            aboout: 'Подробнее',
            remohelp: 'Удаленная помощь',
            remo: 'Оперативная помощь с удаленным доступом к вашему устройству. Специалисты решат проблему без вашего участия.',
            remoabout: 'Оперативно',
            aboutt: 'Подробнее',
            busines: 'Бизнес-консультации',
            businesabout: 'Профессиональные консультации по вопросам развития бизнеса, оптимизации процессов и внедрения IT-систем.',
            forbusines: 'Для бизнеса',
            businesmore: 'Подробнее',
            inkdata: 'Безопасность данных',
            inkdataabout: 'Консультации и услуги по защите ваших данных, аудит безопасности и внедрение решений защиты информации.',
            inkdatafor: 'Надежно',
            studpers: 'Обучение персонала',
            studpersabout: 'Тренинги и обучающие программы для вашего персонала. Повышение квалификации и развитие навыков.',
            studpersfor: 'Эффективно',
            devsol: 'Разработка решений',
            devsolabout: 'Создание индивидуальных решений для вашего бизнеса, автоматизация процессов и разработка программного обеспечения.',
            devsolfor: 'Индивидуально',
            ourser: 'Наши услуги и поддержка',
            ourserr: 'Мы предлагаем широкий спектр медицинских услуг и круглосуточную поддержку клиентов',
            therapeutic_consultation: 'Терапевтические консультации',
            general_diagnosis: 'Диагностика и лечение распространенных заболеваний',
            cardiology: 'Кардиология',
            cardiology_desc: 'Диагностика и лечение заболеваний сердечно-сосудистой системы',
            neurology: 'Неврология',
            neurology_desc: 'Диагностика и лечение заболеваний нервной системы',
            pulmonology: 'Пульмонология',
            pulmonology_desc: 'Диагностика и лечение заболеваний дыхательной системы',
            hematology: 'Гематолог',
            hematology_desc: 'Диагностика болезни крови и костного мозга.',
            orthopedics: 'Ортопедия',
            orthopedics_desc: 'Диагностика и лечение заболеваний опорно-двигательного аппарата',
            ophthalmology: 'Офтальмология',
            ophthalmology_desc: 'Диагностика и лечение заболеваний глаз',
            ent: 'Отоларингология',
            ent_desc: 'Лечение заболеваний уха, горла и носа',
            gynecology: 'Гинекология',
            gynecology_desc: 'Диагностика и лечение заболеваний женской репродуктивной системы',
            urology: 'Урология',
            urology_desc: 'Диагностика и лечение урологических заболеваний',
            pediatrics: 'Педиатрия',
            pediatrics_desc: 'Медицинская помощь детям от рождения до подросткового возраста',
            endocrinology: 'Эндокринология',
            endocrinology_desc: 'Диагностика и лечение заболеваний эндокринной системы',
            fulldesk: 'Полный прейскурант услуг',
            fulldeskdesc: 'Выберите оптимальное решение для вашего здоровья и комфорта',
            form: 'Оставьте заявку',
            formdesc: 'Оставьте заявку и наш специалист свяжется с вами в ближайшее время',
            name: 'Имя',
            surname: 'Фамилия',
            lastname: 'Отчество',
            phone: 'Телефон',
            email: 'Email (Необязательно)',
            typeform: 'Выберите тип заявки',
            agreement: 'Подтверждаю согласие на обработку персональных данных',
            addform: 'Отправить заявку',
            formsuccess: 'Заявка успешно отправлена',
            formtime: 'Наш специалист свяжется с вами в ближайшее время',
            addnewform: 'Отправить новую заявку',
            reviews: 'Отзывы клиентов',
            reviewdesc: 'Что говорят наши клиенты о нашей работе',
            fastContact: 'Быстрая связь',
            fastContactDescription: 'Ответим на ваше обращение в течение 15 минут',
            experiencedSpecialists: 'Опытные специалисты',
            experiencedSpecialistsDescription: 'Более 10 лет опыта работы',
            qualityGuarantee: 'Гарантия качества',
            qualityGuaranteeDescription: 'Мы обеспечиваем высокое качество обслуживания',
            faq: 'Часто задаваемые вопросы',
            faqDescription: 'Ответы на популярные вопросы наших клиентов',
            question1: 'Как быстро вы ответите на мою заявку?',
            answer1: 'Мы стараемся обрабатывать все заявки в течение 15-30 минут в рабочее время. В нерабочее время заявка будет обработана в первые часы следующего рабочего дня.',
            question2: 'Какие способы связи вы предлагаете?',
            answer2: 'Мы можем связаться с вами по телефону, email, WhatsApp или Telegram - просто укажите предпочтительный способ связи в заявке или в поле комментариев.',
            question3: 'Какие гарантии вы предоставляете на свои услуги?',
            answer3: 'Мы гарантируем высокое качество предоставляемых услуг и оперативное решение проблем.',
            question4: 'Работаете ли вы в выходные дни?',
            answer4: 'Да наша служба поддержки работает и в субботу и в воскресенье с 9:00 до 18:00',
            needConsultation: 'Нужна консультация? Мы всегда на связи!',
            contactUsDescription: 'Свяжитесь с нами любым удобным способом, и мы ответим на все ваши вопросы',
            aboutCompany: 'О компании',
            aboutCompanyDesc: 'Мы предоставляем высококачественную поддержку клиентов и техническое обслуживание 24/7. Наша цель - обеспечить вам быстрое и эффективное решение любых проблем.',
            techSupport: 'Техподдержка',
            consultations: 'Консультации',
            contactInfo: 'Контактная информация',
            address: 'Адрес:',
            training: 'Обучение',
            softwareImplementation: 'Внедрение ПО',
            systemAudit: 'Аудит систем',
            usefulLinks: 'Полезные ссылки',
            signup: 'Записаться',
            workHours: 'Режим работы:',
            aboutus: 'О нас',
            language: 'Язык',
        },
        kg: {
            services: 'Кызматтар',
            home: 'Башкы бет',
            tour: 'Система турлору',
            price: 'Баасы',
            questions: 'Суроолор жана колдонуу',
            reviews: 'Отзывы',
            blog: 'Блог',
            contacts: 'Байланыш',
            helpone: 'Биз 24/7 колдонуучулардын дестеги менен эң жакшы кызматтарды көрсөтөбүз',
            helone: 'Квалификациялуу мутахассистер жардам берүүчү',
            helptwo: 'Профессиональдуу дестек',
            heltwo: '24 сааттык дестек',
            helpthree: 'Күндүзгү дестек',
            helthree: 'Экинчи минуттарда көптөгөн суроолор жактырылат',
            helpfour: 'Проблемаларды жатта жагымдуу түрдө чакырабыз',
            gethelp: 'Дестеги алуу',
            learnmore: 'Көбүрөөк билиңиз',
            panel: 'Башкаруу панели',
            functions: 'Администратордун негизги функциялары',
            text: 'Колдонуучулардын дестеги менен бардык жаңылыктарды башкаруу үчүн жаксы администратордук панели аркылуу',
            staff: 'Кызматкерлерди жасоо',
            servicess: 'Кызматтарды жасоо',
            prices: 'Баасы',
            premium: 'Премиум',
            deskone: 'Сиздин дестек системасынын кызматкерлерин башкаруу',
            desktwo: 'Кызматтарды кошуу жана түзөтүү',
            deskthree: 'Сиздин дестек кызматтарыңыздагы бааларды башкаруу',
            deskfour: 'Сиздин система функцияларына көбүрөөк кириңиз',
            control: 'Башкаруу',
            addser: 'Кызматтарды кошуу',
            setprice: 'Бааларды түзөтүү',
            sellect: 'Кошуу',
            hourday: 'Саат күндү',
            cliients: 'Көптөгөн довтургучтар',
            leveup: 'Элеңдүү довтургучтардын деңгээси',
            minage: 'Минуттардын орто арада жооп берүү убактысы',
            ourser: 'Биздин кызматтар',
            whatwe: 'Биз не көрсөтпөз',
            descwho: 'Сиздин бизнесиңиз үчүн техникалык дестек жана кеңеш кызматтардын толук спектри',
            tech: 'Техникалык дестек',
            dayhour: 'Колдонуучулардын бардык техникалык суроолору үчүн күндүзгү дестек. Проблемаларды жатта жагымдуу жана кеңештер.',
            ddayhour: '24/7 колдонулат',
            aboout: 'Толук',
            remohelp: 'Удаленная помощь',
            remo: 'Оперативная помощь с удаленным доступом к вашему устройству. Специалисты решат проблему без вашего участия.',
            remoabout: 'Оперативно',
            aboutt: 'Толук',
            busines: 'Бизнес-консультации',
            businesabout: 'Профессиональные консультации по вопросам развития бизнеса, оптимизации процессов и внедрения IT-систем.',
            forbusines: 'Для бизнеса',
            businesmore: 'Толук',
            inkdata: 'Маалымат коопсуздугу',
            inkdataabout: 'Сиздин маалыматтардын коргоо, коргоо аудити жана маалыматтын коргоо чечимдерин киргизүү жөнүндө кеңештер жана кызматтар.',
            inkdatafor: 'Коопсуз',
            studpers: 'Кызматкерлерди окутуу',
            studpersabout: 'Сиздин кызматкерлериңиз үчүн тренингтер жана окуу программалары. Квалификацияны арттыруу жана бийиктерди даярдоо.',
            studpersfor: 'Эффективдүү',
            devsol: 'Чечимдерди даярдоо',
            devsolabout: 'Сиздин бизнесиңиз үчүн индивидуалдуу чечимдерди жасоо, процессдерди автоматтандыруу жана программалык жасоону даярдоо.',
            devsolfor: 'Индивидуалдуу',
            therapeutic_consultation: 'Терапиялык консультациялар',
            general_diagnosis: 'Жалпы таралган ооруларды аныктоо жана дарылоо',
            cardiology: 'Кардиология',
            cardiology_desc: 'Жүрөк-кан тамыр системасынын ооруларын аныктоо жана дарылоо',
            neurology: 'Неврология',
            neurology_desc: 'Нерв системасынын ооруларын аныктоо жана дарылоо',
            pulmonology: 'Пульмонология',
            pulmonology_desc: 'Дем алуу системасынын ооруларын аныктоо жана дарылоо',
            hematology: 'Гематолог',
            hematology_desc: 'Кан жана сөөк чучугу ооруларын аныктоо',
            orthopedics: 'Ортопедия',
            orthopedics_desc: 'Скелет-булчуң системасынын ооруларын аныктоо жана дарылоо',
            ophthalmology: 'Офтальмология',
            ophthalmology_desc: 'Көз ооруларын аныктоо жана дарылоо',
            ent: 'Отоларингология',
            ent_desc: 'Кулак, мурун жана тамак ооруларын дарылоо',
            gynecology: 'Гинекология',
            gynecology_desc: 'Аялдардын репродуктивдик системасынын ооруларын аныктоо жана дарылоо',
            urology: 'Урология',
            urology_desc: 'Урологиялык ооруларды аныктоо жана дарылоо',
            pediatrics: 'Педиатрия',
            pediatrics_desc: 'Төрөлгөндөн тартып өспүрүмгө чейинки балдарга медициналык жардам',
            endocrinology: 'Эндокринология',
            endocrinology_desc: 'Эндокриндик системанын ооруларын аныктоо жана дарылоо',
            fulldesk: 'Толук кызматтардын тизмеси',
            fulldeskdesc: 'Сиздин денсаулук жана комфорт үчүн оптималдуу шешимди тандаңыз',
            form: 'Өтүнүч',
            formdesc: 'Өтүнүчтү толтурганыңыздан кийин кызматкеримиз сиз менен байланышат',
            name: 'Аты',
            surname: 'Отчество',
            lastname: 'Фамилия',
            phone: 'Телефон',
            email: 'Email (Керек эмес)',
            typeform: 'Өтүнүч түрүн тандаңыз',
            agreement: 'Мен жеке маалыматтарды иштетүүгө макулдугумду ырастайм',
            addform: 'Өтүнүчтү жөнөтүү',
            formsuccess: 'Өтүнүчтү ийгиликтүү жөнөтүлдү',
            formtime: 'Кызматкеримиз кийинки убактыда сиз менен байланышат',
            addnewform: 'Жаңы өтүнүч жөнөтүү',
            reviews: 'Колдонуучулардын отзывдору',
            reviewdesc: 'Колдонуучулар биздин жүрүмүз жөнүндө чыгарган отзывдору',
            fastContact: 'Тез байланыш',
            fastContactDescription: 'Сиздин кайрылууга 15 мүнөттүн ичинде жооп беребиз',
            experiencedSpecialists: 'Тажрыйбалуу адистер',
            experiencedSpecialistsDescription: '10 жылдан ашык иш тажрыйбасы',
            qualityGuarantee: 'Сапат кепилдиги',
            qualityGuaranteeDescription: 'Биз жогорку сапаттагы кызмат көрсөтүүнү камсыз кылабыз',
            faq: 'Көп берилүүчү суроолор',
            faqDescription: 'Клиенттерибиздин көп берилүүчү суроолоруна жооптор',
            question1: 'Канча убакытта кайрылууга жооп бересиздер?',
            answer1: 'Иш убактысында бардык кайрылууларга 15-30 мүнөт ичинде жооп берүүгө аракет кылабыз. Иш эмес убакта кайрылуу кийинки иш күнүнүн алгачкы сааттарында каралат.',
            question2: 'Кайсы байланыш ыкмаларын сунуштайсыздар?',
            answer2: 'Сиз менен телефон, email, WhatsApp же Telegram аркылуу байланыша алабыз - жөнөтүүнүн же комментарийлер көзүндө көрсөтүүңүз керек.',
            question3: 'Кызматтарыңызга кандай кепилдиктер бар?',
            answer3: 'Биз көрсөтүү кызматтардын жогорку сапатын жана оперативдүү проблемаларды жактырылат.',
            question4: 'Ишемби жана жекшембиде иштейсиздерби?',
            answer4: 'Жана биздин дестек кызматыбыз жана жекшемби күнүндө 9:00-дан 18:00-га чейин иштейт.',
            needConsultation: 'Кеңеш керекпи? Биз ар дайым байланыштамын!',
            contactUsDescription: 'Сизге ылайыктуу ыкма менен байланышып, бардык суроолоруңузга жооп беребиз',
            aboutCompany: 'Компания жөнүндө',
            aboutCompanyDesc: 'Биз кардарларды жогорку сапаттагы колдоо жана 24/7 техникалык тейлөө менен камсыздайбыз. Биздин максат – бардык маселелериңизди тез жана натыйжалуу чечүү.',
            techSupport: 'Техникалык колдоо',
            consultations: 'Кеңештер',
            contactInfo: 'Байланыш маалыматтары',
            address: 'Дарек:',
            training: 'Окутуу',
            softwareImplementation: 'Программаны киргизүү',
            systemAudit: 'Системаны аудит кылуу',
            usefulLinks: 'Пайдалуу шилтемелер',
            signup: 'Катталуу',
            workHours: 'Иштөө убактысы:',
            aboutus: 'Биз жөнүндө',
            language: 'Тил',

        }
    };

    const Translate = () => {
        const newLang = language === 'ru' ? 'kg' : 'ru';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    // useEffect(() => {
    //     const savelang = localStorage.getItem('language')
    //     if (savelang) {
    //         setLanguage(savelang);
    //     }
    // }, []);

    let list = async () => {
        let person = await axios({
            method: "get",
            url: `${domain}/api/services`,
        })
        console.log('Данные успешно получены', person);
        if (person != null) {
            if (person.status == 200) {
                setData(person.data.services)
                console.log('Данные успешно получены', person);
            }
        }
    }

    const handleSelectChange = (e) => {
        setApplicationType(e.target.value);
    };

    const Ad = async (e) => {
        e.preventDefault();
        if (!email) {
            if (validator.isLength(name, { min: 2, max: 15 }) &&
                validator.isLength(lastname, { min: 2, max: 15 }) &&
                validator.isMobilePhone(phone) &&
                validator.isLength(surname, { min: 2, max: 15 })) {
                let person = await axios({
                    method: "post",
                    url: `${domain}/api/usersdentist`,
                    params: {
                        name: name,
                        lastname: lastname,
                        surname: surname,
                        number: phone,
                        agreement: true,
                        applications: applicationType,
                    }
                });
                console.log(person);
                if (person != null) {
                    if (person.status >= 200 && person.status < 300) {
                        console.log('Успешно добавлено');
                        if (person.data.id) {
                            localStorage.setItem('identikay', person.data.id);
                            setShow(false);
                        }
                    }
                }
            } else {
                setText("Введите данные как следует");
            }
        }
        else if (email) {
            // const emailOshIbka = users.some((i) => i.email === email);
            // if (emailOshIbka) {
            //     setShowtext(true);
            // } else {
            if (validator.isLength(name, { min: 2, max: 15 }) &&
                validator.isLength(lastname, { min: 2, max: 15 }) &&
                validator.isMobilePhone(phone) &&
                validator.isEmail(email)) {
                let person = await axios({
                    method: "post",
                    url: `${domain}/api/usersdentist`,
                    params: {
                        name: name,
                        lastname: lastname,
                        surname: surname,
                        number: phone,
                        email: email,
                        agreement: agreement,
                        applications: applicationType,
                    }
                });
                console.log(person);
                if (person != null) {
                    if (person.status >= 200 && person.status < 300) {
                        console.log('Успешно добавлено');
                        if (person.data.id) {
                            localStorage.setItem('identikay', person.data.id);
                            setShow(false);
                        }
                    }
                }
            } else {
                setText("Введите данные как следует");
                // }
            }
        }
    };



    const Ser = () => {
        setTimeout(() => {
            const screenWidth = window.innerWidth;
            let scrollTarget;
            if (screenWidth >= 1024) {
                // Desktop
                scrollTarget = 2600;
            } else if (screenWidth >= 768) {
                // Tablet
                scrollTarget = 2500;
            } else {
                // Mobile
                scrollTarget = 5200;
            }
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }, 300);
    }

    const Tour = () => {
        setTimeout(() => {
            const screenWidth = window.innerWidth;
            let scrollTarget;
            if (screenWidth >= 1024) {
                scrollTarget = 1700;
            } else if (screenWidth >= 768) {
                scrollTarget = 2500;
            } else {
                scrollTarget = 2920;
            }
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }, 300);
    }

    const Price = () => {
        setTimeout(() => {
            const screenWidth = window.innerWidth;
            let scrollTarget;
            if (screenWidth >= 1024) {
                scrollTarget = 3300;
            } else if (screenWidth >= 768) {
                scrollTarget = 2500;
            } else {
                scrollTarget = 5800;
            }
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }, 300);
    }

    const Que = () => {
        setTimeout(() => {
            const screenWidth = window.innerWidth;
            let scrollTarget;
            if (screenWidth >= 1024) {
                scrollTarget = 4600;
            } else if (screenWidth >= 768) {
                scrollTarget = 2500;
            } else {
                scrollTarget = 7800;
            }
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }, 300);
    }

    const Rev = () => {
        setTimeout(() => {
            const screenWidth = window.innerWidth;
            let scrollTarget;
            if (screenWidth >= 1024) {
                scrollTarget = 4200;
            } else if (screenWidth >= 768) {
                scrollTarget = 2500;
            } else {
                scrollTarget = 6800;
            }
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }, 300);
    }

    const Con = () => {
        setTimeout(() => {
            const screenWidth = window.innerWidth;
            let scrollTarget;
            if (screenWidth >= 1024) {
                scrollTarget = 5000;
            } else if (screenWidth >= 768) {
                scrollTarget = 2500;
            } else {
                scrollTarget = 10000;
            }
            window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
        }, 300);
    }

    function onEntry(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('element-scroll-show');
            } else {
                entry.target.classList.remove('element-scroll-show');
            }
        });
    }

    let options = { threshold: 0.2 };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.el-scroll-hidden');
    for (let elm of elements) {
        observer.observe(elm);
    }

    const handleClose = () => {
        setShowtext(false);
    };

    useEffect(() => {
        famous();
        list();
        serservis();
        reviewss();
        categories();
        doctor();
        docus();
    }, []);

    return (
        <>
            <div className="bg-dark text-white py-2 d-none d-lg-block el-scroll-hidden">
                <div className="container d-flex justify-content-between align-items-center">
                    <div>
                        <small><i className="fa-solid fa-phone me-2"></i>+996 774 103 105</small>
                        <small className="ms-3"><i className="fa-solid fa-envelope me-2"></i>medkenesh@gmail.com</small>
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
            {/* Навигационная панель sticky-top*/}
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm el-scroll-hidden">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <i className="fa-solid fa-stethoscope p-1 me-2"></i>
                        <span className="fw-bold text-primary">
                            Med<span className="text-danger">Kenesh</span>
                        </span>
                    </a>
                    <i class="fa-solid fa-bars fa-2x d-block d-md-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                        <div class="offcanvas-header">
                            <span className="fw-bold text-primary mt-2">Med<span className="text-danger">Kenesh</span></span>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <a className="nav-link fw-semibold" href="#"><i className="fa-solid fa-house me-1"></i>{translations[language].home}</a>
                                </li>
                                <li className="nav-item dropdown" onClick={Ser}>
                                    <a className="nav-link fw-semibold" data-bs-dismiss="offcanvas" aria-label="Close"><i className="fa-solid fa-headset me-1"></i>{translations[language].services}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-semibold" data-bs-dismiss="offcanvas" aria-label="Close" onClick={Tour}><i className="fa-solid fa-circle-info me-1"></i>{translations[language].tour}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-semibold" data-bs-dismiss="offcanvas" aria-label="Close" onClick={Price}><i className="fa-solid fa-tag me-1"></i>{translations[language].price}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-semibold" data-bs-dismiss="offcanvas" aria-label="Close" onClick={Que}><i className="fa-solid fa-question-circle me-1"></i>{translations[language].questions}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-semibold" data-bs-dismiss="offcanvas" aria-label="Close" onClick={Rev}><i className="fa-solid fa-star me-1"></i>{translations[language].reviews}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-semibold" data-bs-dismiss="offcanvas" aria-label="Close" onClick={Con}><i className="fa-solid fa-address-book me-1"></i>{translations[language].contacts}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link fw-semibold" data-bs-dismiss="offcanvas" aria-label="Close" onClick={Translate}><i className="fa-solid fa-globe"></i> {translations[language].language}</a>
                                </li>
                            </ul>
                            {/* <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <i class="fa-solid fa-moon"></i>
                                </div>
                                <div className="dropdown me-2">
                                    <i className="fa-solid fa-globe" onClick={Translate}></i>
                                </div>
                                <a href="/admin" className="p-2 me-2 href">
                                    <i className="fa-solid fa-user"></i>
                                </a>
                            </div> */}
                        </div>
                    </div>
                </div>
            </nav>
            {/* Главный баннер с формой */}
            <div className="bg-primary text-white py-4 py-md-5 el-scroll-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="display-4 fw-bold mb-2 mb-md-3 text-center text-md-start">Med Kenesh</h1>
                            <h3 className="fw-light mb-3 mb-md-4 fs-5 fs-md-4 text-center text-md-start">{translations[language].helpone}</h3>

                            <div className="mb-4">
                                <div className="d-flex flex-column flex-md-row mb-3 align-items-center align-items-md-start text-center text-md-start">
                                    <div className="text-light p-2 p-md-3 rounded-circle me-md-3 mb-2 mb-md-0">
                                        <i className="fa-solid fa-check fa-lg"></i>
                                    </div>
                                    <div>
                                        <h5 className="mt-1 fs-6 fs-md-5">{translations[language].helptwo}</h5>
                                        <p className="mb-0 opacity-75 small">{translations[language].helone}</p>
                                    </div>
                                </div>

                                <div className="d-flex flex-column flex-md-row mb-3 align-items-center align-items-md-start text-center text-md-start">
                                    <div className="text-light p-2 p-md-3 rounded-circle me-md-3 mb-2 mb-md-0">
                                        <i className="fa-solid fa-clock fa-lg"></i>
                                    </div>
                                    <div>
                                        <h5 className="mt-1 fs-6 fs-md-5">{translations[language].helpthree}</h5>
                                        <p className="mb-0 opacity-75 small">{translations[language].heltwo}</p>
                                    </div>
                                </div>

                                <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start">
                                    <div className="text-light p-2 p-md-3 rounded-circle me-md-3 mb-2 mb-md-0">
                                        <i className="fa-solid fa-bolt fa-lg"></i>
                                    </div>
                                    <div>
                                        <h5 className="mt-1 fs-6 fs-md-5">{translations[language].helpfour}</h5>
                                        <p className="mb-0 opacity-75 small">{translations[language].helthree}</p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 justify-content-center justify-content-md-start">
                                <button className="btn btn-light btn-md btn-lg-lg rounded-pill px-3 px-md-4 w-100 w-md-auto mb-2 mb-md-0">
                                    <i className="fa-solid fa-headset me-2"></i>{translations[language].gethelp}
                                </button>
                                <button className="btn btn-outline-light btn-md btn-lg-lg rounded-pill px-3 px-md-4 w-100 w-md-auto">
                                    <i className="fa-solid fa-info-circle me-2"></i>{translations[language].learnmore}
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Счетчики и статистика */}
            <div className="container-fluid bg-light py-5 mt-5 el-scroll-hidden">
                <div className="row text-center">
                    <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                        <div className="card border-0 rounded-4 h-100 py-5">
                            <div className="card-body">
                                <i className="fa-solid fa-headset fa-3x text-primary mb-4"></i>
                                <h2 className="display-4 fw-bold text-primary mb-2 counter">24</h2>
                                <p className="text-muted">{translations[language].hourday}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                        <div className="card border-0 rounded-4 h-100 py-5">
                            <div className="card-body">
                                <i className="fa-solid fa-users fa-3x text-danger mb-4"></i>
                                <h2 className="display-4 fw-bold text-danger mb-2 counter">10000+</h2>
                                <p className="text-muted">{translations[language].cliients}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 mb-4 mb-sm-0">
                        <div className="card border-0 rounded-4 h-100 py-5">
                            <div className="card-body">
                                <i className="fa-solid fa-medal fa-3x text-info mb-4"></i>
                                <h2 className="display-4 fw-bold text-info mb-2 counter">98%</h2>
                                <p className="text-muted">{translations[language].leveup}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card border-0 rounded-4 h-100 py-5">
                            <div className="card-body">
                                <i className="fa-solid fa-clock-rotate-left fa-3x text-warning mb-4"></i>
                                <h2 className="display-4 fw-bold text-warning mb-2 counter">15</h2>
                                <p className="text-muted">{translations[language].minage}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-5 mt-5 bg-light el-scroll-hidden">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        {show ? (
                            <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
                                <div className="card-header bg-primary text-white p-4 border-0">
                                    <h2 className="m-0 text-center fw-bold">
                                        <i className="fa-solid fa-headset me-2"></i> {translations[language].form}
                                    </h2>
                                </div>
                                <div className="card-body p-4 p-lg-5">
                                    <p className="text-muted text-center mb-4">{translations[language].formdesc}</p>
                                    <form>
                                        <div className="row g-4">
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <input type="text"
                                                        className={`form-control border ${lastname ? 'is-valid' : ''}`} id="lastname"
                                                        placeholder={translations[language].lastname} value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                    <label htmlFor="lastname">
                                                        <i className="fa-solid fa-user me-2"></i>{translations[language].lastname}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <input type="text"
                                                        className={`form-control border ${name ? 'is-valid' : ''}`} id="name"
                                                        placeholder={translations[language].name} value={name} onChange={(e) => setName(e.target.value)} />
                                                    <label htmlFor="name">
                                                        <i className="fa-solid fa-user me-2"></i>{translations[language].name}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <input type="text" className={`form-control border ${surname ? 'is-valid' : ''}`} id="surname"
                                                        placeholder={translations[language].surname} value={surname} onChange={(e) => setSurname(e.target.value)} />
                                                    <label htmlFor="surname">
                                                        <i className="fa-solid fa-user me-2"></i>{translations[language].surname}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <input type="tel" className={`form-control border ${phone ? 'is-valid' : ''}`} id="phone" placeholder={translations[language].phone}
                                                        value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                                    <label htmlFor="phone">
                                                        <i className="fa-solid fa-phone me-2"></i>{translations[language].phone}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <input type="email"
                                                        className={`form-control border ${email ? 'is-valid' : ''}`} id="email"
                                                        placeholder={translations[language].email} value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label htmlFor="email">
                                                        <i className="fa-solid fa-envelope me-2"></i>{translations[language].email}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-floating">
                                                    <select
                                                        className="form-select"
                                                        id="typeRequest"
                                                        value={applicationType}
                                                        onChange={handleSelectChange}>
                                                        <option value="">{translations[language].typeform}</option>
                                                        {category.map(i => (
                                                            <option key={i.id} value={i.name}>{i.name}</option>
                                                        ))}
                                                    </select>
                                                    <label htmlFor="typeRequest">{translations[language].typeform}</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-check mt-3">
                                                    <input type="checkbox" className="form-check-input border border-dark"
                                                        id="agreement" checked={agreement} onChange={(e) => setAgreement(e.target.checked)} />
                                                    <label className="form-check-label" htmlFor="agreement">
                                                        {translations[language].agreement}
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
                                                {showtext && (
                                                    <div className="row text-center">
                                                        <div className="mt-3 alert alert-success alert-dismissible lol fade show fixed-top" role="alert">
                                                            <strong>Такая почта уже существует</strong>
                                                            <button onClick={handleClose} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    type="submit"
                                                    onClick={Ad}
                                                    className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm"
                                                    disabled={!agreement}>
                                                    <i className="fa-solid fa-paper-plane me-2"></i>
                                                    {translations[language].addform}
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
                                        <h2 className="mt-4 mb-3">{translations[language].addform}</h2>
                                        <p className="lead mb-4">{translations[language].formsuccess}</p>
                                        <button onClick={() => setShow(true)} className="btn btn-outline-success btn-lg rounded-pill px-4">
                                            <i className="fa-solid fa-arrow-left me-2"></i>
                                            {translations[language].addnewform}
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
                                    <h4>{translations[language].fastContact}</h4>
                                    <p className="mb-0">{translations[language].fastContactDescription}</p>
                                </div>
                            </div>
                            <div className="card border-0 shadow mb-4 rounded-3 bg-info text-white">
                                <div className="card-body p-4 text-center">
                                    <i className="fa-solid fa-user-tie fa-3x mb-3"></i>
                                    <h4>{translations[language].experiencedSpecialists}</h4>
                                    <p className="mb-0">{translations[language].experiencedSpecialistsDescription}</p>
                                </div>
                            </div>
                            <div className="card border-0 shadow rounded-3 bg-warning text-white">
                                <div className="card-body p-4 text-center">
                                    <i className="fa-solid fa-shield fa-3x mb-3"></i>
                                    <h4>{translations[language].qualityGuarantee}</h4>
                                    <p className="mb-0">{translations[language].qualityGuaranteeDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Услуги в виде карточек */}
            <div className="container-fluid py-5 el-scroll-hidden">
                <div className="row mb-5 text-center text-with-image">
                    <div className="col-12">
                        <h6 className="text-danger fw-bold text-uppercase mt-5">{translations[language].ourser}</h6>
                        <h2 className="fw-bold mt-5">{translations[language].whatwe}</h2>
                        <p className="text-muted mx-auto mt-5" style={{ maxWidth: "700px" }}>
                            <b>{translations[language].descwho}</b>
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
                                    <h5 className="card-title mb-0 fw-bold">{translations[language].tech}</h5>
                                </div>
                                <p className="card-text text-muted">{translations[language].dayhour}</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-primary rounded-pill px-3 py-2">{translations[language].ddayhour}</span>
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
                                    <h5 className="card-title mb-0 fw-bold">{translations[language].remohelp}</h5>
                                </div>
                                <p className="card-text text-muted">{translations[language].remo}</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-danger rounded-pill px-3 py-2">{translations[language].remoabout}</span>
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
                                    <h5 className="card-title mb-0 fw-bold">{translations[language].busines}</h5>
                                </div>
                                <p className="card-text text-muted">{translations[language].businesabout}</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-info rounded-pill px-3 py-2">{translations[language].forbusines}</span>
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
                                    <h5 className="card-title mb-0 fw-bold">{translations[language].inkdata}</h5>
                                </div>
                                <p className="card-text text-muted">{translations[language].inkdataabout}</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-warning rounded-pill px-3 py-2">{translations[language].inkdatafor}</span>
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
                                    <h5 className="card-title mb-0 fw-bold">{translations[language].studpers}</h5>
                                </div>
                                <p className="card-text text-muted">{translations[language].studpersabout}</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-success rounded-pill px-3 py-2">{translations[language].studpersfor}</span>
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
                                    <h5 className="card-title mb-0 fw-bold">{translations[language].devsol}</h5>
                                </div>
                                <p className="card-text text-muted">{translations[language].devsolabout}</p>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="badge bg-secondary rounded-pill px-3 py-2">{translations[language].devsolfor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center">
                <h1><b>Наши специалисты</b></h1>
                {showdoctors ? (
                    doctors.length ? (
                        <div className="d-flex overflow-auto mt-4 gap-4 px-2">
                            {doctors.map(i => (
                                <div style={{ minWidth: '300px' }} key={i.id}>
                                    <div className="card">
                                        <img
                                            src={`https://мойдоктор-вл.рф/storage/app/${i.photo}`}  // Используем путь из базы данных
                                            className="card-img-top"
                                            alt={`${i.name} ${i.lastname}`}  // Добавляем имя и фамилию для alt
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{i.name} {i.lastname}</h5>
                                            <p className="card-text">{i.type}</p>
                                            <a className="btn btn-primary form-control" onClick={() => {
                                                setDocuser(i);
                                                setShowDoctors(false);
                                                localStorage.setItem('doctorId', i.id);
                                            }}>Подробнее</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-4">Нет данных</div>
                    )
                ) : (
                    docuser != null ? (
                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <img
                                            src={`https://мойдоктор-вл.рф/storage/app/${docuser.photo}`}  // Используем путь для конкретного врача
                                            className="card-img-top"
                                            alt="Фото доктора"
                                        />
                                        <div className="card-body text-center">
                                            <h4 className="card-title">{docuser.name}</h4>
                                            <p className="card-text text-muted">{docuser.type}</p>
                                            <div className="mb-3">
                                                <span className="badge bg-primary me-1">Кардиология</span>
                                                <span className="badge bg-info me-1">УЗИ</span>
                                                <span className="badge bg-secondary">ЭКГ</span>
                                            </div>
                                            <div className="mb-3">
                                                <span className="text-warning">★★★★★</span>
                                                <small className="text-muted ms-2">4.9 (128 отзывов)</small>
                                            </div>
                                            <button
                                                className="btn btn-success btn-lg w-100"
                                                onClick={() => {
                                                    setShowDoctors(!showdoctors); // Переключаем показ докторов
                                                    localStorage.removeItem('doctorId'); // Удаляем ключ 'doctorId' из localStorage
                                                }}>
                                                Записаться на приём
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    {/* Загружаем данные о враче, если id найден в localStorage */}
                                    <div className="card mb-4">
                                        <div className="card-header">
                                            <h5>О враче</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                {/* Тут вы можете загрузить данные, основываясь на doctorId */}
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
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>Нет данных</>
                    )
                )}
            </div>
            <div class="container py-5 el-scroll-hidden">
                <div class="row mb-5 text-center">
                    <div class="col-12">
                        <h2 class="fw-bold">{translations[language].ourser}</h2>
                        <p class="text-muted">{translations[language].ourserr}</p>
                    </div>
                </div>
                <div class="row mb-5">
                    <div class="col-12">
                        <h3 class="fw-bold mb-4 border-bottom pb-2">{translations[language].services}</h3>
                    </div>
                    {serser.length ? (
                        serser.map(i => (
                            <div className="col-md-3 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body text-center">
                                        <div className="bg-primary rounded mx-auto d-flex align-items-center justify-content-center mb-3 p-4">
                                            <div className="fa-2x text-light" dangerouslySetInnerHTML={{ __html: i.icon }} />
                                        </div>
                                        <h5 className="card-title">{i.name}</h5>
                                        <p className="card-text small">{i.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            Загрузка данных
                        </div>
                    )}
                </div>
            </div>
            {/* Услуги в виде карточек */}
            <div className="container-fluid py-5 el-scroll-hidden">
                <div className="row mt-5">
                    <div className="col-12 text-center mb-4">
                        <h3 className="fw-bold">{translations[language].fulldesk}</h3>
                        <p className="text-muted">{translations[language].fulldesk}</p>
                    </div>
                    <div className="col-lg-10 mx-auto">
                        <div className="accordion" id="servicesAccordion">
                            {data.length ? (
                                data.map(i => (
                                    <div className="accordion-item border mb-3 rounded-3 shadow-sm" key={i.id}>
                                        <h2 className="accordion-header" id={`heading${i.id}`}>
                                            <button
                                                className="accordion-button rounded-3 fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${i.id}`}
                                                aria-expanded="false"
                                                aria-controls={`collapse${i.id}`}>
                                                {i.title}
                                            </button>
                                        </h2>
                                        <div id={`collapse${i.id}`}
                                            className="accordion-collapse collapse"
                                            aria-labelledby={`heading${i.id}`}
                                            data-bs-parent="#servicesAccordion">
                                            <div className="accordion-body">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: i.description }}></p>
                                                    <span className="badge bg-primary rounded-pill px-3 py-2">{i.price} Сом/час</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    Загрузка данных
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Блок отзывов */}
            <div className="container-fluid py-5 bg-light bg-opacity-50 el-scroll-hidden">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">{translations[language].reviews}</h2>
                    <p className="lead text-muted">{translations[language].reviewdesc}</p>
                </div>
                <div className="row g-4">
                    {reviews.length ? (
                        reviews.map(i => (
                            <div className="col-md-4" key={i.id}>
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between mb-3">
                                            <div className="d-flex align-items-center">
                                                <div className="text-primary p-2 me-3">
                                                    <i className="fa-solid fa-user"></i>
                                                </div>
                                                <div>
                                                    <h5 className="mb-0">{i.name}</h5>
                                                    <small className="text-muted">{i.city}</small>
                                                </div>
                                            </div>
                                            <div className="text-warning">
                                                {Array.from({ length: Math.floor(i.rating) }, (_, index) => (
                                                    <i key={index} className="fa-solid fa-star text-warning"></i>
                                                ))}
                                                {i.rating % 1 !== 0 && <i className="fa-solid fa-star-half-alt text-warning"></i>}
                                            </div>
                                        </div>
                                        <p className="mb-0">{i.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            Загрузка данных
                        </div>
                    )}
                </div>
            </div>
            {/* Секция вопросов/ответов */}
            <div className="container py-5 el-scroll-hidden">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold">{translations[language].faq}</h2>
                    <p className="lead text-muted">{translations[language].faqDescription}</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="accordion" id="faqAccordion">
                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                        {translations[language].question1}
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        {translations[language].answer1}
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                        {translations[language].question2}
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        {translations[language].answer2}
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item border-0 shadow-sm mb-3">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                        {translations[language].question3}
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        {translations[language].answer3}
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item border-0 shadow-sm">
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour">
                                        {translations[language].question4}
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        {translations[language].answer4}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call-to-action перед футером */}
            <div className="container-fluid bg-primary py-5 d-none d-lg-block el-scroll-hidden">
                <div className="row align-items-center">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
                        <h2 className="text-white mb-3">{translations[language].needConsultation}</h2>
                        <p className="text-white opacity-75 mb-0">{translations[language].contactUsDescription}</p>
                    </div>
                    <div className="col-lg-3 text-center text-lg-end">
                        <a className="btn btn-light rounded-pill btn-lg px-4 me-2 mb-2 mb-sm-0" onClick={() => window.scrollTo({ top: 4700, behavior: 'smooth' })}>
                            <i className="fa-solid fa-pen me-2"></i>{translations[language].signup}
                        </a>
                        <a href="https://web.whatsapp.com/send?phone=701550087"
                            className="btn btn-outline-light rounded-pill btn-lg px-4"
                            target="_blank"
                            rel="noopener noreferrer"><i className="fa-brands fa-whatsapp me-2"></i>Whatsapp</a>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </div>

            <div className="container py-3 d-block d-md-none fixed-bottom el-scroll-hidden">
                <div className="row text-center gx-2">
                    <div className="col-6">
                        <a href="tel:+996701550087" className="btn btn-primary rounded-pill btn-lg w-100 py-2">
                            <i className="fa-solid fa-phone me-2"></i>Звонок
                        </a>
                    </div>
                    <div className="col-6">
                        <a href="https://wa.me/996701550087" className="btn btn-success rounded-pill btn-lg w-100 py-2">
                            <i className="fa-brands fa-whatsapp me-2"></i>WhatsApp
                        </a>
                    </div>
                    <div className="col-12 mt-2">
                        <a href="#" className="btn btn-info rounded-pill btn-lg w-100 py-2" onClick={() => window.scrollTo({ top: 9750, behavior: 'smooth' })}>
                            <i className="fa-solid fa-pen me-2"></i>Записаться
                        </a>
                    </div>
                </div>
            </div>
            {/* Расширенный футер */}
            <footer className="bg-dark text-white py-5 el-scroll-hidden">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6 col-md-6">
                            <h4 className="mb-4 border-bottom border-light border-2 pb-2">{translations[language].aboutCompany}</h4>
                            <h2 className="mb-3">Med Kenesh</h2>
                            <p className="mb-4">{translations[language].aboutCompanyDesc}</p>
                            <div className="d-flex gap-3">
                                <a href="#" className="btn btn-outline-light text-primary rounded-circle face">
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light rounded-circle ins">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light rounded-circle tg">
                                    <i className="fa-brands fa-telegram"></i>
                                </a>
                                <a href="#" className="btn btn-outline-light text-success rounded-circle">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <h4 className="mb-4 border-bottom border-light border-2 pb-2">{translations[language].contactInfo}</h4>
                            <ul className="list-unstyled">
                                <li className="d-flex mb-3">
                                    <i className="fa-solid fa-location-dot mt-1 me-3"></i>
                                    <div>
                                        <strong>{translations[language].address}</strong><br />
                                        г. Ош, ул. Ленина, 313, офис 3
                                    </div>
                                </li>
                                <li className="d-flex mb-3">
                                    <i className="fa-solid fa-phone mt-1 me-3"></i>
                                    <div>
                                        <strong>{translations[language].phone}:</strong><br />
                                        <p>+996 774 103 105</p>
                                        {/* <a href="tel:+998999999999" className="text-white">+996 774 103 105</a> */}
                                    </div>
                                </li>
                                <li className="d-flex mb-3">
                                    <i className="fa-solid fa-envelope mt-1 me-3"></i>
                                    <div>
                                        <strong>{translations[language].email}:</strong><br />
                                        <a href="mailto:medkenesh@gmail.com" className="text-white">medkenesh@gmail.com</a>
                                    </div>
                                </li>
                                <li className="d-flex">
                                    <i className="fa-solid fa-clock mt-1 me-3"></i>
                                    <div>
                                        <strong>{translations[language].workHours}</strong><br />
                                        Круглосуточно
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Нижний футер с копирайтом */}
            <div className="bg-black text-white py-3 el-scroll-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                            <small>&copy; 2025 Med Kenesh. Все права защищены.</small>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <small>
                                <text className="text-white text-decoration-none me-3">Политика конфиденциальности</text>
                                <text className="text-white text-decoration-none">Условия использования</text>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Add;