import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormTelegram {
  username: string;
  email: string;
  subject: string;
  description: string;
}
const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

const TelegramBot = () => {
  const { register, handleSubmit } = useForm<IFormTelegram>();

  const messageModel = (data: IFormTelegram) => {
    let messegeTG = `Username: <b>${data.username}</b>\n`;
    messegeTG += `email: <b>${data.email}</b>\n`;
    messegeTG += `subject: <b>${data.subject}</b>\n`;
    messegeTG += `description: <b>${data.description}</b>\n`;
    return messegeTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageModel(data),
    });
  };

  return (
    <div>
      <h1>TelegramBot</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input__block">
          <input
            placeholder="username"
            type="text"
            {...register("username", {
              required: true,
            })}
          />
          <input
            placeholder="email"
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          <input
            placeholder="subject"
            type="text"
            {...register("subject", { required: true })}
          />

          <input
            placeholder="description"
            type="text"
            {...register("description", { required: true })}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default TelegramBot;
