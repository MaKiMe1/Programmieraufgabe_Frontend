import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import router from "./router";
//components form Primevue
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Card from "primevue/card";
import VirtualScroller from "primevue/virtualscroller";
import Calendar from "primevue/calendar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

//css style from Primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);
app.use(PrimeVue);
app.use(ToastService);

app.component("PrimeInputtext", InputText);
app.component("PrimeDropdown", Dropdown);
app.component("PrimeCheckbox", Checkbox);
app.component("PrimeButton", Button);
app.component("PrimeCard", Card);
app.component("PrimeVirtualScroller", VirtualScroller);
app.component("PrimeCalendar", Calendar);
app.component("PrimeToast", Toast);

app.use(router);
app.mount("#app");
