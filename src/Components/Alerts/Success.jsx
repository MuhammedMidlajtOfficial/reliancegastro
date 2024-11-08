import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ShowSuccessAlert() {
  MySwal.fire({
    title: "Success!",
    text: "Your action was successful.",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
    customClass: {
      popup: "custom-alert-popup",
    },
  });
}
