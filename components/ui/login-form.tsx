"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, ArrowRight, X, CheckCircle2 } from "lucide-react";
import { useMemberModal } from "@/components/member-modal-context";

// Vertex shader source code
const vertexSmokeySource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

// Fragment shader source code for the smokey background effect
const fragmentSmokeySource = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform vec3 u_color;

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = fragCoord / iResolution;
    vec2 centeredUV = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

    float time = iTime * 0.5;

    // Normalize mouse input (0.0 - 1.0) and remap to -1.0 ~ 1.0
    vec2 mouse = iMouse / iResolution;
    vec2 rippleCenter = 2.0 * mouse - 1.0;

    vec2 distortion = centeredUV;
    // Apply distortion for a wavy, smokey effect
    for (float i = 1.0; i < 8.0; i++) {
        distortion.x += 0.5 / i * cos(i * 2.0 * distortion.y + time + rippleCenter.x * 3.1415);
        distortion.y += 0.5 / i * cos(i * 2.0 * distortion.x + time + rippleCenter.y * 3.1415);
    }

    // Create a glowing wave pattern
    float wave = abs(sin(distortion.x + distortion.y + time));
    float glow = smoothstep(0.9, 0.2, wave);

    fragColor = vec4(u_color * glow, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

/**
 * Valid blur sizes supported by Tailwind CSS.
 */
type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/**
 * Props for the SmokeyBackground component.
 */
export interface SmokeyBackgroundProps {
  backdropBlurAmount?: string;
  color?: string;
  className?: string;
}

/**
 * A mapping from blur size names to Tailwind CSS classes.
 */
const blurClassMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

/**
 * A React component that renders an interactive WebGL shader background.
 */
export function SmokeyBackground({
  backdropBlurAmount = "sm",
  color = "#1E40AF", // Default dark blue
  className = "",
}: SmokeyBackgroundProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Helper to convert hex color to RGB (0-1 range)
  const hexToRgb = (hex: string): [number, number, number] => {
    const cleanHex = hex.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    return [r, g, b];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      return;
    }

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSmokeySource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSmokeySource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");
    const uColorLocation = gl.getUniformLocation(program, "u_color");

    const startTime = Date.now();
    const [r, g, b] = hexToRgb(color);
    gl.uniform3f(uColorLocation, r, g, b);

    let animationFrameId = 0;
    let visible = false;
    let disposed = false;
    let lastFrame = -Infinity;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let mouse = { x: 0, y: 0, hovering: false };

    const render = (time = 0) => {
      animationFrameId = 0;
      if (disposed || !visible || document.hidden) return;
      // The decorative shader needs only 30 fps; do no GPU work while offscreen.
      if (!motion.matches && time - lastFrame < 1000 / 30) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrame = time;
      const width = canvas.clientWidth || 300;
      const height = canvas.clientHeight || 300;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);

      const currentTime = motion.matches ? 0 : (Date.now() - startTime) / 1000;

      gl.uniform2f(iResolutionLocation, width, height);
      gl.uniform1f(iTimeLocation, currentTime);
      gl.uniform2f(
        iMouseLocation,
        mouse.hovering ? mouse.x : width / 2,
        mouse.hovering ? height - mouse.y : height / 2
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!motion.matches) animationFrameId = requestAnimationFrame(render);
    };

    const resume = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      if (visible && !document.hidden) animationFrameId = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    observer.observe(canvas);
    const resize = new ResizeObserver(resume);
    resize.observe(canvas);
    document.addEventListener("visibilitychange", resume);
    motion.addEventListener("change", resume);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top, hovering: true };
    };
    const handleMouseLeave = () => { mouse.hovering = false; };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", resume);
      motion.removeEventListener("change", resume);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [color]);

  const finalBlurClass = blurClassMap[backdropBlurAmount as BlurSize] || blurClassMap["sm"];

  return (
    <div aria-hidden="true" className={`absolute inset-0 w-full h-full overflow-hidden ${className}`} style={{ background: `radial-gradient(ellipse at top, ${color}, #071b26)` }}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className={`absolute inset-0 ${finalBlurClass}`}></div>
    </div>
  );
}

