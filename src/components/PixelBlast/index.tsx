import "./pixel-blast.scss";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Effect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import VERTEX_SRC from "./shaders/vertex.glsl?raw";
import FRAGMENT_SRC from "./shaders/fragment.glsl?raw";

type PixelBlastVariant = "square" | "circle" | "triangle" | "diamond";

interface TouchPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  force: number;
  age: number;
}

interface TouchTexture {
  canvas: HTMLCanvasElement;
  texture: THREE.Texture;
  addTouch: (norm: { x: number; y: number }) => void;
  update: () => void;
  radiusScale: number;
  size: number;
}

interface ReinitConfig {
  antialias: boolean;
  liquid: boolean;
  noiseAmount: number;
}

type PixelBlastProps = {
  variant?: PixelBlastVariant;
  pixelSize?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  antialias?: boolean;
  patternScale?: number;
  patternDensity?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleIntensityScale?: number;
  rippleThickness?: number;
  rippleSpeed?: number;
  liquidWobbleSpeed?: number;
  autoPauseOffscreen?: boolean;
  speed?: number;
  transparent?: boolean;
  edgeFade?: number;
  noiseAmount?: number;
};

const createTouchTexture = (): TouchTexture => {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D context not available");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  const trail: TouchPoint[] = [];
  let last: { x: number; y: number } | null = null;
  const maxAge = 64;
  let radius = 0.1 * size;
  const spd = 1 / maxAge;
  const clear = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
  const drawPoint = (p: TouchPoint) => {
    const pos = { x: p.x * size, y: (1 - p.y) * size };
    let intensity = 1;
    const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);
    const easeOutQuad = (t: number) => -t * (t - 2);
    if (p.age < maxAge * 0.3) intensity = easeOutSine(p.age / (maxAge * 0.3));
    else
      intensity = easeOutQuad(1 - (p.age - maxAge * 0.3) / (maxAge * 0.7)) || 0;
    intensity *= p.force;
    const color = `${((p.vx + 1) / 2) * 255}, ${((p.vy + 1) / 2) * 255}, ${intensity * 255}`;
    const offset = size * 5;
    ctx.shadowOffsetX = offset;
    ctx.shadowOffsetY = offset;
    ctx.shadowBlur = radius;
    ctx.shadowColor = `rgba(${color},${0.22 * intensity})`;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,0,0,1)";
    ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    ctx.fill();
  };
  const addTouch = (norm: { x: number; y: number }) => {
    let force = 0;
    let vx = 0;
    let vy = 0;
    if (last) {
      const dx = norm.x - last.x;
      const dy = norm.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / (d || 1);
      vy = dy / (d || 1);
      force = Math.min(dd * 10000, 1);
    }
    last = { x: norm.x, y: norm.y };
    trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });
  };
  const update = () => {
    clear();
    for (let i = trail.length - 1; i >= 0; i--) {
      const point = trail[i]!;
      const f = point.force * spd * (1 - point.age / maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > maxAge) trail.splice(i, 1);
    }
    for (let i = 0; i < trail.length; i++) {
      const point = trail[i];
      if (!point) continue;
      drawPoint(point);
    }
    texture.needsUpdate = true;
  };
  return {
    canvas,
    texture,
    addTouch,
    update,
    set radiusScale(v: number) {
      radius = 0.1 * size * v;
    },
    get radiusScale() {
      return radius / (0.1 * size);
    },
    size,
  };
};

const createLiquidEffect = (
  texture: THREE.Texture,
  opts?: { strength?: number; freq?: number }
) => {
  const fragment = `
    uniform sampler2D uTexture;
    uniform float uStrength;
    uniform float uTime;
    uniform float uFreq;

    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float vx = tex.r * 2.0 - 1.0;
      float vy = tex.g * 2.0 - 1.0;
      float intensity = tex.b;

      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);

      float amt = uStrength * intensity * wave;

      uv += vec2(vx, vy) * amt;
    }
    `;
  return new Effect("LiquidEffect", fragment, {
    uniforms: new Map<string, THREE.Uniform>([
      ["uTexture", new THREE.Uniform(texture)],
      ["uStrength", new THREE.Uniform(opts?.strength ?? 0.025)],
      ["uTime", new THREE.Uniform(0)],
      ["uFreq", new THREE.Uniform(opts?.freq ?? 4.5)],
    ]),
  });
};

