import React, {FC} from 'react';
import {TConstructorIngredient, useDispatch} from '../../services/types/types';
import { useDrag, useDrop } from 'react-dnd';
import { BURGER_CONSTRUCTOR } from '../../services/actions/actions';
import styles from '../burger-constructor-element/burger-constructor-element.module.css';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IBurgerConstructorElementProps {
    element: TConstructorIngredient;
    type?: "top" | "bottom";
    index?: number;
}

const BurgerConstructorElement: FC<IBurgerConstructorElementProps> =
    ({element, type, index}) => {

    const dispatch = useDispatch();

    const closeHandler = () => {
        dispatch({
            type: BURGER_CONSTRUCTOR.REMOVE,
            ingredient: element,
            index
        })
    };

    const ref = React.useRef<HTMLDivElement>(null);

    const [{isDrag}, dragRef] = useDrag({
        type: 'sorting',
        item: {index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{isHover}, dropRef] = useDrop({
        accept: 'sorting',
        drop(data: { index: number }, monitor) {
            const dragIndex = data.index;
            const dropIndex = index;
            if (dragIndex === dropIndex || (!dropIndex && dropIndex!== 0)) {
                return;
            }
            const dropBoundingRect = ref.current?.getBoundingClientRect();
            if (dropBoundingRect) {
                const dropMiddleY = (dropBoundingRect.bottom - dropBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                if (clientOffset && dropBoundingRect.top + dropMiddleY > clientOffset.y) {
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
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });
    dragRef(dropRef(ref));

    const filter = isHover && !isDrag ? 'brightness(2)' : 'none';
    const opacity = isDrag ? 0.1 : 1;

    const isLocked = !!type;
    let text = element.name;
    if (!!type) {
        text += (type === 'top') ? ' (верх)' : ' (низ)';
    }

    return (
        <div { ... !!type ? '' : {ref} } className={styles.ingredient} style={{filter, opacity}} >
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
};

export default BurgerConstructorElement;