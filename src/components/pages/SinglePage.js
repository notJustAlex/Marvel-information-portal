import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

        useEffect(() => {
            updateData()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [id])

        const updateData = () => {
            clearError();

            dataType === 'comic' ? getComic(id).then(onDataLoaded).then(() => setProcess('confirmed')) : getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        return (
            <>
                <AppBanner/>
                {setContent(process, Component, data)}
            </>
        )
}

export default SinglePage;