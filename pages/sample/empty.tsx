import {Suspense, useEffect} from "react";
import dynamic from "next/dynamic";

import {useRouter} from "next/router";
import PleaseWait from "../../components/PleaseWait";

const MainComponent = dynamic(() => import('../../components/MainComponent'), {suspense:true, ssr: false});

export default function Empty() {
  const router = useRouter();

  useEffect(() => {
    if (window.top === window) {
      router.push('/sample');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Suspense fallback={<PleaseWait />}>
      <MainComponent newData={{isAnEmptyPreview: true}}/>
    </Suspense>
  );
}
