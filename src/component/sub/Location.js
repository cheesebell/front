import React, { useRef, useEffect, useState } from 'react';

function Location() {
    const { kakao } = window;
    const path = process.env.PUBLIC_URL;
    // 정보값 배열
    const info = [
        {
            title: '1짱집',
            latlag: new kakao.maps.LatLng(37.415269, 126.689892),
            imgSrc: path + '/img/marker1.png',
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(100, 70)},
        },
        {
            title: '2짱집',
            latlag: new kakao.maps.LatLng(37.492053, 126.499555),
            imgSrc: path + '/img/marker2.png',
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(100, 80)},
        },
    ];

    // useRef 가상 DOM
    const frame = useRef(null);
    const container = useRef(null);

    // 렌더링 주요 state
    const [ map, setMap ] = useState(null);
    const [ traffic, setTraffic ] = useState(false); // traffic btn toggle 선언
    const [ index, setIndex ] = useState(0);
    const [ mapInfo ] = useState(info); // 배열 state에 담기

    const handleTraffic = () => {
        // map에 traffic(true)면 (?) traffic 보여주고, (:) (false)면 remove
        if (map) {
            traffic ? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
            : map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
            
        }
    };

    // index를 의존성으로 등록해서
    // 추후 버튼 클릭시 index가 변경되면 변경된 index정보로 재출력
    useEffect(()=> {
        frame.current.classList.add('on');
    },[]);

    useEffect(()=> {
        //index state가 변경될때마다 #map안쪽에 계속해서 지도 인스턴스를 
        //생성하면서 태그가 중첩되는 문제가 생기므로 기존 #map안쪽의 DOM을 제거해서 초기화하고 다시 지도 생성
        container.current.innerHTML = '';

        //지도 출력을 위한 옵션값 지정
        const options = { 
            center: mapInfo[index].latlag,  // info 에 index번쨰 latlag 위치값
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        
        const mapInstance = new kakao.maps.Map(container.current, options);

        new kakao.maps.Marker({
            map: mapInstance,
            position: mapInfo[index].latlag,
            title: mapInfo[index].title,
            image: new kakao.maps.MarkerImage(
                mapInfo[index].imgSrc,
                mapInfo[index].imgSize,
                mapInfo[index].imgPos
            )
        });

        // 지도 가운데 이동 
        const mapInit = () => {
            mapInstance.setCenter(mapInfo[index].latlag)
        };
        // 리사이징 중앙값 갱신
        window.addEventListener('resize', mapInit)

        // 마커값을 map에 넣어줌
        setMap(mapInstance);

        //해당 컴포넌트가 사라질때 window객체에 등록했던 mapInit핸들러 함수를 다시 제거해서
		//불필요한 메모리 누수 방지
        return () => window.removeEventListener('resize', mapInit)
    },[index]);

    
    //traffic state가 변경될때마사 실행 트래픽 오버레이 레이어 표시
    useEffect(()=> {
        handleTraffic();
    },[traffic])

    //state값 변경에 따라 렌더링될 가상DOM
    return (
        <section className='location' ref={frame}>
            <div className='inner'>
                <h1>Location</h1>
                <div id='map' ref={container}></div>

                <div>Traffic</div>
                <button onClick={()=> setTraffic(!traffic)}>
                    {traffic ? 'OFF' : 'ON'}
                </button>

                <ul className='branch'>
                    {mapInfo.map((data, idx) => {
                        return (
                            <li key={idx} onClick={()=> setIndex(idx)}>
                                {data.title}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

export default Location;
