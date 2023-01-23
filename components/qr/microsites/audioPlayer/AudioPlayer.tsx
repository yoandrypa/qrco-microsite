import Box from "@mui/material/Box";
import {useCallback, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import VolumeHandler from "./VolumeHandler";
import HeaderHandler from "./HeaderHandler";
import HandlePlayerButtons from "./HandlePlayerButtons";

const timeString = (secs: number) => new Date(secs * 1000).toISOString().slice(secs < 3600 ? 14 : 11, 19);

export default function AudioPlayer() {
  const interval = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);

  const [duration, setDuration] = useState<number | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);

  const playAudio = () => {
    interval.current = setInterval(() => {
      setCurrent(audio.current?.currentTime || 0);
    }, 1000);
    if (audio.current && audioCtx.current?.state === 'suspended') { // @ts-ignore
      audioCtx.current.resume().then(() => audio.current.play());
    }
  }

  const pauseAudio = () => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    if (audio.current && audioCtx.current?.state === 'running') { // @ts-ignore
      audioCtx.current.suspend().then(() => audio.current.pause());
    }
  }

  const handlePlayPause = () => {
    if (playing) {
      pauseAudio();
    } else {
      playAudio();
    }
    setPlaying(prev => !prev);
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    const pos = newValue as number;
    if (audio.current) {
      audio.current.currentTime = pos;
    }
    setCurrent(pos);
  };

  const renderDuration = useCallback(() => (
    <Typography variant="caption" sx={{color: theme => theme.palette.text.disabled}}>
      {`${timeString(duration || 0)}`}
    </Typography>
  ), [duration]);

  const renderPlayer = () => {
    return (
      <Box sx={{width: '100%', border: 'solid 1px gray', p: 2, borderRadius: '5px'}}>
        <Box sx={{display: 'flex', mb: '10px'}}>
          <HeaderHandler />
          <canvas ref={canvasRef} style={{width: '350px', height: '70px', border: 'solid 1px rgb(0 0 0 / 25%)'}} />
        </Box>
        <HandlePlayerButtons disabled={audio.current === null} playing={playing} handlePlayPause={handlePlayPause} />
        <Slider value={current || 0} onChange={handleChange} min={0} max={duration || 0} />
        {duration !== undefined && (
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mt: '-8px'}}>
            <Typography variant="caption" sx={{color: theme => theme.palette.text.disabled}}>
              {`${timeString(current || 0)}`}
            </Typography>
            {renderDuration()}
          </Box>
        )}
        <Box sx={{width: 'calc(100% - 45px)', mx: 'auto'}}>
          <VolumeHandler volume={volume} setVolume={setVolume} audio={audio.current || undefined} />
        </Box>
      </Box>
    );
  }

  const clear = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    setCurrent(0);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (duration && current && duration > 1 && duration === current) {
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, current]);

  useEffect(() => { // @ts-ignore
    audioCtx.current =  new (window.AudioContext || window.webkitAudioContext)();

    const a = new Audio();
    a.src = 'http://localhost:3001/tecno.mp3';
    a.preload = 'metadata';

    audio.current = a;
    audio.current.load();

    fetch(audio.current.src)
      .then(data => data.blob())
      .then(blob => blob.arrayBuffer()) // @ts-ignore
      .then(buffer => audioCtx.current.decodeAudioData(buffer))
      .then(response => { // @ts-ignore
        const analyser = audioCtx.current.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        setDuration(response.duration)
      })
      .catch(error => console.log('Error',error));

    return () => {
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: '350px', mt: '20px', ml: '20px' }}>
      {renderPlayer()}
    </Box>
  );
}
