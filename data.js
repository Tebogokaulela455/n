import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  { img: "assets/countryside_cat.webp",
     label: "Countryside",
      icon: <TbMountain />, 
      description: "This property is in the countryside!" },

  { img: "assets/cave_cat.jpg",
     label: "Caves",
     icon: <GiCaveEntrance />,
     description: "This property is in a spooky cave!" },

  { img: "assets/skiing_cat.jpg",
     label: "Ski-in/out",
     icon: <FaSkiing />,
     description: "This property has skiing activies!" },
 
  { img: "assets/windmill_cat.webp",
     label: "Windmills",
     icon: <GiWindmill />,
     description: "This property is has windmills!" },

  { img: "assets/desert_cat.webp",
     label: "Desert",
     icon: <GiCactus />,
     description: "This property is in the desert!" },

  { img: "assets/beach_cat.jpg",
     label: "Beachfront",
     icon: <TbBeach />,
     description: "This property is close to the beach!" },
 
  { img: "assets/arctic_cat.webp",
     label: "Arctic",
     icon: <BsSnow />,
     description: "This property is in arctic environment!" },

  { img: "assets/lake_cat.webp",
     label: "Lakefront",
     icon: <GiBoatFishing />,
     description: "This property is near a lake!" },

  { img: "assets/lux_cat.jpg",
     label: "Luxury",
     icon: <IoDiamond />,
     description: "This property is brand new and luxurious!" },

  { img: "assets/island_cat.webp",
     label: "Islands",
     icon: <GiIsland />,
     description: "This property is on an island!" },

  { img: "assets/barn_cat.jpg",
     label: "Barns", 
    icon: <GiBarn />,
     description: "This property is in a barn!" },

  { img: "assets/camping_cat.jpg",
     label: "Camping",
     icon: <GiForestCamp />,
     description: "This property offers camping activities!" },
 
  { img: "assets/modern_cat.webp",
     label: "Iconic cities",
     icon: <MdOutlineVilla />,
     description: "This property is modern!" },

  { img: "assets/pool_cat.jpg",
     label: "Amazing Pools",
     icon: <TbPool />,
     description: "This is property has a beautiful pool!" },

  { img: "assets/castle_cat.webp",
     label: "Castles",
     icon: <GiCastle />,
     description: "This property is an ancient castle!" },

];

export const types = [
  {
    name: "An entire place",
    description: "Guests have exclusive access to the entire place.",
    icon: <FaHouseUser />,
  },
  {
    name: "A Shared Room",
    description:
      "Guests sleep in a room or common area that may be shared with the host or other guests.",
    icon: <FaPeopleRoof />,
  },
  {
    name: "Room(s)",
    description:
      "Guests have their own private room in the house and can also enjoy the shared common areas.",
    icon: <BsFillDoorOpenFill />,
  },

];

export const facilities = [
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
},
{
    name: "Barbecue grill",
    icon: <GiBarbecue />,
},
{
    name: "Free parking",
    icon: <AiFillCar />,
},
{
    name: "Iron",
    icon: <TbIroning3 />,
},
{
    name: "Garden",
    icon: <MdYard />,
},
{
    name: "Washer",
    icon: <BiSolidWasher />,
},
{
    name: "First Aid",
    icon: <BiSolidFirstAid />,
},
{
    name: "Microwave",
    icon: <MdMicrowave />,
},
{
    name: "Heating",
    icon: <GiHeatHaze />,
},
{
    name: "Refrigerator",
    icon: <BiSolidFridge />,
},
{
    name: "TV",
    icon: <PiTelevisionFill />,
},
{
    name: "Bath tub",
    icon: <PiBathtubFill />,
},
{
    name: "Wifi",
    icon: <BiWifi />,
},
{
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
},
{
    name: "Camp fire",
    icon: <GiCampfire />,
},
{
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />,
},
{
    name: "Air Conditioning",
    icon: <BsSnow />,
},
{
    name: "Stove",
    icon: <GiToaster />,
},
{
    name: "Private patio or Balcony",
    icon: <MdBalcony />,
},
{
    name: "Dryer",
    icon: <BiSolidDryer />,
},
{
    name: "Security cameras",
    icon: <GiCctvCamera />,
},
{
    name: "Pet allowed",
    icon: <MdPets />,
},
{
    name: "Outdoor shower",
    icon: <FaShower />,
},
{
    name: "Personal care products",
    icon: <FaPumpSoap />,
},
{
    name: "Self check-in",
    icon: <FaKey />,
},
{
    name: "Cooking set",
    icon: <FaKitchenSet />,
},
{
    name: "Hangers",
    icon: <PiCoatHangerFill />,
},
];
