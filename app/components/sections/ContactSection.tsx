"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Company } from "@/data/companies";
import { LeadForm } from "@/app/components/LeadForm";

type ContactSectionProps = {
  company: Company;
};

export function ContactSectionWithShader({ company }: ContactSectionProps) {
  // Each slot maps to a distinct company color for richer shader variation
  const shaderColors = [
    company.primaryColor,   // base background
    company.accentColor,    // first accent highlight
    company.accentColor2,   // second accent / depth layer
    company.neutral1,       // light neutral wash
    company.neutral2,       // mid neutral vignette base
  ];

  return (
    <div className="w-full bg-gray-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 md:px-8 lg:grid-cols-2 lg:py-20">
        {/* Left — Shader panel with rotating testimonials */}
        <div className="relative order-last h-[500px] overflow-hidden rounded-3xl md:order-first lg:h-auto">
          <ShaderBackground colors={shaderColors} />
          <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
            <RotatingTestimonials accentColor={company.accentColor} />
          </div>
        </div>

        {/* Right — Lead Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-3xl px-4 py-8 md:px-10">
            <LeadForm
              bare
              primaryColor={company.primaryColor}
              accentColor={company.accentColor}
              services={company.services}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const hvacTestimonials = [
  {
    quote:
      "They came out the same day my AC broke down in July. Fixed it in under two hours and the price was exactly what they quoted. Absolutely incredible service.",
    name: "Maria T.",
    designation: "Homeowner, San Antonio, TX",
    image: "https://assets.aceternity.com/avatars/1.webp",
  },
  {
    quote:
      "I've used three different HVAC companies over the years. These guys are the only ones who explain what they're doing and don't try to upsell you on things you don't need.",
    name: "James R.",
    designation: "Homeowner, Stone Oak, TX",
    image: "https://assets.aceternity.com/avatars/2.webp",
  },
  {
    quote:
      "Called at 9 PM on a Friday night. Technician was here by 10:30. My family didn't have to sleep in the heat. That kind of service is hard to find.",
    name: "Linda M.",
    designation: "Homeowner, Helotes, TX",
    image: "https://assets.aceternity.com/avatars/3.webp",
  },
  {
    quote:
      "Replaced our entire HVAC system and handled all the permits. The crew was clean, professional, and done in one day. Couldn't be more satisfied.",
    name: "Carlos V.",
    designation: "Homeowner, Boerne, TX",
    image: "https://assets.aceternity.com/avatars/4.webp",
  },
];

function RotatingTestimonials({ accentColor }: { accentColor: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hvacTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-full w-full max-w-md items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full"
        >
          <TestimonialCard testimonial={hvacTestimonials[currentIndex]} />
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {hvacTestimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={index === currentIndex ? { backgroundColor: accentColor } : {}}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof hvacTestimonials)[0];
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md md:p-8">
      <svg className="mb-4 h-8 w-8 text-white/60" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-lg leading-relaxed font-medium text-white md:text-xl">
        {testimonial.quote}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-white/30"
        />
        <div>
          <p className="font-semibold text-white">{testimonial.name}</p>
          <p className="text-sm text-white/70">{testimonial.designation}</p>
        </div>
      </div>
    </div>
  );
}

// ─── WebGL Shader ──────────────────────────────────────────────────────────────

function resolveCssColorToRGB(color: string): [number, number, number] {
  if (typeof document === "undefined") return [128, 128, 128];
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [128, 128, 128];
  const el = document.createElement("div");
  el.style.color = color;
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color;
  document.body.removeChild(el);
  ctx.fillStyle = computed;
  ctx.fillRect(0, 0, 1, 1);
  const data = ctx.getImageData(0, 0, 1, 1).data;
  return [data[0], data[1], data[2]];
}

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_colors[5];

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
    return blend * opacity + base * (1.0 - opacity);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    float time = u_time * 0.15;
    vec2 nCoord = vec2(uv.x * aspect, uv.y) * 0.4;
    vec3 color = u_colors[0];
    float n1 = snoise(vec3(nCoord.x * 1.3 + time * 0.5, nCoord.y * 1.6, time * 0.3 + 3.0));
    n1 = smoothstep(0.15, 0.7, n1 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[1], pow(n1, 3.5));
    float n2 = snoise(vec3(nCoord.x * 1.5 + time * 0.4, nCoord.y * 1.8, time * 0.35 + 12.0));
    n2 = smoothstep(0.18, 0.75, n2 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[2], pow(n2, 3.5));
    float n3 = snoise(vec3(nCoord.x * 1.1 - time * 0.35, nCoord.y * 1.4, time * 0.25 + 24.0));
    n3 = smoothstep(0.20, 0.80, n3 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[3], pow(n3, 4.0));
    float n4 = snoise(vec3(nCoord.x * 0.9 + time * 0.2, nCoord.y * 1.2, time * 0.15 + 36.0));
    n4 = smoothstep(0.25, 0.85, n4 * 0.5 + 0.5);
    color = blendNormal(color, u_colors[4], pow(n4, 4.0));
    float vignette = smoothstep(1.2, 0.4, length(uv - vec2(0.5)));
    color *= vignette * 0.85 + 0.15;
    gl_FragColor = vec4(color, 1.0);
  }
`;

type ShaderBackgroundProps = {
  colors: string[];
};

function ShaderBackground({ colors }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const createShader = useCallback(
    (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    },
    [],
  );

  const parseColors = useCallback(() => {
    const resolved = [...colors];
    while (resolved.length < 5) resolved.push(resolved[resolved.length - 1] ?? "#7c3aed");
    return resolved.slice(0, 5).flatMap((c) => {
      const [r, g, b] = resolveCssColorToRGB(c);
      return [r / 255, g / 255, b / 255];
    });
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return;
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uColors = gl.getUniformLocation(program, "u_colors");
    gl.uniform3fv(uColors, new Float32Array(parseColors()));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    const startTime = performance.now();
    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [createShader, parseColors]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ display: "block" }}
      />
      <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full opacity-[0.25]">
        <filter id="contactShaderNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#contactShaderNoise)" />
      </svg>
    </>
  );
}

