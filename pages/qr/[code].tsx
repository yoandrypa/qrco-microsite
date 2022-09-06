import {GetServerSideProps} from 'next';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// @ts-ignore
export default function Handler({ data }) {



  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Box sx={{ border: 'solid 1px #e3d7d7', borderRadius: '5px', p: 2, maxWidth: '350px' }}>
        {'ASASASASA'}
        <Button variant="outlined">Get Contact</Button>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const data = `BEGIN:VCARD
  VERSION:3.0
  N:rr;ee
  FN:ee rr
  ORG:
  ADR:;; ;;;;
  TEL;FAX:22222
  TEL;WORK;VOICE:4443
  TEL;CELL:342424324
  EMAIL;WORK;INTERNET:rrrerewer@gggmm.com
  END:VCARD
  facebook: http://myfacebook.com
  twitter: @username
  whatsapp: 5454545454
  linkedin: http://linkedin.com
  pinterest: http://pinterest.com
  telegram: http://telegram.com
  `;

  const object = {};

  const lines = data.split(/\r?\n/);
  lines.forEach(x => {

  });

  console.log(data.split('\n'))
  return { props: { data } };
}
