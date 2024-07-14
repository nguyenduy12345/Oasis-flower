import { useRef, useEffect, useState, memo, useContext } from "react";
import { useForm} from "react-hook-form";
import { useTranslation } from "react-i18next";

import { MessageContext } from "/src/stores"
import styles from "./styles.module.scss";
import img from "./imgregister.webp";


// const regexEmail = "/^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/";
// const regexPhone = "/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/";
const Register = () => {
  const { t, i18n } = useTranslation('register')
  const inputName= useRef(null);
  const [isState, setIsState] = useState('')
  const { setMessageNotifi } = useContext(MessageContext)
  useEffect(() => {
    inputName.current.focus();
  }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm();
  let userRegister = localStorage.getItem('USER_REGISTER') ? JSON.parse(localStorage.getItem('USER_REGISTER')) : []
  const onSubmit= (data) => {
    if(data){
        localStorage.setItem('USER_REGISTER', JSON.stringify([...userRegister, data]))
        setIsState(i18n.language == 'vi' ? "Bạn đã đăng ký thành công tài khoản!" : "Congulations! Register succes.")
        setTimeout(() => setIsState(''), 2000)
        setMessageNotifi(i18n.language == 'vi' ? 'Bạn đã đăng ký thành công tài khoản' : "Congulations! Register succes.")
        clearTimeout(timeout)
        let timeout = setTimeout(() => setMessageNotifi(undefined), 1000 );
    }
  }

  return (
    <div className={styles["register__form"]}>
      <div className={styles["register__banner"]}>
        <img src={img} alt="this is picture" />
        <div className={styles["register__dr"]}>
          <h4>{t('img.title')}</h4>
          <p>
            {t('img.des')}
          </p>
        </div>
      </div>
      <div className={styles["box__register"]}>
        <h4>{t('form.title')}</h4>
        <form className={styles["register"]} onSubmit={handleSubmit(onSubmit)}>
          <label ref={inputName} className={styles["register__label"]} htmlFor="username">
          {t('form.name')}
          </label>{" "}
          <br />
          <input
            {...register("username", {
              required: i18n.language == 'vi' ? 'Nhập tên tài khoản của bạn' :'username is required',
              minLength: {
                value: 6,
                message: i18n.language == 'vi' ? 'Tên tài khoản phải nhiều hơn 6 ký tự' :'Enter more than 6 characters'
              }
            })}
            className={styles["register__input"]}
            type="text"
            name="username"
            id="username"
          />{" "}
          <br />
          {errors.username && <p>{errors.username.message}</p>}
          <label className={styles["register__label"]} htmlFor="email">
            email
          </label>{" "}
          <br />
          <input
            {...register("email", {
              required: i18n.language == 'vi' ? 'Nhập email của bạn' : 'email is required',
              validate: (value) =>{
                if(!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){
                    return i18n.language == 'vi' ? 'Vui lòng nhập đúng email của bạn' : 'Please enter your correct email!'
                }
                return true
              }
            })}
            className={styles["register__input"]}
            type="text"
            name="email"
            id="email"
          />{" "}
          <br />
          {errors.email && <p>{errors.email.message}</p>}
          <label className={styles["register__label"]} htmlFor="phonenumber">
            {t('form.phone')}
          </label>{" "}
          <br />
          <input
            {...register("phonenumber", {
              required: i18n.language == 'vi' ? 'Nhập số điện thoại của bạn' :'phonenumber is required',
              validate: (value) => {
                if(!value.match(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)){
                    return i18n.language == 'vi' ? 'Vui lòng nhập đúng số điện thoại của bạn' :'Please enter your correct phonenumber!'
                }
                return true
              },
            })}
            className={styles["register__input"]}
            type="text"
            name="phonenumber"
            id="phonenumber"
          />{" "}
          <br />
          {errors.phonenumber && <p>{errors.phonenumber.message}</p>}
          <label className={styles["register__label"]} htmlFor="password">
            {t('form.password')}
          </label>{" "}
          <br />
          <input
            {...register("password", {
              required: i18n.language == 'vi' ? 'Nhập mật khẩu của bạn' :'password is required',
              minLength: {
                value: 6,
                message: i18n.language == 'vi' ? 'Mật khẩu phải dài hơn 6 ký tự' :'Enter more than 6 characters!'
              }
            })}
            className={styles["register__input"]}
            type="password"
            name="password"
            id="password"
          />
          <br />
          {errors.password && <p>{errors.password.message}</p>}
          {/* <label className={styles["register__label"]} htmlFor="re_password">
            confirm password
          </label>{" "} */}
          {/* <br />
          <input
            {...register("re_password", {
              required: 're_password is required',
            })}
            className={styles["register__input"]}
            type="password"
            name="re_password"
            id="re_password"
          />{" "}
          <br />
          {errors.re_password && <p>{errors.re_password.message}</p>} */}
          <button
            className={styles["btn_register"]}
            disabled={isSubmitting}
          >
            {isSubmitting ?  'loading...' : t('form.button')}
          </button>
          <p>{isState}</p>
        </form>
      </div>
    </div>
  );
};

export default memo(Register);
