import React,{useState, useEffect, useRef} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchQuests } from '../../store/quest';
import { categoryShow, adventurerShow, dateShow } from '../../utils/show';
import EditQuest from './edit';
import CancelQuest from './cancel';

function QuestsPage (){
    const dispatch = useDispatch();
    const quests = useSelector(state => state.quests ? Object.values(state.quests):[]);
    const currentUser = useSelector(state=> state.session.user ? state.session.user : '');
    const [edit, setEdit] = useState(false);
    const [quest, setQuest] = useState('');
    const [cancel, setCancel] = useState(false);

    const isQuestsFetched = useRef(false);
    if (quests.length > 0) isQuestsFetched.current = true;
    
    useEffect(() => {
        if (isQuestsFetched.current ===false) {
            dispatch(fetchQuests());
            isQuestsFetched.current = true;
        };
    }, [dispatch]);

    if (!currentUser) return <Redirect to='/'/>;

    if (!quests) return <div>Loading...</div>;

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
    } 
    function questShow() {
            if (quests.length > 0){
            return (
                <div className='show-quests' id='background'>
                    <div className='h1' id='background'>Your Quests</div>
                    {quests.map(quest =>
                        <div key={quest.id} className='quest-name'>
                            <div className='links2'>
                                <div className='p'> Quest Name:</div>
                                <div className='orders4'>
                                    {quest.questName}
                                </div>
                            </div>
                            <div className='links2'>
                                <div className='p'>Details:</div>
                                <div className='orders4'>
                                    "{quest.details}"
                                </div>
                            </div>
                            <div className='links2'>
                                <div className='p'>Start Time:</div>
                                <div>
                                    <div className='orders4'>{dateShow(quest.startTime)}</div>
                                </div>
                            </div>
                            <div className='links2'>
                                <div className='p'>Category: </div>
                                <div className='orders4'>
                                    {categoryShow(quest.categoryId)}
                                </div>
                            </div>
                            <div className='links2'>
                                <div className='p'>Adventurer:</div>
                                <div className='orders4'>
                                    {adventurerShow(quest.adventurerId)}
                                </div>
                            </div>
                            <div className='links2' id='center'>
                                <button
                                    className="btn-1"
                                    value={quest.id}
                                    onClick={(e) => moveToEdit(e.target.value)}
                                >Edit Quest</button>
                                <button
                                    to={`/delete/${quest.id}`}
                                    className="cancel-btn"
                                    value={quest.id}
                                    onClick={e => moveToCancel(e.target.value)}
                                >Cancel Quest</button>
                            </div>
                        </div>
                    )}
                </div>
                );
            }; 
               return( //if no active quests, encourage user to create one
                   <div className="quest-name">
                       <h1 className='h1' id='center'>Have something else on your to-do list?</h1>
                       <p className='p'>Book your next Quest or manage future to-dos  with Quest Rabbit</p>
                       <Link to="/quest"className='button-submit' id='center'>Check It Off Your List</Link>
                   </div>
                   
               );
        };
        return(
            <div>
                <div className="form2" id='background'>{questShow()}</div>
            </div>
        );
};

export default QuestsPage;