const SHAPE_MAP: Record<PixelBlastVariant, number> = {
  square: 0,
  circle: 1,
  triangle: 2,
  diamond: 3,
};

const MAX_CLICKS = 10;

const PixelBlast = ({
  variant = "square",
  pixelSize = 3,
  color = "#B497CF",
  className,
  style,
  antialias = true,
  patternScale = 2,
  patternDensity = 1,
  liquid = false,
  liquidStrength = 0.1,
  liquidRadius = 1,
  pixelSizeJitter = 0,
  enableRipples = true,
  rippleIntensityScale = 1,
  rippleThickness = 0.1,
  rippleSpeed = 0.3,
  liquidWobbleSpeed = 4.5,
  autoPauseOffscreen = true,
  speed = 0.5,
  transparent = true,
  edgeFade = 0.5,
  noiseAmount = 0,
}: PixelBlastProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const visibilityRef = useRef({ visible: true });
  const speedRef = useRef(speed);

  const threeRef = useRef<{
    renderer: THREE.WebGLRenderer;
    material: THREE.ShaderMaterial;
    uniforms: Record<string, { value: unknown }>;
    resizeObserver?: ResizeObserver;
    raf?: number;
    timeOffset?: number;
    composer?: EffectComposer;
    touch?: ReturnType<typeof createTouchTexture>;
    liquidEffect?: Effect;
    clickIx: number;
  } | null>(null);
  const prevConfigRef = useRef<ReinitConfig | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    speedRef.current = speed;
    const needsReinitKeys: (keyof ReinitConfig)[] = [
      "antialias",
      "liquid",
      "noiseAmount",
    ];
    const cfg: ReinitConfig = { antialias, liquid, noiseAmount };
    let mustReinit = false;
    if (!threeRef.current) mustReinit = true;
    else if (prevConfigRef.current) {
      for (const k of needsReinitKeys)
        if (prevConfigRef.current[k] !== cfg[k]) {
          mustReinit = true;
          break;
        }
    }
    if (mustReinit) {
      if (threeRef.current) {
        const t = threeRef.current;
        t.resizeObserver?.disconnect();
        cancelAnimationFrame(t.raf!);
        t.material.dispose();
        t.composer?.dispose();
        t.renderer.dispose();
        t.renderer.forceContextLoss();
        if (t.renderer.domElement.parentElement === container)
          container.removeChild(t.renderer.domElement);
        threeRef.current = null;
      }
      const canvas = document.createElement("canvas");
      const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      container.appendChild(renderer.domElement);
      if (transparent) renderer.setClearAlpha(0);
      else renderer.setClearColor(0x000000, 1);
      const uniforms = {
        uResolution: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uClickPos: {
          value: Array.from(
            { length: MAX_CLICKS },
            () => new THREE.Vector2(-1, -1)
          ),
        },
        uClickTimes: { value: new Float32Array(MAX_CLICKS) },
        uShapeType: { value: SHAPE_MAP[variant] ?? 0 },
        uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
        uScale: { value: patternScale },
        uDensity: { value: patternDensity },
        uPixelJitter: { value: pixelSizeJitter },
        uEnableRipples: { value: enableRipples ? 1 : 0 },
        uRippleSpeed: { value: rippleSpeed },
        uRippleThickness: { value: rippleThickness },
        uRippleIntensity: { value: rippleIntensityScale },
        uEdgeFade: { value: edgeFade },
      };
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SRC,
        fragmentShader: FRAGMENT_SRC,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        glslVersion: THREE.GLSL3,
      });

      const quadGeom = new THREE.PlaneGeometry(2, 2);
      const quad = new THREE.Mesh(quadGeom, material);
      scene.add(quad);
      const clock = new THREE.Clock();
      const setSize = () => {
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.uResolution.value.set(
          renderer.domElement.width,
          renderer.domElement.height
        );
        if (threeRef.current?.composer)
          threeRef.current.composer.setSize(
            renderer.domElement.width,
            renderer.domElement.height
          );
        uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
      };
      setSize();
      const ro = new ResizeObserver(setSize);
      ro.observe(container);
      const randomFloat = (): number => {
        if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
          const u32 = new Uint32Array(1);
          window.crypto.getRandomValues(u32);
          return (u32[0] ?? 0) / 0xffffffff;
        }
        return Math.random();
      };
      const timeOffset = randomFloat() * 1000;
      let composer: EffectComposer | undefined;
      let touch: ReturnType<typeof createTouchTexture> | undefined;
      let liquidEffect: Effect | undefined;
      if (liquid) {
        touch = createTouchTexture();
        touch.radiusScale = liquidRadius;
        composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        liquidEffect = createLiquidEffect(touch.texture, {
          strength: liquidStrength,
          freq: liquidWobbleSpeed,
        });
        const effectPass = new EffectPass(camera, liquidEffect);
        effectPass.renderToScreen = true;
        composer.addPass(renderPass);
        composer.addPass(effectPass);
      }
      if (noiseAmount > 0) {
        if (!composer) {
          composer = new EffectComposer(renderer);
          composer.addPass(new RenderPass(scene, camera));
        }
        const noiseEffect = new Effect(
          "NoiseEffect",
          "uniform float uTime; uniform float uAmount; float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);} void mainUv(inout vec2 uv){} void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){ float n=hash(floor(uv*vec2(1920.0,1080.0))+floor(uTime*60.0)); float g=(n-0.5)*uAmount; outputColor=inputColor+vec4(vec3(g),0.0);} ",
          {
            uniforms: new Map<string, THREE.Uniform>([
              ["uTime", new THREE.Uniform(0)],
              ["uAmount", new THREE.Uniform(noiseAmount)],
            ]),
          }
        );
        const noisePass = new EffectPass(camera, noiseEffect);
        noisePass.renderToScreen = true;
        if (composer && composer.passes.length > 0) {
          composer.passes.forEach((p) => {
            const pass = p as { renderToScreen?: boolean };
            pass.renderToScreen = false;
          });
        }
        composer.addPass(noisePass);
      }
      if (composer)
        composer.setSize(renderer.domElement.width, renderer.domElement.height);
      const mapToPixels = (e: PointerEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        const scaleX = renderer.domElement.width / rect.width;
        const scaleY = renderer.domElement.height / rect.height;
        const fx = (e.clientX - rect.left) * scaleX;
        const fy = (rect.height - (e.clientY - rect.top)) * scaleY;
        return {
          fx,
          fy,
          w: renderer.domElement.width,
          h: renderer.domElement.height,
        };
      };
      const onPointerDown = (e: PointerEvent) => {
        const { fx, fy } = mapToPixels(e);
        const ix = threeRef.current?.clickIx ?? 0;
        const positions = uniforms.uClickPos.value as THREE.Vector2[];
        positions[ix]?.set(fx, fy);
        (uniforms.uClickTimes.value as Float32Array)[ix] = uniforms.uTime
          .value as number;
        if (threeRef.current) threeRef.current.clickIx = (ix + 1) % MAX_CLICKS;
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!touch) return;
        const { fx, fy, w, h } = mapToPixels(e);
        touch.addTouch({ x: fx / w, y: fy / h });
      };
      renderer.domElement.addEventListener("pointerdown", onPointerDown, {
        passive: true,
      });
      renderer.domElement.addEventListener("pointermove", onPointerMove, {
        passive: true,
      });
      let raf = 0;
      const animate = () => {
        if (autoPauseOffscreen && !visibilityRef.current.visible) {
          raf = requestAnimationFrame(animate);
          return;
        }
        uniforms.uTime.value =
          timeOffset + clock.getElapsedTime() * speedRef.current;
        if (liquidEffect) {
          const liqEffect = liquidEffect as Effect & {
            uniforms: Map<string, THREE.Uniform>;
          };
          const timeUniform = liqEffect.uniforms.get("uTime");
          if (timeUniform) timeUniform.value = uniforms.uTime.value;
        }
        if (composer) {
          if (touch) touch.update();
          composer.passes.forEach((p) => {
            const pass = p as {
              effects?: Array<
                Effect & { uniforms: Map<string, THREE.Uniform> }
              >;
            };
            if (pass.effects) {
              pass.effects.forEach((eff) => {
                const timeUniform = eff.uniforms?.get("uTime");
                if (timeUniform) timeUniform.value = uniforms.uTime.value;
              });
            }
          });
          composer.render();
        } else renderer.render(scene, camera);
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
      threeRef.current = {
        renderer,
        material,
        uniforms,
        resizeObserver: ro,
        raf,
        timeOffset,
        composer,
        touch,
        liquidEffect,
        clickIx: 0,
      };
    } else {
      const t = threeRef.current!;
      (t.uniforms.uShapeType!.value as number) = SHAPE_MAP[variant] ?? 0;
      (t.uniforms.uPixelSize!.value as number) =
        pixelSize * t.renderer.getPixelRatio();
      (t.uniforms.uColor!.value as THREE.Color).set(color);
      (t.uniforms.uScale!.value as number) = patternScale;
      (t.uniforms.uDensity!.value as number) = patternDensity;
      (t.uniforms.uPixelJitter!.value as number) = pixelSizeJitter;
      (t.uniforms.uEnableRipples!.value as number) = enableRipples ? 1 : 0;
      (t.uniforms.uRippleIntensity!.value as number) = rippleIntensityScale;
      (t.uniforms.uRippleThickness!.value as number) = rippleThickness;
      (t.uniforms.uRippleSpeed!.value as number) = rippleSpeed;
      (t.uniforms.uEdgeFade!.value as number) = edgeFade;
      if (transparent) t.renderer.setClearAlpha(0);
      else t.renderer.setClearColor(0x000000, 1);
      if (t.liquidEffect) {
        const liqEffect = t.liquidEffect as Effect & {
          uniforms: Map<string, THREE.Uniform>;
        };
        const uStrength = liqEffect.uniforms.get("uStrength");
        if (uStrength) uStrength.value = liquidStrength;
        const uFreq = liqEffect.uniforms.get("uFreq");
        if (uFreq) uFreq.value = liquidWobbleSpeed;
      }
      if (t.touch) t.touch.radiusScale = liquidRadius;
    }
    prevConfigRef.current = cfg;
    return () => {
      if (threeRef.current && mustReinit) return;
      if (!threeRef.current) return;
      const t = threeRef.current;
      t.resizeObserver?.disconnect();
      cancelAnimationFrame(t.raf!);
      t.material.dispose();
      t.composer?.dispose();
      t.renderer.dispose();
      t.renderer.forceContextLoss();
      if (t.renderer.domElement.parentElement === container)
        container.removeChild(t.renderer.domElement);
      threeRef.current = null;
    };
  }, [
    antialias,
    liquid,
    noiseAmount,
    pixelSize,
    patternScale,
    patternDensity,
    enableRipples,
    rippleIntensityScale,
    rippleThickness,
    rippleSpeed,
    pixelSizeJitter,
    edgeFade,
    transparent,
    liquidStrength,
    liquidRadius,
    liquidWobbleSpeed,
    autoPauseOffscreen,
    variant,
    color,
    speed,
  ]);

  return (
    <div
      ref={containerRef}
      className={`pixel-blast ${className ?? ""}`}
      style={style}
      aria-label="PixelBlast interactive background"
    />
  );
};

export default PixelBlast;
