import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
// eslint-disable-next-line no-unused-vars
import i18n from "./index";

const Share = () => {
  const notify = () => toast("Payment done");
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <div className="flex justify-center flex-col items-center  font-bold">
        <h1 className="text-6xl">Share</h1>
        <div className="flex flex-col mt-10 gap-5">
          <div className="flex flex-row gap-5">
            <h1 className="text  3xl mt-1">Facbook</h1>
            <FacebookShareButton url="www.releqai.in">
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
          </div>
          <div className="flex flex-row gap-5">
            <h1 className="text  3xl mt-1">Email</h1>
            <EmailShareButton url="www.releqai.in">
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>
          <div className="flex flex-row gap-5">
            <h1 className="text  3xl mt-1">Linkedin</h1>
            <LinkedinShareButton url="www.releqai.in">
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
          </div>
          <div className="flex flex-row gap-5">
            <h1 className="text  3xl mt-1">Whatsapp</h1>
            <WhatsappShareButton url="www.releqai.in">
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
          </div>
          <div className="flex flex-row gap-5">
            <h1 className="text  3xl mt-1">Twitter</h1>
            <TwitterShareButton url="www.releqai.in">
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-5xl font-bold">Toastify / Notifaction</h1>
        <button
          className="w-20 h-10 bg-blue-700 rounded-full text-white font-medium mt-10"
          onClick={notify}
        >
          Buy now
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold">Multi language support</h1>
        </motion.div>

        <button
          className="w-20 h-10 bg-blue-700 rounded-full text-white font-medium mt-10"
          onClick={() => changeLanguage("fr")} // Change language to French
        >
          Change to French
        </button>
        <button
          className="w-20 h-10 bg-blue-700 rounded-full text-white font-medium mt-2"
          onClick={() => changeLanguage("en")} // Change language to English
        >
          Change to English
        </button>
        <h1>{t("Welcome to React")}</h1>
      </div>
      <ToastContainer />
    </>
  );
};

export default Share;
