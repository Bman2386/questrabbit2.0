import React,{useState, useEffect, useRef} from 'react';
import {  Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchQuests } from '../../store/quest';
import { QuestShow } from './questShow';
import EditQuest from './edit';
import CancelQuest from './cancel';
import './questPage.css';

function QuestsPage (){
    const dispatch = useDispatch();
    const quests = useSelector(state =>  Object.values(state.quests) ?? []);
    const currentUser = useSelector(state=> state.session.user ?? '');
    const [edit, setEdit] = useState(false);
    const [quest, setQuest] = useState('');
    const [cancel, setCancel] = useState(false);

    const isQuestsFetched = useRef(false);
    
    useEffect(() => {
        if (isQuestsFetched.current ===false) {
            dispatch(fetchQuests());
            isQuestsFetched.current = true;
        };
    }, [dispatch]);

    if (!currentUser) return <Redirect to='/'/>;

    if (edit) return <EditQuest currentUser={currentUser} quest={quest} setEdit={setEdit} />;
    if (cancel) return <CancelQuest currentUser={currentUser} quest={quest} edit={edit} setEdit={setEdit} cancel={cancel} setCancel={setCancel}/>;
    
    const moveToEdit = (id) => {
        const temp = quests.filter(q => q.id === parseInt(id));
        const matchedQuest = temp[0];
        setQuest(matchedQuest);
        setEdit(true);
       };
    const moveToCancel = (id) => {
        const temp = quests.filter(q => q.id === parseInt(id));
        const matchedQuest = temp[0];
        setQuest(matchedQuest);
        setCancel(true)
    };
    
        return(
                <div className="form2" id='background'>
                    <QuestShow
                    quests={quests}
                    moveToEdit={moveToEdit}
                    moveToCancel={moveToCancel}
                    />
                </div>
        );
};

export default QuestsPage;