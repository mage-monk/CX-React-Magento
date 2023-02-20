import ChatBot from "react-simple-chatbot";
import OpenLink from "./OpenLink";
import botAvatar from "../../asset/img.png";

const steps = [
  {
    id: "0",
    message: "Hey Buddy!",
    trigger: "1",
  },
  {
    id: "1",
    user: true,
    trigger: "2",
  },
  {
    id: "2",
    message: "Please write your name",
    trigger: "3",
  },
  {
    id: "3",
    validator: (value) => {
      if (/^[A-Za-z][A-Za-z\'\-]+([\ A-Za-z][A-Za-z\'\-]+)*/.test(value)) {
        return true;
      } else {
        return "Please input alphabet characters only.";
      }
    },
    user: true,
    trigger: "4",
  },
  {
    id: "4",
    message: " hi {previousValue}, how can I help you?",
    trigger: 5,
  },
  {
    id: "5",
    options: [
      { value: 1, label: "View Holidays", trigger: "6" },
      { value: 2, label: "View SAP", trigger: "7" },
    ],
  },
  {
    id: "6",
    component: <OpenLink />,
    metadata: {
      link:
        "https://apcdeloitte.sharepoint.com/sites/talentworkspace/Policies/Forms/Staff.aspx?id=%2Fsites%2Ftalentworkspace%2FPolicies%2FHoliday%20List%2FHoliday%20List%202023%2Epdf&parent=%2Fsites%2Ftalentworkspace%2FPolicies%2FHoliday%20List",
      text: "You can view/download the full holiday list here",
    },
    trigger: 8,
  },
  {
    id: "7",
    component: <OpenLink />,
    metadata: {
      link:
        "https://fsp.deloitteresources.com/irj/portal/TalentHub#EP--29761397-TalentHub",
      text: "Login into SAP",
    },
    trigger: 8,
  },
  {
    id: "8",
    message: "Please select any option!",
    trigger: 9,
  },
  {
    id: "9",
    options: [
      { value: 1, label: "Main Menu", trigger: "10" },
      { value: 2, label: "Quit", trigger: "11" },
    ],
  },
  {
    id: "10",
    message: "Wait a moment..",
    trigger: 5,
  },
  {
    id: "11",
    message: "Thanks Buddy!",
    end: true,
  },
];

// Set some properties of the bot
const config = {
  botAvatar: botAvatar,
  floating: true,
};

const ChatBox = () => {
  return (
    <div className="chatBox">
      <ChatBot headerTitle="TIA" steps={steps} {...config} />
    </div>
  );
};

export default ChatBox;
