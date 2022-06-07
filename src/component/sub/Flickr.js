import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../common/Layout';
import Popup from '../common/Popup';
import Masonry from 'react-masonry-component';
const path = process.env.PUBLIC_URL;

function Flickr() {
  const { flickr } = useSelector((store) => store.flickrReducer);
  const dispatch = useDispatch();  
  const frame = useRef(null);
  const input = useRef(null);
  const pop = useRef(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [enableClick, setEnableClick] = useState(true);
  const [opt, setOpt] = useState({type: 'interest', count: 100});

  const masonryOptions = {transitionDuration: '0.5s'}



  const endLoading = () => {
    setTimeout(() => {
      frame.current.classList.add('on');
      setLoading(false);
      setTimeout(() => setEnableClick(true), 1000);
    },1000)
  }

  const showInterest = () => {
		if (enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');

      setOpt({ type: 'interest', count: 100 });
		}
	};

	const showSearch = () => {
		const tag = input.current.value.trim();
		if (!tag) {
			alert('검색어를 입력하세요');
			return;
		}
		input.current.value = '';

		if (enableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');

      setOpt({ type: 'search', count: 100, tag: tag });
		}
	};

  useEffect(()=> {
    //action객체를 saga.js로 전달
    dispatch({ type: 'FLICKR_START', opt});
  },[opt]);

  useEffect(() => {
    //기존의 endLoading함수를 api요청을 보낼때 실행하는게 아닌
		//store를 통해서 데이터결과값이 새롭게 반환될때 실행
		//이떄 처음 flickr값은 빈 배열이 들어오기 때문에 그때만 조건문으로 실행되지 않도록 처리
    if(flickr.length !== 0) endLoading();
  },[flickr]);


  return (
    <>
    
    <Layout name={'Flickr'} pic={'/img/pic3.jpg'}>
      <button onClick={showInterest}>interest</button>

			<div className='searchBox'>
        <input
            type='text'
            ref={input}
            onKeyUp={(e) => {
              if (e.key === 'Enter') showSearch();
            }}
        />
				<button onClick={showSearch}>search</button>
			</div>

      {loading ? <img src={path + '/img/loading.gif'} className='loading' /> : null }

      <div className='frame' ref={frame}>
        <Masonry elementType={'div'} options={masonryOptions}>
          {flickr.map((item, idx) => {
            return (
              <article key={idx}>
                <div className='inner'>
                  <div 
                    className='pic'
                    onClick={() => {
                      pop.current.open();
                      setIndex(idx);
                    }}
                  >
                    <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                  </div>
                  <h2>{item.title}</h2>
                  
									<div className='profile'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											onError={(e) => {
												//만약 해당 이미지 요소의 소스 이미지가 없어서 error이벤트가 발생하면 src값을 setAttribute로 대체이미지를 대신 출력
												e.target.setAttribute('src','https://www.flickr.com/images/buddyicon.gif');
											}}
										/>
									<span
											onClick={(e) => {
												if (enableClick) {
													setEnableClick(false);
													setLoading(true);
													frame.current.classList.remove('on');
													setOpt({
														type: 'user',
														count: 100,
														user: e.currentTarget.innerText,
													});
												}
											}}>
											{item.owner}
										</span>
									</div>
                </div>
              </article>
            )
          })}
        </Masonry>
      </div>
    </Layout>

    <Popup ref={pop}>
    {flickr.length !== 0 ? <img src={`https://live.staticflickr.com/${flickr[index].server}/${flickr[index].id}_${flickr[index].secret}_b.jpg`} /> : null}
    <span className='close' onClick={() => pop.current.close()}>
      close
    </span>
    </Popup>

    </>
  )
}

export default Flickr;



/*  
keyDown : 키를 누르는 시점
keyUp : 키를 눌렀다 떼는 시점
keyPress : 키룰 눌렀다 떼는 시점 (한영변환 같은 특수키 안 먹음)
*/


/*
	기존 redux 작업방식
	- 컴포넌트 함수에서 axios요청을 해서 반환받은 데이터를 action생성함수를 통해서 action객체로 반환
	- 반환받은 action객체를 컴포넌트 마운트시 바로 reducer에 전달
	redux-saga 작업방식
	- reducer가 바로 store에 데이터를 저장하는 것이 아닌 reducer에 saga를 미들웨어로 추가
	- 컴포넌트 함수에서 action객체로 요청을 보냄
	- reducer가 바로 요청을 받는게 아닌 redux-saga가 요청을 받음
	- 미리 외부 파일로 api요청 함수를 정의해두고  redux-saga에 액션요청이 들어오면 api함수 호출
	- api 요청 완료된 반환값을 redux-saga를 통해서 reducer에 전달
*/