import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import Icon from "./Icon";
import Input from "./Input";
import axios from "axios";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData); // Add this line
    // const newRecord = { ...formData };
    // setRecords([...records, newRecord]);
    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    // });

    try {
      const url = "http://localhost:6001/api/auth/register";
      const { formData: res } = await axios.post(url, formData);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const FacebookBackground =
    "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
  const InstagramBackground =
    "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
  const TwitterBackground =
    "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";

  return (
    <MainContainer>
      <WelcomeText>Welcome</WelcomeText>
      <form action="" onSubmit={handleSubmit}>
        <InputContainerTop>
          <Input
            id="firstName"
            label="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            onChange={handleChange}
            value={formData.firstName}
          />
          <Input
            id="lastName"
            label="lastName"
            name="lastName"
            placeholder="Last Name"
            required
            onChange={handleChange}
            value={formData.lastName}
          />
        </InputContainerTop>
        <InputContainer>
          <Input
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={formData.password}
          />
        </InputContainer>
        <ButtonContainer>
          <Button type="submit" content="Sign Up" />
        </ButtonContainer>
      </form>
      <LoginWith>OR LOGIN WITH</LoginWith>
      <HorizontalRule />
      <IconsContainer>
        <Icon color={FacebookBackground}>
          <FaFacebookF />
        </Icon>
        <Icon color={InstagramBackground}>
          <FaInstagram />
        </Icon>
        <Icon color={TwitterBackground}>
          <FaTwitter />
        </Icon>
      </IconsContainer>
      <ForgotPassword>Already have an account? Sign In</ForgotPassword>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;

  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;

    h4 {
      font-size: small;
    }
  }

  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;

    h4 {
      font-size: small;
    }
  }

  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 80vh;
  }

  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 50vh;
  }

  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 80vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 2rem 0 2rem 0;
`;

const CustomForm = styled.form`
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 40%;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InputContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 20%;
  width: 85%;
  margin-left: 35px;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.span`
  cursor: pointer;
  font-size: 0.65rem;
  margin-left: 10px;
  margin-bottom: 2px;
`;

const SubmissionStatus = styled.div`
  color: green;
  margin-top: 10px;
`;

export default Registration;
