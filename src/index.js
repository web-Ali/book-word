import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Loader from "./components/Loader/Loader";

//Localisaton
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        supportedLngs: ['ru', 'en'],
        fallbackLng: "en",
        detection: {
            order: [ 'localStorage','cookie', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage']
        },
        backend: {
            loadPath: '/assets/locales/{{lng}}/translation.json',
        },


    });

ReactDOM.render(
    <Suspense fallback={<Loader />}>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
    </Suspense>,
    document.getElementById('root')
);
