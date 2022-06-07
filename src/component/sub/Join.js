import Layout from '../common/Layout';
import { useEffect, useState } from 'react';


function Join({ history }) {

    const initVal = {
		userid: '',
        comments: '',
        email: '',
        pwd1: '',
        pwd2: '',
        gender: false,
        interests: false,
        edu: null,
	}
	const [val, setVal] = useState(initVal);
    const [err, setErr] = useState({}); // 빈 객체
    const [success, setSuccess] = useState(false);
    //전송 버튼 클릭 유무의 결과값을 담을 state생성
    const [isSubmit, setIsSubmit] = useState(false);

    const check = (arg) => {
        const errs = {};
        const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+\]]/;
        
        if(arg.userid.length < 5) {
            errs.userid = '아이디를 5글자 이상 입력하세요';
        }

        if(arg.comments.length < 10) {
            errs.comments = '남기는 말을 10글자 이상 입력하세요';
        }

        if(arg.email.length < 5 || !/@./.test(arg.email)) {
            errs.email = '이메일은 5글자 이상 @ .을 포함해주세요'
        }

        if(arg.pwd1.length < 5 || !eng.test(arg.pwd1) || !num.test(arg.pwd1) || !spc.test(arg.pwd1)) {
            errs.pwd1 = '비밀번호는 영문,숫자,특수문자를 포함한 5글자 이상 입력하세요'
        }

        if (arg.pwd1 !== arg.pwd2 || !arg.pwd2) {
            errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요'
        }
        
        if (!arg.gender) {
            errs.gender = '성별을 선택하세요'
        }

        if (!arg.interests) {
            errs.interests = '관심사를 하나 이상 선택하세요'
        }

        if (!arg.edu) {
            errs.edu = '최종학력을 선택하세요'
        }
        // 5글자 이상이면 errs 빈 객체 리턴
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 전송이벤트 발생시 check함수 err 스테이트에 저장
        setErr(check(val));
        setIsSubmit(true);
    };
    
    const handleRadio = (e) => {
        const { name } = e.target;
        const isCheck = e.target.checked;
        setVal({ ...val, [name]: isCheck })
    }

    const handleReset = () => {
        setVal(initVal);
        setErr({ });
    }

	const handleChange = (e) => {
		const { name, value } = e.target;													
		setVal({ ...val, [name]: value })
	};

    const handleCheck = (e) => {
        let isCheck = false;
        const { name } = e.target;
        const inputs = e.target.parentElement.querySelectorAll('input');

        // each와 같은 배열함수 map과 비슷하지만 return이 없음
        inputs.forEach((el) => {
            if(el.checked) isCheck=true;
        })

        setVal({ ...val, [name]: isCheck })
    };

    const handleSelect = (e) => {
        const { name } = e.target;
        //선택한 요소의 자식인 option들 중에서 
		//선택한 순번의 option요소 value값 저장
        const isSelected = e.target.options[e.target.selectedIndex].value;

        setVal({ ...val, [name]: isSelected });
    };

    useEffect(()=> {
        console.log(err);

        const len = Object.keys(err).length;

        //에러객체내용이 없고 전송버튼이 클릭되면
        if(len === 0 && isSubmit) {
            setSuccess(true);
            // 전송 성공시 폼 초기화
            // setVal(initVal)
            // 인증완료 메인 컴포넌트로 라우터 이동
            history.push('/');
        } else {
            setSuccess(false)
        }
    },[err])
    
    return (
        // Layout컴포넌트로 Join전용 컨텐츠를 wrapping
        <Layout name={'Join'} pic={'/img/pic4.jpg'}>
            {/* success값이 true일때 성공 메세지 출력 */}
            { success ? <h2>회원가입을 축하합니다.</h2> : null}
            <form onSubmit={handleSubmit}>
                <legend>회원가입 폼</legend>
                <table>
                    <caption>회원가입</caption>
                    <tbody>
                        <tr>
                            <th>
                                <label htmlFor='userid'>ID</label>
                            </th>
                            <td>
                                <input type='text' id='userid' name='userid' placeholder='아이디를 입력하세요' value={val.userid} onChange={handleChange} />
                                <span className='err'>{err.userid}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='comments'>COMMENTS</label>
                            </th>
                            <td>
                                <textarea name='comments' id='comments' cols='30' rows='10' placeholder='남기는 말을 입력하세요' value={val.comments} onChange={handleChange} />
                                <span className='err'>{err.comments}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='email'>EMAIL</label>
                            </th>
                            <td>
                                <input type='text' name='email' id='email' placeholder='이메일을 입력하세요' value={val.email} onChange={handleChange} />
                                <span className='err'>{err.email}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='pwd1'>PASSWORD</label>
                            </th>
                            <td>
                                <input type='password' name='pwd1' id='pwd1' placeholder='비밀번호를 입력하세요' value={val.pwd1} onChange={handleChange} />
                                <span className='err'>{err.pwd1}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label htmlFor='pwd2'>RE-PASSWORD</label>
                            </th>
                            <td>
                                <input type='password' name='pwd2' id='pwd2' placeholder='비밀번호를 입력하세요' value={val.pwd2} onChange={handleChange} />
                                <span className='err'>{err.pwd2}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>GENDER</th>
                            <td>
                                <label htmlFor='male'>Male</label>
                                <input type='radio' name='gender' value='male' onChange={handleRadio} />

                                <label htmlFor='female'>Female</label>
                                <input type='radio' name='gender' value='female' onChange={handleRadio} />
                                <span className='err'>{err.gender}</span>
                            </td>
                        </tr>
                        <tr>
                            <th>INTERESTS</th>
                            <td>
                                <label htmlFor='sports'>Sports</label>
                                <input type='checkbox' name='interests' id='sports' value='sports' onChange={handleCheck} />

                                <label htmlFor='music'>Music</label>
                                <input type='checkbox' name='interests' id='music' value='music' onChange={handleCheck} />

                                <label htmlFor='game'>Game</label>
                                <input type='checkbox' name='interests' id='game' value='game' onChange={handleCheck} />
                                <span className='err'>{err.interests}</span>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'>
                                <label htmlFor='edu'>EDUCATION</label>
                            </th>
                            <td>
                                <select name='edu' id='edu' onChange={handleSelect}>
                                    <option value=''>학력을 선택하세요.</option>
                                    <option value='elementary-school'>초등학교 졸업</option>
                                    <option value='middle-school'>중학교 졸업</option>
                                    <option value='high-school'>고등학교 졸업</option>
                                    <option value='college'>대학교 졸업</option>
                                </select>
                                <span className='err'>{err.edu}</span>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan='2'>
                                <input type='reset' value='cancel' onClick={handleReset} />
                                <input type='submit' value='send'/>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </form>
        </Layout>
    )
}

export default Join;