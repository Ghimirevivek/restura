import React, { useState } from 'react';
import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdAdd, MdLogout, MdShoppingBasket } from 'react-icons/md';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const {
    state: { user },
    dispatch,
  } = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const response = await signInWithPopup(firebaseAuth, provider);
      const {
        user: { providerData },
      } = response;
      dispatch({
        type: 'SET_USER',
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setIsMenu((prev) => !prev);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: 'SET_USER',
      user: null,
    });
  };

  return (
    <header className='fixed z-50 w-screen p-6 px-16 bg-primary'>
      {/* {desktop and tablet} */}
      <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to={'/'} className='flex items-center gap-2'>
          <img src={Logo} alt='logo' className='w-8 object-cover' />
          <p className='text-headingColor text-xl font-bold'>Foods</p>
        </Link>
        <div className='flex items-center gap-8'>
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='flex items-center gap-24 '
          >
            <li
              className='text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setIsMenu(false)}
            >
              Home
            </li>
            <li
              className='text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className='text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setIsMenu(false)}
            >
              About Us
            </li>
            <li
              className='text-lg text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>
          <div className='relative flex items-center justify-center'>
            <MdShoppingBasket className='text-textColor text-2xl  cursor-pointer' />
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>2</p>
            </div>
          </div>
          <div className='relative'>
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              alt='userprofile'
              onClick={login}
            />
            {isMenu ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'
              >
                <Link to={'/createItem'}>
                  <p
                    className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                    onClick={() => setIsMenu(false)}
                  >
                    {' '}
                    New Item <MdAdd />
                  </p>
                </Link>

                <p
                  className='m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base'
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
      {/* mobile and tablet */}
      <div className='flex items-center justify-between md:hidden w-full h-full '>
        <div className='relative flex items-center justify-center'>
          <MdShoppingBasket className='text-textColor text-2xl  cursor-pointer' />
          <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs text-white font-semibold'>2</p>
          </div>
        </div>
        <Link to={'/'} className='flex items-center gap-2'>
          <img src={Logo} alt='logo' className='w-8 object-cover' />
          <p className='text-headingColor text-xl font-bold'>Resturant</p>
        </Link>
        <div className='relative'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt='userprofile'
            onClick={login}
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
          />
          {isMenu ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'
            >
              <Link to={'/createItem'}>
                <p
                  className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                  onClick={() => setIsMenu(false)}
                >
                  New Item <MdAdd />
                </p>
              </Link>
              <ul className='flex flex-col '>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>
              <p
                className='m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base'
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
