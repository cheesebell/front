import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Department() {
  let [index, setIndex] = useState(0);
  const frame = useRef(null);
  // 추후 axios로 불러온 데이터 배열을 담을 state 생성
  const [members, setMembers] = useState([]);
  const path = process.env.PUBLIC_URL;
  const url = `${path}/DB/Department.json`;
  
  // 컴포넌트 생성시 처음 한번만 동작
  useEffect(()=> {
    //console.log('컴포넌트 생성');
    frame.current.classList.add('on');
    /*
    // clean up 함수 
    return()=> {
      console.log('소멸')
    }
    */

    axios.get(url)
    .then((json) => {
      setMembers(json.data.data);
    })
    .catch((err) => {
      console.log(err)
    })
  },[]);

  useEffect(()=> {
   // console.log('index값 변경')
  },[index])

  return (
    <section className='department' ref={frame}>
      <div className='inner'>
        <h1>Department</h1>

        {/* <button className='plus' onClick={()=> setIndex(++index)}>더하기</button>
        <button className='minus' onClick={()=> setIndex(--index)}>빼기</button>
        <h3>{index}</h3> */}

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
        
        <button
          onClick={()=> {
            // member 복사? ... 가져오기? 그런듯
            let newMembers = [...members];
            // member에서 0번째 name을 겹벚꽃으로 바꿔라
            newMembers[0].name = '겹벚꽃';
            // 짜잔
            setMembers(newMembers);
        }}>
          변경
        </button>
      </div>
    </section>
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