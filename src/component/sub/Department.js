import { useSelector } from 'react-redux';
import Layout from '../common/Layout';
import { setMembers } from '../../redux/actions';

function Department() {

  const path = process.env.PUBLIC_URL;
  const members = useSelector((store) => store.memberReducer.members);
  
  return (
    <Layout name='Department'>
        <ul>
          {members.map((data, idx) => {
            return (
              <li key={idx}>
                <img src={`${path}/img/${data.pic}`} />
                <h2>{data.name}</h2>
                <p>{data.position}</p>
              </li>
            )
          })}
        </ul>
    </Layout>
  )
}

export default Department;


/*
  useEffect : 해당 컴포너틑의 생성, 상태값 변경, 소멸이라는 생명주기에 따라 특정 구문을 실행할 수 있는 hook
  -- useEffect는 첫번째 인수로 콜백함수 등록
  -- useEffect는 두번째 인수로 의존성 등록 (원하는 state를 의존성으로 등록)
  -- useEffect의 두번째 인수로 빈 배열을 의존성으로 등록 : 해당 컴포넌트가 처음 생성될때 한번만 호출 가능
  -- useEffect안쪽에서 함수를 리턴하면 해당 함수는 컴포넌트가 소멸할때 호출됨
*/