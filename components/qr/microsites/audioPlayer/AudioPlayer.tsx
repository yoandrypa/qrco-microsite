import Box from "@mui/material/Box";
import {useCallback, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import VolumeHandler from "./VolumeHandler";
import HeaderHandler from "./HeaderHandler";
import HandlePlayerButtons from "./HandlePlayerButtons";
import {convertBase64} from "../renderers/helper";

const timeString = (secs: number) => {
  try {
    return new Date(secs * 1000).toISOString().slice(secs < 3600 ? 14 : 11, 19);
  } catch {
    return '00:00';
  }
};

export default function AudioPlayer() {
  const interval = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const bufferLength = useRef<number>(0);
  const dataArray = useRef<any>([]);
  const ctx = useRef<any>(null);

  const [duration, setDuration] = useState<number | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);

  const updateCanvas = () => {
    requestAnimationFrame(updateCanvas);
    let x = 0;
    let barHeight;

    // @ts-ignore
    analyser.current.getByteFrequencyData(dataArray.current);

    // @ts-ignore
    const WIDTH = canvasRef.current.width;
    // @ts-ignore
    const HEIGHT = canvasRef.current.height;

    const barWidth = WIDTH / bufferLength.current;

    ctx.current.fillStyle = "#fff";
    ctx.current.fillRect(0, 0, WIDTH, HEIGHT);

    let r, g, b;
    let bars = 89;

    for (let i = 0; i < bars; i++) {
      barHeight = Math.ceil(dataArray.current[i] * HEIGHT / 255);

      if (dataArray.current[i] > 210){ // pink
        r = 250;
        g = 0;
        b = 0;
      } else if (dataArray.current[i] > 200){ // yellow
        r = 40;
        g = 235;
        b = 0;
      } else if (dataArray.current[i] > 190){ // yellow/green
        r = 5;
        g = 175;
        b = 125;
      } else if (dataArray.current[i] > 180){
        r = 0;
        g = 0;
        b = 250;
      } else {
        r = 25;
        g = 170;
        b = 255;
      }

      ctx.current.fillStyle = `rgb(${r},${g},${b})`;
      ctx.current.fillRect(x, (HEIGHT - barHeight), barWidth, barHeight);

      x += barWidth + 2;
    }
  }

  const playAudio = () => {
    interval.current = setInterval(() => {
      setCurrent(audio.current?.currentTime || 0);
    }, 1000);
    if (audio.current && audioCtx.current?.state === 'suspended') { // @ts-ignore
      audioCtx.current.resume().then(() => { // @ts-ignore
        audio.current.play()
        updateCanvas();
      });
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

  const clear = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    setCurrent(0);
    setPlaying(false);
  }, []);

  const loader = () => {
    fetch('http://localhost:3001/voltes.mp3')
    // fetch('http://localhost:3001/tecno.mp3')
      .then(data => data.blob())
      .then(blob => {
        convertBase64(blob) // @ts-ignore
          .then((result: string) => {
            audio.current = new Audio();
            audio.current.src = result;

            // @ts-ignore
            canvasRef.current.width = 270;
            // @ts-ignore
            canvasRef.current.height = 70;

            // @ts-ignore
            ctx.current = canvasRef.current.getContext('2d');

            // @ts-ignore
            const src = audioCtx.current.createMediaElementSource(audio.current); // @ts-ignore
            analyser.current = audioCtx.current.createAnalyser();
            src.connect(analyser.current); // @ts-ignore
            analyser.current.connect(audioCtx.current.destination);
            analyser.current.fftSize = 512;

            bufferLength.current = analyser.current.frequencyBinCount;
            dataArray.current = new Uint8Array(bufferLength.current); // values from 0 to 255

            audio.current.addEventListener('loadedmetadata', () => {
              setTimeout(() => { // @ts-ignore
                setDuration(audio.current.duration);
              }, 250);
            });
          });
      })
      .catch(error => console.log('Error',error));
  }

  useEffect(() => {
    if (duration && current && duration > 1 && duration === current) {
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, current]);

  useEffect(() => { // @ts-ignore
    audioCtx.current =  new (window.AudioContext || window.webkitAudioContext)();

    loader();

    return () => {
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: '350px', mt: '20px', ml: '20px' }}>
      <Box sx={{width: '100%', border: 'solid 1px gray', p: 2, borderRadius: '5px'}}>
        <Box sx={{display: 'flex', mb: '10px'}}>
          <HeaderHandler />
          <canvas ref={canvasRef} width={270} height={70} style={{border: 'solid 1px rgb(0 0 0 / 25%)'}} />
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
    </Box>
  );
}
