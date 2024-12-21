"use client"

import { useEffect, useRef } from 'react';
import _ from 'lodash';

class SnowItem {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    params: {
        color: string;
        x: number;
        y: number;
        radius: number;
        speed: number;
        wind: number;
        isResized: boolean;
    };

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: { radius: [number, number]; speed: [number, number]; wind: [number, number]; color: string }
    ) {
        const { radius, speed, wind, color } = options;
        this.params = {
            color,
            x: _.random(0, canvas.offsetWidth),
            y: _.random(-canvas.offsetHeight, 0),
            radius: _.random(...radius),
            speed: _.random(...speed),
            wind: _.random(...wind),
            isResized: false,
        };
        this.canvas = canvas;
        this.ctx = ctx;
    }

    private updateData() {
        this.params.x = _.random(0, this.canvas.offsetWidth);
        this.params.y = _.random(-this.canvas.offsetHeight, 0);
    }

    private translate() {
        this.params.y += this.params.speed;
        this.params.x += this.params.wind;
    }

    private onDown() {
        if (this.params.y < this.canvas.offsetHeight) return;

        if (this.params.isResized) {
            this.updateData();
            this.params.isResized = false;
        } else {
            this.params.y = 0;
            this.params.x = _.random(0, this.canvas.offsetWidth);
        }
    }

    resized() {
        this.params.isResized = true;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.params.x, this.params.y, this.params.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.params.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    update() {
        this.translate();
        this.onDown();
    }
}

class Snow {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    snowFlakes: Array<SnowItem>;
    options: {
        color: string;
        radius: [number, number];
        speed: [number, number];
        wind: [number, number];
    };
    countSnowFlakes: number;

    defaultOptions = {
        color: 'white',
        radius: [0.5, 3.0],
        speed: [1, 3],
        wind: [-0.5, 3.0],
    };

    constructor(canvas: HTMLCanvasElement, count: number, wind?: number, speed?: number) {
        this.countSnowFlakes = count;
        this.options = {
            color: 'white',
            radius: [0.5, 3.0],
            speed: speed ? [speed - 1, speed + 1] : [1, 3],
            wind: wind ? [wind - 0.5, wind + 0.5] : [-0.5, 3.0],
        };
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.snowFlakes = [];
        this.init();
        this.resize();
    }

    private add(item: SnowItem) {
        this.snowFlakes.push(item);
    }

    private update() {
        this.snowFlakes.forEach((el) => el.update());
    }

    private resize() {
        this.ctx.canvas.width = this.canvas.offsetWidth;
        this.ctx.canvas.height = this.canvas.offsetHeight;
        this.snowFlakes.forEach((el) => el.resized());
    }

    private draw() {
        this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
        this.snowFlakes.forEach((el) => el.draw());
    }

    private events() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    private loop() {
        this.draw();
        this.update();
        window.requestAnimationFrame(this.loop.bind(this));
    }

    private init() {
        _.times(this.countSnowFlakes, () => this.add(new SnowItem(this.canvas, this.ctx, this.options)));
        this.events();
        this.loop();
    }
}

interface SnowEffectProps {
    count?: number;
    width?: number;
    height?: number;
    speed?: number;
    wind?: number;
}

const SnowEffect = ({ count, width, height, speed, wind }: SnowEffectProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            new Snow(canvas, count ?? 100, wind, speed);
        }
    }, [count, wind, speed]);

    return (
        <canvas
            id="snow"
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: height ?? '100%',
                width: width ?? '100%',
            }}
        />
    );
};

export default SnowEffect;
