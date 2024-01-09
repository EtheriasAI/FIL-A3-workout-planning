// import { BreakpointType, CheckBreakpointArguments, CheckBreakpointResponse, GetBreakpointTypesResponse, GetRuntimeStateArguments, GetRuntimeStateResponse, InitArguments, InitResponse, LRPServices, ModelElement, ParseArguments, ParseResponse, StepArguments, StepResponse } from "./lrp.js";

// class LRPServicesImpl implements LRPServices {
//     parse(args: ParseArguments): Promise<ParseResponse> {
//         throw new Error("Method not implemented.");
//     }
//     initExecution(args: InitArguments): InitResponse {
//         throw new Error("Method not implemented.");
//     }
//     getRuntimeState(args: GetRuntimeStateArguments): GetRuntimeStateResponse {
//         throw new Error("Method not implemented.");
//     }
//     nextStep(args: StepArguments): StepResponse {
//         throw new Error("Method not implemented.");
//     }
//     getBreakpointTypes(): GetBreakpointTypesResponse {
//         throw new Error("Method not implemented.");
//     }
//     checkBreakpoint(args: CheckBreakpointArguments): CheckBreakpointResponse {
//         throw new Error("Method not implemented.");
//     }
// }


// class InitResponseImpl implements InitResponse {
//     isExecutionDone: boolean;

// }

// class GetRuntimeStateResponseImpl implements GetRuntimeStateResponse {
//     runtimeStateRoot: ModelElement;

// }

// class CheckBreakpointResponseImpl implements CheckBreakpointResponse {
//     isActivated: boolean;
//     message?: string | undefined;
// }

// class GetBreakpointTypesResponseImpl implements GetBreakpointTypesResponse {
//     breakpointTypes: BreakpointType[];

// }

// class StepResponseImpl implements StepResponse {
//     isExecutionDone: boolean;

// }