import React, { useRef, useEffect } from 'react';

function Location() {
    const frame = useRef(null);
    const container = useRef(null);
    const { kakao } = window;
    
    useEffect(()=> {
        frame.current.classList.add('on');

        //지도 출력을 위한 옵션값 지정
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        //kakao api로 부터 인스턴스 복사 (지도가 출력될 프레임, 옵션)
        new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
    },[]);

    return (
        <section className='location' ref={frame}>
            <div className='inner'>
                <h1>Location</h1>
                <div id='map' ref={container}></div>
            </div>
        </section>
    )
}

export default Location;
