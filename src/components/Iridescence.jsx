// src/components/Iridescence.jsx
import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";

import './Iridescence.css';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  // Add a subtle offset based on the mouse position
  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  
  // Create animated pattern
  float pattern = cos(uv.x * 3.0 + d) * cos(uv.y * 2.0 + a) * 0.5 + 0.5;
  
  // Define the three colors in RGB (normalized 0-1)
  vec3 color1 = vec3(0.0, 0.224, 0.286);    // #003949
  vec3 color2 = vec3(0.004, 0.008, 0.098);  // #010219
  vec3 color3 = vec3(0.0, 0.008, 0.141);    // #000224
  
  // Create smooth transitions between colors
  float t1 = sin(uv.x * 2.0 + d * 0.3) * 0.5 + 0.5;
  float t2 = cos(uv.y * 1.5 + a * 0.2) * 0.5 + 0.5;
  
  // Mix colors smoothly
  vec3 col = mix(color1, color2, t1);
  col = mix(col, color3, t2);
  
  // Apply pattern for variation
  col = col * (0.8 + pattern * 0.4);
  
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  ...rest
}) {
  const ctnDom = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Hemen başlat
    const initWebGL = () => {
      if (!ctnDom.current) return;
      
      const ctn = ctnDom.current;
      const renderer = new Renderer();
      const gl = renderer.gl;
      gl.clearColor(0.0, 0.008, 0.098, 1.0); // Koyu arkaplan rengi

      let program;

      function resize() {
        const scale = 1;
        renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
        if (program) {
          program.uniforms.uResolution.value = new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          );
        }
      }
      window.addEventListener("resize", resize, false);
      resize();

      const geometry = new Triangle(gl);
      program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(...color) },
          uResolution: {
            value: new Color(
              gl.canvas.width,
              gl.canvas.height,
              gl.canvas.width / gl.canvas.height
            ),
          },
          uMouse: { value: new Float32Array([mousePos.current.x, mousePos.current.y]) },
          uAmplitude: { value: amplitude },
          uSpeed: { value: speed },
        },
      });

      const mesh = new Mesh(gl, { geometry, program });
      let animateId;

      function update(t) {
        animateId = requestAnimationFrame(update);
        program.uniforms.uTime.value = t * 0.001;
        renderer.render({ scene: mesh });
      }
      
      animateId = requestAnimationFrame(update);
      ctn.appendChild(gl.canvas);
      setIsLoaded(true);

      function handleMouseMove(e) {
        const rect = ctn.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        mousePos.current = { x, y };
        program.uniforms.uMouse.value[0] = x;
        program.uniforms.uMouse.value[1] = y;
      }
      if (mouseReact) {
        ctn.addEventListener("mousemove", handleMouseMove);
      }

      return () => {
        cancelAnimationFrame(animateId);
        window.removeEventListener("resize", resize);
        if (mouseReact) {
          ctn.removeEventListener("mousemove", handleMouseMove);
        }
        ctn.removeChild(gl.canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    // Hemen başlat
    const cleanup = initWebGL();
    
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, speed, amplitude, mouseReact]);

  return (
    <div
      ref={ctnDom}
      className="iridescence-container"
      style={{ 
        background: isLoaded ? 'transparent' : 'linear-gradient(135deg, #003949 0%, #010219 50%, #000224 100%)'
      }}
      {...rest}
    />
  );
}