import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';

let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [qty, setQty] = useState(item.qty);
  const {
    state: { cartItems },
    dispatch,
  } = useStateValue();

  const cardDispatch = () => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    dispatch({
      type: 'SET_CART_ITEMS',
      cartItems: items,
    });
  };
  const updateQty = (action, id) => {
    if (action === 'add') {
      setQty(qty + 1);
      cartItems.forEach((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cardDispatch();
    } else {
      if (qty === 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cardDispatch();
      } else {
        setQty(qty - 1);
        cartItems.forEach((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cardDispatch();
      }
    }
  };
  useEffect(() => {
    items = cartItems;
  }, [qty, items]);
  return (
    <div className='w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
      <img
        className='w-20 h-20 max-w-[60px] rounded-full object-contain'
        src={item?.imageURL}
        alt='img'
      />
      <div className='flex flex-col gap-2'>
        <p className='text-base text-gray-50'>{item?.title}</p>
        <p className='text-sm block text-gray-300 font-semibold'>
          $ {parseFloat(item?.price) * qty}
        </p>
      </div>
      <div className='group flex items-center gap-2 ml-auto cursor-pointer'>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty('remove', item?.id)}
        >
          <BiMinus className='text-gray-50 ' />
        </motion.div>
        <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty('add', item?.id)}
        >
          <BiPlus className='text-gray-50 ' />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;
