import {useEffect, useState} from "react";

import MainComponent from "../../components/MainComponent";
import PleaseWait from "../../components/PleaseWait";
import {useRouter} from "next/router";

export default function Empty() {
  const [done, setDone] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (window.top === window) {
      router.push('/sample');
    }
    setDone(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!done) { // @ts-ignore
    return <PleaseWait />;
  }

  return <MainComponent newData={{isAnEmptyPreview: true}}/>;
}
