'use client';

import { useEffect, useRef } from 'react';
import styles from './ProblemScene.module.css';

const vertexSource = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() { vUv = aPosition * 0.5 + 0.5; gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

// A small ray-marched volume, not a flat blur. Low-frequency billows define
// the silhouette; advected fine noise breaks up the edges. A second density
// sample toward the light gives the cloud its self-shadowing.
const fragmentSource = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uReveal;
uniform vec3 uColor;
float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),
                 mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                 mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float fbm(vec3 p) {
  float n = noise(p)*0.55;
  p = p*2.03 + vec3(3.1,7.2,1.4); n += noise(p)*0.27;
  p = p*2.01 + vec3(1.7,2.8,5.2); n += noise(p)*0.12;
  return n;
}
float density(vec3 p) {
  float t = uTime * 0.19;
  vec3 flow = p * vec3(2.3,3.0,2.5) + vec3(0.0,-t,t*0.3);
  float billow = fbm(flow);
  vec3 warp = p + 0.14*vec3(sin(p.y*7.0+t),sin(p.x*6.0-t),sin(p.x*4.0+t));
  // A rolling ring of vapor around the bowl, with two rising side plumes.
  float ring = length(vec2(length(warp.xz/vec2(0.95,0.65))-0.82, (warp.y+0.20)*1.65));
  float base = 1.0-smoothstep(0.19,0.48,ring + (billow-0.48)*0.65);
  float left = 1.0-smoothstep(0.30,0.64,length((warp-vec3(-0.82,0.10,0.0))*vec3(1.8,1.25,1.9)));
  float right = 1.0-smoothstep(0.30,0.64,length((warp-vec3(0.83,0.05,0.0))*vec3(1.8,1.25,1.9)));
  float shape = max(base, max(left,right)*0.9);
  float detail = fbm(flow*2.0 + billow*1.7);
  float d = max(0.0, shape - 0.52 + (detail-0.42)*2.4) * smoothstep(0.0,0.3,shape);
  // Soft edge extinction, with a clear upper area for the lid and copy.
  d *= 1.0-smoothstep(0.38,0.75,p.y);
  d *= smoothstep(-0.84,-0.62,p.y);
  return d * smoothstep(0.0,1.1,uReveal);
}
void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  vec4 sum = vec4(0.0);
  // Canvas covers the lower 80% of the open ball; y is up in GL.
  vec3 ray = vec3(uv.x*1.32,uv.y*0.89,1.05);
  float jitter = hash(vec3(gl_FragCoord.xy,0.0))*0.07;
  for(int i=0;i<26;i++) {
    vec3 p = ray - vec3(0.0,0.0,float(i)*0.083+jitter);
    float d = density(p);
    if(d>0.015) {
      float towardLight = density(p + vec3(-0.22,0.25,0.23));
      float folds = fbm(vec3(p.xy*6.0 + vec2(0.0,-uTime*0.13), p.z*0.7));
      float light = clamp(0.22 + (d-towardLight)*2.8 + folds*0.30,0.06,1.0);
      vec3 shaded = mix(uColor*0.12, mix(uColor,vec3(0.92,0.90,1.0),0.06),light);
      float alpha = 1.0-exp(-d*0.86);
      sum.rgb += (1.0-sum.a)*shaded*alpha;
      sum.a += (1.0-sum.a)*alpha;
      if(sum.a>0.97) break;
    }
  }
  float edge = (1.0-smoothstep(0.82,1.0,abs(uv.x))) * (1.0-smoothstep(0.8,1.0,abs(uv.y)));
  gl_FragColor = sum * edge;
}
`;

export default function SmokeEffect({ color, reducedMotion, replay, active }: { color: string; reducedMotion: boolean; replay: number; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    canvas.dataset.rendered = 'false';
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, powerPreference: 'low-power' });
    if (!gl) return; // The CSS haze remains visible when WebGL is unavailable.
    let disposed = false, frame = 0, inView = false, elapsed = -1.05, last = 0;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    const shaders: WebGLShader[] = [];

    function compile(type: number, source: string) {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source); gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader); return null;
      }
      shaders.push(shader); return shader;
    }
    function initialize() {
      const vertex = compile(gl!.VERTEX_SHADER, vertexSource);
      const fragment = compile(gl!.FRAGMENT_SHADER, fragmentSource);
      if (!vertex || !fragment) return false;
      program = gl!.createProgram();
      if (!program) return false;
      gl!.attachShader(program, vertex); gl!.attachShader(program, fragment); gl!.linkProgram(program);
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) return false;
      gl!.useProgram(program);
      buffer = gl!.createBuffer(); gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl!.STATIC_DRAW);
      const position = gl!.getAttribLocation(program,'aPosition');
      gl!.enableVertexAttribArray(position); gl!.vertexAttribPointer(position,2,gl!.FLOAT,false,0,0);
      const rgb = color.match(/[a-f\d]{2}/gi)!.map((value) => parseInt(value,16)/255);
      gl!.uniform3f(gl!.getUniformLocation(program,'uColor'),rgb[0],rgb[1],rgb[2]);
      canvas!.dataset.rendered = 'true';
      return true;
    }
    function resize() {
      const width = Math.min(620, Math.max(240, canvas!.clientWidth));
      canvas!.width = Math.round(width);
      canvas!.height = Math.round(width * canvas!.clientHeight / Math.max(1,canvas!.clientWidth));
      gl!.viewport(0,0,canvas!.width,canvas!.height);
    }
    function draw(now: number) {
      frame = 0;
      if (disposed || !inView || document.hidden || gl!.isContextLost() || !program) return;
      if (!last) last = now;
      const delta = now-last;
      if (delta >= 32 || reducedMotion) {
        elapsed += Math.min(delta, 100)/1000; last = now;
        gl!.uniform1f(gl!.getUniformLocation(program,'uTime'),reducedMotion ? 8 : elapsed+4);
        gl!.uniform1f(gl!.getUniformLocation(program,'uReveal'),reducedMotion ? 2 : elapsed);
        gl!.drawArrays(gl!.TRIANGLES,0,6);
      }
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    }
    function resume() {
      cancelAnimationFrame(frame); last = 0;
      if (inView && !document.hidden) frame = requestAnimationFrame(draw);
    }
    function lost(event: Event) {
      event.preventDefault(); cancelAnimationFrame(frame); canvas!.dataset.rendered = 'false';
    }
    function restored() { shaders.length = 0; if (initialize()) { resize(); resume(); } }
    const ready = initialize();
    if (ready) resize();
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (ready) resume(); });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(() => { resize(); if (reducedMotion) resume(); });
    resizeObserver.observe(canvas);
    document.addEventListener('visibilitychange',resume);
    canvas.addEventListener('webglcontextlost',lost);
    canvas.addEventListener('webglcontextrestored',restored);
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect();
      document.removeEventListener('visibilitychange',resume);
      canvas.removeEventListener('webglcontextlost',lost); canvas.removeEventListener('webglcontextrestored',restored);
      shaders.forEach((shader) => gl.deleteShader(shader));
      gl.deleteBuffer(buffer); gl.deleteProgram(program);
    };
  }, [color, reducedMotion, replay, active]);

  return (
    <div className={styles.smoke} aria-hidden="true" style={{ opacity: active ? 1 : 0 }}>
      <div className={styles.smokeFallback} />
      <canvas ref={canvasRef} className={styles.smokeCanvas} />
    </div>
  );
}
