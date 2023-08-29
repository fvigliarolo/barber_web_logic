import { getFetch  } from "../utils/fetch.js";
let barberos = {c05ada79dbe25: "alex", bf791a441a922:"Facu", df65fcd88bbe: "fede" }
const servicio = "00:30:00"
const barbers_basic_info = getFetch('barberos/data');

export  {barberos, servicio, barbers_basic_info};
