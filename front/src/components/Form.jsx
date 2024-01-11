import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextInput, PasswordInput } from "./Inputs";
import { signIn } from "../redux/authentificationslice";
import { loginUser } from "../services/api";

export default function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const token = await loginUser(email, password);
      dispatch(signIn(token));
      navigate('/user');
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
      // Gérer l'erreur ici
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput id="email" label="Email" register={register} errors={errors} />
      <PasswordInput id="password" label="Password" register={register} errors={errors} />
      <div className="input-remember">
        <input type="checkbox" id="rememberMe" {...register("rememberMe")} />
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
}