export interface LoginFormProps {
  title?: string;
  subtitle?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  className?: string;
}

/**
 * A React component that renders an animated, glassmorphic login form with
 * name and email fields and smooth state transitions.
 */
export function LoginForm({
  title = "Welcome Back",
  subtitle = "Sign in to continue",
  onSuccess,
  onClose,
  className = "",
}: LoginFormProps = {}): React.JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const recoveryTitle = useRef<HTMLHeadingElement>(null);
  const recoveryTrigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (recoveryOpen) recoveryTitle.current?.focus();
  }, [recoveryOpen]);
  const closeRecovery = () => {
    setRecoveryOpen(false);
    requestAnimationFrame(() => recoveryTrigger.current?.focus());
  };
  const router = useRouter();
  const { login } = useMemberModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      login(email, name);
      setTimeout(() => {
        onSuccess?.();
        router.push("/dashboard");
      }, 1000);
    }, 900);
  };

  return (
    <div
      className={`relative w-full max-w-sm p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/10 ${className}`}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>
      )}

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
        <p className="mt-2 text-sm text-gray-300">{subtitle}</p>
      </div>

      {recoveryOpen ? (
        <section
          aria-labelledby="password-recovery-title"
          className="space-y-4 text-sm text-slate-200"
          onKeyDown={(event) => {
            if (event.key === "Escape") { event.stopPropagation(); closeRecovery(); }
          }}
        >
          <h3 ref={recoveryTitle} id="password-recovery-title" tabIndex={-1} className="text-xl font-semibold text-white focus:outline-none">Recover member access</h3>
          <p>Contact the Chamber secretariat using your registered email address for help restoring your account access.</p>
          <a href="mailto:info@vizagchamber.com?subject=Member%20account%20access%20help" className="block break-all font-semibold text-amber-300 underline underline-offset-4">Email info@vizagchamber.com</a>
          <a href="tel:+917093332606" className="block font-semibold text-amber-300 underline underline-offset-4">Call +91 70933 32606</a>
          <p className="text-xs text-slate-300">No reset email has been sent. The secretariat will guide you through account recovery.</p>
          <button type="button" onClick={closeRecovery} className="min-h-11 rounded-lg border border-white/30 px-4 text-white">Back to sign in</button>
        </section>
      ) : isSuccess ? (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
            <CheckCircle2 size={36} />
          </div>
          <p className="text-lg font-semibold text-white">Access Granted</p>
          <p className="text-xs text-slate-300">
            Redirecting to Chamber Member Portal…
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="member_name" className="flex items-center gap-2 text-sm text-slate-200"><User size={16} aria-hidden="true" />Full name</label>
            <input id="member_name" name="fullName" type="text" autoComplete="name" required pattern=".*\S.*" maxLength={100} value={name} onChange={event => setName(event.target.value)} className="block w-full rounded-lg border border-white/30 bg-slate-950/30 px-3 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none" />
          </div>
          {/* Email Input with Animated Label */}
          <div className="relative z-0 group">
            <input
              type="email"
              name="email"
              autoComplete="email"
              id="floating_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer transition-colors"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <Mail className="inline-block mr-2 -mt-1" size={16} />
              Email Address
            </label>
          </div>

          {/* Password Input with Animated Label */}
          <div className="relative z-0 group">
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              id="floating_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer transition-colors"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="absolute text-sm text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-focus:left-0 peer-focus:text-blue-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              <Lock className="inline-block mr-2 -mt-1" size={16} />
              Password
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              ref={recoveryTrigger}
              onClick={() => setRecoveryOpen(true)}
              className="min-h-11 text-xs text-gray-300 hover:text-white transition underline underline-offset-4"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </span>
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

        </form>
      )}

      <p className="text-center text-xs text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/join"
          className="font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
        >
          Sign Up / Apply for Membership
        </Link>
      </p>
    </div>
  );
}
