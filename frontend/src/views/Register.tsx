import { Button, Flex, Input, Typography } from "antd"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const Register = () => {
  const { register } = useAuth()
  const [registerInfos, setRegisterInfos] = useState({ name: '', email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfos({ ...registerInfos, [e.target.name]: e.target.value })
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
        <Typography.Title level={1}>Register</Typography.Title>
        <Input placeholder="name" value={registerInfos.name} onChange={handleChange} name="name" />
        <Input placeholder="email" value={registerInfos.email} onChange={handleChange} name="email" />
        <Input placeholder="password" type="password" value={registerInfos.password} onChange={handleChange} name="password" />
        <Button onClick={() => register(registerInfos.email, registerInfos.password)}>Login</Button>
      </Flex>
    </Flex>
  )
}

export default Register;