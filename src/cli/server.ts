import { Server } from 'jayson';
import { LRPServicesImpl } from './lrpImpl.js';

/**
 * TCP server running at a given port and providing LRP services.
 */
export class LRPServer {
    private server: Server;

    constructor() {
        this.server = new Server({
            // 'initialize': function (args: any[], callback: Function) {
            //     callback(null, LRPServicesImpl.initialize());
            // },
            'parse': async function (args: any[], callback: Function) {
                callback(null, await LRPServicesImpl.parse(args[0]));
            },
            'initExecution': function (args: any[], callback: Function) {
                callback(null, LRPServicesImpl.initExecution(args[0]));
            },
            'getRuntimeState': function (args: any[], callback: Function) {
                callback(null, LRPServicesImpl.getRuntimeState(args[0]));
            },
            'nextStep': function (args: any[], callback: Function) {
                callback(null, LRPServicesImpl.nextStep(args[0]));
            },
            'getBreakpointTypes': function (args: any[], callback: Function) {
                callback(null, LRPServicesImpl.getBreakpointTypes());
            },
            'checkBreakpoint': function (args: any[], callback: Function) {
                callback(null, LRPServicesImpl.checkBreakpoint(args[0]));
            },
            // 'getSteppingModes': function (args: any[], callback: Function) {
            //     callback(null, LRPServicesImpl.getSteppingModes());
            // },
            // 'getAvailableSteps': function (args: any[], callback: Function) {
            //     callback(null, LRPServicesImpl.getAvailableSteps(args[0]));
            // },
            // 'getStepLocation': function (args: any[], callback: Function) {
            //     callback(null, LRPServicesImpl.getStepLocation(args[0]));
            // },
        });
    }

    public start(port?: number): void {
        if (!port)
            this.server.tcp().listen(49152, 'localhost');
        this.server.tcp().listen(port, 'localhost');
    }
}