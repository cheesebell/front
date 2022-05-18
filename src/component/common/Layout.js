import React, { useEffect, useRef } from 'react';

function Layout(props) {
    const frame = useRef(null);

    useEffect(()=> {
        frame.current.classList.add('on');
    },[]);

    return (
        <section ref={frame} className={`common ${props.name}`}>
            <div className='inner'>
                <h1>{props.name}</h1>
                {props.children}
            </div>
        </section>
    )
}

export default Layout;