import React, {useEffect} from "react";
import './App.css';
import AppRouter from "./components/Routes/AppRouter";
import HeaderContainer from "./containers/Header/HeaderContainer";
import Footer from "./components/Footer/Footer";
import Helmet from "react-helmet";


function App() {

    useEffect(() => {
        localStorage.setItem('i18nextLng', 'ru')
    }, [])

    return (
        <div className="App">
            <Helmet
                htmlAttributes={{lang: localStorage.getItem('i18nextLng')}}
                meta={[
                    {"property": "og:type", "content": "website"},
                    {"property": "og:image", "content": "https://worldofwriter.com/static/media/logo.a284cce9.png"},
                    {"property": "og:title", "content": "World of writer | Мир писателя — Книги онлайн"},
                    {"property": "og:site_name", "content": "World of writer"},
                    {
                        "property": "og:description",
                        "content": "Электронная библиотека современной литературы World of writer - место," +
                            " где можно бесплатно читать и скачать книги онлайн с телефона или компьютера, полные версии, все жанры. Присоединяйтесь!"
                    },
                ]}
                defaultTitle="World of writer"
                titleTemplate="%s | World of writer"
            >
            </Helmet>
            <HeaderContainer/>
            <div className="bodyContent">
                <AppRouter/>
            </div>
            <Footer/>
        </div>
    );
}


export default App;

