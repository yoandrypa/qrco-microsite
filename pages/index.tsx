import {useEffect} from "react";
import PleaseWait from "../components/PleaseWait";

export default function Main () {
  useEffect(() => {
    window.location.href = 'https://theqr.link/';
  }, []);

  return (<PleaseWait redirecting />);
}
