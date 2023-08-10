//import { Badge } from "@material-ui/core";
//import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useAuthStore } from "../../store/store";
import { mobile } from "../../responsive";
import {url} from "../../components/helper/userRequest";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #5995fd;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  axios.defaults.withCredentials = true;
  let authToken = useAuthStore((state) => {
    return state.auth.authToken;
  });
  axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  const setAuthToken = useAuthStore((state) => state.setAuthToken);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post(
      `${url()}/api/v1/user/logout`,
      null,
      {
        withCredentials: true,
      }
    );

    if (res?.status === 200) {
      return res;
    }
    return new Error("Unable TO Logout. Please try again");
  };
  const handleLogout = async () => {
    await sendLogoutReq().then(() => { setIsLoggedIn(false);setAuthToken("");});
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            {/* <Search style={{ color: "gray", fontSize: 16 }} /> */}
          </SearchContainer>
        </Left>
        <Center>
          <Logo>E-COMMERCE</Logo>
        </Center>
        <Right>
          {/* <MenuItem>REGISTER</MenuItem> */}
          <button
            style={{
              padding: 0,
              margin: 0,
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={handleLogout}
          >
            <MenuItem>SIGN OUT</MenuItem>
          </button>
          <MenuItem>
            {/* <Badge badgeContent={4} color="primary"> */}
            {/* <ShoppingCartOutlined /> */}
            {/* </Badge> */}
            <button
              style={{
                padding: 0,
                margin: 0,
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={handleLogout}
            >
              <img
                width={40}
                src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                alt="profile"
                style={{ borderRadius: "50%" }}
              />
            </button>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
