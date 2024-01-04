import { Button, Flex, Input, Typography } from "antd"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"

const Login = () => {
  const { login } = useAuth()
  const [loginInfos, setLoginInfos] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfos({ ...loginInfos, [e.target.name]: e.target.value })
  }

  return (
    <Flex 
    vertical
    style={{height: '100vh'}}
    justify="center"
    align="center"
    gap={8}
    >
      <Flex
        vertical
        style={{width: "400px"}}
        justify="center"
        align="center"
        gap={8}
      >
        <Typography.Title level={1}>Login</Typography.Title>
        <Input placeholder="email" value={loginInfos.email} onChange={handleChange} name="email" />
        <Input placeholder="password" value={loginInfos.password} onChange={handleChange} name="password" />
        <Button onClick={() => login(loginInfos.email, loginInfos.password)}>Login</Button>
        <Link to="/register" >
          <Button
            type="text"
          >sign up</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Login;