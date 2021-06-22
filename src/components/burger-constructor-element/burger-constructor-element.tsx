import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { BURGER_CONSTRUCTOR } from '../../services/actions/actions';
import styles from '../burger-constructor-element/burger-constructor-element.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

// @ts-ignore
function BurgerConstructorElement({element, type, index}) {
    const dispatch = useDispatch();

    const closeHandler = () => {
        dispatch({
            type: BURGER_CONSTRUCTOR.REMOVE,
            ingredient: element,
            index
        })
    };

    const ref = React.useRef(null);

    const [, dragRef] = useDrag({
        type: 'sorting',
        item: {index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{isHover}, dropRef] = useDrop({
        accept: 'sorting',
        drop(data, monitor) {
            // @ts-ignore
            const dragIndex = data.index;
            const dropIndex = index;
            if (dragIndex === dropIndex) {
                return;
            }
            // @ts-ignore
            const dropBoundingRect = ref.current?.getBoundingClientRect();
            const dropMiddleY = (dropBoundingRect.bottom - dropBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            // @ts-ignore
            if (dropBoundingRect.top + dropMiddleY > clientOffset.y) {
                dispatch({
                    type: BURGER_CONSTRUCTOR.MOVE,
                    indexFrom: dragIndex,
                    indexTo: dropIndex
                });
            } else {
                if (dragIndex !== dropIndex + 1) {
                    dispatch({
                        type: BURGER_CONSTRUCTOR.MOVE,
                        indexFrom: dragIndex,
                        indexTo: dropIndex + 1
                    });
                }
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    dragRef(dropRef(ref));

    const filter = isHover ? 'brightness(2)' : 'none';

    const isLocked = !!type;
    let text = element.name;
    if (!!type) {
        text += (type === 'top') ? ' (верх)' : ' (низ)';
    }

    return (
        <div { ... !!type ? '' : {ref} } className={styles.ingredient} style={{filter}} >
            {!isLocked && <DragIcon type="primary" />}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={element.price}
                thumbnail={element.image}
                handleClose={closeHandler}
            />
        </div>
    );
}

BurgerConstructorElement.propTypes = {
    element: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['bun', 'main', 'sauce'])
    }).isRequired,
    type: PropTypes.string,
    index: PropTypes.number
}

export default BurgerConstructorElement;