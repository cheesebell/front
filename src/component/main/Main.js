import React, { useEffect, useRef, useState } from 'react';
import Head from '../common/Head';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';
import Anime from '../../class/anim';

function Main() {
    const [idx, setIdx] = useState(0);
    // 현재 스크롤되는 값을 관리할 state추가
    const [scrolled, setScrolled] = useState(0);
    const main = useRef(null);
    const pos = useRef([]);
    // useRef는 가상돔을 참조할때도 쓰이지만
    // 특정값을 컴포넌트가 재랜더링 되더라도 값을 유지시켜야할때
    // 특정값이 변경되더라도 컴포넌트를 다시 재랜더링 시키면 안될때


    // 섹션들의 세로 위치값 반환 함수
    const getPos = () => {
        pos.current = [];
        
        const secs = main.current.querySelectorAll('.myScroll');
        // const pos = [];
        // for (const sec of secs) pos.push(sec.offsetTop);
        // console.log(pos);
        for (const sec of secs) pos.current.push(sec.offsetTop);
    };

    const activation = () => {
        const base = -200;
        const scroll = window.scrollY;
        const btns = main.current.querySelectorAll('.btns li');
        
        // 현재 스크롤되는 거리값을 scrolled state에 저장해서 관리
        setScrolled(scroll);

        pos.current.map((pos, idx) => {
            if (scroll >= pos + base) {
                for (const btn of btns) btn.classList.remove('on');
                btns[idx].classList.add('on');
            }
        })
    }

    useEffect(()=> {
        // 처음 로딩시 offsetTop
        getPos();
        // 브라우저 리사이즈시 offsetTop 갱신
        window.addEventListener('resize', getPos);
        window.addEventListener('scroll', activation);


        // 해당 컴포넌트가 unmount시 window 전역에 등록된 getPos함수 제거
        return () => {
            window.removeEventListener('resize', getPos);
            window.removeEventListener('scroll', activation);
        }
    },[]);

    // 순서값에 따라 스크롤 모션
    useEffect(()=> {
        new Anime(window, {
            prop: 'scroll',
            value: pos.current[idx],
            duration: 500,
        })
    },[idx])

    return (
        <>
        <main ref={main}>
            <Head type={'main'}/>
            <Visual />
            <News />
            <Pics scrolled={scrolled} start={pos.current[2]} />
            <Vids />
            <Btns setIdx={setIdx} />
        </main>
        </>
    )
}

export default Main;