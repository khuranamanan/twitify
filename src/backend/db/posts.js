import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content: "The only way to do great work is to love what you do.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "2023-06-20T01:30:10+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Believe you can and you're halfway there.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "manankhurana",
    createdAt: "2023-03-18T16:45:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Excited to be on this web development journey with React! Learning new concepts, building projects, and expanding my skills. #WebDevLife",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    media: {
      url: "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/rl4gxq3m8cbl8c79yj9o",
      type: "image",
    },
    username: "manankhurana",
    createdAt: "2023-05-01T22:30:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "The pursuit of wealth without the pursuit of wisdom is a recipe for disaster.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "navalravikant",
    createdAt: "2023-01-20T05:10:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Society is divided into two groups: those who take responsibility for their lives and those who expect someone else to take care of them.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "navalravikant",
    createdAt: "2023-04-08T11:45:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "The most important skill to acquire is the ability to learn on your own.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "navalravikant",
    createdAt: "2023-03-06T19:20:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Happiness is not a destination; it's a state of mind. Cultivate gratitude and enjoy the journey.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "navalravikant",
    createdAt: "2023-05-16T00:55:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Don't dwell on your failures. Learn from them and use them as stepping stones to success. #KeepMovingForward",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "garyvee",
    createdAt: "2023-02-28T06:30:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Success is not guaranteed, but regret is. Take risks, embrace failure, and never wonder 'what if?' #NoRegrets",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "garyvee",
    createdAt: "2023-05-06T13:00:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Hustle and patience are the keys to success. Put in the work every day and trust the process. #CrushIt",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "garyvee",
    createdAt: "2023-03-26T19:35:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Empathy is at the heart of innovation. By understanding the needs of others, we can create meaningful solutions. #InclusiveTech",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "satyanadella",
    createdAt: "2023-04-21T02:10:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Innovation is not just about creating new products, but also about improving the lives of our customers. #AppleLife",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "timcook",
    createdAt: "2023-01-08T08:50:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Dream big, think long-term, and embrace failure. The path to success is paved with perseverance. #BlueOrigin",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "jeffbezos",
    createdAt: "2023-03-30T15:25:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Technology has the power to change the world. Let's build a future where everyone has access to knowledge and opportunity. #GoogleForAll",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sundarpichai",
    createdAt: "2023-04-16T22:00:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Connecting people and building communities is at the core of our mission. Together, we can make a difference. #SocialImpact",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "markzuckerberg",
    createdAt: "2023-01-24T04:35:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Philanthropy is not just about giving back; it's about making a lasting impact and improving lives. #GivingBack",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "billgates",
    createdAt: "2023-02-20T11:10:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Using humor to shed light on important issues. Laughter has the power to bring us together. #ComedyMatters",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "trevornoah",
    createdAt: "2023-01-01T17:45:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Building and scaling innovative financial solutions. Let's empower individuals and businesses for a better tomorrow. #FintechRevolution",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kunalshah",
    createdAt: "2023-03-12T00:20:00+05:30",
    updatedAt: formatDate(),
  },
];
