import React from "react";
import styles from "./index.module.css"
import {Button, Layout, Space, Typography} from "antd";
import {LogoutOutlined, TeamOutlined} from "@ant-design/icons";
import {CustomButton} from "../custom-button";
import {Link, useNavigate} from "react-router-dom";
import {Paths} from "../../paths";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../../features/auth/authSlice";
import {CustomInput} from "../custom-input";


export const Header = () => {
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogoutClick = () =>{
        dispatch(logout())
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <Layout.Header className={styles.header}>
            <div className={styles.left}>
                <TeamOutlined className={styles.teamIcon}/>
                <Link to={Paths.home}>
                    <Button  type={"text"} >
                        <Typography >
                            Сотрудники
                        </Typography>
                    </Button>
                </Link>
            </div>
            {
                user ? (
                    <CustomButton type={'primary'} icon={<LogoutOutlined/>} onClick={onLogoutClick}>
                        выйти
                    </CustomButton>
                ):(
                    <div className={styles.right}>
                        <Link to={Paths.register}>
                            <Button type={"text"}>Зарегистрироваться </Button>
                        </Link>
                        <Link to={Paths.login}>
                            <Button type={"text"}> Войти</Button>
                        </Link>
                    </div>
                )
            }

        </Layout.Header>
    )
}