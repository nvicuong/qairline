// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Thống kê",
    link: "/admins",
  },
  {
    icon: UilClipboardAlt,
    heading: "Thêm chuyến bay",
    link: "/admins/category",
  },
  {
    icon: UilUsersAlt,
    heading: "Khách hàng",
    link: "/admins/customers",
  },
  {
    icon: UilPackage,
    heading: "Tin tức",
    link: "/admins/news",
  },
  {
    icon: UilChart,
    heading: "Thay đổi lịch trình",
    link: "/admins/change",
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Số vé bán được",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "400",
    png: UilUsdSquare,
    series: [
      {
        name: "Tickets Sold",
        data: [10, 5, 9, 11, 13, 17, 1],
      },
    ],
  },
  {
    title: "Số tiền thu được",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "144,270,300",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Money Received",
        data: [17, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];

export const airportNames = [
  {
    name: "Alexandria",
    country: "Ai Cập",
    code: "HBE",
    fullName: "Sân bay Borg el Arab",
  },
  {
    name: "Aalborg",
    country: "Đan Mạch",
    code: "AAL",
    fullName: "Sân bay Aalborg",
  },
  {
    name: "Abadan",
    country: "Iran",
    code: "ABD",
    fullName: "Sân bay Abadan",
  },
  {
    name: "Abbotsford",
    country: "Canada",
    code: "YXX",
    fullName: "Sân bay Abbotsford",
  },
];

export const dataBasic = {
  from: "",
  to: "",
  departureDate: "",
  returnDate: "",
  airplaneName: "",
  ticketNumber: "",
  ticketType: "",
};

export const flightData = [
  {
    id: 1,
    departureTime: "15:30",
    arrivalTime: "17:40",
    from: "Hà Nội",
    fromCode: "HAN",
    to: "Sài Gòn",
    toCode: "SGN",
    duration: "2h 10 phút",
    flightNumber: 249,
    economyPrice: "2.728.000",
    businessPrice: "8.776.000",
    economySeats: 1,
    businessSeats: 1,
  },
  {
    id: 2,
    departureTime: "10:15",
    arrivalTime: "12:30",
    from: "Hà Nội",
    fromCode: "HAN",
    to: "Đà Nẵng",
    toCode: "DAD",
    duration: "2h 15 phút",
    flightNumber: 132,
    economyPrice: "1.600.000",
    businessPrice: "5.400.000",
    economySeats: 4,
    businessSeats: 2,
  },
  {
    id: 3,
    departureTime: "08:45",
    arrivalTime: "11:05",
    from: "Sài Gòn",
    fromCode: "SGN",
    to: "Hà Nội",
    toCode: "HAN",
    duration: "2h 20 phút",
    flightNumber: 301,
    economyPrice: "2.900.000",
    businessPrice: "9.200.000",
    economySeats: 3,
    businessSeats: 1,
  },
  {
    id: 4,
    departureTime: "14:20",
    arrivalTime: "16:40",
    from: "Hải Phòng",
    fromCode: "HPH",
    to: "Sài Gòn",
    toCode: "SGN",
    duration: "2h 20 phút",
    flightNumber: 410,
    economyPrice: "2.450.000",
    businessPrice: "7.800.000",
    economySeats: 5,
    businessSeats: 0,
  },
  {
    id: 5,
    departureTime: "09:30",
    arrivalTime: "11:45",
    from: "Đà Nẵng",
    fromCode: "DAD",
    to: "Hà Nội",
    toCode: "HAN",
    duration: "2h 15 phút",
    flightNumber: 521,
    economyPrice: "1.800.000",
    businessPrice: "6.200.000",
    economySeats: 2,
    businessSeats: 3,
  },
  {
    id: 6,
    departureTime: "13:15",
    arrivalTime: "15:40",
    from: "Nha Trang",
    fromCode: "CXR",
    to: "Sài Gòn",
    toCode: "SGN",
    duration: "2h 25 phút",
    flightNumber: 602,
    economyPrice: "1.900.000",
    businessPrice: "6.800.000",
    economySeats: 6,
    businessSeats: 2,
  },
  {
    id: 7,
    departureTime: "06:30",
    arrivalTime: "08:50",
    from: "Sài Gòn",
    fromCode: "SGN",
    to: "Phú Quốc",
    toCode: "PQC",
    duration: "2h 20 phút",
    flightNumber: 703,
    economyPrice: "1.400.000",
    businessPrice: "4.600.000",
    economySeats: 3,
    businessSeats: 1,
  },
  {
    id: 8,
    departureTime: "20:00",
    arrivalTime: "22:15",
    from: "Hà Nội",
    fromCode: "HAN",
    to: "Nha Trang",
    toCode: "CXR",
    duration: "2h 15 phút",
    flightNumber: 804,
    economyPrice: "2.100.000",
    businessPrice: "7.300.000",
    economySeats: 4,
    businessSeats: 1,
  },
  {
    id: 9,
    departureTime: "12:45",
    arrivalTime: "15:00",
    from: "Đà Nẵng",
    fromCode: "DAD",
    to: "Sài Gòn",
    toCode: "SGN",
    duration: "2h 15 phút",
    flightNumber: 905,
    economyPrice: "1.700.000",
    businessPrice: "5.700.000",
    economySeats: 5,
    businessSeats: 3,
  },
  {
    id: 10,
    departureTime: "18:30",
    arrivalTime: "20:50",
    from: "Phú Quốc",
    fromCode: "PQC",
    to: "Hà Nội",
    toCode: "HAN",
    duration: "2h 20 phút",
    flightNumber: 106,
    economyPrice: "2.300.000",
    businessPrice: "8.100.000",
    economySeats: 3,
    businessSeats: 2,
  },
];

export const bookings = [
  {
    id: 1,
    username: "nguyenan",
    name: "Nguyen Van A",
    gender: "Nam",
    birthday: "01/01/1990",
    email: "nguyenvana@gmail.com",
  },
  {
    id: 2,
    username: "tranb",
    name: "Tran Thi B",
    gender: "Nữ",
    birthday: "15/02/1985",
    email: "tranthib@gmail.com",
  },
  {
    id: 3,
    username: "lehoangc",
    name: "Le Hoang C",
    gender: "Nam",
    birthday: "20/03/1992",
    email: "lehoangc@gmail.com",
  },
  {
    id: 4,
    username: "phamthid",
    name: "Pham Thi D",
    gender: "Nữ",
    birthday: "30/04/1988",
    email: "phamthid@gmail.com",
  },
  {
    id: 5,
    username: "hoangnguyen",
    name: "Hoang Van E",
    gender: "Nam",
    birthday: "12/05/1995",
    email: "hoangnguyen@gmail.com",
  },
  {
    id: 6,
    username: "ngothif",
    name: "Ngo Thi F",
    gender: "Nữ",
    birthday: "07/06/1990",
    email: "ngothif@gmail.com",
  },
  {
    id: 7,
    username: "dangthig",
    name: "Dang Thi G",
    gender: "Nữ",
    birthday: "25/07/1987",
    email: "dangthig@gmail.com",
  },
  {
    id: 8,
    username: "vovanha",
    name: "Vo Van H",
    gender: "Nam",
    birthday: "09/08/1983",
    email: "vovanha@gmail.com",
  },
  {
    id: 9,
    username: "nguyenj",
    name: "Nguyen Thi J",
    gender: "Nữ",
    birthday: "14/09/1999",
    email: "nguyenj@gmail.com",
  },
  {
    id: 10,
    username: "ledangk",
    name: "Le Dang K",
    gender: "Nam",
    birthday: "23/10/2000",
    email: "ledangk@gmail.com",
  },
];
