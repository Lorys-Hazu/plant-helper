import { Flex, Spin } from "antd"

const Loading = () => {
    return (
      <Flex
        vertical
        justify="center"
        align="center"
        style={{height: "100%"}}
      >
        <Spin />
      </Flex>
    )
}

export default Loading;