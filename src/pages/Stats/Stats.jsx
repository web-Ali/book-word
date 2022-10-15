import React, {useState} from 'react';
import StatisticsContainer from "../../containers/Statistics/StatisticsContainer";


import { DatePicker } from 'antd';
import {useTranslation} from "react-i18next";
const Stats = ({bookList}) => {
    console.log(bookList)

    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [bookId, setBookId] = useState(null)
    const { RangePicker } = DatePicker;
    const {t} = useTranslation();

    console.log(bookId)

    function onChange(date) {
        if (date){
            setDateStart(date[0]._d)
            setDateEnd(date[1]._d)
        }
    }
    return (
        <div className='container  pt-4'>
            <div className='text-center content'>
                <h6 className='mt-3 d-block'>{t('You can find out the general statistics, or the statistics of one book')}</h6>
                <select value={bookId} placeholder={'qwe'} onChange={(e) => {
                    setBookId(e.target.value)
                }} className='form-control w-75 d-inline-block '>
                    <option value=''>{t('total stats')}</option>
                    {bookList.map(item=> <option value={item.id}>{item.name}</option>)}
                </select>
                <div className='mt-2'><RangePicker

                    onChange={onChange}
                /></div>
            </div>
            <div className='content'>
                <StatisticsContainer
                    start={dateStart.getFullYear() + '.' + (dateStart.getMonth() + 1) + '.' + dateStart.getDate()}
                    end={dateEnd.getFullYear() + '.' + (dateEnd.getMonth() + 1) + '.' + dateEnd.getDate()}
                    book={bookId}
                />
            </div>
        </div>
    );
};

export default Stats;