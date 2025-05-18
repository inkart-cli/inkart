declare interface CMD {
    cmd: string
    cmdDesc: string
    opt: string
    optDesc: string
    action: (...args: any[]) => any
}
