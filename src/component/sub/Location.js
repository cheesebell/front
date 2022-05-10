import React, { useRef, useEffect, useState } from 'react';

function Location() {
    const frame = useRef(null);
    const container = useRef(null);
    const { kakao } = window;
    // map useRef 선언
    const [ map, setMap ] = useState(null);
    // traffic btn toggle 선언
    const [ traffic, setTraffic ] = useState(false);
    // 마커 이미지 추가
    const path = process.env.PUBLIC_URL;
    
    useEffect(()=> {
        frame.current.classList.add('on');

        //지도 출력을 위한 옵션값 지정
        const options = { 
            center: new kakao.maps.LatLng(37.4146828, 126.6878551), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        //kakao api로 부터 인스턴스 복사 (지도가 출력될 프레임, 옵션)
        const mapInfo = new kakao.maps.Map(container.current, options);
        setMap(mapInfo);

        // 마커 포지션
        const markerPosition = new kakao.maps.LatLng(
            37.4146828,
            126.6878551
        );

        // 마커이미지 정보 추가
        const imgSrc = `${path}/img/marker1.png`;
        const imgSize = new kakao.maps.Size(232, 99);
        const imgOption = { offset: new kakao.maps.Point(-80, 150)};

        const markerImg = new kakao.maps.MarkerImage (
            imgSrc,
            imgSize,
            imgOption
        );

        // 마커 생성
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImg

        });
        marker.setMap(mapInfo);
    },[]);

    const handleTraffic = () => {
        // map에 traffic(true)면 (?) traffic 보여주고, (:) (false)면 remove
        if (map) {
            traffic ? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
            : map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
            
        }
    };

    const setCenter = (lat, lng) => {
        const moveLatLon = new kakao.maps.LatLng(lat, lng);
        map.setCenter(moveLatLon);
    }


    // 보여지는게 아니니 useEffect 선언
    useEffect(()=> {
        handleTraffic();
    },[traffic])


    return (
        <section className='location' ref={frame}>
            <div className='inner'>
                <h1>Location</h1>
                <div id='map' ref={container}></div>

                <div>Traffic</div>
                {/* <button onClick={() => setTraffic(!traffic)}>
                    {traffic ? 'OFF' : 'ON'}
                </button> */}
                <ul className='branch'>
                    <li onClick={()=> setCenter(37.4146828, 126.6878551)}>1짱집</li>
                    <li onClick={()=> setCenter(37.487626, 126.753045)}>어땨</li>
                </ul>
            </div>
        </section>
    )
}

export default Location;
