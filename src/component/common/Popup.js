import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
    forwardRef는 자식 컴포넌트 자신을 통채로 전달해서 부모 컴포넌트가 참조할수 있게 처리
    forwardRef로 감싸져 있으면 자식 컴포넌트의 다양한 정보값을 return으로 내보내서 부모 컴포넌트가 자유롭게 사용가능
    const 변수명 = forwardRed(화살표함수)
*/

const Popup = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true),
            close: () => setOpen(false),
        }
    });

    useEffect(() => {
        let isScroll = null;

        open ? (isScroll = 'hidden') : (isScroll = 'auto');
        document.body.style.overflow = isScroll;


        return() => {
            document.body.style.overflow = 'auto';
        }
    },[open]);


    return (
        // 해당 컴포넌트가 unmount시 사라지는 모션이 끝난 뒤에 DOM제거
        <AnimatePresence>
            {open && (
                <motion.aside
                    initial={{ opacity: 0, scale: 0 }} // 모션이 일어나기 전 초기값 설정
                    animate={{ opacity: 1, scale: 1, transition: {duration: 0.5} }} // mount시 동작 설정
                    exit={{opacity: 0, scale: 0 }} // unmount시 동작될 값 설정
                    className='popup'
                >
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: {delay: 0.5, duration: 0.5 } }}
                        exit={{ opacity: 0 }}
                        className='con'
                    >
                        {props.children}
                    </motion.div>
                </motion.aside> 
            )}
        </AnimatePresence>
    )
})

export default Popup;