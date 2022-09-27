import React from 'react'
import style from 'CountDown.module.css'

type Props = {}

const CountDown = (props: Props) => {
  return (
    <>
    <div className={style.container}>
    <div className={style.container_segment}>
      <div className={style.segment_title}>Days</div>
      <div className={style.segment}>
        <div className={style.flip_card} data-days-tens>
          <div className={style.top}>1</div>
          <div className={style.bottom}>1</div>
        </div>
        <div className={style.flip_card} data-days-ones>
          <div className={style.top}>4</div>
          <div className={style.bottom}>4</div>
        </div>
      </div>
    </div>
    <div className={style.container_segment}>
      <div className={style.segment_title}>Hours</div>
      <div className={style.segment}>
        <div className={style.flip_card} data-hours-tens>
          <div className={style.top}>2</div>
          <div className={style.bottom}>2</div>
        </div>
        <div className={style.flip_card} data-hours-ones>
          <div className={style.top}>4</div>
          <div className={style.bottom}>4</div>
        </div>
      </div>
    </div>
    <div className={style.container_segment}>
      <div className={style.segment_title}>Minutes</div>
      <div className={style.segment}>
        <div className={style.flip_card} data-minutes-tens>
          <div className={style.top}>0</div>
          <div className={style.bottom}>0</div>
        </div>
        <div className={style.flip_card} data-minutes-ones>
          <div className={style.top}>0</div>
          <div className={style.bottom}>0</div>
        </div>
      </div>
    </div>
    <div className={style.container_segment}>
      <div className={style.segment_title}>Seconds</div>
      <div className={style.segment}>
        <div className={style.flip_card} data-seconds-tens>
          <div className={style.top}>0</div>
          <div className={style.bottom}>0</div>
        </div>
        <div className={style.flip_card} data-seconds-ones>
          <div className={style.top}>0</div>
          <div className={style.bottom}>0</div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default CountDown