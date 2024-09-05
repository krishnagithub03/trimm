import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";

import Error from "../components/Error";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import useFetch from "@/hooks/useFetch";
import { login, signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context/context";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profile_pic: null,
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };
  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    // console.log(data);
    if (error === null && data !== null) {
      navigate(`/dashboard ? ${longLink ? `createNew=${longLink}` : ""} `);
      fetchUser();
    }
  }, [loading, error]);

  const handleSignup = async () => {
    setErrors({});
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be minimum 6 characters long")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile pic is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      //api call
      // console.log("formdata", formData);
      // console.log("fnLogin", fnLogin);

      await fnSignup(formData);
    } catch (err) {
      const newErrors = {};

      err?.inner?.forEach((error) => {
        newErrors[error.path] = error.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven't yet
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            type="text"
            placeholder="Enter Name"
            name="name"
            onChange={handleChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={handleChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>

        <div className="space-y-1">
          <Input
            type="file"
            placeholder="Upload Avatar"
            name="profile_pic"
            accept="image/*"
            onChange={handleChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? (
            <BeatLoader color="hsl(125,82%,50%)" size={10} />
          ) : (
            "Signup"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
