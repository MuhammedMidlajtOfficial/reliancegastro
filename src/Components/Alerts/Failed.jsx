import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ShowFailureAlert() {
  MySwal.fire({
    title: "Failed!",
    text: "Something went wrong. Please try again.",
    icon: "error",
    timer: 2000,
    confirmButtonText: "Retry",
    customClass: {
      popup: "custom-alert-popup",
    },
  });
}
