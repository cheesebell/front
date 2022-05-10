import React, { useRef, useEffect, useState } from 'react';

function Location() {
    const frame = useRef(null);
    const container = useRef(null);
    const { kakao } = window;
    // map useRef 선언
    const [ map, setMap ] = useState(null);
    
    useEffect(()=> {
        frame.current.classList.add('on');

        //지도 출력을 위한 옵션값 지정
        const options = { 
            center: new kakao.maps.LatLng(37.4146828, 126.6878551), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        //kakao api로 부터 인스턴스 복사 (지도가 출력될 프레임, 옵션)
        const mapInfo = new kakao.maps.Map(container.current, options);
        setMap(mapInfo)
    },[]);



    return (
        <section className='location' ref={frame}>
            <div className='inner'>
                <h1>Location</h1>
                <div id='map' ref={container}></div>

                <div>Traffic</div>
                <button 
                    onClick={()=> map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}
                >ON</button>

                <button 
                    onClick={()=> map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}
                >OFF</button>
            </div>
        </section>
    )
}

export default Location;
