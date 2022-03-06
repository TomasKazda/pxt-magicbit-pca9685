class Servo {
    private _up: number
    private _down: number
    private _center: number
    private _pulse: number
    private _pin: PCAmotor.Servos
    private _speed: number

    constructor(pin: PCAmotor.Servos, up: number, down: number, center: number = 1500, speed: number = 10) {
        //super(pin, initPulse)
        PCAmotor.GeekServo(pin, center)
        this._pin = pin
        this._up = up
        this._down = down
        this._pulse = center
        this._center = center
        this._speed = speed
    }

    public getPulse(): number {
        return this._pulse
    }
    public up(): void {
        this.setPulse(this._up, this._speed)
    }
    public center(): void {
        this.setPulse(this._center, this._speed)
    }
    public down(): void {
        this.setPulse(this._down, this._speed)
    }
    public stop(): void {
        PCAmotor.StopServo(this._pin)
    }
    public isDown(): boolean {
        return Math.abs(this._pulse - this._down) < 30
    }
    public isUp(): boolean {
        return Math.abs(this._pulse - this._up) < 30
    }
    public isCentered(): boolean {
        return Math.abs(this._pulse - this._center) < 30
    }
    public setPulse(pulse: number, speed: number = 10) {
        pulse = Math.constrain(pulse, Math.min(this._down, this._up), Math.max(this._down, this._up))
        //console.logValue(this._pin, pulse)
        if (speed == 0) {
            PCAmotor.GeekServo(this._pin, pulse)
        } else
            PCAmotor.GeekServospeed(this._pin, this._pulse, pulse, speed)
        this._pulse = pulse
    }
    public changePulse(us: number, speed: number = 4) {
        this.setPulse(this._pulse + us, speed)
        if (this._pulse == this._up || this._pulse == this._down || this._pulse == this._center)
            this.stop()
    }
}