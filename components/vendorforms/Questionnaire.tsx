import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchQuestionList } from '../../Reducer/questionSlice';
import { RootState, AppDispatch } from '@/store';
import { fetchvendordata } from '../../Reducer/Vendor_Registeration_Slice/getvendordata';
import { getToken } from '@/localStorageUtil';
import SuccessPopup from '../front/SuccessPopup';
import { API_BASE_URL, QUESTIONAIRE_API_URL } from '@/api.config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Answer {
    [key: string]: string;
}
function Questionnaire() {
    const { t } = useTranslation();
    const [vendorlist, setVendorlist] = useState<any>();
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState({
        question_ans: {} as Answer,
    });
    const [answers, setAnswers] = useState<Answer>({});
    const dispatch = useDispatch<AppDispatch>();
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    useEffect(() => {
        dispatch(fetchQuestionList());
        dispatch(fetchvendordata());
    }, [dispatch]);

    const question = useSelector((state: RootState) => state.question.list);
    const vendorInformationList = useSelector((state: RootState) => state.vendordata.list);

    useEffect(() => {
        setVendorlist(vendorInformationList);
        if ( vendorlist?.vendor_questionnaire) {
            setUser(prevUser => ({
                ...prevUser,
                answer: vendorlist?.vendor_questionnaire.answer || "",
            }));
        }
    }, [vendorInformationList]);
    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
        setUser(prevUser => ({
            ...prevUser,
            question_ans: {
                ...prevUser.question_ans,
                [questionId]: answer,
            },
        }));
    };

   
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = getToken();
        const vendor_profile_id = localStorage.getItem("vendorId")?.replace(/['"]/g, '');;
        const payload = {
            ...user,
            vendor_profile_id: vendor_profile_id,
        };
        try {
            const response = await fetch(`${API_BASE_URL}${QUESTIONAIRE_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const responseData = await response.json();
                setMessage(responseData.message.success);
                setShowPopup(true);
            } else {
                const errorData = await response.json();
               toast.error(errorData.message.error)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <ToastContainer />

            <SuccessPopup
                message={message}
                show={showPopup}
                onClose={handleClosePopup}
            />
            <form className="space-y-3 dark:text-white" onSubmit={handleSubmit}>
                
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>{t('sr-no')}</th>
                                            <th>{t('questions')}</th>
                                            <th>{t('yes')}</th>
                                            <th>{t('no')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {question?.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>
                                                    <div className="form-check mb-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name={`question_${item.id}`}
                                                            value="yes"
                                                            onChange={() => handleAnswerChange(item.id, 'yes')}
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check mb-3">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name={`question_${item.id}`}
                                                            value="no"
                                                            onChange={() => handleAnswerChange(item.id, 'no')}
                                                            
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-start mt-10'>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                        {t('submit')}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Questionnaire;
