import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "t101",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/v1688120244/avatars-twitify/jcf1sitmtf8nroqkhx74.png",
    profileBio:
      "I'm Adarsh Balika, a passionate individual dedicated to making a positive impact.",
    profileURL: "https://example.com/adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t102",
    firstName: "Manan",
    lastName: "Khurana",
    username: "manankhurana",
    password: "manan",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/vros3skvusjvip5t33ej",
    profileBio: "I'm Manan Khurana, a tech enthusiast and lifelong learner.",
    profileURL: "https://manankhurana.netlify.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t103",
    firstName: "Naval",
    lastName: "Ravikant",
    username: "navalravikant",
    password: "naval",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/wvmv99304tct9xlyzopg",
    profileBio: "I'm Naval Ravikant, an entrepreneur and angel investor.",
    profileURL: "https://example.com/navalravikant",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t104",
    firstName: "Elon",
    lastName: "Musk",
    username: "elonmusk",
    password: "tesla123",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/fvvpafxqxr1w8b3ihug2",
    profileBio:
      "I'm Elon Musk, CEO of Tesla and SpaceX, and a visionary entrepreneur.",
    profileURL: "https://example.com/elonmusk",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t105",
    firstName: "Satya",
    lastName: "Nadella",
    username: "satyanadella",
    password: "microsoft",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/dzwj8pt5igenrmlevvrq",
    profileBio:
      "I'm Satya Nadella, CEO of Microsoft, and I believe in the power of technology to empower people and organizations.",
    profileURL: "https://example.com/satyanadella",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t106",
    firstName: "Tim",
    lastName: "Cook",
    username: "timcook",
    password: "apple",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/x1ueggka7yxbwjggterl",
    profileBio:
      "I'm Tim Cook, CEO of Apple, and I'm passionate about creating innovative products that enrich people's lives.",
    profileURL: "https://example.com/timcook",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t107",
    firstName: "Jeff",
    lastName: "Bezos",
    username: "jeffbezos",
    password: "amazon",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/x9o0x1hkmfl6brlks43d",
    profileBio:
      "I'm Jeff Bezos, founder of Amazon, and I strive to build customer-centric experiences and drive innovation.",
    profileURL: "https://example.com/jeffbezos",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t108",
    firstName: "Sundar",
    lastName: "Pichai",
    username: "sundarpichai",
    password: "google",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/xvsf1pqzffs7o4rijg8n",
    profileBio:
      "I'm Sundar Pichai, CEO of Google, and I'm committed to organizing the world's information and making it universally accessible.",
    profileURL: "https://example.com/sundarpichai",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t109",
    firstName: "Mark",
    lastName: "Zuckerberg",
    username: "markzuckerberg",
    password: "facebook",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/a9vs1nrp8yqsj0myqtj2",
    profileBio:
      "I'm Mark Zuckerberg, CEO of Facebook, and I believe in connecting people and building communities.",
    profileURL: "https://example.com/markzuckerberg",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t110",
    firstName: "Jack",
    lastName: "Dorsey",
    username: "jackdorsey",
    password: "twitter",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/xmmnu4gdspvcvpvskddp",
    profileBio:
      "I'm Jack Dorsey, co-founder of Twitter, and I'm passionate about fostering public conversation and empowering people to share their thoughts.",
    profileURL: "https://example.com/jackdorsey",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t111",
    firstName: "Bill",
    lastName: "Gates",
    username: "billgates",
    password: "microsoft123",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/efrhqpzntm8j0y2i6bxy",
    profileBio:
      "I'm Bill Gates, co-founder of Microsoft and philanthropist. I'm committed to improving global health and education through the Bill & Melinda Gates Foundation.",
    profileURL: "https://example.com/billgates",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t112",
    firstName: "Gary",
    lastName: "Vaynerchuk",
    username: "garyvee",
    password: "winetasting",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/edvlawkhhjm7iuv3hcxg",
    profileBio:
      "I'm Gary Vaynerchuk, entrepreneur, author, and speaker. I'm passionate about entrepreneurship and helping others achieve their goals.",
    profileURL: "https://example.com/garyvee",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t113",
    firstName: "Trevor",
    lastName: "Noah",
    username: "trevornoah",
    password: "dailyshow",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/tysvfujyofg5p2djh1gj",
    profileBio:
      "I'm Trevor Noah, comedian, and host of The Daily Show. I use humor to shed light on social and political issues.",
    profileURL: "https://example.com/trevornoah",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t114",
    firstName: "Hasan",
    lastName: "Minhaj",
    username: "hasanminhaj",
    password: "patriotact",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/sh9pow2dg26gpclkjfct",
    profileBio:
      "I'm Hasan Minhaj, comedian, writer, and former host of Patriot Act. I tackle important and timely topics through a comedic lens.",
    profileURL: "https://example.com/hasanminhaj",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: "t115",
    firstName: "Kunal",
    lastName: "Shah",
    username: "kunalshah",
    password: "cred",
    profileImg:
      "https://res.cloudinary.com/dsuxc3pwu/image/upload/f_auto,q_auto/v1/profileImg-twitify/fxfzrrruymbx3xojyfsk",
    profileBio:
      "I'm Kunal Shah, entrepreneur, and founder of Cred. I'm passionate about creating innovative financial solutions for businesses.",
    profileURL: "https://example.com/kunalshah",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
