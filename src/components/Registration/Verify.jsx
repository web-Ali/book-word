import React from 'react';
import {Link} from "react-router-dom";
import {LOGIN_ROUTE} from "../../routing/consts";
import {Button, Result} from "antd";
import {useTranslation} from "react-i18next";
import Helmet from "react-helmet";

const Verify = ({message,verify}) => {
    const { t } = useTranslation();

    return (
        <div className='container' style={{minHeight: 600}}>
            <Helmet>
                <title>verify</title>
            </Helmet>
            <Result
                status={verify ? 'success' : 'warning'}
                title={message}
                extra={[
                    <Button type="primary" key="console">
                        {verify && <Link to={LOGIN_ROUTE} >Go to the authorization!</Link>}
                    </Button>,
                ]}
            />


        </div>
    );
};

export default Verify;