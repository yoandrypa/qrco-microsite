import {useEffect} from "react";

import MainComponent from "../../components/MainComponent";
import {useRouter} from "next/router";

export default function Empty() {
  const router = useRouter();

  useEffect(() => {
    if (window.top === window) {
      router.push('/sample');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <MainComponent newData={{isAnEmptyPreview: true}}/>;
}
