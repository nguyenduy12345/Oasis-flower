import { Link } from "react-router-dom";
import { useRef, useEffect, useCallback, useState, useContext, memo} from "react";
import { useTranslation } from "react-i18next";

import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

import { goToTop, debounce } from "/src/functions";
import styles from "./styles.module.scss";
import { StateLogin, MessageContext } from "/src/stores";

const LoginForm = ({ setIsLogin}) => {
  const { i18n } = useTranslation()
  const [account, setAccount] = useState({username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false);
  const [messageLogin, setMessageLogin] = useState('')
  const { setStateLogin } = useContext(StateLogin)
  const { setMessageNotifi } = useContext(MessageContext)
  const inputName = useRef(null);
  const handleGetValueInputName = (e) =>{
    setAccount({...account,username: e.target.value})
  }
  const handleGetValueInputPassword = (e) =>{
    setAccount({...account,password: e.target.value})
  }
  useEffect(() => {
    inputName.current.focus();
  }, []);
  const handleCloseLoginForm = useCallback(() => {
    setIsLogin(false);
    goToTop();
  }, []);
  const closeLoginForm = () =>{
    // setIsLoginForm(false)
    setIsLogin(false)
  }
  const handleClickShowPassword = useCallback(() => setShowPassword((show) => !show), []);
  const handleMouseDownPassword = useCallback((event) => {
    event.preventDefault();
  }, [])
  const getAccountRegister = localStorage.getItem("USER_REGISTER") ? JSON.parse(localStorage.getItem("USER_REGISTER")) : []
  const handleSubmitForm = useCallback(() =>{
    let userLogin = getAccountRegister.find((item) => (item.username == account.username && +item.password == account.password))
    let limitSubmitLogin = localStorage.getItem("LIMIT_LOGIN") ? JSON.parse(localStorage.getItem("LIMIT_LOGIN")) : 1
    if(userLogin){
      if(limitSubmitLogin < 6 ){
        setStateLogin(true)
        setMessageNotifi(i18n.language == 'vi' ? 'Đăng nhập thành công' : 'Logged in successfully')
        setTimeout(() =>{setMessageNotifi(undefined)},1000)
        setMessageLogin(i18n.language == 'vi'? 'Đăng nhập thành công' :'LOGIN SUCCESS')
        localStorage.removeItem("LIMIT_LOGIN")
        localStorage.setItem('USER_LOGIN', JSON.stringify(userLogin))
        setTimeout(() => setIsLogin(false), 500)
      }
    }else{
      if(limitSubmitLogin < 6){
          localStorage.setItem('LIMIT_LOGIN', JSON.stringify((+limitSubmitLogin + 1))) 
          setMessageLogin(i18n.language == 'vi'? `Vui lòng nhập lại tài khoản và mật khẩu của bạn! Số lần nhập còn lại: ${limitSubmitLogin}/5` : `Please enter again username or password! Number of entries: ${limitSubmitLogin}/5`)
          setTimeout(() => {
            setMessageLogin('')
          }, 10000)
      }else{
        setMessageLogin(i18n.language == 'vi'? 'Bạn đã nhập sai 5 lần liên tiếp, vui lòng chờ 30 phút để đăng nhập lại!' :'You have entered the wrong account or password 5 times in a row, please wait for 30 minutes')
        setTimeout(() => {
          localStorage.removeItem("LIMIT_LOGIN")
          setMessageLogin('')
        }, 10000)
      }
    }
  }, [account])
  return (
    <div className={styles["box__login"]}>
      <div className={styles["form"]}>
        <div className={styles["form__title"]}>{i18n.language == 'vi'? 'Đăng nhập' :'Customer Login'}</div>
        <FormControl
          className={styles["form__input"]}
          variant="outlined">
          <InputLabel 
            ref={inputName} 
            htmlFor="outlined-adornment-username">
            {i18n.language == 'vi'? 'Tài khoản' :'Username' }
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username" 
            label="Username"
            onChange={debounce(handleGetValueInputName, 200)} 
          />
        </FormControl>
        <FormControl 
          className={styles["form__input"]}
          variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
          {i18n.language == 'vi'? 'Mật khẩu' :'Password' }
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={debounce(handleGetValueInputPassword, 200)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <button onClick={handleSubmitForm} className={styles["btn__login"]}>{i18n.language == 'vi'? 'Gửi' :'Login' }</button>
        <p className={styles["form__message"]}>{messageLogin}</p>
        <p className="fw-light">
          {i18n.language == 'vi'? 'Bạn chưa có tài khoản?' : "Don't have an account?" }
          <Link onClick={handleCloseLoginForm} to="/register">
          {i18n.language == 'vi'? 'Đăng ký' : "Register" }
          </Link>
        </p>
        <p onClick={closeLoginForm} className={styles["close__login"]}>
          <i className="fa-solid fa-xmark"></i>
        </p>
      </div>
    </div>
  );
};

export default memo(LoginForm);
