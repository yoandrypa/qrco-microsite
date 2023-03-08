import Box from "@mui/material/Box";
import {useCallback, useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import VolumeHandler from "./VolumeHandler";
import HandlePlayerButtons from "./HandlePlayerButtons";
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import IconButton from "@mui/material/IconButton";
import RepeatIcon from '@mui/icons-material/Repeat';
import {styled} from "@mui/material/styles";
import {grey} from "@mui/material/colors";

import {convertBase64} from "../renderers/helper";

const timeString = (secs: number) => {
  try {
    return new Date(secs * 1000).toISOString().slice(secs < 3600 ? 14 : 11, 19);
  } catch {
    return '00:00';
  }
};

const Text = styled(Typography)(() => ({
  color: grey[500],
  fontSize: '12px'
}));

const Button = styled(IconButton)(() => ({
  width: '20px', height: '20px', borderRadius: '4px'
}));

const CHEIGHT = 70;

interface AudioProps {
  audioContent?: string;
}

export default function AudioPlayer({audioContent}: AudioProps) {
  const interval = useRef<any>(null);
  const containerRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const bufferLength = useRef<number>(0);
  const dataArray = useRef<any>([]);

  const [duration, setDuration] = useState<number | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);
  const [repeat, setRepeat] = useState<boolean>(false);

  const updateCanvas = () => {
    if (!canvasRef.current) { return; }

    requestAnimationFrame(updateCanvas);
    let x = 0;
    let barHeight;

    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) { return; }

    const width = canvasRef.current?.width || 320;

    ctx.clearRect(0, 0, width, CHEIGHT);

    const yGrid = CHEIGHT / 4;
    const xGrid = width / 5;

    ctx.setLineDash([3, 8]);
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0 0 0 / 25%)';
    ctx.moveTo(0, yGrid);
    ctx.lineTo(width, yGrid);
    ctx.moveTo(xGrid, 0);
    ctx.lineTo(xGrid, CHEIGHT);
    ctx.moveTo(xGrid * 2, 0);
    ctx.lineTo(xGrid * 2, CHEIGHT);
    ctx.moveTo(xGrid * 3, 0);
    ctx.lineTo(xGrid * 3, CHEIGHT);
    ctx.moveTo(xGrid * 4, 0);
    ctx.lineTo(xGrid * 4, CHEIGHT);
    ctx.moveTo(0, yGrid * 2);
    ctx.lineTo(width, yGrid * 2);
    ctx.moveTo(0, yGrid * 3);
    ctx.lineTo(width, yGrid * 3);
    ctx.stroke();

    if (!analyser.current) { return; }

    analyser.current.getByteFrequencyData(dataArray.current);
    const barWidth = Math.ceil(width / bufferLength.current) + 1;

    let color;
    const bars = Math.ceil(width / barWidth);

    for (let i = 0; i < bars; i++) {
      barHeight = Math.ceil(dataArray.current[i] * CHEIGHT / 255);

      if (dataArray.current[i] > 210) {
        color = '#c23d06';
      } else if (dataArray.current[i] > 200) {
        color = '#a66f11';
      } else if (dataArray.current[i] > 190) {
        color = '#078323';
      } else if (dataArray.current[i] > 180) {
        color = '#007dfa';
      } else {
        color = '#078cd9';
      }

      ctx.fillStyle = color;
      ctx.fillRect(x, (CHEIGHT - barHeight), barWidth, barHeight);

      x += barWidth;
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

  const handleRepeat = () => {
    setRepeat((prevState: boolean) => !prevState);
  }

  const renderDuration = useCallback(() => <Text>{`${timeString(duration || 0)}`}</Text>, [duration]);

  const clear = useCallback(() => {
    pauseAudio();
    if (interval.current) {
      clearInterval(interval.current);
    }
    setCurrent(0);
    setPlaying(false);
  }, []);

  const audioHandler = (audioData: string) => {
    audio.current = new Audio();
    audio.current.src = audioData;

    // @ts-ignore
    const src = audioCtx.current.createMediaElementSource(audio.current); // @ts-ignore
    analyser.current = audioCtx.current.createAnalyser();
    src.connect(analyser.current); // @ts-ignore
    analyser.current.connect(audioCtx.current.destination);
    analyser.current.fftSize = 256;

    bufferLength.current = analyser.current.frequencyBinCount;
    dataArray.current = new Uint8Array(bufferLength.current); // values from 0 to 255

    audio.current.addEventListener('loadedmetadata', () => {
      setTimeout(() => { // @ts-ignore
        setDuration(audio.current.duration);
      }, 250);
    });
  }

  const loader = () => {
    if (audioContent !== undefined) {
      audioHandler(audioContent);
    } else {
      fetch('http://localhost:3001/voltes.mp3')
        .then(data => data.blob())
        .then(blob => {
          convertBase64(blob) // @ts-ignore
            .then((result: string) => {
              audioHandler(result);
            });
        })
        .catch(error => console.log('Error', error));
    }
  }

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (duration && current && duration > 1 && current >= duration) {
      clear();
      loader();
      if (repeat) {
        playAudio();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, current]);

  useEffect(() => { // @ts-ignore
    audioCtx.current =  new (window.AudioContext || window.webkitAudioContext)();

    const calculateContainerWidth = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth - 22;
      }
    }

    calculateContainerWidth();

    loader();
    updateCanvas();

    window.addEventListener('resize', calculateContainerWidth);

    return () => {
      window.removeEventListener('resize', calculateContainerWidth);
      clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{width: '100%', height: '158px', border: 'solid 1px gray', p: 1, borderRadius: '5px'}} ref={containerRef}>
      <canvas ref={canvasRef} width={300} height={CHEIGHT} style={{border: 'solid 2px rgb(0 0 0 / 25%)', borderRadius: '5px'}} />
      <Box sx={{display: 'flex', mt: 1}}>
        <HandlePlayerButtons disabled={audio.current === null} playing={playing} handlePlayPause={handlePlayPause} />
        <Box sx={{width: '100%', ml: '-35px', mt: {sm: '-10px', xs: '-16px'}}}>
          <Slider
            value={current || 0}
            onChange={handleChange}
            min={0} max={duration || 0}
            size="small"
            sx={{ '& .MuiSlider-thumb': {
              borderRadius: 0,
              width: '5px'
            } }} />
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mt: {sm: '-13px', xs: '-19px'}}}>
            <Text>{`${timeString(current || 0)}`}</Text>
            {renderDuration()}
          </Box>
          <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', mt: '-1px'}}>
            <Box sx={{display: 'flex', ml: '-3px', mt: '5px'}}>
              <Button disabled>
                <SkipPreviousIcon />
              </Button>
              <Button sx={{ml: '5px'}} disabled>
                <SkipNextIcon />
              </Button>
              <Button sx={{ml: '5px'}} disabled>
                <ShuffleIcon fontSize="small" />
              </Button>
              <Button sx={{ml: '5px'}} onClick={handleRepeat} disabled={audio.current === null}>
                <RepeatIcon fontSize="small" sx={{color: theme => repeat ? theme.palette.primary.light : theme.palette.text.disabled}} />
              </Button>
            </Box>
            <Box sx={{width: '100%', ml: '5px'}}>
              <VolumeHandler volume={volume} setVolume={setVolume} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
